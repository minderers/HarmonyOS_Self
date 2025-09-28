/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CustomTransition } from '../utils/CustomNavigationUtil';

@Component
export struct CustomNavigationTransition {
  @State translateY: string = '0';
  private navDestinationId: string = '';

  enterAnimation(transitionProxy: NavigationTransitionProxy) {
    this.translateY = '100%';
    this.getUIContext().animateTo({
      duration: 600,
      onFinish: () => {
        transitionProxy.finishTransition();
      }
    }, () => {
      this.translateY = '0';
    });
  }

  exitAnimation(transitionProxy: NavigationTransitionProxy) {
    this.getUIContext().animateTo({
      duration: 600,
      onFinish: () => {
        transitionProxy.finishTransition();
      }
    }, () => {
      this.translateY = '100%';
    });
  }

  build() {
    NavDestination()
      .backgroundImage($r('app.media.bg_transition'))
      .backgroundImageSize(ImageSize.Cover)
      .translate({ y: this.translateY })
      .onReady((context: NavDestinationContext) => {
        this.navDestinationId = context.navDestinationId!;
        // Register a custom transition animation object
        CustomTransition.getInstance().registerNavParam(this.navDestinationId, 2000,
          (transitionProxy: NavigationTransitionProxy) => {
            // Check the current navigation operation type
            if (CustomTransition.getInstance().operation === NavigationOperation.PUSH) {
              // Execute the enter animation for the PUSH operation
              this.enterAnimation(transitionProxy);
            } else if (CustomTransition.getInstance().operation === NavigationOperation.POP) {
              // Execute the exit animation for the POP operation
              this.exitAnimation(transitionProxy);
            }
          });
      })
      .onDisAppear(() => {
        CustomTransition.getInstance().unRegisterNavParam(this.navDestinationId);
      })
  }
}
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
import { getResourceString } from '../utils/commonUtil';

@Component
export struct ComponentTransition {
  @State isShow: boolean = false;
  appearEffect = TransitionEffect.scale({ x: 0, y: 0 }).combine(TransitionEffect.OPACITY);
  disappearEffect = TransitionEffect.rotate({ x: 0, y: 1, z: 0, angle: 360 }).combine(TransitionEffect.OPACITY);

  build() {
    NavDestination() {
      Column() {
        if (this.isShow) {
          Image($r('app.media.bg_element'))
            .TransitionEleStyles()
            .transition(TransitionEffect.asymmetric(this.appearEffect, this.disappearEffect))
        }
        Image($r('app.media.bg_element'))
          .TransitionEleStyles()
        Blank()
        Button($r('app.string.Component_transition_toggle'))
          .width('100%')
          .onClick(() => {
            this.getUIContext().animateTo({ duration: 600 }, () => {
              this.isShow = !this.isShow;
            });
          })
      }
      .padding(16)
      .height('100%')
      .width('100%')
    }
    .title(getResourceString($r('app.string.title_component_transition'),this.getUIContext().getHostContext()!))
  }
}

@Extend(Image) function TransitionEleStyles () {
  .objectFit(ImageFit.Fill)
  .borderRadius(20)
  .margin({ bottom: 20 })
  .height(120)
  .width('100%')
}
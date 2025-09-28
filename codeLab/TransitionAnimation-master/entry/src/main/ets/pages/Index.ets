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

import { ROUTES, Route } from '../constants/CommonConstants';
import { CustomNavigationTransition } from './CustomNavigationTransition';
import { ComponentTransition } from './ComponentTransition';
import { NavigationTransition } from './NavigationTransition';
import { LongTakeTransition } from './longtaketransition/LongTakeTransition';
import { GeometryTransition } from './geometrytransition/GeometryTransition';
import { GeometryTransitionDetail } from './geometrytransition/GeometryTransitionDetail';
import { AnimateCallback, CustomTransition } from '../utils/CustomNavigationUtil';
import { ModalTransition } from './ModalTransition';

@Entry
@Component
struct Index {
  @Provide navPageInfos: NavPathStack = new NavPathStack();

  go(route: Route) {
    if (!route.to) {
      return;
    }
    this.navPageInfos.pushPath({
      name: route.to,
      param: route.title
    });
  }

  @Builder
  navPageMap(name: string) {
    if (name === 'NavigationTransition') {
      NavigationTransition();
    } else if (name === 'CustomNavigationTransition') {
      CustomNavigationTransition();
    } else if (name === 'ComponentTransition') {
      ComponentTransition();
    } else if (name === 'GeometryTransition') {
      GeometryTransition();
    } else if (name === 'GeometryTransitionDetail') {
      GeometryTransitionDetail();
    } else if (name === 'LongTakeTransition') {
      LongTakeTransition();
    } else if (name === 'ModalTransition') {
      ModalTransition()
    }
  }

  build() {
    Navigation(this.navPageInfos) {
      Column() {
        Text($r('app.string.main_page_title'))
          .fontSize(30)
          .lineHeight(40)
          .fontWeight(700)
          .margin({
            top: 8,
            bottom: 8
          })
        Blank()
        ForEach(ROUTES, (route: Route) => {
          Button(route.title)
            .width('100%')
            .margin({ top: 12 })
            .onClick(() => {
              this.go(route)
            })
        }, (route: Route) => route.to)
      }
      .height('100%')
      .alignItems(HorizontalAlign.Start)
      .padding({
        top: 56,
        bottom: 16,
        left: 16,
        right: 16
      })
    }
    .hideToolBar(true)
    .mode(NavigationMode.Stack)
    .navDestination(this.navPageMap)
    .backgroundColor('#F1F3F5')
    .customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
      // Retrieve animation object for the source (from) and destination (to) navigation views
      const fromParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(from.navDestinationId || '');
      const toParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(to.navDestinationId || '');
      CustomTransition.getInstance().operation = operation;
      if (!fromParam.animation && !toParam.animation) {
        return undefined;
      }
      // Implement the NavigationAnimatedTransition protocol
      const customAnimation: NavigationAnimatedTransition = {
        timeout: 1000,
        transition: (transitionProxy: NavigationTransitionProxy) => {
          fromParam.animation && fromParam.animation(transitionProxy);
          toParam.animation && toParam.animation(transitionProxy);
        }
      };
      return customAnimation;
    })
  }
}

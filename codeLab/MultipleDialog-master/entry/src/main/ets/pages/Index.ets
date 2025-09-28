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

import { PersonalInformation } from './PersonalInformation';

@Entry
@Component
struct Index {
  @Provide('NavPathStack') pathStack: NavPathStack = new NavPathStack();

  @Builder
  PagesMap(name: string) {
    if (name === 'PersonalInformation') {
      PersonalInformation()
    }
  }

  build() {
    Navigation(this.pathStack) {
      Column() {
        Text($r('app.string.multi_popup_interaction'))
          .fontSize(30)
          .opacity(0.9)
          .fontWeight(FontWeight.Bold)
          .width('100%')
          .height(56)
          .margin({ top: 56 })
        Column({ space: 12 }) {
          Button($r('app.string.personalInformation'))
            .onClick(() => {
              this.pathStack.pushPath({ name: 'PersonalInformation' });
            })
            .width('100%')
        }
        .height(248)
        .width('100%')
        .justifyContent(FlexAlign.End)
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding({
        left: 16,
        right: 16,
        bottom: 16
      })
    }
    .backgroundColor('#F1F3F5')
    .navDestination(this.PagesMap)
    .mode(NavigationMode.Stack)
    .hideToolBar(true)
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }
}
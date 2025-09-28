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
import { TitleBar } from '../../views/TitleBar';
import { Card } from './LongTakeTransition';

@Component
export struct LongTakeDetail {
  @Prop card: Card;
  onBack: () => void = () => {};

  build() {
    Column() {
      TitleBar({
        title: $r('app.string.title_image'),
        onBack: () => this.onBack()
      })
        .padding({
          bottom: 12,
          left: 16,
          right: 16
        })
      Image(this.card.image)
        .width('100%')
        .objectFit(ImageFit.Auto)
    }
    .width('100%')
    .height('100%')
    .borderRadius(10)
    .backgroundColor('#F1F3F5')
    .geometryTransition(this.card.id)
    .transition(TransitionEffect.OPACITY)
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }
}
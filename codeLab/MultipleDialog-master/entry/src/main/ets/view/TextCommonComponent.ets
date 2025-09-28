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

@Component
export default struct TextCommonComponent {
  @Link content: ResourceStr;
  textImage?: Resource;
  title?: ResourceStr;
  onItemClick = (): void => {};

  build() {
    Row() {
      Image(this.textImage !== undefined ? this.textImage : '')
        .width(26)
        .height(26)
        .margin({ left: 12 })
      Text(this.title)
        .fontSize(17)
        .margin({ left: 16 })
        .height('100%')
        .opacity(0.9)
      Text(this.content)
        .fontSize(17)
        .opacity(0.9)
        .textAlign(TextAlign.End)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .maxLines(1)
        .margin({
          left: 16,
          right: 7
        })
        .height('100%')
        .layoutWeight(1)
        .width('100%')
      Image($r('app.media.chevron_right'))
        .width(13)
        .height(13)
        .margin({ right: 14 })
    }
    .margin({ top: 12 })
    .borderRadius(24)
    .backgroundColor(Color.White)
    .width('100%')
    .height(64)
    .onClick(this.onItemClick)
  }
}
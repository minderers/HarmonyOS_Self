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
export default struct TextInputComponent {
  @Link text: string;
  inputImage?: Resource;
  hintText?: ResourceStr;

  build() {
    Row() {
      Image(this.inputImage !== undefined ? this.inputImage : '')
        .width(26)
        .height(26)
        .margin({ left: 12 })
      TextInput({ placeholder: this.hintText, text: this.text })
        .fontSize(17)
        .padding({ left: 12 })
        .backgroundColor(Color.White)
        .fontWeight(FontWeight.Normal)
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .opacity(0.9)
        .margin({ right: 32 })
        .layoutWeight(1)
        .height(48)
        .enableKeyboardOnFocus(false)
        .onChange((value: string) => {
          if (this.text !== value) {
            this.text = value;
            AppStorage.setOrCreate('inputIsEdit', true);
          }
          if (!value) {
            AppStorage.setOrCreate('inputIsEdit', false);
          }
        })
    }
    .margin({ top: 12 })
    .borderRadius(24)
    .backgroundColor(Color.White)
    .width('100%')
    .height(64)
  }
}
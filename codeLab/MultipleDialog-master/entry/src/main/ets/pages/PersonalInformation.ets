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

import { hilog } from '@kit.PerformanceAnalysisKit';
import { ComponentContent } from '@kit.ArkUI';
import TextInputComponent from '../view/TextInputComponent';
import TextCommonComponent from '../view/TextCommonComponent';
import CommonUtils from '../utils/CommonUtils';
import PromptActionClass from '../view/Dialog';

class HobbyItem {
  label?: string;
  isChecked?: boolean;
}

class Params {
  hobbyItems: HobbyItem[] = [];

  constructor(hobbyItems: HobbyItem[]) {
    this.hobbyItems = hobbyItems;
  }
}

@Extend(Button)
function dialogButtonStyle() {
  .fontSize(16)
  .fontColor('#0A59F7')
  .layoutWeight(1)
  .backgroundColor(Color.White)
  .width('100%')
  .height(40)
}

function setHobbiesValue(hobbyItems: HobbyItem[]) {
  if (CommonUtils.isEmptyArr(hobbyItems)) {
    hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'hobbyItems length is 0');
    return;
  }
  let hobbiesText: string = '';
  hobbiesText = hobbyItems.filter((isCheckItem: HobbyItem) => isCheckItem?.isChecked)
    .map<string>((checkedItem: HobbyItem) => {
      return checkedItem.label!;
    })
    .join(',');
  return hobbiesText;
}

@Builder
function buildHobbyItems(params: Params) {
  Column() {
    Text($r('app.string.hobbies_and_interests'))
      .fontSize(20)
      .opacity(0.9)
      .lineHeight(28)
      .fontWeight(700)
      .alignSelf(ItemAlign.Start)
      .margin({ left: 24 })

    List() {
      ForEach(params.hobbyItems, (itemHobby: HobbyItem) => {
        ListItem() {
          Row() {
            Text(itemHobby.label)
              .fontSize(16)
              .opacity(0.9)
              .layoutWeight(1)
              .textAlign(TextAlign.Start)
              .fontWeight(500)
              .margin({ left: 24 })
            Toggle({ type: ToggleType.Checkbox, isOn: false })
              .onChange((isCheck) => {
                itemHobby.isChecked = isCheck;
              })
              .width(20)
              .height(20)
              .margin({ right: 24 })
          }
          .height(22)
          .margin({
            top: 13,
            bottom: 13
          })
        }
      }, (itemHobby: HobbyItem) => JSON.stringify(itemHobby.label))
    }
    .margin({
      top: 14,
      bottom: 8
    })
    .divider({
      strokeWidth: 0.5,
      color: '#0D182431'
    })
    .listDirection(Axis.Vertical)
    .edgeEffect(EdgeEffect.None)
    .width('100%')
    .height(242)

    Row() {
      Button($r('app.string.cancel'))
        .dialogButtonStyle()
        .onClick(() => {
          PromptActionClass.closeDialog()
        })
      Blank()
        .backgroundColor('#F2F2F2')
        .width(1)
        .opacity(1)
        .height(25)
        .margin({ left: 8, right: 8 })
      Button($r('app.string.confirm'))
        .dialogButtonStyle()
        .onClick(() => {
          PromptActionClass.closeDialog();
          let text = setHobbiesValue(params.hobbyItems);
          AppStorage.setOrCreate('Hobbies', text);
          AppStorage.setOrCreate('isEdit', true);
        })
    }
    .padding({
      left: 16,
      right: 16
    })
  }
  .width('93.3%')
  .padding({
    top: 14,
    bottom: 16
  })
  .borderRadius(32)
  .backgroundColor(Color.White)
}

@Component
export struct PersonalInformation {
  @StorageLink('nikeName') nikeName: string = '';
  @StorageLink('signature') signature: string = '';
  @StorageLink('birthDate') birthDate: string = '';
  @StorageLink('sex') sex: ResourceStr = $r('app.string.male');
  @StorageLink('Hobbies') hobbies: string = '';
  @StorageLink('selectTime') selectTime: Date = new Date('2000-12-25T08:30:00');
  @State hobbyItems: HobbyItem[] = [];
  @StorageLink('select') select: number = 0;
  @StorageLink('isEdit') isEdit: boolean = false;
  @State customPopup: boolean = false
  @State isSaved: boolean = false;
  @Consume('NavPathStack') pathStack: NavPathStack;
  private sexArray: Resource = $r('app.strarray.sex_array');
  private currentDate: string = '';
  private ctx: UIContext = this.getUIContext();
  private contentNode: ComponentContent<Object> =
    new ComponentContent(this.ctx, wrapBuilder(buildHobbyItems),
      new Params(this.hobbyItems));

  // The popup constructor defines the contents of the pop-up
  @Builder
  PopupBuilder() {
    Row({ space: 2 }) {
      Text($r('app.string.save'))
        .fontSize(16)
        .opacity(0.9)
    }
    .onClick(() => {
      this.isSaved = true;
      this.customPopup = false; // Close popup dialog
      AppStorage.setOrCreate('isEdit', false);
      this.ctx.getPromptAction().showToast({
        message: $r('app.string.save_successfully'),
        duration: 2000
      })
      AppStorage.setOrCreate('nikeName', this.nikeName);
      AppStorage.setOrCreate('signature', this.signature);
      AppStorage.setOrCreate('birthDate', this.birthDate);
      AppStorage.setOrCreate('selectTime', this.selectTime);
      AppStorage.setOrCreate('sex', this.sex);
      AppStorage.setOrCreate('select', this.select);
      AppStorage.setOrCreate('hobbies', this.hobbies);
      AppStorage.setOrCreate('isEdit', false);
    })
    .width(200)
    .height(50)
    .padding(16)
  }

  aboutToAppear() {
    PromptActionClass.setContext(this.ctx);

    PromptActionClass.setOptions({ alignment: DialogAlignment.Center });
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.currentDate = year + '-' + month + '-' + day;
    this.selectTime = new Date(`${this.currentDate}T08:30:00`);
    if (!this.birthDate) {
      this.birthDate = CommonUtils.getBirthDateValue(year, month, day);
    }
    let context = this.getUIContext().getHostContext() as Context;
    if ((CommonUtils.isEmpty(context)) || (CommonUtils.isEmpty(context.resourceManager))) {
      hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'context or resourceManager is null');
      return;
    }
  }

  @Builder
  NavDestinationTitle() {
    Column() {
      Row() {
        Image($r('app.media.dot_grid'))
          .width(24)
          .height(24)
      }
      .width(40)
      .height(40)
      .borderRadius(36)
      .backgroundColor('#E9E9E9')
      .justifyContent(FlexAlign.Center)
      .onClick(() => {
        this.customPopup = !this.customPopup
      })
      .bindPopup(this.customPopup, {
        builder: this.PopupBuilder, // Bubble content
        placement: Placement.Bottom, // The pop position of the bubble
        onStateChange: (e) => {
          if (!e.isVisible) {
            this.customPopup = false;
          }
        }
      })
    }
    .alignItems(HorizontalAlign.End)
    .padding({ top: 8, right: 16 })
    .width('calc(100% - 56vp)')
  }

  build() {
    NavDestination() {
      Column() {
        Column({ space: 12 }) {
          Image($r('app.media.ic_avatar'))
            .width(56)
            .height(56)
            .alignSelf(ItemAlign.Center)
          Text($r('app.string.personalInformation'))
            .fontSize(17)
            .opacity(0.9)
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)

        Column() {
          TextInputComponent({
            inputImage: $r('app.media.person'),
            text: this.nikeName,
            hintText: $r('app.string.nickname')
          })
        }
        .margin({ top: 12 })

        Column() {
          TextCommonComponent({
            textImage: $r('app.media.calendar'),
            title: $r('app.string.date_of_birth'),
            content: this.birthDate,
            onItemClick: () => {
              this.getUIContext().showDatePickerDialog({
                start: new Date('1925-1-1'),
                end: new Date('2055-1-1'),
                selected: this.selectTime,
                lunarSwitch: true,
                showTime: false,
                onDateAccept: (value: Date) => {
                  this.selectTime = value;
                  let birthDateArray = JSON.stringify(value).slice(1, 11).split('-');
                  let year = Number(birthDateArray[0]);
                  let month = Number(birthDateArray[1]);
                  let day = Number(birthDateArray[2]);
                  this.birthDate = CommonUtils.getBirthDateValue(year, month, day);
                  AppStorage.setOrCreate('isEdit', true);
                }
              })
            }
          })
        }

        Column() {
          TextCommonComponent({
            textImage: $r('app.media.person_2'),
            title: $r('app.string.sex'),
            content: this.sex,
            onItemClick: () => {
              this.getUIContext().showTextPickerDialog({
                range: this.sexArray,
                selected: this.select,
                canLoop: false,
                onAccept: (value: TextPickerResult) => {
                  this.select = value.index as number;
                  this.sex = value.value as string;
                  AppStorage.setOrCreate('isEdit', true);
                },
                onChange: (value: TextPickerResult) => {
                  this.select = value.index as number;
                }
              })
            }
          })
        }

        Column() {
          TextInputComponent({
            inputImage: $r('app.media.doc_plaintext_and_pencil'),
            text: this.signature,
            hintText: $r('app.string.personal_signature')
          })
        }

        Column() {
          TextCommonComponent({
            textImage: $r('app.media.heart'),
            title: $r('app.string.Hobbies_multiple_choices'),
            content: this.hobbies,
            onItemClick: () => {
              this.hobbyItems = [];
              let context = this.getUIContext().getHostContext() as Context;
              if ((CommonUtils.isEmpty(context)) || (CommonUtils.isEmpty(context.resourceManager))) {
                return;
              }
              let manager = context.resourceManager;
              manager.getStringArrayValue($r('app.strarray.hobbies_data').id, (error, hobbyArray) => {
                if (!CommonUtils.isEmpty(error)) {
                  hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'error = ' + JSON.stringify(error));
                } else {
                  hobbyArray.forEach((hobbyItem: string) => {
                    let tmpHobbyItem = new HobbyItem();
                    tmpHobbyItem.label = hobbyItem;
                    tmpHobbyItem.isChecked = false;
                    this.hobbyItems.push(tmpHobbyItem);
                  });
                  this.contentNode =
                    new ComponentContent(this.ctx, wrapBuilder(buildHobbyItems), new Params(this.hobbyItems));
                  PromptActionClass.setContentNode(this.contentNode);
                  PromptActionClass.openDialog();
                  AppStorage.setOrCreate('isEdit', true);
                }
              });
            }
          })
        }
      }
      .padding(16)
    }
    .onBackPressed(() => {
      let inputIsEdit: boolean | undefined = AppStorage.get('inputIsEdit');
      if (!this.isSaved && (this.isEdit || inputIsEdit)) {
        this.getUIContext().showAlertDialog({
          message: $r('app.string.tips'),
          autoCancel: true,
          alignment: DialogAlignment.Center,
          offset: { dx: 0, dy: -20 },
          gridCount: 4,
          buttons: [
            {
              value: $r('app.string.cancel'),
              action: () => {
                hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'Callback when the first button is clicked');
              }
            },
            {
              value: $r('app.string.confirm'),
              action: () => {
                this.nikeName = '';
                this.sex = $r('app.string.male');
                this.birthDate = '';
                this.signature = '';
                this.hobbies = '';
                AppStorage.setOrCreate('isEdit', false);
                AppStorage.setOrCreate('inputIsEdit', false);
                this.pathStack.pop();
              }
            }
          ]
        })
        return true;
      }
      return false;
    })
    .title(this.NavDestinationTitle())
    .backgroundColor('#F1F3F5')
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }
}
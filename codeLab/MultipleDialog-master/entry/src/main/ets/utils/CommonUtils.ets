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

class HobbyItem {
  label?: string;
  isChecked?: boolean;
}

const uiContext: UIContext | undefined = AppStorage.get('uiContext');
const context = uiContext?.getHostContext();

export class CommonUtils {
  getBirthDateValue(year: number, month: number, day: number): string {
    let resourceYear = context?.resourceManager.getStringSync($r('app.string.year'));
    let resourceMonth = context?.resourceManager.getStringSync($r('app.string.month'));
    let resourceDay = context?.resourceManager.getStringSync($r('app.string.day'));
    let birthdate: string = `${year}${resourceYear}${month}` + `${resourceMonth}${day}${resourceDay}`;
    return birthdate;
  }

  isEmpty(obj: object | string): boolean {
    return obj === undefined || obj === null || obj === '';
  }

  isEmptyArr(array: Array<HobbyItem>): boolean {
    return array.length === 0;
  }
}

export default new CommonUtils();
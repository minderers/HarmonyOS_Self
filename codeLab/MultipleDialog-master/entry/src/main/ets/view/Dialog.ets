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

import { BusinessError } from '@kit.BasicServicesKit';
import { ComponentContent, promptAction, UIContext } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';

class PromptActionClass {
  private ctx: UIContext | undefined = undefined;
  private contentNode: ComponentContent<Object> | undefined = undefined;
  private options: promptAction.BaseDialogOptions | undefined = undefined;

  setContext(context: UIContext) {
    this.ctx = context;
  }

  setContentNode(node: ComponentContent<Object>) {
    this.contentNode = node;
  }

  setOptions(options: promptAction.BaseDialogOptions) {
    this.options = options;
  }

  openDialog() {
    if (this.contentNode !== null) {
      this.ctx?.getPromptAction().openCustomDialog(this.contentNode, this.options)
        .then(() => {
          hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'OpenCustomDialog complete');
        })
        .catch((error: BusinessError) => {
          let message = (error as BusinessError).message;
          let code = (error as BusinessError).code;
          hilog.error(0xFF00, 'PersonalInformation', '%{public}s',
            `OpenCustomDialog args error code is ${code}, message is ${message}`);
        })
    }
  }

  closeDialog() {
    if (this.contentNode !== null) {
      this.ctx?.getPromptAction().closeCustomDialog(this.contentNode)
        .then(() => {
          hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'CloseCustomDialog complete');
        })
        .catch((error: BusinessError) => {
          let message = (error as BusinessError).message;
          let code = (error as BusinessError).code;
          hilog.error(0xFF00, 'PersonalInformation', '%{public}s',
            `CloseCustomDialog args error code is ${code}, message is ${message}`);
        })
    }
  }

  updateDialog(options: Object) {
    if (this.contentNode !== null) {
      this.ctx?.getPromptAction().updateCustomDialog(this.contentNode, options)
        .then(() => {
          hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'UpdateCustomDialog complete');
        })
        .catch((error: BusinessError) => {
          let message = (error as BusinessError).message;
          let code = (error as BusinessError).code;
          hilog.error(0xFF00, 'PersonalInformation', '%{public}s',
            `UpdateCustomDialog args error code is ${code}, message is ${message}`);
        })
    }
  }
}

export default new PromptActionClass();
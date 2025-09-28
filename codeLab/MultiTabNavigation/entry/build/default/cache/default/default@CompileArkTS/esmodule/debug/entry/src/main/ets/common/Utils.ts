import { TabContentConstants } from "@bundle:com.example.multitabs/entry/ets/common/TabContentConstants";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
export class Utils {
    showPromptAction() {
        try {
            uiContext?.getPromptAction().showToast({
                message: { "id": 16777344, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                duration: TabContentConstants.TAB_DURATION
            });
        }
        catch (e) {
            let err = e as BusinessError;
            hilog.error(0x0000, 'TAG', `showToast args error code is ${err.code}, message is ${err.message}`);
        }
    }
}

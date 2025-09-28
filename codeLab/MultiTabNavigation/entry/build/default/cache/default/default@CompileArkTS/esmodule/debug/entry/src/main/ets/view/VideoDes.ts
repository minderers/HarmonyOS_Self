if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoDes_Params {
    name?: Resource;
    description?: Resource;
    hotspot?: Resource;
    time?: string;
}
import { TabContentConstants } from "@bundle:com.example.multitabs/entry/ets/common/TabContentConstants";
import hilog from "@ohos:hilog";
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
export class VideoDes extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__name = new ObservedPropertyObjectPU({ "id": 16777354, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, this, "name");
        this.__description = new ObservedPropertyObjectPU({ "id": 16777302, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, this, "description");
        this.__hotspot = new ObservedPropertyObjectPU({ "id": 16777311, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, this, "hotspot");
        this.__time = new ObservedPropertySimplePU(TabContentConstants.TAB_VIDEO_DES_TIME, this, "time");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoDes_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.description !== undefined) {
            this.description = params.description;
        }
        if (params.hotspot !== undefined) {
            this.hotspot = params.hotspot;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
    }
    updateStateVars(params: VideoDes_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__description.purgeDependencyOnElmtId(rmElmtId);
        this.__hotspot.purgeDependencyOnElmtId(rmElmtId);
        this.__time.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__description.aboutToBeDeleted();
        this.__hotspot.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __name: ObservedPropertyObjectPU<Resource>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: Resource) {
        this.__name.set(newValue);
    }
    private __description: ObservedPropertyObjectPU<Resource>;
    get description() {
        return this.__description.get();
    }
    set description(newValue: Resource) {
        this.__description.set(newValue);
    }
    private __hotspot: ObservedPropertyObjectPU<Resource>;
    get hotspot() {
        return this.__hotspot.get();
    }
    set hotspot(newValue: Resource) {
        this.__hotspot.set(newValue);
    }
    private __time: ObservedPropertySimplePU<string>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: string) {
        this.__time.set(newValue);
    }
    private showPromptAction() {
        try {
            uiContext?.getPromptAction().showToast({
                message: { "id": 16777344, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                duration: TabContentConstants.TAB_DURATION
            });
        }
        catch (error) {
            hilog.error(0x0000, 'testTag', `showToast failed, Code:${error.code}, message:${error.message}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.height({ "id": 16777286, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.name);
            Text.fontSize({ "id": 16777244, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.id(TabContentConstants.TAB_NAME_TEXT);
            Text.padding({ left: { "id": 16777245, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.description);
            Text.fontSize({ "id": 16777219, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.maxLines(TabContentConstants.TAB_MAX_LINE);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.id(TabContentConstants.TAB_DESCRIPTION_TEXT);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_NAME_TEXT, align: VerticalAlign.Bottom },
                left: { anchor: TabContentConstants.TAB_NAME_TEXT, align: HorizontalAlign.Start }
            });
            Text.margin({ top: { "id": 16777220, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
            Text.padding({ left: { "id": 16777221, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.time);
            Text.fontSize({ "id": 16777275, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor({ "id": 16777382, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.id(TabContentConstants.TAB_TIME_TEXT);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_DESCRIPTION_TEXT, align: VerticalAlign.Bottom },
                left: { anchor: TabContentConstants.TAB_DESCRIPTION_TEXT, align: HorizontalAlign.Start }
            });
            Text.padding({ left: { "id": 16777221, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.width({ "id": 16777335, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.height({ "id": 16777280, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.backgroundColor({ "id": 16777377, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.opacity(TabContentConstants.TAB_OPACITY);
            Text.padding({
                left: { "id": 16777283, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                right: { "id": 16777283, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }
            });
            Text.margin({ top: { "id": 16777228, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
            Text.id(TabContentConstants.TAB_GRAY_BACKGROUND);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_TIME_TEXT, align: VerticalAlign.Bottom },
                left: { anchor: TabContentConstants.TAB_TIME_TEXT, align: HorizontalAlign.Start }
            });
            Text.onClick(() => {
                this.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777466, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.height({ "id": 16777281, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.width({ "id": 16777281, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.id(TabContentConstants.TAB_HOT_IMAGE);
            Image.alignRules({
                top: { anchor: TabContentConstants.TAB_GRAY_BACKGROUND, align: VerticalAlign.Top },
                left: { anchor: TabContentConstants.TAB_GRAY_BACKGROUND, align: HorizontalAlign.Start }
            });
            Image.margin({
                top: { "id": 16777279, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                left: { "id": 16777221, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }
            });
            Image.onClick(() => {
                this.showPromptAction();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777345, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontSize({ "id": 16777284, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor({ "id": 16777384, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.id(TabContentConstants.TAB_HOT_TEXT);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_HOT_IMAGE, align: VerticalAlign.Top },
                left: { anchor: TabContentConstants.TAB_HOT_IMAGE, align: HorizontalAlign.End }
            });
            Text.onClick(() => {
                this.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.hotspot);
            Text.fontSize({ "id": 16777242, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.id(TabContentConstants.TAB_HOT_SPOT);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_HOT_TEXT, align: VerticalAlign.Top },
                bottom: { anchor: TabContentConstants.TAB_HOT_TEXT, align: VerticalAlign.Bottom },
                left: { anchor: TabContentConstants.TAB_HOT_TEXT, align: HorizontalAlign.End }
            });
            Text.onClick(() => {
                this.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777447, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.height({ "id": 16777281, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.width({ "id": 16777281, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.id(TabContentConstants.TAB_PEOPLE_NUM_ARROW);
            Image.alignRules({
                top: { anchor: TabContentConstants.TAB_HOT_TEXT, align: VerticalAlign.Top },
                bottom: { anchor: TabContentConstants.TAB_HOT_TEXT, align: VerticalAlign.Bottom },
                right: { anchor: TabContentConstants.TAB_CONTAINER, align: HorizontalAlign.End }
            });
            Image.margin({ right: { "id": 16777218, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
            Image.onClick(() => {
                this.showPromptAction();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777339, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontSize({ "id": 16777242, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.id(TabContentConstants.TAB_PEOPLE_NUM);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_PEOPLE_NUM_ARROW, align: VerticalAlign.Top },
                bottom: { anchor: TabContentConstants.TAB_PEOPLE_NUM_ARROW, align: VerticalAlign.Bottom },
                right: { anchor: TabContentConstants.TAB_PEOPLE_NUM_ARROW, align: HorizontalAlign.Start }
            });
            Text.onClick(() => {
                this.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.color(Color.White);
            Divider.strokeWidth(TabContentConstants.TAB_ONE);
            Divider.height({ "id": 16777284, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Divider.id(TabContentConstants.TAB_DIVIDER);
            Divider.alignRules({
                top: { anchor: TabContentConstants.TAB_PEOPLE_NUM_ARROW, align: VerticalAlign.Top },
                bottom: { anchor: TabContentConstants.TAB_PEOPLE_NUM_ARROW, align: VerticalAlign.Bottom },
                right: { anchor: TabContentConstants.TAB_PEOPLE_NUM, align: HorizontalAlign.Start }
            });
            Divider.margin({ right: { "id": 16777222, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
            Divider.onClick(() => {
                this.showPromptAction();
            });
        }, Divider);
        RelativeContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

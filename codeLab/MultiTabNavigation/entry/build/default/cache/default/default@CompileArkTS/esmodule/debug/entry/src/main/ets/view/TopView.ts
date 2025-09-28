if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TopView_Params {
    utils?;
}
import { TabContentConstants } from "@bundle:com.example.multitabs/entry/ets/common/TabContentConstants";
import { Utils } from "@bundle:com.example.multitabs/entry/ets/common/Utils";
export class TopView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.utils = new Utils();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TopView_Params) {
        if (params.utils !== undefined) {
            this.utils = params.utils;
        }
    }
    updateStateVars(params: TopView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private utils;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.height({ "id": 16777278, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777464, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.width({ "id": 16777259, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.height({ "id": 16777258, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.id(TabContentConstants.TAB_SEARCH_IMAGE);
            Image.alignRules({
                top: { anchor: TabContentConstants.TAB_CONTAINER, align: VerticalAlign.Top },
                left: { anchor: TabContentConstants.TAB_CONTAINER, align: HorizontalAlign.Start }
            });
            Image.margin({
                top: { "id": 16777260, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                left: { "id": 16777260, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }
            });
            Image.onClick(() => {
                this.utils.showPromptAction();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777333, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor({ "id": 16777376, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontSize({ "id": 16777264, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.width({ "id": 16777334, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.id(TabContentConstants.TAB_FOLLOW_TEXT);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_SEARCH_IMAGE, align: VerticalAlign.Top },
                left: { anchor: TabContentConstants.TAB_SEARCH_IMAGE, align: HorizontalAlign.End }
            });
            Text.textAlign(TextAlign.Center);
            Text.margin({ left: { "id": 16777260, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
            Text.onClick(() => {
                this.utils.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777342, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.fontSize({ "id": 16777264, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.width({ "id": 16777334, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.id(TabContentConstants.TAB_SELECTED_TEXT);
            Text.textAlign(TextAlign.Center);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_FOLLOW_TEXT, align: VerticalAlign.Top },
                left: { anchor: TabContentConstants.TAB_FOLLOW_TEXT, align: HorizontalAlign.End }
            });
            Text.onClick(() => {
                this.utils.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777340, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor({ "id": 16777376, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontSize({ "id": 16777264, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.width({ "id": 16777334, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.id(TabContentConstants.TAB_RECOMMENDATION_TEXT);
            Text.textAlign(TextAlign.Center);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_SELECTED_TEXT, align: VerticalAlign.Top },
                left: { anchor: TabContentConstants.TAB_SELECTED_TEXT, align: HorizontalAlign.End }
            });
            Text.onClick(() => {
                this.utils.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777341, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor({ "id": 16777376, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontSize({ "id": 16777264, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.width({ "id": 16777334, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.id(TabContentConstants.TAB_SCREENING_HALL_TEXT);
            Text.textAlign(TextAlign.Center);
            Text.alignRules({
                top: { anchor: TabContentConstants.TAB_RECOMMENDATION_TEXT, align: VerticalAlign.Top },
                left: { anchor: TabContentConstants.TAB_RECOMMENDATION_TEXT, align: HorizontalAlign.End }
            });
            Text.margin({ right: { "id": 16777260, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
            Text.onClick(() => {
                this.utils.showPromptAction();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.width({ "id": 16777263, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Divider.strokeWidth(TabContentConstants.TAB_TWO);
            Divider.color(Color.White);
            Divider.margin({ top: { "id": 16777223, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
            Divider.id(TabContentConstants.TAB_TOP_VIEW_DIVIDER);
            Divider.alignRules({
                top: { anchor: TabContentConstants.TAB_SELECTED_TEXT, align: VerticalAlign.Bottom },
                left: { anchor: TabContentConstants.TAB_SELECTED_TEXT, align: HorizontalAlign.Center }
            });
            Divider.margin({
                top: { "id": 16777277, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                left: { "id": 16777276, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }
            });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777446, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.width({ "id": 16777259, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.height({ "id": 16777258, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.id(TabContentConstants.TAB_ADD_IMAGE);
            Image.alignRules({
                top: { anchor: TabContentConstants.TAB_CONTAINER, align: VerticalAlign.Top },
                right: { anchor: TabContentConstants.TAB_CONTAINER, align: HorizontalAlign.End }
            });
            Image.margin({
                top: { "id": 16777260, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                right: { "id": 16777260, "type": 10007, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }
            });
            Image.onClick(() => {
                this.utils.showPromptAction();
            });
        }, Image);
        RelativeContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BackgroundLightTab_Params {
    tabArray?: Array<TabItem>;
    focusIndex?: number;
    index?: number;
    controller?: TabsController;
    listScroller?: Scroller;
    barHeight?: number;
}
import hilog from "@ohos:hilog";
import { initTabData } from "@bundle:com.example.multitabs/entry/ets/viewmodel/TabViewModel";
import type { TabItem } from '../viewmodel/TabItem';
import { Constants } from "@bundle:com.example.multitabs/entry/ets/common/Constants";
class BackgroundLightTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabArray = new ObservedPropertyObjectPU(initTabData(), this, "tabArray");
        this.__focusIndex = new ObservedPropertySimplePU(0, this, "focusIndex");
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.controller = new TabsController();
        this.listScroller = new Scroller();
        this.barHeight = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BackgroundLightTab_Params) {
        if (params.tabArray !== undefined) {
            this.tabArray = params.tabArray;
        }
        if (params.focusIndex !== undefined) {
            this.focusIndex = params.focusIndex;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.listScroller !== undefined) {
            this.listScroller = params.listScroller;
        }
        if (params.barHeight !== undefined) {
            this.barHeight = params.barHeight;
        }
    }
    updateStateVars(params: BackgroundLightTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabArray.purgeDependencyOnElmtId(rmElmtId);
        this.__focusIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabArray.aboutToBeDeleted();
        this.__focusIndex.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tabArray: ObservedPropertyObjectPU<Array<TabItem>>;
    get tabArray() {
        return this.__tabArray.get();
    }
    set tabArray(newValue: Array<TabItem>) {
        this.__tabArray.set(newValue);
    }
    private __focusIndex: ObservedPropertySimplePU<number>;
    get focusIndex() {
        return this.__focusIndex.get();
    }
    set focusIndex(newValue: number) {
        this.__focusIndex.set(newValue);
    }
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private controller: TabsController;
    private listScroller: Scroller;
    private barHeight: number;
    tabBuilder(tabName: string | Resource, tabIndex: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.width(96);
            Row.backgroundColor(tabIndex === this.focusIndex ? '#0A59F7' : '#0D000000');
            Row.borderRadius(21);
            Row.height(40);
            Row.margin({ left: 8, right: 8 });
            Row.onClick(() => {
                this.controller.changeIndex(tabIndex);
                this.listScroller.scrollToIndex(tabIndex, true, ScrollAlign.CENTER);
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(tabName);
            Text.fontSize(14);
            Text.fontColor(tabIndex === this.focusIndex ? Color.White : '#E6000000');
            Text.id(tabIndex.toString());
        }, Text);
        Text.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.height(52);
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start BackgroundLightTab_list]
            List.create({ scroller: this.listScroller });
            // [Start BackgroundLightTab_list]
            List.width('100%');
            // [Start BackgroundLightTab_list]
            List.height('100%');
            // [Start BackgroundLightTab_list]
            List.listDirection(Axis.Horizontal);
            // [Start BackgroundLightTab_list]
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.tabBuilder.bind(this)(item.name, index);
            };
            this.forEachUpdateFunction(elmtId, this.tabArray.slice(0, 6), forEachItemGenFunction, (item: TabItem, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        ForEach.pop();
        // [Start BackgroundLightTab_list]
        List.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start Underline_tab_tabs_part]
            Tabs.create({ barPosition: BarPosition.Start, controller: this.controller });
            // [Start Underline_tab_tabs_part]
            Tabs.width('100%');
            // [Start Underline_tab_tabs_part]
            Tabs.barHeight(this.barHeight);
            // [Start Underline_tab_tabs_part]
            Tabs.animationDuration(Constants.ANIMATION_DURATION);
            // [Start Underline_tab_tabs_part]
            Tabs.onAnimationStart((index: number, targetIndex: number) => {
                hilog.info(0x0000, 'index', index.toString());
                this.focusIndex = targetIndex;
                this.listScroller.scrollToIndex(targetIndex, true, ScrollAlign.CENTER);
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.Center);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.height(300);
                            Text.fontSize(30);
                        }, Text);
                        Text.pop();
                        Row.pop();
                    });
                    TabContent.backgroundColor(Color.White);
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabArray.slice(0, 6), forEachItemGenFunction, (item: TabItem, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        // [Start Underline_tab_tabs_part]
        Tabs.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "BackgroundLightTab";
    }
}
registerNamedRoute(() => new BackgroundLightTab(undefined, {}), "", { bundleName: "com.example.multitabs", moduleName: "entry", pagePath: "pages/BackgroundLightTab", pageFullPath: "entry/src/main/ets/pages/BackgroundLightTab", integratedHsp: "false", moduleType: "followWithHap" });

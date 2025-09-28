if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UnderlineTab_Params {
    tabArray?: Array<TabItem>;
    currentIndex?: number;
}
import hilog from "@ohos:hilog";
import { initTabData } from "@bundle:com.example.multitabs/entry/ets/viewmodel/TabViewModel";
import type { TabItem } from '../viewmodel/TabItem';
import { Constants } from "@bundle:com.example.multitabs/entry/ets/common/Constants";
class UnderlineTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabArray = new ObservedPropertyObjectPU(initTabData(), this, "tabArray");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UnderlineTab_Params) {
        if (params.tabArray !== undefined) {
            this.tabArray = params.tabArray;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    updateStateVars(params: UnderlineTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabArray.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabArray.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
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
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    // [Start Underline_tab_tabBuilder]
    tabBuilder(index: number, name: string | Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(name);
            Text.fontColor(this.currentIndex === index ? '#0A59F7' : '#E6000000');
            Text.fontSize(16);
            Text.fontWeight(this.currentIndex === index ? FontWeight.Normal : FontWeight.Medium);
            Text.lineHeight(22);
            Text.margin({ top: 17, bottom: 7 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.width(48);
            Divider.strokeWidth(Constants.STROKE_WIDTH);
            Divider.color('#0A59F7');
            Divider.opacity(this.currentIndex === index ? 1 : 0);
        }, Divider);
        Column.pop();
    }
    // [End Underline_tab_tabBuilder]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start Underline_tab_tabs]
            Tabs.create({ barPosition: BarPosition.Start });
            // [Start Underline_tab_tabs]
            Tabs.vertical(false);
            // [Start Underline_tab_tabs]
            Tabs.barMode(BarMode.Fixed);
            // [Start Underline_tab_tabs]
            Tabs.barWidth('100%');
            // [Start Underline_tab_tabs]
            Tabs.barHeight(52);
            // [Start Underline_tab_tabs]
            Tabs.animationDuration(Constants.ANIMATION_DURATION);
            // [Start Underline_tab_tabs]
            Tabs.onAnimationStart((index: number, targetIndex: number) => {
                hilog.info(0x0000, 'index', index.toString());
                this.currentIndex = targetIndex;
            });
            // [Start Underline_tab_tabs]
            Tabs.width('100%');
            // [Start Underline_tab_tabs]
            Tabs.height('100%');
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
                            Row.height('100%');
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.height(300);
                            Text.fontSize(30);
                        }, Text);
                        Text.pop();
                        Row.pop();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.tabBuilder.call(this, item.id, item.name);
                        } });
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabArray.slice(0, 4), forEachItemGenFunction, (item: TabItem, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        // [Start Underline_tab_tabs]
        Tabs.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "UnderlineTab";
    }
}
registerNamedRoute(() => new UnderlineTab(undefined, {}), "", { bundleName: "com.example.multitabs", moduleName: "entry", pagePath: "pages/UnderlineTab", pageFullPath: "entry/src/main/ets/pages/UnderlineTab", integratedHsp: "false", moduleType: "followWithHap" });

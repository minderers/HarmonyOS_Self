if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BottomTab_Params {
    currentIndex?: number;
    msgNum?: number;
    tabsController?: TabsController;
}
import hilog from "@ohos:hilog";
import { Constants } from "@bundle:com.example.multitabs/entry/ets/common/Constants";
class BottomTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.msgNum = 9999;
        this.tabsController = new TabsController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BottomTab_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.msgNum !== undefined) {
            this.msgNum = params.msgNum;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
    }
    updateStateVars(params: BottomTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private msgNum: number;
    private tabsController: TabsController;
    // [Start tab_builder]
    tabBuilder(title: Resource, index: number, selectedImg: Resource, normalImg: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.height(52);
            Column.width('100%');
            Column.onClick(() => {
                this.currentIndex = index;
                this.tabsController.changeIndex(this.currentIndex);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (index === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Badge.create({
                            count: this.msgNum,
                            style: { badgeSize: 14 },
                            maxCount: 999,
                            position: BadgePosition.RightTop
                        });
                        Badge.width(30);
                    }, Badge);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.currentIndex === index ? selectedImg : normalImg);
                        Image.width(24);
                        Image.height(24);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    Badge.pop();
                });
            }
            else if (index === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.currentIndex === index ? selectedImg : normalImg);
                        Image.width(24);
                        Image.height(24);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Badge.create({
                            value: '',
                            style: { badgeSize: 6 },
                            position: BadgePosition.RightTop
                        });
                        Badge.width(30);
                    }, Badge);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.currentIndex === index ? selectedImg : normalImg);
                        Image.width(24);
                        Image.height(24);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    Badge.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.margin({ top: 4 });
            Text.fontSize(10);
            Text.fontColor(this.currentIndex === index ? '#3388ff' : '#E6000000');
        }, Text);
        Text.pop();
        Column.pop();
    }
    // [End tab_builder]
    // [Start tab_content_builder]
    tabContentBuilder(text: Resource, index: number, selectedImg: Resource, normalImg: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(text);
                    Text.height(300);
                    Text.fontSize(30);
                }, Text);
                Text.pop();
                Row.pop();
            });
            TabContent.padding({ left: 12, right: 12 });
            TabContent.backgroundColor(Color.White);
            TabContent.tabBar({ builder: () => {
                    this.tabBuilder.call(this, text, index, selectedImg, normalImg);
                } });
        }, TabContent);
        TabContent.pop();
    }
    // [End tab_content_builder]
    // [Start Tabs]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({
                barPosition: BarPosition.End,
                controller: this.tabsController
            });
            Tabs.width('100%');
            Tabs.backgroundColor('#F3F4F5');
            Tabs.barHeight(52);
            Tabs.barMode(BarMode.Fixed);
            Tabs.onAnimationStart((index: number, targetIndex: number) => {
                hilog.info(0x0000, 'index', index.toString());
                this.currentIndex = targetIndex;
            });
        }, Tabs);
        this.tabContentBuilder.bind(this)({ "id": 16777320, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, Constants.TAB_INDEX_ZERO, { "id": 16777428, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777441, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
        this.tabContentBuilder.bind(this)({ "id": 16777325, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, Constants.TAB_INDEX_ONE, { "id": 16777429, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777443, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
        this.tabContentBuilder.bind(this)({ "id": 16777291, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, Constants.TAB_INDEX_TWO, { "id": 16777431, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777444, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "BottomTab";
    }
}
registerNamedRoute(() => new BottomTab(undefined, {}), "", { bundleName: "com.example.multitabs", moduleName: "entry", pagePath: "pages/BottomTab", pageFullPath: "entry/src/main/ets/pages/BottomTab", integratedHsp: "false", moduleType: "followWithHap" });

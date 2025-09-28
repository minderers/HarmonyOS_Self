if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RudderStyleTab_Params {
    tabArray?: Array<BottomTabModel>;
    currentIndex?: number;
    iconOffset?: number;
    initNumber?: number;
    controller?: TabsController;
}
import { initTabTuData } from "@bundle:com.example.multitabs/entry/ets/viewmodel/TabViewModel";
import type { BottomTabModel } from '../viewmodel/TabItem';
import { Constants } from "@bundle:com.example.multitabs/entry/ets/common/Constants";
class RudderStyleTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabArray = new ObservedPropertyObjectPU(initTabTuData(), this, "tabArray");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__iconOffset = new ObservedPropertySimplePU(0, this, "iconOffset");
        this.__initNumber = new ObservedPropertySimplePU(0, this, "initNumber");
        this.controller = new TabsController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RudderStyleTab_Params) {
        if (params.tabArray !== undefined) {
            this.tabArray = params.tabArray;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.iconOffset !== undefined) {
            this.iconOffset = params.iconOffset;
        }
        if (params.initNumber !== undefined) {
            this.initNumber = params.initNumber;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: RudderStyleTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabArray.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__iconOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__initNumber.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabArray.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__iconOffset.aboutToBeDeleted();
        this.__initNumber.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tabArray: ObservedPropertyObjectPU<Array<BottomTabModel>>;
    get tabArray() {
        return this.__tabArray.get();
    }
    set tabArray(newValue: Array<BottomTabModel>) {
        this.__tabArray.set(newValue);
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __iconOffset: ObservedPropertySimplePU<number>;
    get iconOffset() {
        return this.__iconOffset.get();
    }
    set iconOffset(newValue: number) {
        this.__iconOffset.set(newValue);
    }
    private __initNumber: ObservedPropertySimplePU<number>;
    get initNumber() {
        return this.__initNumber.get();
    }
    set initNumber(newValue: number) {
        this.__initNumber.set(newValue);
    }
    private controller: TabsController;
    // [Start Builder_tab]
    Tab(selectImage: Resource, defaultImage: Resource, title: string | Resource, middleMode: boolean, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ top: 11 });
            Column.width('100%');
            Column.backgroundColor('#F3F4F5');
            Column.height(90);
            Column.translate({ y: 40 });
            Column.onClick(() => {
                if (index !== Constants.TAB_INDEX_TWO) {
                    this.currentIndex = index;
                    this.controller.changeIndex(index);
                    this.iconOffset = Constants.ICON_Offset;
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (index === Constants.TAB_INDEX_TWO) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(defaultImage);
                        Image.size({ width: 56, height: 56 });
                        Image.offset({ y: -15 });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.currentIndex === index ? selectImage : defaultImage);
                        Context.animation({
                            duration: Constants.ANIMATION_DURATION,
                            curve: Curve.Ease,
                            playMode: PlayMode.Normal
                        });
                        Image.size({ width: 22, height: 22 });
                        Image.offset({
                            y: (this.currentIndex === index && this.currentIndex !== Constants.TAB_INDEX_TWO)
                                ? this.iconOffset : this.initNumber
                        });
                        Image.objectFit(ImageFit.Contain);
                        Context.animation(null);
                    }, Image);
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!middleMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(title);
                        Text.fontSize(10);
                        Text.margin({ top: 6 });
                        Text.fontColor(this.currentIndex === index ? '#3388ff' : '#E6000000');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    // [End Builder_tab]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomStart });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start Rudder_style_tab_tabs]
            Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
            // [Start Rudder_style_tab_tabs]
            Tabs.scrollable(false);
            // [Start Rudder_style_tab_tabs]
            Tabs.barHeight(this.initNumber);
            // [Start Rudder_style_tab_tabs]
            Tabs.animationDuration(Constants.ANIMATION_DURATION);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index === Constants.TAB_INDEX_TWO) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TabContent.create();
                                TabContent.backgroundColor(Color.White);
                            }, TabContent);
                            TabContent.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TabContent.create(() => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.height(300);
                                        Row.width('100%');
                                        Row.justifyContent(FlexAlign.Center);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.title);
                                        Text.fontSize(30);
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                });
                                TabContent.backgroundColor(Color.White);
                            }, TabContent);
                            TabContent.pop();
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabArray, forEachItemGenFunction, (item: BottomTabModel, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        ForEach.pop();
        // [Start Rudder_style_tab_tabs]
        Tabs.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start Rudder_style_tab_flex]
            Flex.create();
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.Tab.bind(this)(item.selectImage, item.defaultImage, item.title, item.middleMode, index);
            };
            this.forEachUpdateFunction(elmtId, this.tabArray, forEachItemGenFunction, (item: BottomTabModel, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        ForEach.pop();
        // [Start Rudder_style_tab_flex]
        Flex.pop();
        Stack.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RudderStyleTab";
    }
}
registerNamedRoute(() => new RudderStyleTab(undefined, {}), "", { bundleName: "com.example.multitabs", moduleName: "entry", pagePath: "pages/RudderStyleTab", pageFullPath: "entry/src/main/ets/pages/RudderStyleTab", integratedHsp: "false", moduleType: "followWithHap" });

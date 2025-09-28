if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DiscoverPage_Params {
    tabArray?: Array<TabItem>;
    focusIndex?: number;
    controller?: TabsController;
    listScroller?: Scroller;
    subController?: TabsController;
    panOptionRight?: PanGestureOptions;
    barHeight?: number;
}
import { Constants } from "@bundle:com.example.multitabs/entry/ets/common/Constants";
import { initTabData } from "@bundle:com.example.multitabs/entry/ets/viewmodel/TabViewModel";
import type { TabItem } from '../viewmodel/TabItem';
export class DiscoverPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabArray = new ObservedPropertyObjectPU(initTabData(), this, "tabArray");
        this.__focusIndex = new ObservedPropertySimplePU(0, this, "focusIndex");
        this.controller = new TabsController();
        this.listScroller = new Scroller();
        this.subController = new TabsController();
        this.panOptionRight = new PanGestureOptions({ direction: PanDirection.Left });
        this.barHeight = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DiscoverPage_Params) {
        if (params.tabArray !== undefined) {
            this.tabArray = params.tabArray;
        }
        if (params.focusIndex !== undefined) {
            this.focusIndex = params.focusIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.listScroller !== undefined) {
            this.listScroller = params.listScroller;
        }
        if (params.subController !== undefined) {
            this.subController = params.subController;
        }
        if (params.panOptionRight !== undefined) {
            this.panOptionRight = params.panOptionRight;
        }
        if (params.barHeight !== undefined) {
            this.barHeight = params.barHeight;
        }
    }
    updateStateVars(params: DiscoverPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabArray.purgeDependencyOnElmtId(rmElmtId);
        this.__focusIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabArray.aboutToBeDeleted();
        this.__focusIndex.aboutToBeDeleted();
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
    private controller: TabsController;
    private listScroller: Scroller;
    private subController: TabsController;
    private panOptionRight: PanGestureOptions;
    private barHeight: number;
    subTabBuilder(tabName: string | Resource, tabIndex: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.padding({ left: Constants.TAB_PADDING, right: Constants.TAB_PADDING });
            Row.height(Constants.SUB_TAB_HEIGHT);
            Row.onClick(() => {
                this.subController.changeIndex(tabIndex);
                this.focusIndex = tabIndex;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(tabName);
            Text.fontSize({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.fontColor(tabIndex === this.focusIndex ? { "id": 16777360, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } : { "id": 16777386, "type": 10001, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.id(tabIndex.toString());
        }, Text);
        Text.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width(Constants.FULL_WIDTH);
            Column.padding({ left: { "id": 16777412, "type": 10002, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(Constants.SUB_TAB_BOT_HEIGHT);
            Row.width(Constants.FULL_WIDTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ initialIndex: Constants.TAB_INDEX_ZERO, scroller: this.listScroller });
            List.listDirection(Axis.Horizontal);
            List.height(Constants.SUB_TAB_HEIGHT);
            List.scrollBar(BarState.Off);
            List.width(Constants.SUB_LIST_WIDTH);
            List.friction({ "id": 16777393, "type": 10002, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.subTabBuilder.bind(this)(item.name, index);
            };
            this.forEachUpdateFunction(elmtId, this.tabArray, forEachItemGenFunction, (item: TabItem, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777442, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.width(Constants.MORE_IMAGE_WIDTH);
            Image.height(Constants.MORE_IMAGE_HEIGHT);
            Image.margin({ left: { "id": 16777405, "type": 10002, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } });
        }, Image);
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.Start, controller: this.subController });
            Tabs.barHeight(this.barHeight);
            Tabs.animationDuration(Constants.ANIMATION_DURATION);
            Tabs.onAnimationStart((_index: number, targetIndex: number) => {
                this.focusIndex = targetIndex;
                this.listScroller.scrollToIndex(targetIndex, true, ScrollAlign.CENTER);
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.id === this.tabArray.length - 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TabContent.create(() => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width(Constants.FULL_WIDTH);
                                        Row.justifyContent(FlexAlign.Center);
                                        Gesture.create(GesturePriority.Low);
                                        PanGesture.create(this.panOptionRight);
                                        PanGesture.onActionEnd(() => {
                                            this.controller.changeIndex(1);
                                        });
                                        PanGesture.pop();
                                        Gesture.pop();
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.name);
                                        Text.height(Constants.CONTENT_HEIGHT);
                                        Text.fontSize({ "id": 16777388, "type": 10002, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                });
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
                                        Row.width(Constants.FULL_WIDTH);
                                        Row.justifyContent(FlexAlign.Center);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.name);
                                        Text.height(Constants.CONTENT_HEIGHT);
                                        Text.fontSize({ "id": 16777388, "type": 10002, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
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
            this.forEachUpdateFunction(elmtId, this.tabArray, forEachItemGenFunction, (item: TabItem, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        Tabs.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

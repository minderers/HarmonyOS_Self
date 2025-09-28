if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SlideAndMoreTab_Params {
    tabArray?: Array<TabItem>;
    focusIndex?: number;
    pre?: number;
    index?: number;
    test?: boolean;
    indicatorLeftMargin?: number;
    indicatorWidth?: number;
    controller?: TabsController;
    listScroller?: Scroller;
    tabsWidth?: number;
    tabWidth?: number;
    iteration?: number;
    swipeRatio?: number;
}
import type componentUtils from "@ohos:arkui.componentUtils";
import hilog from "@ohos:hilog";
import { initTabData } from "@bundle:com.example.multitabs/entry/ets/viewmodel/TabViewModel";
import type { TabItem } from '../viewmodel/TabItem';
import { Constants } from "@bundle:com.example.multitabs/entry/ets/common/Constants";
class SlideAndMoreTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabArray = new ObservedPropertyObjectPU(initTabData(), this, "tabArray");
        this.__focusIndex = new ObservedPropertySimplePU(0, this, "focusIndex");
        this.__pre = new ObservedPropertySimplePU(0, this, "pre");
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.__test = new ObservedPropertySimplePU(false, this, "test");
        this.__indicatorLeftMargin = new ObservedPropertySimplePU(0, this, "indicatorLeftMargin");
        this.__indicatorWidth = new ObservedPropertySimplePU(0, this, "indicatorWidth");
        this.controller = new TabsController();
        this.listScroller = new Scroller();
        this.tabsWidth = 0;
        this.tabWidth = 0;
        this.iteration = 1;
        this.swipeRatio = 0.5;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SlideAndMoreTab_Params) {
        if (params.tabArray !== undefined) {
            this.tabArray = params.tabArray;
        }
        if (params.focusIndex !== undefined) {
            this.focusIndex = params.focusIndex;
        }
        if (params.pre !== undefined) {
            this.pre = params.pre;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.test !== undefined) {
            this.test = params.test;
        }
        if (params.indicatorLeftMargin !== undefined) {
            this.indicatorLeftMargin = params.indicatorLeftMargin;
        }
        if (params.indicatorWidth !== undefined) {
            this.indicatorWidth = params.indicatorWidth;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.listScroller !== undefined) {
            this.listScroller = params.listScroller;
        }
        if (params.tabsWidth !== undefined) {
            this.tabsWidth = params.tabsWidth;
        }
        if (params.tabWidth !== undefined) {
            this.tabWidth = params.tabWidth;
        }
        if (params.iteration !== undefined) {
            this.iteration = params.iteration;
        }
        if (params.swipeRatio !== undefined) {
            this.swipeRatio = params.swipeRatio;
        }
    }
    updateStateVars(params: SlideAndMoreTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabArray.purgeDependencyOnElmtId(rmElmtId);
        this.__focusIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__pre.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__test.purgeDependencyOnElmtId(rmElmtId);
        this.__indicatorLeftMargin.purgeDependencyOnElmtId(rmElmtId);
        this.__indicatorWidth.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabArray.aboutToBeDeleted();
        this.__focusIndex.aboutToBeDeleted();
        this.__pre.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__test.aboutToBeDeleted();
        this.__indicatorLeftMargin.aboutToBeDeleted();
        this.__indicatorWidth.aboutToBeDeleted();
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
    private __pre: ObservedPropertySimplePU<number>;
    get pre() {
        return this.__pre.get();
    }
    set pre(newValue: number) {
        this.__pre.set(newValue);
    }
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __test: ObservedPropertySimplePU<boolean>;
    get test() {
        return this.__test.get();
    }
    set test(newValue: boolean) {
        this.__test.set(newValue);
    }
    private __indicatorLeftMargin: ObservedPropertySimplePU<number>;
    get indicatorLeftMargin() {
        return this.__indicatorLeftMargin.get();
    }
    set indicatorLeftMargin(newValue: number) {
        this.__indicatorLeftMargin.set(newValue);
    }
    private __indicatorWidth: ObservedPropertySimplePU<number>;
    get indicatorWidth() {
        return this.__indicatorWidth.get();
    }
    set indicatorWidth(newValue: number) {
        this.__indicatorWidth.set(newValue);
    }
    private controller: TabsController;
    private listScroller: Scroller;
    private tabsWidth: number;
    private tabWidth: number;
    private iteration: number;
    private swipeRatio: number;
    Tab(tabName: string | Resource, tabIndex: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 12, right: 12 });
            Row.justifyContent(FlexAlign.Center);
            Row.height(30);
            Row.onClick(() => {
                this.controller.changeIndex(tabIndex);
                this.focusIndex = tabIndex;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(tabName);
            Text.fontSize(16);
            Text.fontColor(tabIndex === this.focusIndex ? '#0A59F7' : '#E6000000');
            Text.id(tabIndex.toString());
            Text.onAreaChange((_oldValue: Area, newValue: Area) => {
                if (this.focusIndex === tabIndex &&
                    (this.indicatorLeftMargin === 0 || this.indicatorWidth === 0)) {
                    if (newValue.position.x !== undefined) {
                        let positionX = Number.parseFloat(newValue.position.x.toString());
                        this.indicatorLeftMargin = Number.isNaN(positionX) ? 0 : positionX;
                    }
                    let width = Number.parseFloat(newValue.width.toString());
                    this.tabWidth = Number.isNaN(width) ? 0 : width;
                    this.indicatorWidth = this.tabWidth;
                }
            });
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
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start Slide_and_moreTab_row_part]
            Row.create();
            // [Start Slide_and_moreTab_row_part]
            Row.height(52);
            // [Start Slide_and_moreTab_row_part]
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ initialIndex: 0, scroller: this.listScroller });
            List.listDirection(Axis.Horizontal);
            List.height(30);
            List.scrollBar(BarState.Off);
            List.width('85%');
            List.friction(0.6);
            List.onWillScroll((xOffset: number) => {
                this.indicatorLeftMargin -= xOffset;
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.Tab.bind(this)(item.name, index);
            };
            this.forEachUpdateFunction(elmtId, this.tabArray, forEachItemGenFunction, (item: TabItem, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777442, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.width(20);
            Image.height(15);
            Image.margin({ left: 16 });
        }, Image);
        // [Start Slide_and_moreTab_row_part]
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(2);
            Column.width(this.indicatorWidth);
            Column.margin({ left: this.indicatorLeftMargin, top: 40 });
            Column.backgroundColor('#0A59F7');
        }, Column);
        Column.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.Start, controller: this.controller });
            Tabs.onAreaChange((_oldValue: Area, newValue: Area) => {
                let width = Number.parseFloat(newValue.width.toString());
                this.tabsWidth = Number.isNaN(width) ? 0 : width;
            });
            Tabs.width('100%');
            Tabs.barHeight(0);
            Tabs.animationDuration(Constants.ANIMATION_DURATION);
            Tabs.onAnimationStart((index: number, targetIndex: number) => {
                hilog.info(0x0000, 'index', index.toString());
                this.focusIndex = targetIndex;
                let targetIndexInfo = this.getTextInfo(targetIndex);
                this.startAnimateTo(Constants.ANIMATION_DURATION, targetIndexInfo.left, targetIndexInfo.width);
                this.listScroller.scrollToIndex(targetIndex, true, ScrollAlign.CENTER);
            });
            Tabs.onAnimationEnd((index: number, event: TabsAnimationEvent) => {
                let currentIndicatorInfo = this.getCurrentIndicatorInfo(index, event);
                this.startAnimateTo(0, currentIndicatorInfo.left, currentIndicatorInfo.width);
            });
            Tabs.onGestureSwipe((index: number, event: TabsAnimationEvent) => {
                let currentIndicatorInfo = this.getCurrentIndicatorInfo(index, event);
                this.focusIndex = currentIndicatorInfo.index;
                this.indicatorLeftMargin = currentIndicatorInfo.left;
                this.tabWidth = currentIndicatorInfo.width;
                this.indicatorWidth = currentIndicatorInfo.width;
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
            this.forEachUpdateFunction(elmtId, this.tabArray, forEachItemGenFunction, (item: TabItem, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        Tabs.pop();
        Column.pop();
    }
    // Gets component size, position, translation, scaling rotation, and affine matrix attribute information.
    private getTextInfo(index: number): Record<string, number> {
        let modePosition: componentUtils.ComponentInfo | null = null;
        try {
            modePosition = this.getUIContext().getComponentUtils().getRectangleById(index.toString());
        }
        catch (error) {
            hilog.error(0x0000, 'testTag', `getRectangleById failed, Code:${error.code}, message:${error.message}`);
        }
        return { 'left': this.getUIContext().px2vp(modePosition?.windowOffset.x), 'width': this.getUIContext().px2vp(modePosition?.size.width) };
    }
    private getCurrentIndicatorInfo(index: number, event: TabsAnimationEvent): Record<string, number> {
        let nextIndex = index;
        if (index > Constants.TAB_INDEX_ZERO && event.currentOffset > Constants.TAB_INDEX_ZERO) {
            nextIndex--;
        }
        else if (index < this.tabArray.length - Constants.TAB_INDEX_ONE && event.currentOffset < Constants.TAB_INDEX_ZERO) {
            nextIndex++;
        }
        let indexInfo = this.getTextInfo(index);
        let nextIndexInfo = this.getTextInfo(nextIndex);
        let swipeRatio = Math.abs(event.currentOffset / this.tabsWidth);
        let currentIndex = swipeRatio > this.swipeRatio ? nextIndex : index;
        let currentLeft = indexInfo.left + (nextIndexInfo.left - indexInfo.left) * swipeRatio;
        let currentWidth = indexInfo.width + (nextIndexInfo.width - indexInfo.width) * swipeRatio;
        return { 'index': currentIndex, 'left': currentLeft, 'width': currentWidth };
    }
    private startAnimateTo(duration: number, leftMargin: number, width: number) {
        this.getUIContext().animateTo({
            duration: duration,
            curve: Curve.Linear,
            iterations: this.iteration,
            playMode: PlayMode.Normal,
        }, () => {
            this.indicatorLeftMargin = leftMargin;
            this.indicatorWidth = width;
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SlideAndMoreTab";
    }
}
registerNamedRoute(() => new SlideAndMoreTab(undefined, {}), "", { bundleName: "com.example.multitabs", moduleName: "entry", pagePath: "pages/SlideAndMoreTab", pageFullPath: "entry/src/main/ets/pages/SlideAndMoreTab", integratedHsp: "false", moduleType: "followWithHap" });

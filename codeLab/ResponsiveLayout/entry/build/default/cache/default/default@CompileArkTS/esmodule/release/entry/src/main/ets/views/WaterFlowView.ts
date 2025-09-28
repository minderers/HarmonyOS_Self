if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterFlowView_Params {
    mainWindowInfo?: WindowInfo;
    pageInfos?: NavPathStack;
    dataSource?: WaterFlowDataSource;
    itemHeightArray?: number[];
}
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo } from '../utils/WindowUtil';
export class WaterFlowView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.pageInfos = new NavPathStack();
        this.dataSource = new WaterFlowDataSource();
        this.itemHeightArray = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterFlowView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
        if (params.dataSource !== undefined) {
            this.dataSource = params.dataSource;
        }
        if (params.itemHeightArray !== undefined) {
            this.itemHeightArray = params.itemHeightArray;
        }
    }
    updateStateVars(params: WaterFlowView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mainWindowInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mainWindowInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>; // 主窗口信息对象，包含窗口尺寸和断点信息
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    private pageInfos: NavPathStack; // 页面导航栈，用于页面路由管理
    private dataSource: WaterFlowDataSource; // 瀑布流数据源
    private itemHeightArray: number[]; // 瀑布流项目高度数组
    /**
     * 计算瀑布流项目的随机高度
     * 生成200-300之间的随机高度值，模拟真实瀑布流效果
     * @returns 随机高度值
     */
    getSize(): number {
        return 200 + Math.random() * 100;
    }
    /**
     * 设置瀑布流项目高度数组
     * 为24个瀑布流项目生成随机高度
     */
    setItemSizeArray() {
        for (let i = 0; i < 24; i++) {
            this.itemHeightArray.push(this.getSize());
        }
    }
    /**
     * 组件即将出现时的生命周期回调
     * 初始化数据源和项目高度数组
     */
    aboutToAppear(): void {
        this.dataSource = new WaterFlowDataSource();
        this.setItemSizeArray();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.align(Alignment.Center);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
                left: 16,
                right: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
            Image.margin({ right: 12 });
            Image.onClick(() => {
                this.pageInfos.pop();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777245, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Text.fontSize(24);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start water_flow_view]
            WaterFlow.create();
            // [Start water_flow_view]
            WaterFlow.columnsTemplate(`repeat(${new WidthBreakpointType(2, 3, 4).getValue(this.mainWindowInfo.widthBp)}, 1fr)`);
            // [Start water_flow_view]
            WaterFlow.columnsGap(12);
            // [Start water_flow_view]
            WaterFlow.rowsGap(12);
            // [Start water_flow_view]
            WaterFlow.width('100%');
        }, WaterFlow);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    FlowItem.create();
                    FlowItem.width('100%');
                    FlowItem.height(this.itemHeightArray[index]);
                }, FlowItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height('100%');
                    Row.borderRadius(16);
                    Row.backgroundColor('#F1F3F5');
                }, Row);
                Row.pop();
                FlowItem.pop();
            };
            const __lazyForEachItemIdFunc = (item: number, index: number) => JSON.stringify(item) + index;
            LazyForEach.create("1", this, this.dataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        // [Start water_flow_view]
        WaterFlow.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class WaterFlowDataSource implements IDataSource {
    private dataArray: number[] = [];
    constructor() {
        for (let i = 0; i < 24; i++) {
            this.dataArray.push(i);
        }
    }
    public getData(index: number): number {
        return this.dataArray[index];
    }
    public totalCount(): number {
        return this.dataArray.length;
    }
    registerDataChangeListener(listener: DataChangeListener): void {
    }
    unregisterDataChangeListener() {
    }
}

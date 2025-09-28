if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GridView_Params {
    mainWindowInfo?: WindowInfo;
    pageInfos?: NavPathStack;
    infoArray?: number[];
    listScroller?: ListScroller;
}
import JSON from "@ohos:util.json";
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo } from '../utils/WindowUtil';
export class GridView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.pageInfos = new NavPathStack();
        this.infoArray = [0, 1, 2, 3, 4, 5, 6, 7];
        this.listScroller = new ListScroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GridView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
        if (params.infoArray !== undefined) {
            this.infoArray = params.infoArray;
        }
        if (params.listScroller !== undefined) {
            this.listScroller = params.listScroller;
        }
    }
    updateStateVars(params: GridView_Params) {
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
    private infoArray: number[]; // 网格数据源数组，包含8个示例项目
    private listScroller: ListScroller; // 列表滚动控制器
    /**
     * 构建网格布局视图
     * 根据屏幕断点自适应调整网格列数和显示内容
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.padding({
                // 顶部内边距：系统状态栏高度 + 12px额外间距
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
                left: 16,
                right: 16 // 右侧内边距16px
            });
            Scroll.align(Alignment.Top);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏，包含返回按钮和标题文本
            Row.create();
            // 标题栏，包含返回按钮和标题文本
            Row.width('100%');
            // 标题栏，包含返回按钮和标题文本
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮容器
            Row.create();
            // 返回按钮容器
            Row.height(40);
            // 返回按钮容器
            Row.width(40);
            // 返回按钮容器
            Row.borderRadius(40);
            // 返回按钮容器
            Row.backgroundColor('#0D000000');
            // 返回按钮容器
            Row.justifyContent(FlexAlign.Center);
            // 返回按钮容器
            Row.margin({ right: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
            Image.onClick(() => {
                // 点击返回按钮，从导航栈中弹出当前页面
                this.pageInfos.pop();
            });
        }, Image);
        // 返回按钮容器
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 页面标题文本
            Text.create({ "id": 16777221, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 页面标题文本
            Text.fontSize(24);
        }, Text);
        // 页面标题文本
        Text.pop();
        // 标题栏，包含返回按钮和标题文本
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start grid_view]
            // 响应式网格容器
            Grid.create();
            // [Start grid_view]
            // 响应式网格容器
            Grid.width('100%');
            // [Start grid_view]
            // 响应式网格容器
            Grid.columnsTemplate(`repeat(${new WidthBreakpointType(2, 3, 4).getValue(this.mainWindowInfo.widthBp)}, 1fr)`);
            // [Start grid_view]
            // 响应式网格容器
            Grid.columnsGap(12);
            // [Start grid_view]
            // 响应式网格容器
            Grid.rowsGap(12);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 遍历数据源，根据断点配置动态截取显示项目
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.aspectRatio(1.8);
                            Row.borderRadius(16);
                            Row.backgroundColor('#F1F3F5');
                        }, Row);
                        Row.pop();
                        // [StartExclude grid_view]
                        // 网格项目组件
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.infoArray.slice(new WidthBreakpointType(4, 2, 0).getValue(this.mainWindowInfo.widthBp)), forEachItemGenFunction, (item: number, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        // 遍历数据源，根据断点配置动态截取显示项目
        ForEach.pop();
        // [Start grid_view]
        // 响应式网格容器
        Grid.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

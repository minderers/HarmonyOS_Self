if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IndentedView_Params {
    mainWindowInfo?: WindowInfo;
    infoArray?: number[];
    listScroller?: ListScroller;
    pathStack?: NavPathStack;
}
import type { WindowInfo } from '../utils/WindowUtil';
export class IndentedView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.infoArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.listScroller = new ListScroller();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IndentedView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.infoArray !== undefined) {
            this.infoArray = params.infoArray;
        }
        if (params.listScroller !== undefined) {
            this.listScroller = params.listScroller;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: IndentedView_Params) {
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
    private infoArray: number[]; // 列表数据源数组，包含12个示例项目
    private listScroller: ListScroller; // 列表滚动控制器
    private pathStack: NavPathStack; // 路径导航栈，用于页面路由管理
    /**
     * 构建缩进布局视图
     * 使用栅格系统实现响应式缩进效果
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
            Column.padding({
                // 顶部内边距：系统状态栏高度 + 12px额外间距
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                left: 16,
                right: 16 // 右侧内边距16px
            });
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
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
            Image.margin({ right: 12 });
            Image.onClick(() => {
                // 点击返回按钮，从导航栈中弹出当前页面
                this.pathStack.pop();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 页面标题文本
            Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 页面标题文本
            Text.fontSize(24);
        }, Text);
        // 页面标题文本
        Text.pop();
        // 标题栏，包含返回按钮和标题文本
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start indented_view]
            // 响应式栅格行容器，定义不同断点下的列数和断点值
            GridRow.create({
                columns: { xs: 4, sm: 4, md: 8, lg: 12, xl: 12 },
                gutter: 0,
                breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp'] },
                direction: GridRowDirection.Row // 水平排列方向
            });
            // [Start indented_view]
            // 响应式栅格行容器，定义不同断点下的列数和断点值
            GridRow.width('100%');
            // [Start indented_view]
            // 响应式栅格行容器，定义不同断点下的列数和断点值
            GridRow.layoutWeight(1);
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 响应式栅格列容器，定义内容区域的跨度和偏移
            GridCol.create({
                span: { xs: 4, sm: 4, md: 6, lg: 8, xl: 8 },
                offset: { xs: 0, sm: 0, md: 1, lg: 2, xl: 2 } // 各断点下的左偏移列数
            });
            // 响应式栅格列容器，定义内容区域的跨度和偏移
            GridCol.width('100%');
            // 响应式栅格列容器，定义内容区域的跨度和偏移
            GridCol.height('100%');
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude indented_view]
            // 垂直滚动列表容器
            List.create({
                space: 12,
                scroller: this.listScroller // 绑定滚动控制器
            });
            // [StartExclude indented_view]
            // 垂直滚动列表容器
            List.width('100%');
            // [StartExclude indented_view]
            // 垂直滚动列表容器
            List.layoutWeight(1);
            // [StartExclude indented_view]
            // 垂直滚动列表容器
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 遍历数据源，生成列表项
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.margin({
                            // 最后一项添加底部边距，避免被导航指示器遮挡
                            bottom: index === this.infoArray.length - 1 ?
                                this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) : 0
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.height(60);
                            Row.borderRadius(16);
                            Row.backgroundColor('#F1F3F5');
                        }, Row);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.infoArray, forEachItemGenFunction, (item: number, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        // 遍历数据源，生成列表项
        ForEach.pop();
        // [StartExclude indented_view]
        // 垂直滚动列表容器
        List.pop();
        // 响应式栅格列容器，定义内容区域的跨度和偏移
        GridCol.pop();
        // [Start indented_view]
        // 响应式栅格行容器，定义不同断点下的列数和断点值
        GridRow.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

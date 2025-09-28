if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ListView_Params {
    mainWindowInfo?: WindowInfo;
    pageInfos?: NavPathStack;
    infoArray?: number[];
    listScroller?: ListScroller;
}
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo } from '../utils/WindowUtil';
export class ListView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.pageInfos = new NavPathStack();
        this.infoArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.listScroller = new ListScroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ListView_Params) {
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
    updateStateVars(params: ListView_Params) {
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
    private infoArray: number[]; // 列表数据源数组，包含12个示例项目
    private listScroller: ListScroller; // 列表滚动控制器
    /**
     * 构建列表视图
     * 根据屏幕断点自适应调整列表布局
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
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
                this.pageInfos.pop();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 页面标题文本
            Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 页面标题文本
            Text.fontSize(24);
        }, Text);
        // 页面标题文本
        Text.pop();
        // 标题栏，包含返回按钮和标题文本
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start list_view]
            // 响应式列表容器
            List.create({
                // 动态间距：小屏8px，中屏12px，大屏16px
                space: new WidthBreakpointType(8, 12, 16).getValue(this.mainWindowInfo.widthBp),
                scroller: this.listScroller // 绑定滚动控制器
            });
            // [Start list_view]
            // 响应式列表容器
            List.scrollBar(BarState.Off);
            // [Start list_view]
            // 响应式列表容器
            List.lanes(new WidthBreakpointType(1, 2, 3).getValue(this.mainWindowInfo.widthBp), 12);
            // [Start list_view]
            // 响应式列表容器
            List.layoutWeight(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 1 : -1);
            // [Start list_view]
            // 响应式列表容器
            List.width('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude list_view]
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.height(60);
                            Row.borderRadius(16);
                            Row.backgroundColor('#F1F3F5');
                            Row.margin({
                                // 最后一项的底部边距处理：小屏避免导航指示器遮挡，大屏使用固定间距
                                bottom: index === this.infoArray.length - 1 ?
                                    (this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ?
                                        this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) : 12) : 0
                            });
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
        // [StartExclude list_view]
        // 遍历数据源，生成列表项
        ForEach.pop();
        // [Start list_view]
        // 响应式列表容器
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

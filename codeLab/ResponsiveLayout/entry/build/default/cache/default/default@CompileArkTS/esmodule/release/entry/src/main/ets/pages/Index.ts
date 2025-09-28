if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ListJumpView_Params {
    pageInfos?: NavPathStack;
    mainWindowInfo?: WindowInfo;
    // 布局示例名称资源数组，用于显示列表项标题
    layoutInfos?: Resource[];
    // 对应的页面路由名称数组，用于导航跳转
    urlInfos?: string[];
}
interface Index_Params {
    windowUtil?: WindowUtil | undefined;
    pageInfos?: NavPathStack;
}
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo, WindowUtil } from '../utils/WindowUtil';
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__windowUtil = this.createStorageLink('windowUtil', undefined, "windowUtil");
        this.__pageInfos = new ObservedPropertyObjectPU(new NavPathStack(), this, "pageInfos");
        this.addProvidedVar("pageInfos", this.__pageInfos, false);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__windowUtil.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__windowUtil.aboutToBeDeleted();
        this.__pageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 从全局存储中获取窗口工具类实例，用于获取窗口信息和断点
    private __windowUtil: ObservedPropertyAbstractPU<WindowUtil | undefined>;
    get windowUtil() {
        return this.__windowUtil.get();
    }
    set windowUtil(newValue: WindowUtil | undefined) {
        this.__windowUtil.set(newValue);
    }
    // 提供导航路由栈，供子组件使用
    private __pageInfos: ObservedPropertyObjectPU<NavPathStack>;
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue: NavPathStack) {
        this.__pageInfos.set(newValue);
    }
    /**
     * 组件即将销毁时的回调
     * 释放窗口工具类资源，取消事件监听
     */
    aboutToDisappear(): void {
        this.windowUtil?.release();
    }
    /**
     * 构建主页面UI结构
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用Navigation组件提供路由导航能力
            Navigation.create(this.pageInfos, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            // 使用Navigation组件提供路由导航能力
            Navigation.height('100%');
            // 使用Navigation组件提供路由导航能力
            Navigation.width('100%');
            // 使用Navigation组件提供路由导航能力
            Navigation.mode(NavigationMode.Stack);
            // 使用Navigation组件提供路由导航能力
            Navigation.hideBackButton(true);
            // 使用Navigation组件提供路由导航能力
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 滚动容器，支持内容超出屏幕时滚动
            Scroll.create();
            // 滚动容器，支持内容超出屏幕时滚动
            Scroll.width('100%');
            // 滚动容器，支持内容超出屏幕时滚动
            Scroll.height('100%');
            // 滚动容器，支持内容超出屏幕时滚动
            Scroll.align(Alignment.Top);
            // 滚动容器，支持内容超出屏幕时滚动
            Scroll.backgroundColor('#F1F3F5');
            // 滚动容器，支持内容超出屏幕时滚动
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容列容器，处理状态栏避让
            Column.create();
            // 主内容列容器，处理状态栏避让
            Column.width('100%');
            // 主内容列容器，处理状态栏避让
            Column.padding({
                // 根据系统状态栏高度设置顶部内边距，避免内容被状态栏遮挡
                top: this.getUIContext().px2vp(this.windowUtil?.mainWindowInfo.AvoidSystem?.topRect.height),
                left: 16,
                right: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 页面标题区域
            Column.create();
            // 页面标题区域
            Column.height(112);
            // 页面标题区域
            Column.width('100%');
            // 页面标题区域
            Column.alignItems(HorizontalAlign.Start);
            // 页面标题区域
            Column.justifyContent(FlexAlign.End);
            // 页面标题区域
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Text.fontSize(30);
            Text.fontWeight(700);
            Text.lineHeight(40);
        }, Text);
        Text.pop();
        // 页面标题区域
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 布局示例列表组件
                    ListJumpView(this, {
                        mainWindowInfo: this.windowUtil?.mainWindowInfo
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 57, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mainWindowInfo: this.windowUtil?.mainWindowInfo
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mainWindowInfo: this.windowUtil?.mainWindowInfo
                    });
                }
            }, { name: "ListJumpView" });
        }
        // 主内容列容器，处理状态栏避让
        Column.pop();
        // 滚动容器，支持内容超出屏幕时滚动
        Scroll.pop();
        // 使用Navigation组件提供路由导航能力
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
class ListJumpView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageInfos = this.initializeConsume('pageInfos', "pageInfos");
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.layoutInfos = [{ "id": 16777225, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777245, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777237, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777221, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777234, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777220, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777244, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777228, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777243, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777222, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }];
        this.urlInfos = ['List', 'WaterFlow', 'Swiper', 'Grid', 'Sidebar', 'DoubleColumn', 'TripleColumn', 'MoveLayout',
            'Bottom/SideTabs', 'IndentedLayout'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ListJumpView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.layoutInfos !== undefined) {
            this.layoutInfos = params.layoutInfos;
        }
        if (params.urlInfos !== undefined) {
            this.urlInfos = params.urlInfos;
        }
    }
    updateStateVars(params: ListJumpView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__mainWindowInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageInfos.aboutToBeDeleted();
        this.__mainWindowInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 从父组件消费导航路由栈
    private __pageInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue: NavPathStack) {
        this.__pageInfos.set(newValue);
    }
    // 监听窗口信息变化，用于响应式布局计算
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>;
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    // 布局示例名称资源数组，用于显示列表项标题
    private layoutInfos: Resource[];
    // 对应的页面路由名称数组，用于导航跳转
    private urlInfos: string[];
    /**
     * 构建响应式列表UI
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 列表容器，支持多列响应式布局
            List.create();
            // 列表容器，支持多列响应式布局
            List.width('100%');
            // 列表容器，支持多列响应式布局
            List.lanes(new WidthBreakpointType(1, 2, 2).getValue(this.mainWindowInfo.widthBp));
            // 列表容器，支持多列响应式布局
            List.borderRadius(16);
            // 列表容器，支持多列响应式布局
            List.divider({
                strokeWidth: 1,
                color: '#33000000',
                startMargin: 12,
                endMargin: 12
            });
            // 列表容器，支持多列响应式布局
            List.backgroundColor(Color.White);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 遍历布局示例数据，创建列表项
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
                        ListItem.height(48);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 列表项行布局
                            Row.create();
                            // 列表项行布局
                            Row.height('100%');
                            // 列表项行布局
                            Row.width('100%');
                            // 列表项行布局
                            Row.padding({
                                left: 12,
                                right: 12
                            });
                            // 列表项行布局
                            Row.onClick(() => {
                                // 点击时导航到对应的布局示例页面
                                this.pageInfos.pushPathByName(this.urlInfos[index], null);
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 布局示例名称文本
                            Text.create(item);
                            // 布局示例名称文本
                            Text.fontSize(16);
                        }, Text);
                        // 布局示例名称文本
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 填充空白区域，将图标推到右侧
                            Blank.create();
                        }, Blank);
                        // 填充空白区域，将图标推到右侧
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 右箭头图标，表示可点击跳转
                            Image.create({ "id": 16777250, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
                            // 右箭头图标，表示可点击跳转
                            Image.width(12);
                            // 右箭头图标，表示可点击跳转
                            Image.height(24);
                            // 右箭头图标，表示可点击跳转
                            Image.opacity(0.4);
                        }, Image);
                        // 列表项行布局
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.layoutInfos, forEachItemGenFunction, (item: Resource, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        // 遍历布局示例数据，创建列表项
        ForEach.pop();
        // 列表容器，支持多列响应式布局
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "top.mqxu.test", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });

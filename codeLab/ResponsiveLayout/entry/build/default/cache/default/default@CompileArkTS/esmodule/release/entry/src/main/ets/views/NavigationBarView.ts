if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NavigationBarView_Params {
    mainWindowInfo?: WindowInfo;
    isShowingSidebar?: boolean;
    isTriView?: boolean;
    pageInfos?: NavPathStack;
    pathStack?: NavPathStack;
}
import type { WindowInfo } from '../utils/WindowUtil';
export class NavigationBarView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.__isShowingSidebar = new SynchedPropertySimpleTwoWayPU(params.isShowingSidebar, this, "isShowingSidebar");
        this.isTriView = false;
        this.pageInfos = new NavPathStack();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NavigationBarView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.isTriView !== undefined) {
            this.isTriView = params.isTriView;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: NavigationBarView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mainWindowInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowingSidebar.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mainWindowInfo.aboutToBeDeleted();
        this.__isShowingSidebar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>; // 主窗口信息对象，包含窗口尺寸和断点信息
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    private __isShowingSidebar: SynchedPropertySimpleTwoWayPU<boolean>; // 侧边栏显示状态标识，与父组件双向绑定
    get isShowingSidebar() {
        return this.__isShowingSidebar.get();
    }
    set isShowingSidebar(newValue: boolean) {
        this.__isShowingSidebar.set(newValue);
    }
    private isTriView: boolean; // 是否为三栏视图模式标识
    private pageInfos: NavPathStack; // 页面信息导航栈
    private pathStack: NavPathStack; // 路径导航栈，用于页面路由管理
    /**
     * 组件即将出现时的生命周期回调
     * 在非小屏设备上自动加载默认内容页面
     */
    aboutToAppear(): void {
        // 如果不是小屏设备，自动加载默认的首页内容
        if (this.mainWindowInfo.widthBp !== WidthBreakpoint.WIDTH_SM) {
            this.pathStack.pushPathByName('navigationContent1', null);
        }
    }
    /**
     * 构建导航栏视图
     * 包含标题栏和导航按钮区域
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
            Column.padding({
                // 顶部内边距：系统状态栏高度 + 12px额外间距
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
                left: 16,
                right: 16 // 右侧内边距16px
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏，包含侧边栏切换按钮、返回按钮和标题文本
            Row.create();
            // 标题栏，包含侧边栏切换按钮、返回按钮和标题文本
            Row.width('100%');
            // 标题栏，包含侧边栏切换按钮、返回按钮和标题文本
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 侧边栏切换按钮（仅在三栏模式且侧边栏隐藏时显示）
            Image.create({ "id": 16777262, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 侧边栏切换按钮（仅在三栏模式且侧边栏隐藏时显示）
            Image.width(40);
            // 侧边栏切换按钮（仅在三栏模式且侧边栏隐藏时显示）
            Image.height(40);
            // 侧边栏切换按钮（仅在三栏模式且侧边栏隐藏时显示）
            Image.margin({ right: 12 });
            // 侧边栏切换按钮（仅在三栏模式且侧边栏隐藏时显示）
            Image.onClick(() => {
                // 切换侧边栏显示状态
                this.isShowingSidebar = !this.isShowingSidebar;
            });
            // 侧边栏切换按钮（仅在三栏模式且侧边栏隐藏时显示）
            Image.visibility(!this.isShowingSidebar && this.isTriView ? Visibility.Visible : Visibility.None);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 返回按钮
            Image.width(40);
            // 返回按钮
            Image.height(40);
            // 返回按钮
            Image.margin({ right: 12 });
            // 返回按钮
            Image.onClick(() => {
                // 点击返回按钮，从页面导航栈中弹出当前页面
                this.pageInfos.pop();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 页面标题文本，根据布局模式显示不同标题
            Text.create(this.isTriView ? { "id": 16777244, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" } : { "id": 16777220, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 页面标题文本，根据布局模式显示不同标题
            Text.fontSize(24);
        }, Text);
        // 页面标题文本，根据布局模式显示不同标题
        Text.pop();
        // 标题栏，包含侧边栏切换按钮、返回按钮和标题文本
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 导航内容区域
            Column.create();
            // 导航内容区域
            Column.justifyContent(FlexAlign.Center);
            // 导航内容区域
            Column.layoutWeight(1);
            // 导航内容区域
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Navigation标签文本
            Text.create('Navigation');
            // Navigation标签文本
            Text.fontSize(18);
            // Navigation标签文本
            Text.margin({ bottom: 12 });
        }, Text);
        // Navigation标签文本
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 导航栏描述文本
            Text.create({ "id": 16777229, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 导航栏描述文本
            Text.fontSize(24);
            // 导航栏描述文本
            Text.margin({ bottom: 12 });
        }, Text);
        // 导航栏描述文本
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 跳转到首页内容的按钮
            Button.createWithLabel({ "id": 16777224, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 跳转到首页内容的按钮
            Button.fontSize(12);
            // 跳转到首页内容的按钮
            Button.width(150);
            // 跳转到首页内容的按钮
            Button.margin({ bottom: 12 });
            // 跳转到首页内容的按钮
            Button.onClick(() => {
                // 导航到内容首页
                this.pathStack.pushPathByName('navigationContent1', null);
            });
        }, Button);
        // 跳转到首页内容的按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 跳转到详情页内容的按钮
            Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 跳转到详情页内容的按钮
            Button.fontSize(12);
            // 跳转到详情页内容的按钮
            Button.width(150);
            // 跳转到详情页内容的按钮
            Button.onClick(() => {
                // 导航到内容详情页
                this.pathStack.pushPathByName('navigationContent2', null);
            });
        }, Button);
        // 跳转到详情页内容的按钮
        Button.pop();
        // 导航内容区域
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

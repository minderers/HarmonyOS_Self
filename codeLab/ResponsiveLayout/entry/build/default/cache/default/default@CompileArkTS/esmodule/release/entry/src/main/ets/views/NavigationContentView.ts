if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NavigationContent2_Params {
    mainWindowInfo?: WindowInfo;
    isShow?: boolean;
    pathStack?: NavPathStack;
}
interface NavigationContent1_Params {
    mainWindowInfo?: WindowInfo;
    isTripleView?: boolean;
    pathStack?: NavPathStack;
}
import type { WindowInfo } from '../utils/WindowUtil';
export class NavigationContent1 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.isTripleView = false;
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NavigationContent1_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.isTripleView !== undefined) {
            this.isTripleView = params.isTripleView;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: NavigationContent1_Params) {
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
    private isTripleView: boolean; // 是否为三栏视图模式标识
    private pathStack: NavPathStack; // 路径导航栈，用于页面路由管理
    /**
     * 构建导航内容1视图
     * 包含返回按钮和页面内容
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 返回按钮行
                    Row.create();
                    // 返回按钮行
                    Row.width('100%');
                    // 返回按钮行
                    Row.margin({ bottom: 12 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777248, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
                    Image.width(24);
                    Image.height(24);
                    Image.margin({ right: 12 });
                    Image.onClick(() => {
                        // 点击返回按钮，从导航栈中弹出当前页面
                        this.pathStack.pop();
                    });
                }, Image);
                // 返回按钮行
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 页面主要内容区域
                    Column.create();
                    // 页面主要内容区域
                    Column.height('100%');
                    // 页面主要内容区域
                    Column.width('100%');
                    // 页面主要内容区域
                    Column.justifyContent(FlexAlign.Center);
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
                    // 导航内容首页标题
                    Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
                    // 导航内容首页标题
                    Text.fontSize(24);
                    // 导航内容首页标题
                    Text.margin({ bottom: 12 });
                }, Text);
                // 导航内容首页标题
                Text.pop();
                // 页面主要内容区域
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/views/NavigationContentView" });
            NavDestination.width('100%');
            NavDestination.height('100%');
            NavDestination.onReady((context: NavDestinationContext) => {
                // 导航目标准备就绪时，获取路径栈引用
                this.pathStack = context.pathStack;
            });
            NavDestination.padding({
                // 顶部内边距：系统状态栏高度 + 12px额外间距
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
                left: 12,
                right: 12 // 右侧内边距12px
            });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#FDBFFC');
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class NavigationContent2 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.__isShow = new ObservedPropertySimplePU(false, this, "isShow");
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NavigationContent2_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: NavigationContent2_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mainWindowInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mainWindowInfo.aboutToBeDeleted();
        this.__isShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>; // 主窗口信息对象，包含窗口尺寸和断点信息
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    private __isShow: ObservedPropertySimplePU<boolean>; // 显示状态标识，用于交互反馈
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private pathStack: NavPathStack; // 路径导航栈，用于页面路由管理
    /**
     * 构建导航内容2视图
     * 包含绝对定位的返回按钮和居中的页面内容
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.height('100%');
                    Column.width('100%');
                    Column.justifyContent(FlexAlign.Center);
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
                    // 返回按钮，使用绝对定位放置在左上角
                    Image.create({ "id": 16777248, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
                    // 返回按钮，使用绝对定位放置在左上角
                    Image.width(24);
                    // 返回按钮，使用绝对定位放置在左上角
                    Image.height(24);
                    // 返回按钮，使用绝对定位放置在左上角
                    Image.position({
                        x: 0,
                        y: 0 // Y坐标为0，位于顶部
                    });
                    // 返回按钮，使用绝对定位放置在左上角
                    Image.onClick(() => {
                        // 点击返回按钮，从导航栈中弹出当前页面
                        this.pathStack.pop();
                    });
                }, Image);
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
                    // 导航内容首页标题（可点击）
                    Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
                    // 导航内容首页标题（可点击）
                    Text.fontSize(24);
                    // 导航内容首页标题（可点击）
                    Text.onClick(() => {
                        // 点击文本时改变显示状态
                        this.isShow = true;
                    });
                }, Text);
                // 导航内容首页标题（可点击）
                Text.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/views/NavigationContentView" });
            NavDestination.width('100%');
            NavDestination.height('100%');
            NavDestination.onReady((context: NavDestinationContext) => {
                // 导航目标准备就绪时，获取路径栈引用
                this.pathStack = context.pathStack;
            });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#FDBFFC');
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

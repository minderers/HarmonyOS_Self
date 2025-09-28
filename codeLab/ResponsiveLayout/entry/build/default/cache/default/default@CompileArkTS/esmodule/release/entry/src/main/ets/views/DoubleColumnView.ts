if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DoubleColumnView_Params {
    mainWindowInfo?: WindowInfo;
    isShowingSidebar?: boolean;
    pageInfos?: NavPathStack;
    pathStack?: NavPathStack;
}
import type { WindowInfo } from '../utils/WindowUtil';
import { NavigationBarView } from "@normalized:N&&&entry/src/main/ets/views/NavigationBarView&";
import { NavigationContent1, NavigationContent2 } from "@normalized:N&&&entry/src/main/ets/views/NavigationContentView&";
export class DoubleColumnView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.__isShowingSidebar = new ObservedPropertySimplePU(false, this, "isShowingSidebar");
        this.pageInfos = new NavPathStack();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DoubleColumnView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.isShowingSidebar !== undefined) {
            this.isShowingSidebar = params.isShowingSidebar;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: DoubleColumnView_Params) {
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
    private __isShowingSidebar: ObservedPropertySimplePU<boolean>; // 侧边栏显示状态标识
    get isShowingSidebar() {
        return this.__isShowingSidebar.get();
    }
    set isShowingSidebar(newValue: boolean) {
        this.__isShowingSidebar.set(newValue);
    }
    private pageInfos: NavPathStack; // 页面信息导航栈
    private pathStack: NavPathStack; // 路径导航栈，用于页面路由管理
    /**
     * 页面映射构建器
     * 根据页面名称返回对应的页面组件
     * @param name 页面名称标识符
     */
    PageMap(name: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'navigationContent1') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 构建导航内容1页面
                                NavigationContent1(this, { mainWindowInfo: this.mainWindowInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/views/DoubleColumnView.ets", line: 39, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        mainWindowInfo: this.mainWindowInfo
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    mainWindowInfo: this.mainWindowInfo
                                });
                            }
                        }, { name: "NavigationContent1" });
                    }
                });
            }
            else if (name === 'navigationContent2') {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 构建导航内容2页面
                                NavigationContent2(this, { mainWindowInfo: this.mainWindowInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/views/DoubleColumnView.ets", line: 42, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        mainWindowInfo: this.mainWindowInfo
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    mainWindowInfo: this.mainWindowInfo
                                });
                            }
                        }, { name: "NavigationContent2" });
                    }
                });
            }
            else /**
             * 构建双栏布局视图
             * 根据屏幕断点自适应选择导航模式
             */ {
                this.ifElseBranchUpdateFunction(2, () => {
                });
            }
        }, If);
        If.pop();
    }
    /**
     * 构建双栏布局视图
     * 根据屏幕断点自适应选择导航模式
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start double_column_view]
            Navigation.create(this.pathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/views/DoubleColumnView", isUserCreateStack: true });
            // [Start double_column_view]
            Navigation.mode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : NavigationMode.Split);
            // [Start double_column_view]
            Navigation.width('100%');
            // [Start double_column_view]
            Navigation.height('100%');
            // [Start double_column_view]
            Navigation.navDestination({ builder: this.PageMap.bind(this) });
            // [Start double_column_view]
            Navigation.backgroundColor('#B8EEB2');
            // [Start double_column_view]
            Navigation.navBarWidth('50%');
        }, Navigation);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // [StartExclude double_column_view]
                    // 导航栏视图组件，作为双栏布局的左侧导航区域
                    NavigationBarView(this, {
                        mainWindowInfo: this.mainWindowInfo,
                        pageInfos: this.pageInfos,
                        pathStack: this.pathStack,
                        isShowingSidebar: this.__isShowingSidebar
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/views/DoubleColumnView.ets", line: 55, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mainWindowInfo: this.mainWindowInfo,
                            pageInfos: this.pageInfos,
                            pathStack: this.pathStack,
                            isShowingSidebar: this.isShowingSidebar
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mainWindowInfo: this.mainWindowInfo
                    });
                }
            }, { name: "NavigationBarView" });
        }
        // [Start double_column_view]
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

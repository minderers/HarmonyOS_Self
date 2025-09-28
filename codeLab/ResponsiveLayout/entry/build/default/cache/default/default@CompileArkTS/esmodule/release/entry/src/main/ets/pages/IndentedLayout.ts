if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IndentedLayout_Params {
    windowUtil?: WindowUtil | undefined;
    // 页面导航路由栈
    pathStack?: NavPathStack;
}
import type { WindowUtil } from '../utils/WindowUtil';
import { IndentedView } from "@normalized:N&&&entry/src/main/ets/views/IndentedView&";
/**
 * 缩进布局页面构建器函数
 *
 * 用于Navigation路由系统的页面构建，提供缩进布局示例页面的创建入口
 */
export function IndentedBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new IndentedLayout(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IndentedLayout.ets", line: 12, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "IndentedLayout" });
    }
}
export class IndentedLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__windowUtil = this.createStorageLink('windowUtil', undefined, "windowUtil");
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IndentedLayout_Params) {
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: IndentedLayout_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__windowUtil.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__windowUtil.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 从全局存储获取窗口工具类实例
    private __windowUtil: ObservedPropertyAbstractPU<WindowUtil | undefined>;
    get windowUtil() {
        return this.__windowUtil.get();
    }
    set windowUtil(newValue: WindowUtil | undefined) {
        this.__windowUtil.set(newValue);
    }
    // 页面导航路由栈
    private pathStack: NavPathStack;
    /**
     * 构建缩进布局页面UI
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 缩进视图组件，传入窗口信息和导航栈
                            IndentedView(this, {
                                mainWindowInfo: this.windowUtil?.mainWindowInfo,
                                pathStack: this.pathStack
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IndentedLayout.ets", line: 41, col: 7 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    mainWindowInfo: this.windowUtil?.mainWindowInfo,
                                    pathStack: this.pathStack
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                mainWindowInfo: this.windowUtil?.mainWindowInfo
                            });
                        }
                    }, { name: "IndentedView" });
                }
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/IndentedLayout" });
            NavDestination.height('100%');
            NavDestination.width('100%');
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pathStack = context.pathStack;
            });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("IndentedLayout", wrapBuilder(IndentedBuilder));
    }
})();

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterFlowLayout_Params {
    windowUtil?: WindowUtil | undefined;
    // 页面导航路由栈
    pageInfos?: NavPathStack;
}
import type { WindowUtil } from '../utils/WindowUtil';
import { WaterFlowView } from "@normalized:N&&&entry/src/main/ets/views/WaterFlowView&";
/**
 * 瀑布流布局页面构建器函数
 *
 * 用于Navigation路由系统的页面构建，提供瀑布流布局示例页面的创建入口
 */
export function WaterFlowBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new WaterFlowLayout(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WaterFlowLayout.ets", line: 12, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "WaterFlowLayout" });
    }
}
export class WaterFlowLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__windowUtil = this.createStorageLink('windowUtil', undefined, "windowUtil");
        this.pageInfos = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterFlowLayout_Params) {
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: WaterFlowLayout_Params) {
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
    private pageInfos: NavPathStack;
    /**
     * 构建瀑布流布局页面UI
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 瀑布流视图组件，传入窗口信息和导航栈
                            WaterFlowView(this, {
                                mainWindowInfo: this.windowUtil?.mainWindowInfo,
                                pageInfos: this.pageInfos
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WaterFlowLayout.ets", line: 41, col: 7 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    mainWindowInfo: this.windowUtil?.mainWindowInfo,
                                    pageInfos: this.pageInfos
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                mainWindowInfo: this.windowUtil?.mainWindowInfo
                            });
                        }
                    }, { name: "WaterFlowView" });
                }
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/WaterFlowLayout" });
            NavDestination.height('100%');
            NavDestination.width('100%');
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
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
        NavigationBuilderRegister("WaterFlow", wrapBuilder(WaterFlowBuilder));
    }
})();

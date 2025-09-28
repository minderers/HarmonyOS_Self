if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TripleColumnView_Params {
    mainWindowInfo?: WindowInfo;
    isShowingSidebar?: boolean;
    pageInfos?: NavPathStack;
    pathStack?: NavPathStack;
}
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo } from '../utils/WindowUtil';
import { NavigationBarView } from "@normalized:N&&&entry/src/main/ets/views/NavigationBarView&";
import { NavigationContent1, NavigationContent2 } from "@normalized:N&&&entry/src/main/ets/views/NavigationContentView&";
export class TripleColumnView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.__isShowingSidebar = new ObservedPropertySimplePU(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ||
            this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_XL ? true : false, this, "isShowingSidebar");
        this.pageInfos = new NavPathStack();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.declareWatch("mainWindowInfo", this.widthBpChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TripleColumnView_Params) {
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
    updateStateVars(params: TripleColumnView_Params) {
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
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>; // 主窗口信息对象，监听断点变化
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    // 侧边栏显示状态，大屏设备默认显示，小中屏设备默认隐藏
    private __isShowingSidebar: ObservedPropertySimplePU<boolean>;
    get isShowingSidebar() {
        return this.__isShowingSidebar.get();
    }
    set isShowingSidebar(newValue: boolean) {
        this.__isShowingSidebar.set(newValue);
    }
    private pageInfos: NavPathStack; // 页面信息导航栈
    private pathStack: NavPathStack; // 路径导航栈，用于页面路由管理
    /**
     * 宽度断点变化监听方法
     * 根据新的断点自动调整侧边栏显示状态
     */
    widthBpChange(): void {
        // 大屏设备（LG/XL）自动显示侧边栏
        if (this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ||
            this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_XL) {
            this.isShowingSidebar = true;
        }
        else {
            // 小中屏设备（SM/MD）自动隐藏侧边栏
            this.isShowingSidebar = false;
        }
    }
    /**
     * 页面映射构建器
     * 根据页面名称返回对应的页面组件，并传递三栏视图标识
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
                                // 构建导航内容1页面，并标记为三栏视图模式
                                NavigationContent1(this, {
                                    mainWindowInfo: this.mainWindowInfo,
                                    isTripleView: true
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/views/TripleColumnView.ets", line: 59, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        mainWindowInfo: this.mainWindowInfo,
                                        isTripleView: true
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
                                NavigationContent2(this, { mainWindowInfo: this.mainWindowInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/views/TripleColumnView.ets", line: 65, col: 7 });
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
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start triple_column_view]
            SideBarContainer.create(new WidthBreakpointType(SideBarContainerType.Overlay, SideBarContainerType.Overlay, SideBarContainerType.Embed).getValue(this.mainWindowInfo.widthBp));
            // [Start triple_column_view]
            SideBarContainer.showSideBar(this.isShowingSidebar);
            // [Start triple_column_view]
            SideBarContainer.sideBarWidth(new WidthBreakpointType('80%', '50%', '20%').getValue(this.mainWindowInfo.widthBp));
            // [Start triple_column_view]
            SideBarContainer.controlButton({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 });
            // [Start triple_column_view]
            SideBarContainer.showControlButton(false);
            // [Start triple_column_view]
            SideBarContainer.autoHide(false);
        }, SideBarContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.backgroundColor('#FFD6B5D6');
            Column.width('100%');
            Column.height('100%');
            Column.padding({
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
                left: 16,
                right: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude triple_column_view]
            Image.create({ "id": 16777262, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // [StartExclude triple_column_view]
            Image.width(40);
            // [StartExclude triple_column_view]
            Image.height(40);
            // [StartExclude triple_column_view]
            Image.onClick(() => {
                this.isShowingSidebar = !this.isShowingSidebar;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('SidebarContainer');
            Text.fontSize(18);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Text.fontSize(24);
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [EndExclude triple_column_view]
            Column.create();
            // [EndExclude triple_column_view]
            Column.width('100%');
            // [EndExclude triple_column_view]
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/views/TripleColumnView", isUserCreateStack: true });
            Navigation.width('100%');
            Navigation.height('100%');
            Navigation.mode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : NavigationMode.Split);
            Navigation.navBarWidth(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_MD ? '50%' : '40%');
            Navigation.navDestination({ builder: this.PageMap.bind(this) });
            Navigation.backgroundColor('#B8EEB2');
        }, Navigation);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NavigationBarView(this, {
                        mainWindowInfo: this.mainWindowInfo,
                        pageInfos: this.pageInfos,
                        pathStack: this.pathStack,
                        isShowingSidebar: this.__isShowingSidebar,
                        isTriView: true
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/views/TripleColumnView.ets", line: 108, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mainWindowInfo: this.mainWindowInfo,
                            pageInfos: this.pageInfos,
                            pathStack: this.pathStack,
                            isShowingSidebar: this.isShowingSidebar,
                            isTriView: true
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
        Navigation.pop();
        // [EndExclude triple_column_view]
        Column.pop();
        // [Start triple_column_view]
        SideBarContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

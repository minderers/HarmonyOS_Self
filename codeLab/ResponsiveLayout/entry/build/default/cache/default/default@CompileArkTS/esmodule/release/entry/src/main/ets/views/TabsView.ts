if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabsView_Params {
    mainWindowInfo?: WindowInfo;
    currentBottomIndex?: number;
    pageInfos?: NavPathStack;
}
import type { WindowInfo } from '../utils/WindowUtil';
/**
 * 底部标签页数据模型类
 * 定义每个标签页的名称、默认图标和选中图标
 */
class FooterTab {
    tabName: Resource; // 标签页名称资源
    tabIcon: Resource; // 默认状态图标资源
    tabIconSel: Resource; // 选中状态图标资源
    constructor(tabName: Resource, tabIcon: Resource, tabIconSel: Resource) {
        this.tabName = tabName;
        this.tabIcon = tabIcon;
        this.tabIconSel = tabIconSel;
    }
}
// 底部标签页配置列表，包含5个主要功能标签
const FOOTER_TAB_LIST: FooterTab[] = [
    new FooterTab({ "id": 16777240, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777270, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777271, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }),
    new FooterTab({ "id": 16777238, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777266, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777267, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }),
    new FooterTab({ "id": 16777239, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777268, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777269, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }),
    new FooterTab({ "id": 16777242, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777264, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777265, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }),
    new FooterTab({ "id": 16777241, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777272, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777273, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }) // 我的标签
];
export class TabsView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.__currentBottomIndex = new ObservedPropertySimplePU(0, this, "currentBottomIndex");
        this.pageInfos = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabsView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.currentBottomIndex !== undefined) {
            this.currentBottomIndex = params.currentBottomIndex;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: TabsView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mainWindowInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBottomIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mainWindowInfo.aboutToBeDeleted();
        this.__currentBottomIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>; // 主窗口信息对象，包含窗口尺寸和断点信息
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    private __currentBottomIndex: ObservedPropertySimplePU<number>; // 当前选中的底部标签索引
    get currentBottomIndex() {
        return this.__currentBottomIndex.get();
    }
    set currentBottomIndex(newValue: number) {
        this.__currentBottomIndex.set(newValue);
    }
    private pageInfos: NavPathStack; // 页面导航栈，用于页面路由管理
    BottomTabBuilder(item: FooterTab, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height)
            });
            Column.height(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? 80 : '100%');
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(index !== this.currentBottomIndex ? item.tabIcon : item.tabIconSel);
            Image.width(24);
            Image.height(24);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.tabName);
            Text.fontSize(10);
            Text.fontColor(index === this.currentBottomIndex ? '#D0092D' : Color.Black);
            Text.margin({ top: 4 });
            Text.opacity(index === this.currentBottomIndex ? 1 : 0.4);
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start tabs_view]
            Tabs.create({ barPosition: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarPosition.Start :
                    BarPosition.End });
            // [Start tabs_view]
            Tabs.barWidth(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? 96 : '100%');
            // [Start tabs_view]
            Tabs.barHeight(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? '100%' :
                56 + this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height));
            // [Start tabs_view]
            Tabs.barMode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarMode.Scrollable : BarMode.Fixed, { nonScrollableLayoutStyle: LayoutStyle.ALWAYS_CENTER });
            // [Start tabs_view]
            Tabs.vertical(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG);
            // [Start tabs_view]
            Tabs.barBackgroundColor('#F1F3F5');
            // [Start tabs_view]
            Tabs.onChange((index: number) => {
                this.currentBottomIndex = index;
            });
            // [Start tabs_view]
            Tabs.scrollable(false);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude tabs_view]
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.height('100%');
                            Column.width('100%');
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.margin({ bottom: 12 });
                            Row.padding({
                                left: 16,
                                right: 16
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
                            Image.width(40);
                            Image.height(40);
                            Image.margin({ right: 12 });
                            Image.onClick(() => {
                                this.pageInfos.pop();
                            });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create({ "id": 16777243, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
                            Text.fontSize(24);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        Column.pop();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.BottomTabBuilder.call(this, item, index);
                        } });
                    TabContent.padding({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 });
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, FOOTER_TAB_LIST, forEachItemGenFunction, (item: number, index: number) => index + JSON.stringify(item), true, true);
        }, ForEach);
        // [StartExclude tabs_view]
        ForEach.pop();
        // [Start tabs_view]
        Tabs.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SidebarView_Params {
    mainWindowInfo?: WindowInfo;
    isShowingSidebar?: boolean;
    pageInfos?: NavPathStack;
}
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo } from '../utils/WindowUtil';
export class SidebarView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.__isShowingSidebar = new ObservedPropertySimplePU(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? false : true, this, "isShowingSidebar");
        this.pageInfos = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SidebarView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.isShowingSidebar !== undefined) {
            this.isShowingSidebar = params.isShowingSidebar;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: SidebarView_Params) {
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
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>;
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    private __isShowingSidebar: ObservedPropertySimplePU<boolean>;
    get isShowingSidebar() {
        return this.__isShowingSidebar.get();
    }
    set isShowingSidebar(newValue: boolean) {
        this.__isShowingSidebar.set(newValue);
    }
    private pageInfos: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start side_bar_view]
            SideBarContainer.create(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? SideBarContainerType.Overlay :
                SideBarContainerType.Embed);
            // [Start side_bar_view]
            SideBarContainer.showSideBar(this.isShowingSidebar);
            // [Start side_bar_view]
            SideBarContainer.sideBarWidth(new WidthBreakpointType('80%', '50%', '40%').getValue(this.mainWindowInfo.widthBp));
            // [Start side_bar_view]
            SideBarContainer.controlButton({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 });
            // [Start side_bar_view]
            SideBarContainer.showControlButton(false);
            // [Start side_bar_view]
            SideBarContainer.autoHide(false);
        }, SideBarContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude side_bar_view]
            Scroll.create();
            // [StartExclude side_bar_view]
            Scroll.height('100%');
            // [StartExclude side_bar_view]
            Scroll.width('100%');
            // [StartExclude side_bar_view]
            Scroll.padding({
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
                left: 16,
                right: 16
            });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777262, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
            Image.onClick(() => {
                this.isShowingSidebar = !this.isShowingSidebar;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
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
        Column.pop();
        // [StartExclude side_bar_view]
        Scroll.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor('#FDBFFC');
            Column.padding({
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
                left: 16,
                right: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude side_bar_view]
            Row.create();
            // [StartExclude side_bar_view]
            Row.width('100%');
            // [StartExclude side_bar_view]
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777262, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
            Image.margin({ right: 12 });
            Image.onClick(() => {
                this.isShowingSidebar = !this.isShowingSidebar;
            });
            Image.visibility(!this.isShowingSidebar ? Visibility.Visible : Visibility.None);
        }, Image);
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
            Text.create({ "id": 16777234, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Text.fontSize(24);
        }, Text);
        Text.pop();
        // [StartExclude side_bar_view]
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.align(Alignment.Center);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777226, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Text.fontSize(24);
        }, Text);
        Text.pop();
        Scroll.pop();
        Column.pop();
        // [Start side_bar_view]
        SideBarContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

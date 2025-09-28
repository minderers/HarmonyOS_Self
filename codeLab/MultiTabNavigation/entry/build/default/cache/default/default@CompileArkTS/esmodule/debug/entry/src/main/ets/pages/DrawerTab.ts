if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DrawerTab_Params {
    navList?: Array<number>;
    active?: number;
    show?: boolean;
}
import { Constants } from "@bundle:com.example.multitabs/entry/ets/common/Constants";
class DrawerTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navList = new ObservedPropertyObjectPU([0, 1, 2, 3, 4, 5], this, "navList");
        this.__active = new ObservedPropertySimplePU(0, this, "active");
        this.__show = new ObservedPropertySimplePU(false, this, "show");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DrawerTab_Params) {
        if (params.navList !== undefined) {
            this.navList = params.navList;
        }
        if (params.active !== undefined) {
            this.active = params.active;
        }
        if (params.show !== undefined) {
            this.show = params.show;
        }
    }
    updateStateVars(params: DrawerTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navList.purgeDependencyOnElmtId(rmElmtId);
        this.__active.purgeDependencyOnElmtId(rmElmtId);
        this.__show.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navList.aboutToBeDeleted();
        this.__active.aboutToBeDeleted();
        this.__show.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __navList: ObservedPropertyObjectPU<Array<number>>;
    get navList() {
        return this.__navList.get();
    }
    set navList(newValue: Array<number>) {
        this.__navList.set(newValue);
    }
    private __active: ObservedPropertySimplePU<number>;
    get active() {
        return this.__active.get();
    }
    set active(newValue: number) {
        this.__active.set(newValue);
    }
    private __show: ObservedPropertySimplePU<boolean>;
    get show() {
        return this.__show.get();
    }
    set show(newValue: boolean) {
        this.__show.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.create(SideBarContainerType.Overlay);
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.showSideBar(this.show);
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.controlButton({
                left: 16,
                top: 48,
                height: 40,
                width: 40,
                icons: {
                    shown: { "id": 16777435, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                    hidden: { "id": 16777434, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" },
                    switching: { "id": 16777434, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }
                }
            });
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.onChange((value: boolean) => {
                this.show = value;
            });
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.sideBarWidth('85%');
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.minSideBarWidth('85%');
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.width('100%');
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.height('110%');
            // [Start Drawer_tab_side_bar_container]
            SideBarContainer.translate({ y: -40 });
        }, SideBarContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start Drawer_tab_side_bar_container_other]
            Column.create();
            // [Start Drawer_tab_side_bar_container_other]
            Column.height('100%');
            // [Start Drawer_tab_side_bar_container_other]
            Column.padding({ top: 104 });
            // [Start Drawer_tab_side_bar_container_other]
            Column.backgroundColor('#E9EAEC');
            // [Start Drawer_tab_side_bar_container_other]
            Column.width(272);
            // [Start Drawer_tab_side_bar_container_other]
            Column.height(344);
            // [Start Drawer_tab_side_bar_container_other]
            Column.backgroundColor(Color.White);
            // [Start Drawer_tab_side_bar_container_other]
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude Drawer_tab_side_bar_container]
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.onClick(() => {
                        this.active = item;
                    });
                    Column.margin({
                        top: 4,
                        left: 4,
                        right: 4,
                        bottom: 4
                    });
                    Column.justifyContent(FlexAlign.Center);
                    Column.width(264);
                    Column.height(48);
                    Column.padding({ left: 13 });
                    Column.borderRadius(16);
                    Column.backgroundColor(this.active === item ? '#1A0A59F7' : '');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.height(48);
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.active === item ? { "id": 16777427, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" } : { "id": 16777440, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
                    Image.width(24);
                    Image.height(24);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777315, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
                    Text.fontSize(16);
                    Text.fontColor(Color.Black);
                    Text.fontWeight(FontWeight.Medium);
                    Text.margin({ left: 17 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.navList.length - 1 !== index) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.height(0.5);
                                Row.backgroundColor('#0D000000');
                                Row.width('90%');
                            }, Row);
                            Row.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.navList, forEachItemGenFunction, (item: number, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        // [StartExclude Drawer_tab_side_bar_container]
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 284 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777432, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777292, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        // [Start Drawer_tab_side_bar_container_other]
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [End Drawer_tab_side_bar_container_other]
            Column.create();
            // [End Drawer_tab_side_bar_container_other]
            Column.onClick(() => {
                this.getUIContext().animateTo({
                    duration: Constants.ANIMATION_DURATION,
                    curve: Curve.EaseOut,
                    playMode: PlayMode.Normal,
                }, () => {
                    this.show = false;
                });
            });
            // [End Drawer_tab_side_bar_container_other]
            Column.width('100%');
            // [End Drawer_tab_side_bar_container_other]
            Column.height('110%');
            // [End Drawer_tab_side_bar_container_other]
            Column.backgroundColor(this.show ? '#c1c2c4' : '');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude Drawer_tab_side_bar_container]
            Text.create({ "id": 16777301, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" });
            // [StartExclude Drawer_tab_side_bar_container]
            Text.width('100%');
            // [StartExclude Drawer_tab_side_bar_container]
            Text.height('100%');
            // [StartExclude Drawer_tab_side_bar_container]
            Text.fontSize(30);
            // [StartExclude Drawer_tab_side_bar_container]
            Text.textAlign(TextAlign.Center);
            // [StartExclude Drawer_tab_side_bar_container]
            Text.fontColor(Color.Black);
        }, Text);
        // [StartExclude Drawer_tab_side_bar_container]
        Text.pop();
        // [End Drawer_tab_side_bar_container_other]
        Column.pop();
        // [Start Drawer_tab_side_bar_container]
        SideBarContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DrawerTab";
    }
}
registerNamedRoute(() => new DrawerTab(undefined, {}), "", { bundleName: "com.example.multitabs", moduleName: "entry", pagePath: "pages/DrawerTab", pageFullPath: "entry/src/main/ets/pages/DrawerTab", integratedHsp: "false", moduleType: "followWithHap" });

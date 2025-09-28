if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SwiperView_Params {
    mainWindowInfo?: WindowInfo;
    pageInfos?: NavPathStack;
    bannerArray?: Resource[];
    bannerDataSource?: BannerDataSource;
}
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo } from '../utils/WindowUtil';
class BannerDataSource implements IDataSource {
    private bannerImgList: Resource[] = [];
    constructor(bannerImgList: Resource[]) {
        this.bannerImgList = bannerImgList;
    }
    totalCount(): number {
        return this.bannerImgList.length;
    }
    getData(index: number): Resource {
        return this.bannerImgList[index];
    }
    registerDataChangeListener(listener: DataChangeListener): void {
    }
    unregisterDataChangeListener() {
    }
}
export class SwiperView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.pageInfos = new NavPathStack();
        this.bannerArray = [{ "id": 16777252, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777253, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777254, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777255, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }, { "id": 16777254, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" }];
        this.bannerDataSource = new BannerDataSource([]);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SwiperView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
        if (params.bannerArray !== undefined) {
            this.bannerArray = params.bannerArray;
        }
        if (params.bannerDataSource !== undefined) {
            this.bannerDataSource = params.bannerDataSource;
        }
    }
    updateStateVars(params: SwiperView_Params) {
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
    private __mainWindowInfo: SynchedPropertyNesedObjectPU<WindowInfo>;
    get mainWindowInfo() {
        return this.__mainWindowInfo.get();
    }
    private pageInfos: NavPathStack;
    private bannerArray: Resource[];
    private bannerDataSource: BannerDataSource;
    aboutToAppear(): void {
        this.bannerDataSource = new BannerDataSource(this.bannerArray);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.padding({
                top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
                bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height)
            });
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
            Text.create({ "id": 16777237, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Text.fontSize(24);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start swiper_view]
            Swiper.create();
            // [Start swiper_view]
            Swiper.displayCount(new WidthBreakpointType(1, 2, 3).getValue(this.mainWindowInfo.widthBp));
            // [Start swiper_view]
            Swiper.indicator(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? Indicator.dot()
                .itemWidth(6)
                .itemHeight(6)
                .selectedItemWidth(12)
                .selectedItemHeight(6)
                .color('#4DFFFFFF')
                .selectedColor(Color.White) : false);
            // [Start swiper_view]
            Swiper.prevMargin(new WidthBreakpointType(0, 12, 64).getValue(this.mainWindowInfo.widthBp));
            // [Start swiper_view]
            Swiper.nextMargin(new WidthBreakpointType(0, 12, 64).getValue(this.mainWindowInfo.widthBp));
            // [Start swiper_view]
            Swiper.itemSpace(12);
            // [Start swiper_view]
            Swiper.loop(true);
            // [Start swiper_view]
            Swiper.width('100%');
            // [Start swiper_view]
            Swiper.effectMode(EdgeEffect.None);
        }, Swiper);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.aspectRatio(1.6);
                    Column.padding({
                        left: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 8 : 0,
                        right: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 8 : 0
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item);
                    Image.objectFit(ImageFit.Fill);
                    Image.borderRadius(24);
                    Image.height('100%');
                    Image.width('100%');
                    Image.focusable(true);
                }, Image);
                Column.pop();
            };
            const __lazyForEachItemIdFunc = (item: Resource, index: number) => index + JSON.stringify(item);
            LazyForEach.create("1", this, this.bannerDataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            // [StartExclude swiper_view]
            LazyForEach.pop();
        }
        // [Start swiper_view]
        Swiper.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

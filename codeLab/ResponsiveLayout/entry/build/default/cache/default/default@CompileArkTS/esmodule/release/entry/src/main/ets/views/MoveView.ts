if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MoveView_Params {
    mainWindowInfo?: WindowInfo;
    pathStack?: NavPathStack;
}
import { WidthBreakpointType } from "@normalized:N&&&entry/src/main/ets/utils/WidthBreakpointType&";
import type { WindowInfo } from '../utils/WindowUtil';
export class MoveView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainWindowInfo = new SynchedPropertyNesedObjectPU(params.mainWindowInfo, this, "mainWindowInfo");
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MoveView_Params) {
        this.__mainWindowInfo.set(params.mainWindowInfo);
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: MoveView_Params) {
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
    private pathStack: NavPathStack; // 路径导航栈，用于页面路由管理
    /**
     * 构建音乐播放器界面
     * 根据屏幕尺寸自适应选择垂直或水平布局
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start move_view]
            // 主要内容区域的响应式栅格容器
            GridRow.create({
                columns: { xs: 4, sm: 4, md: 8, lg: 12, xl: 12 },
                gutter: 0,
                breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp'] },
                direction: GridRowDirection.Row // 水平排列方向
            });
            // [Start move_view]
            // 主要内容区域的响应式栅格容器
            GridRow.width('100%');
            // [Start move_view]
            // 主要内容区域的响应式栅格容器
            GridRow.layoutWeight(1);
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左侧播放信息区域（在小屏时为上半部分）
            GridCol.create({
                span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 },
                offset: 0 // 无偏移
            });
            // 左侧播放信息区域（在小屏时为上半部分）
            GridCol.height(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? this.getGridColHeight() : '100%');
            // 左侧播放信息区域（在小屏时为上半部分）
            GridCol.padding({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 });
            // 左侧播放信息区域（在小屏时为上半部分）
            GridCol.backgroundColor('#AAD3F1');
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude move_view]
            Column.create();
            // [StartExclude move_view]
            Column.height('100%');
            // [StartExclude move_view]
            Column.alignItems(HorizontalAlign.Start);
            // [StartExclude move_view]
            Column.padding({
                // 动态左右内边距：小屏12px，中屏16px，大屏24px
                left: new WidthBreakpointType(12, 16, 24).getValue(this.mainWindowInfo.widthBp),
                right: new WidthBreakpointType(12, 16, 24).getValue(this.mainWindowInfo.widthBp)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 返回按钮
            Image.width(40);
            // 返回按钮
            Image.height(40);
            // 返回按钮
            Image.margin({ bottom: 12 });
            // 返回按钮
            Image.onClick(() => {
                // 点击返回按钮，从导航栈中弹出当前页面
                this.pathStack.pop();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 专辑封面和播放信息的嵌套栅格
            GridRow.create({
                columns: { xs: 8, sm: 8, md: 8, lg: 12, xl: 12 },
                gutter: 8,
                breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp'] },
                direction: GridRowDirection.Row // 水平排列方向
            });
            // 专辑封面和播放信息的嵌套栅格
            GridRow.width('100%');
            // 专辑封面和播放信息的嵌套栅格
            GridRow.layoutWeight(1);
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 专辑封面区域
            GridCol.create({
                span: { xs: 5, sm: 5, md: 8, lg: 12, xl: 12 },
                offset: 0 // 无偏移
            });
            // 专辑封面区域
            GridCol.layoutWeight(1);
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.aspectRatio(1);
            Row.borderRadius(24);
            Row.backgroundColor('#F1F3F5');
            Row.margin({
                // 动态左右边距：小屏无边距，大屏8px边距
                left: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 0 : 8,
                right: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 0 : 8,
                bottom: 12 // 底部边距12px
            });
        }, Row);
        Row.pop();
        // 专辑封面区域
        GridCol.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 播放信息文本区域
            GridCol.create({
                span: { xs: 3, sm: 3, md: 8, lg: 12, xl: 12 },
                offset: 0 // 无偏移
            });
            // 播放信息文本区域
            GridCol.layoutWeight(1);
            // 播放信息文本区域
            GridCol.width('100%');
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? HorizontalAlign.Start :
                HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 播放列表标题
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 播放列表标题
            Text.fontSize(20);
            // 播放列表标题
            Text.opacity(0.8);
            // 播放列表标题
            Text.margin({ bottom: 8 });
        }, Text);
        // 播放列表标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 歌曲描述文本
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 歌曲描述文本
            Text.fontSize(16);
            // 歌曲描述文本
            Text.opacity(0.5);
        }, Text);
        // 歌曲描述文本
        Text.pop();
        Column.pop();
        // 播放信息文本区域
        GridCol.pop();
        // 专辑封面和播放信息的嵌套栅格
        GridRow.pop();
        // [StartExclude move_view]
        Column.pop();
        // 左侧播放信息区域（在小屏时为上半部分）
        GridCol.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右侧歌曲列表区域（在小屏时为下半部分）
            GridCol.create({
                span: { xs: 4, sm: 4, md: 4, lg: 8, xl: 8 },
                offset: 0 // 无偏移
            });
            // 右侧歌曲列表区域（在小屏时为下半部分）
            GridCol.backgroundColor(Color.Pink);
            // 右侧歌曲列表区域（在小屏时为下半部分）
            GridCol.layoutWeight(1);
            // 右侧歌曲列表区域（在小屏时为下半部分）
            GridCol.padding({ top: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 0 :
                    this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) });
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude move_view]
            // 歌曲列表滚动容器
            Scroll.create();
            // [StartExclude move_view]
            // 歌曲列表滚动容器
            Scroll.width('100%');
            // [StartExclude move_view]
            // 歌曲列表滚动容器
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.height(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 600 : '100%');
            Column.width('100%');
            Column.padding({
                left: 16,
                right: 16,
                top: 12,
                bottom: 12 // 底部内边距12px
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 歌曲列表标题
            Text.create({ "id": 16777236, "type": 10003, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            // 歌曲列表标题
            Text.fontSize(16);
            // 歌曲列表标题
            Text.opacity(0.8);
        }, Text);
        // 歌曲列表标题
        Text.pop();
        Column.pop();
        // [StartExclude move_view]
        // 歌曲列表滚动容器
        Scroll.pop();
        // 右侧歌曲列表区域（在小屏时为下半部分）
        GridCol.pop();
        // [Start move_view]
        // 主要内容区域的响应式栅格容器
        GridRow.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部播放控制栏
            Row.create();
            // 底部播放控制栏
            Row.justifyContent(FlexAlign.End);
            // 底部播放控制栏
            Row.height(this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) + 32);
            // 底部播放控制栏
            Row.width('100%');
            // 底部播放控制栏
            Row.backgroundColor('#F1F3F5');
            // 底部播放控制栏
            Row.padding({ bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 播放控制按钮组
            Row.create();
            // 播放控制按钮组
            Row.width(120);
            // 播放控制按钮组
            Row.height('100%');
            // 播放控制按钮组
            Row.margin({ right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 上一曲按钮
            Column.create();
            // 上一曲按钮
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777258, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.height(24);
            Image.aspectRatio(1);
        }, Image);
        // 上一曲按钮
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 播放/暂停按钮
            Column.create();
            // 播放/暂停按钮
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777257, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.height(24);
            Image.aspectRatio(1);
        }, Image);
        // 播放/暂停按钮
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 下一曲按钮
            Column.create();
            // 下一曲按钮
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "top.mqxu.test", "moduleName": "entry" });
            Image.height(24);
            Image.aspectRatio(1);
        }, Image);
        // 下一曲按钮
        Column.pop();
        // 播放控制按钮组
        Row.pop();
        // 底部播放控制栏
        Row.pop();
        Column.pop();
    }
    /**
     * 计算小屏模式下左侧栅格列的高度
     * 根据状态栏、返回按钮和图片区域的高度进行计算
     * @returns 计算后的栅格列高度值
     */
    getGridColHeight(): number {
        let gridColHeight: number = 0;
        // 顶部状态栏避让区域的高度
        gridColHeight += this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height);
        // 返回按钮行的高度（40px图标 + 12px边距）
        gridColHeight += 40 + 12;
        // 专辑封面图片的高度（基于屏幕宽度计算的5/8比例 + 上下边距）
        gridColHeight += (this.getUIContext().px2vp(this.mainWindowInfo.windowSize.width) - 32) * 5 / 8 + 12 + 12;
        return gridColHeight;
    }
    rerender() {
        this.updateDirtyElements();
    }
}

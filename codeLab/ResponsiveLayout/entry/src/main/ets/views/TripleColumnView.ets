// 导入宽度断点类型工具类，用于响应式设计
import { WidthBreakpointType } from '../utils/WidthBreakpointType';
// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';
// 导入导航栏视图组件
import { NavigationBarView } from './NavigationBarView';
// 导入导航内容视图组件
import { NavigationContent1, NavigationContent2 } from './NavigationContentView';

/**
 * 三栏布局视图组件
 *
 * 这是一个响应式三栏布局组件，主要特性包括：
 * - 支持侧边栏显示/隐藏的三栏布局设计
 * - 根据屏幕宽度自适应切换侧边栏模式（覆盖/嵌入）
 * - 在大屏设备上自动显示侧边栏，在小中屏设备上隐藏
 * - 支持导航栏、内容区域和侧边栏的协调布局
 * - 监听屏幕断点变化，动态调整侧边栏状态
 *
 * 响应式断点：
 * - SM/MD：侧边栏隐藏，使用覆盖模式
 * - LG/XL：侧边栏显示，使用嵌入模式
 *
 * @since 2023-xx-xx
 */
@Component
export struct TripleColumnView {
  @ObjectLink @Watch('widthBpChange') mainWindowInfo: WindowInfo; // 主窗口信息对象，监听断点变化
  // 侧边栏显示状态，大屏设备默认显示，小中屏设备默认隐藏
  @State isShowingSidebar: boolean = this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ||
    this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_XL ? true : false;
  pageInfos: NavPathStack = new NavPathStack(); // 页面信息导航栈
  pathStack: NavPathStack = new NavPathStack(); // 路径导航栈，用于页面路由管理

  /**
   * 宽度断点变化监听方法
   * 根据新的断点自动调整侧边栏显示状态
   */
  widthBpChange(): void {
    // 大屏设备（LG/XL）自动显示侧边栏
    if (this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ||
      this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_XL) {
      this.isShowingSidebar = true;
    } else {
      // 小中屏设备（SM/MD）自动隐藏侧边栏
      this.isShowingSidebar = false;
    }
  }

  /**
   * 页面映射构建器
   * 根据页面名称返回对应的页面组件，并传递三栏视图标识
   * @param name 页面名称标识符
   */
  @Builder
  PageMap(name: string) {
    if (name === 'navigationContent1') {
      // 构建导航内容1页面，并标记为三栏视图模式
      NavigationContent1({
        mainWindowInfo: this.mainWindowInfo,
        isTripleView: true
      })
    } else if (name === 'navigationContent2') {
      // 构建导航内容2页面
      NavigationContent2({ mainWindowInfo: this.mainWindowInfo })
    }
  }

  build() {
    // [Start triple_column_view]
    SideBarContainer(new WidthBreakpointType(SideBarContainerType.Overlay, SideBarContainerType.Overlay,
      SideBarContainerType.Embed).getValue(this.mainWindowInfo.widthBp)) {
      Column() {
        // [StartExclude triple_column_view]
        Image($r('app.media.open_sidebar'))
          .width(40)
          .height(40)
          .onClick(() => {
            this.isShowingSidebar = !this.isShowingSidebar;
          })
        Column() {
          Text('SidebarContainer')
            .fontSize(18)
            .margin({ bottom: 12 })
          Text($r('app.string.side_bar'))
            .fontSize(24)
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
        // [EndExclude triple_column_view]
      }
      // [StartExclude triple_column_view]
      .alignItems(HorizontalAlign.Start)
      .backgroundColor('#FFD6B5D6')
      .width('100%')
      .height('100%')
      .padding({
        top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
        bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
        left: 16,
        right: 16
      })
      // [EndExclude triple_column_view]

      Column() {
        Navigation(this.pathStack) {
          NavigationBarView({
            mainWindowInfo: this.mainWindowInfo,
            pageInfos: this.pageInfos,
            pathStack: this.pathStack,
            isShowingSidebar: this.isShowingSidebar,
            isTriView: true
          })
        }
        .width('100%')
        .height('100%')
        .mode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : NavigationMode.Split)
        .navBarWidth(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_MD ? '50%' : '40%')
        .navDestination(this.PageMap)
        .backgroundColor('#B8EEB2')
      }
      // [StartExclude triple_column_view]
      .width('100%')
      .height('100%')
      // [EndExclude triple_column_view]
    }
    .showSideBar(this.isShowingSidebar)
    .sideBarWidth(new WidthBreakpointType('80%', '50%', '20%').getValue(this.mainWindowInfo.widthBp))
    // [End triple_column_view]
    .controlButton({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 })
    .showControlButton(false)
    .autoHide(false)}
}
// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

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
  new FooterTab($r('app.string.tab_home'), $r('app.media.tab_home'), $r('app.media.tab_home_selected')), // 首页标签
  new FooterTab($r('app.string.tab_category'), $r('app.media.tab_category'), $r('app.media.tab_category_selected')), // 分类标签
  new FooterTab($r('app.string.tab_discovery'), $r('app.media.tab_discovery'), $r('app.media.tab_discovery_selected')), // 发现标签
  new FooterTab($r('app.string.tab_shopping_bag'), $r('app.media.tab_bag'), $r('app.media.tab_bag_selected')), // 购物袋标签
  new FooterTab($r('app.string.tab_mine'), $r('app.media.tab_mine'), $r('app.media.tab_mine_selected')) // 我的标签
];

/**
 * 标签页视图组件
 *
 * 这是一个底部标签导航组件，主要特性包括：
 * - 提供底部标签栏导航功能
 * - 支持5个主要功能模块的切换
 * - 动态显示选中状态的图标和文字
 * - 自适应安全区域，避免系统UI遮挡
 * - 响应式设计，适配不同屏幕尺寸
 *
 * 功能模块：首页、分类、发现、购物袋、我的
 *
 * @since 2023-xx-xx
 */
@Component
export struct TabsView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  @State currentBottomIndex: number = 0; // 当前选中的底部标签索引
  pageInfos: NavPathStack = new NavPathStack(); // 页面导航栈，用于页面路由管理

  @Builder
  BottomTabBuilder(item: FooterTab, index: number) {
    Column() {
      Image(index !== this.currentBottomIndex ? item.tabIcon : item.tabIconSel)
        .width(24)
        .height(24)
      Text(item.tabName)
        .fontSize(10)
        .fontColor(index === this.currentBottomIndex ? '#D0092D' : Color.Black)
        .margin({ top: 4 })
        .opacity(index === this.currentBottomIndex ? 1 : 0.4)
    }
    .padding({
      bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height)
    })
    .height(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? 80 : '100%')
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }

  build() {
    Column() {
      // [Start tabs_view]
      Tabs({ barPosition: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarPosition.Start :
        BarPosition.End }) {
        // [StartExclude tabs_view]
        ForEach(FOOTER_TAB_LIST, (item: FooterTab, index: number) => {
          TabContent() {
            Column() {
              Row() {
                Image($r('app.media.ic_public_back'))
                  .width(40)
                  .height(40)
                  .margin({ right: 12 })
                  .onClick(() => {
                    this.pageInfos.pop();
                  })
                Text($r('app.string.tabs'))
                  .fontSize(24)
              }
              .width('100%')
              .margin({ bottom: 12 })
              .padding({
                left: 16,
                right: 16
              })
            }
            .height('100%')
            .width('100%')
          }
          .tabBar(this.BottomTabBuilder(item, index))
          .padding({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12})
        }, (item: number, index: number) => index + JSON.stringify(item))
        // [EndExclude tabs_view]
      }
      // Change the position and size of the tab at the bottom.
      .barWidth(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? 96 : '100%')
      .barHeight(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? '100%' :
        56 + this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height))
      .barMode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarMode.Scrollable : BarMode.Fixed,
        { nonScrollableLayoutStyle: LayoutStyle.ALWAYS_CENTER })
      .vertical(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG)
      // [End tabs_view]
      .barBackgroundColor('#F1F3F5')
      .onChange((index: number) => {
        this.currentBottomIndex = index;
      })
      .scrollable(false)
    }
  }
}
// 导入响应式断点工具类和窗口工具类
import { WidthBreakpointType } from '../utils/WidthBreakpointType';
import { WindowInfo, WindowUtil } from '../utils/WindowUtil';

/**
 * 应用主页面组件
 *
 * 作为应用的入口页面，展示所有响应式布局示例的导航列表
 * 支持根据不同设备断点（手机、折叠屏、平板）显示不同列数的布局
 *
 * 主要功能：
 * 1. 展示响应式布局示例列表
 * 2. 处理窗口避让区域（状态栏、导航栏等）
 * 3. 提供导航功能跳转到各个布局示例页面
 * 4. 根据设备类型自适应列表显示列数
 */
@Entry
@Component
struct Index {
  // 从全局存储中获取窗口工具类实例，用于获取窗口信息和断点
  @StorageLink('windowUtil') windowUtil: WindowUtil | undefined = undefined;
  // 提供导航路由栈，供子组件使用
  @Provide('pageInfos') pageInfos: NavPathStack = new NavPathStack();

  /**
   * 组件即将销毁时的回调
   * 释放窗口工具类资源，取消事件监听
   */
  aboutToDisappear(): void {
    this.windowUtil?.release();
  }

  /**
   * 构建主页面UI结构
   */
  build() {
    // 使用Navigation组件提供路由导航能力
    Navigation(this.pageInfos) {
      // 滚动容器，支持内容超出屏幕时滚动
      Scroll() {
        // 主内容列容器，处理状态栏避让
        Column() {
          // 页面标题区域
          Column() {
            Text($r('app.string.sample_name'))
              .fontSize(30)
              .fontWeight(700)
              .lineHeight(40)
          }
          .height(112)
          .width('100%')
          .alignItems(HorizontalAlign.Start)
          .justifyContent(FlexAlign.End)
          .margin({ bottom: 12 })

          // 布局示例列表组件
          ListJumpView({
            mainWindowInfo: this.windowUtil?.mainWindowInfo
          })
        }
        .width('100%')
        .padding({
          // 根据系统状态栏高度设置顶部内边距，避免内容被状态栏遮挡
          top: this.getUIContext().px2vp(this.windowUtil?.mainWindowInfo.AvoidSystem?.topRect.height),
          left: 16,
          right: 16
        })
      }
      .width('100%')
      .height('100%')
      .align(Alignment.Top)
      .backgroundColor('#F1F3F5') // 浅灰色背景
      .scrollBar(BarState.Off) // 隐藏滚动条
    }
    .height('100%')
    .width('100%')
    .mode(NavigationMode.Stack) // 栈式导航模式
    .hideBackButton(true) // 隐藏默认返回按钮
    .hideToolBar(true) // 隐藏工具栏
  }
}

/**
 * 布局示例跳转列表组件
 *
 * 展示所有响应式布局示例的可点击列表
 * 根据设备断点自适应显示列数（手机1列，折叠屏和平板2列）
 *
 * 主要功能：
 * 1. 响应式列表布局，支持多列显示
 * 2. 点击跳转到对应的布局示例页面
 * 3. 统一的列表项UI风格
 */
@Component
struct ListJumpView {
  // 从父组件消费导航路由栈
  @Consume('pageInfos') pageInfos: NavPathStack;
  // 监听窗口信息变化，用于响应式布局计算
  @ObjectLink mainWindowInfo: WindowInfo;
  // 布局示例名称资源数组，用于显示列表项标题
  layoutInfos: Resource[] = [$r('app.string.list'), $r('app.string.water_flow'), $r('app.string.swiper'),
    $r('app.string.grid'), $r('app.string.sidebar'), $r('app.string.double_column'), $r('app.string.triple_column'),
    $r('app.string.move_layout'), $r('app.string.tabs'), $r('app.string.indented_layout')];
  // 对应的页面路由名称数组，用于导航跳转
  urlInfos: string[] = ['List', 'WaterFlow', 'Swiper', 'Grid', 'Sidebar', 'DoubleColumn', 'TripleColumn', 'MoveLayout',
    'Bottom/SideTabs', 'IndentedLayout'];

  /**
   * 构建响应式列表UI
   */
  build() {
    // 列表容器，支持多列响应式布局
    List() {
      // 遍历布局示例数据，创建列表项
      ForEach(this.layoutInfos, (item: Resource, index: number) => {
        ListItem() {
          // 列表项行布局
          Row() {
            // 布局示例名称文本
            Text(item)
              .fontSize(16)
            // 填充空白区域，将图标推到右侧
            Blank()
            // 右箭头图标，表示可点击跳转
            Image($r('app.media.chevron_right'))
              .width(12)
              .height(24)
              .opacity(0.4) // 半透明效果
          }
          .height('100%')
          .width('100%')
          .padding({
            left: 12,
            right: 12
          })
          .onClick(() => {
            // 点击时导航到对应的布局示例页面
            this.pageInfos.pushPathByName(this.urlInfos[index], null);
          })
        }
        .height(48) // 统一的列表项高度
      }, (item: Resource, index: number) => JSON.stringify(item) + index) // 唯一键值生成器
    }
    .width('100%')
    // 响应式列数设置：小屏1列，中屏和大屏2列
    .lanes(new WidthBreakpointType(1, 2, 2).getValue(this.mainWindowInfo.widthBp))
    .borderRadius(16) // 圆角边框
    // 列表项分割线样式
    .divider({
      strokeWidth: 1,
      color: '#33000000',
      startMargin: 12,
      endMargin: 12
    })
    .backgroundColor(Color.White) // 白色背景
  }
}
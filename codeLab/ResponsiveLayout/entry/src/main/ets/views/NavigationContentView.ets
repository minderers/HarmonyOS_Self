// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

/**
 * 导航内容视图1组件
 *
 * 这是一个导航目标页面组件，主要特性包括：
 * - 作为Navigation组件的目标页面内容
 * - 提供首页内容显示功能
 * - 支持返回导航操作
 * - 自适应安全区域布局
 * - 隐藏系统标题栏，使用自定义标题栏
 *
 * 用途：在双栏和三栏布局中作为右侧内容区域的首页显示
 *
 * @since 2023-xx-xx
 */
@Component
export struct NavigationContent1 {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  isTripleView: boolean = false; // 是否为三栏视图模式标识
  pathStack: NavPathStack = new NavPathStack(); // 路径导航栈，用于页面路由管理

  /**
   * 构建导航内容1视图
   * 包含返回按钮和页面内容
   */
  build() {
    NavDestination() {
      // 返回按钮行
      Row() {
        Image($r('app.media.arrow_left'))
          .width(24)
          .height(24)
          .margin({ right: 12 }) // 右边距12px
          .onClick(() => {
            // 点击返回按钮，从导航栈中弹出当前页面
            this.pathStack.pop();
          })
      }
      .width('100%') // 宽度占满父容器
      .margin({ bottom: 12 }) // 底部边距12px

      // 页面主要内容区域
      Column() {
        // Navigation标签文本
        Text('Navigation')
          .fontSize(18) // 字体大小18px
          .margin({ bottom: 12 }) // 底部边距12px

        // 导航内容首页标题
        Text($r('app.string.navigation_content_home'))
          .fontSize(24) // 字体大小24px
          .margin({ bottom: 12 }) // 底部边距12px
      }
      .height('100%') // 高度占满父容器
      .width('100%') // 宽度占满父容器
      .justifyContent(FlexAlign.Center) // 垂直居中对齐
    }
    .width('100%') // 导航目标宽度占满父容器
    .height('100%') // 导航目标高度占满父容器
    .onReady((context: NavDestinationContext) => {
      // 导航目标准备就绪时，获取路径栈引用
      this.pathStack = context.pathStack;
    })
    .padding({
      // 顶部内边距：系统状态栏高度 + 12px额外间距
      top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
      // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
      bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
      left: 12, // 左侧内边距12px
      right: 12 // 右侧内边距12px
    })
    .hideTitleBar(true) // 隐藏系统标题栏
    .backgroundColor('#FDBFFC') // 浅粉色背景
  }
}

/**
 * 导航内容视图2组件
 *
 * 这是一个导航目标页面组件，主要特性包括：
 * - 作为Navigation组件的目标页面内容
 * - 提供详情页内容显示功能
 * - 支持返回导航操作和交互状态管理
 * - 自适应安全区域布局
 * - 隐藏系统标题栏，使用自定义布局
 *
 * 用途：在双栏和三栏布局中作为右侧内容区域的详情页显示
 *
 * @since 2023-xx-xx
 */
@Component
export struct NavigationContent2 {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  @State isShow: boolean = false; // 显示状态标识，用于交互反馈
  pathStack: NavPathStack = new NavPathStack(); // 路径导航栈，用于页面路由管理

  /**
   * 构建导航内容2视图
   * 包含绝对定位的返回按钮和居中的页面内容
   */
  build() {
    NavDestination() {
      Column() {
        // 返回按钮，使用绝对定位放置在左上角
        Image($r('app.media.arrow_left'))
          .width(24)
          .height(24)
          .position({
            x: 0, // X坐标为0，位于左侧
            y: 0  // Y坐标为0，位于顶部
          })
          .onClick(() => {
            // 点击返回按钮，从导航栈中弹出当前页面
            this.pathStack.pop();
          })

        // Navigation标签文本
        Text('Navigation')
          .fontSize(18) // 字体大小18px
          .margin({ bottom: 12 }) // 底部边距12px

        // 导航内容首页标题（可点击）
        Text($r('app.string.navigation_content_home'))
          .fontSize(24) // 字体大小24px
          .onClick(() => {
            // 点击文本时改变显示状态
            this.isShow = true;
          })
      }
      .height('100%') // 高度占满父容器
      .width('100%') // 宽度占满父容器
      .justifyContent(FlexAlign.Center) // 垂直居中对齐
      .padding({
        // 顶部内边距：系统状态栏高度 + 12px额外间距
        top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
        // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
        bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
        left: 16, // 左侧内边距16px
        right: 16 // 右侧内边距16px
      })
    }
    .width('100%') // 导航目标宽度占满父容器
    .height('100%') // 导航目标高度占满父容器
    .onReady((context: NavDestinationContext) => {
      // 导航目标准备就绪时，获取路径栈引用
      this.pathStack = context.pathStack;
    })
    .hideTitleBar(true) // 隐藏系统标题栏
    .backgroundColor('#FDBFFC') // 浅粉色背景
  }
}
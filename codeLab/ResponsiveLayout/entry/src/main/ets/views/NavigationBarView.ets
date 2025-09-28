// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

/**
 * 导航栏视图组件
 *
 * 这是一个导航栏组件，主要特性包括：
 * - 在双栏和三栏布局中作为左侧导航区域
 * - 支持侧边栏显示/隐藏切换（仅在三栏模式下）
 * - 提供页面导航功能，可跳转到不同的内容页面
 * - 根据屏幕断点自动加载默认页面内容
 * - 自适应安全区域，避免系统UI遮挡
 *
 * 响应式特性：
 * - 在非小屏设备上自动加载默认内容页面
 * - 支持双栏和三栏布局模式的切换
 * - 侧边栏切换按钮仅在三栏模式且侧边栏隐藏时显示
 *
 * @since 2023-xx-xx
 */
@Component
export struct NavigationBarView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  @Link isShowingSidebar: boolean; // 侧边栏显示状态标识，与父组件双向绑定
  isTriView: boolean = false; // 是否为三栏视图模式标识
  pageInfos: NavPathStack = new NavPathStack(); // 页面信息导航栈
  pathStack: NavPathStack = new NavPathStack(); // 路径导航栈，用于页面路由管理

  /**
   * 组件即将出现时的生命周期回调
   * 在非小屏设备上自动加载默认内容页面
   */
  aboutToAppear(): void {
    // 如果不是小屏设备，自动加载默认的首页内容
    if (this.mainWindowInfo.widthBp !== WidthBreakpoint.WIDTH_SM) {
      this.pathStack.pushPathByName('navigationContent1', null);
    }
  }

  /**
   * 构建导航栏视图
   * 包含标题栏和导航按钮区域
   */
  build() {
    Column() {
      // 标题栏，包含侧边栏切换按钮、返回按钮和标题文本
      Row() {
        // 侧边栏切换按钮（仅在三栏模式且侧边栏隐藏时显示）
        Image($r('app.media.open_sidebar'))
          .width(40)
          .height(40)
          .margin({ right: 12 }) // 右边距12px
          .onClick(() => {
            // 切换侧边栏显示状态
            this.isShowingSidebar = !this.isShowingSidebar;
          })
          // 可见性控制：仅在三栏模式且侧边栏隐藏时显示
          .visibility(!this.isShowingSidebar && this.isTriView ? Visibility.Visible : Visibility.None)

        // 返回按钮
        Image($r('app.media.ic_public_back'))
          .width(40)
          .height(40)
          .margin({ right: 12 }) // 右边距12px
          .onClick(() => {
            // 点击返回按钮，从页面导航栈中弹出当前页面
            this.pageInfos.pop();
          })

        // 页面标题文本，根据布局模式显示不同标题
        Text(this.isTriView ? $r('app.string.triple_column') : $r('app.string.double_column'))
          .fontSize(24) // 标题字体大小24px
      }
      .width('100%') // 标题栏占满宽度
      .margin({ bottom: 12 }) // 底部边距12px

      // 导航内容区域
      Column() {
        // Navigation标签文本
        Text('Navigation')
          .fontSize(18) // 字体大小18px
          .margin({ bottom: 12 }) // 底部边距12px

        // 导航栏描述文本
        Text($r('app.string.navigation_bar'))
          .fontSize(24) // 字体大小24px
          .margin({ bottom: 12 }) // 底部边距12px

        // 跳转到首页内容的按钮
        Button($r('app.string.jump_content_home'))
          .fontSize(12) // 按钮文字大小12px
          .width(150) // 按钮宽度150px
          .margin({ bottom: 12 }) // 底部边距12px
          .onClick(() => {
            // 导航到内容首页
            this.pathStack.pushPathByName('navigationContent1', null);
          })

        // 跳转到详情页内容的按钮
        Button($r('app.string.jump_content_detail'))
          .fontSize(12) // 按钮文字大小12px
          .width(150) // 按钮宽度150px
          .onClick(() => {
            // 导航到内容详情页
            this.pathStack.pushPathByName('navigationContent2', null);
          })
      }
      .justifyContent(FlexAlign.Center) // 垂直居中对齐
      .layoutWeight(1) // 设置布局权重，占用剩余空间
      .width('100%') // 宽度占满父容器
    }
    .height('100%') // 列容器高度占满父容器
    .width('100%') // 列容器宽度占满父容器
    .padding({
      // 顶部内边距：系统状态栏高度 + 12px额外间距
      top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
      // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
      bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
      left: 16, // 左侧内边距16px
      right: 16 // 右侧内边距16px
    })
  }
}
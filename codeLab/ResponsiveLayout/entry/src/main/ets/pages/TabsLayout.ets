// 导入窗口工具类和选项卡视图组件
import { WindowUtil } from '../utils/WindowUtil';
import { TabsView } from '../views/TabsView';

/**
 * 选项卡布局页面构建器函数
 *
 * 用于Navigation路由系统的页面构建，提供选项卡布局示例页面的创建入口
 */
@Builder
export function TabsBuilder() {
  TabsLayout();
}

/**
 * 选项卡布局示例页面组件
 *
 * 展示响应式选项卡布局的实现方式，适配不同设备尺寸
 * 在不同断点下调整选项卡的显示位置（底部/侧边）
 *
 * 主要特性：
 * 1. 响应式选项卡布局，支持多设备适配
 * 2. 基于断点的选项卡位置切换（底部/侧边）
 * 3. 导航页面容器，支持返回功能
 * 4. 选项卡内容区域自适应调整
 */
@Component
export struct TabsLayout {
  // 从全局存储获取窗口工具类实例
  @StorageLink('windowUtil') windowUtil: WindowUtil | undefined = undefined;
  // 页面导航路由栈
  pageInfos: NavPathStack = new NavPathStack();

  /**
   * 构建选项卡布局页面UI
   */
  build() {
    // 导航目标页面容器
    NavDestination() {
      // 选项卡视图组件，传入窗口信息和导航栈
      TabsView({
        mainWindowInfo: this.windowUtil!.mainWindowInfo,
        pageInfos: this.pageInfos
      })
    }
    .height('100%')
    .width('100%')
    // 页面准备就绪时的回调，获取导航路由栈
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack;
    })
    .hideTitleBar(true) // 隐藏默认标题栏，使用自定义标题栏
  }
}
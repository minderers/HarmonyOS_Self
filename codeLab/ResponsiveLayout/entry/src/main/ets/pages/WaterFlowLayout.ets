// 导入窗口工具类和瀑布流视图组件
import { WindowUtil } from '../utils/WindowUtil';
import { WaterFlowView } from '../views/WaterFlowView';

/**
 * 瀑布流布局页面构建器函数
 *
 * 用于Navigation路由系统的页面构建，提供瀑布流布局示例页面的创建入口
 */
@Builder
export function WaterFlowBuilder() {
  WaterFlowLayout();
}

/**
 * 瀑布流布局示例页面组件
 *
 * 展示响应式瀑布流布局的实现方式，适配不同设备尺寸
 * 通过WaterFlow组件实现不等高内容项的自动排列效果
 *
 * 主要特性：
 * 1. 响应式瀑布流布局，支持多设备适配
 * 2. 基于断点的列数自动调整
 * 3. 导航页面容器，支持返回功能
 * 4. 不等高内容项的自动流式排列
 */
@Component
export struct WaterFlowLayout {
  // 从全局存储获取窗口工具类实例
  @StorageLink('windowUtil') windowUtil: WindowUtil | undefined = undefined;
  // 页面导航路由栈
  pageInfos: NavPathStack = new NavPathStack();

  /**
   * 构建瀑布流布局页面UI
   */
  build() {
    // 导航目标页面容器
    NavDestination() {
      // 瀑布流视图组件，传入窗口信息和导航栈
      WaterFlowView({
        mainWindowInfo: this.windowUtil?.mainWindowInfo,
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
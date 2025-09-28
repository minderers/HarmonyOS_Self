// 导入窗口工具类和移动视图组件
import { WindowUtil } from '../utils/WindowUtil';
import { MoveView } from '../views/MoveView';

/**
 * 移动布局页面构建器函数
 *
 * 用于Navigation路由系统的页面构建，提供移动布局示例页面的创建入口
 */
@Builder
export function MoveBuilder() {
  MoveLayout();
}

/**
 * 移动布局示例页面组件
 *
 * 展示响应式移动布局的实现方式，适配不同设备尺寸
 * 通过元素位置的动态调整来适应不同屏幕宽度
 *
 * 主要特性：
 * 1. 响应式移动布局，支持多设备适配
 * 2. 基于断点的元素位置重新排列
 * 3. 导航页面容器，支持返回功能
 * 4. 布局元素的流式重排功能
 */
@Component
export struct MoveLayout {
  // 从全局存储获取窗口工具类实例
  @StorageLink('windowUtil') windowUtil: WindowUtil | undefined = undefined;
  // 页面导航路由栈
  pathStack: NavPathStack = new NavPathStack();

  /**
   * 构建移动布局页面UI
   */
  build() {
    // 导航目标页面容器
    NavDestination() {
      // 移动视图组件，传入窗口信息和导航栈
      MoveView({
        mainWindowInfo: this.windowUtil?.mainWindowInfo,
        pathStack: this.pathStack
      })
    }
    .height('100%')
    .width('100%')
    // 页面准备就绪时的回调，获取导航路由栈
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack;
    })
    .hideTitleBar(true) // 隐藏默认标题栏，使用自定义标题栏
  }
}
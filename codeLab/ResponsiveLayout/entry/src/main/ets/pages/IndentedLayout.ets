// 导入窗口工具类和缩进视图组件
import { WindowUtil } from '../utils/WindowUtil';
import { IndentedView } from '../views/IndentedView';

/**
 * 缩进布局页面构建器函数
 *
 * 用于Navigation路由系统的页面构建，提供缩进布局示例页面的创建入口
 */
@Builder
export function IndentedBuilder() {
  IndentedLayout();
}

/**
 * 缩进布局示例页面组件
 *
 * 展示响应式缩进布局的实现方式，适配不同设备尺寸
 * 通过调整内容区域的缩进量来适应不同屏幕宽度
 *
 * 主要特性：
 * 1. 响应式缩进布局，支持多设备适配
 * 2. 基于断点的缩进量自动调整
 * 3. 导航页面容器，支持返回功能
 * 4. 内容区域居中对齐效果
 */
@Component
export struct IndentedLayout {
  // 从全局存储获取窗口工具类实例
  @StorageLink('windowUtil') windowUtil: WindowUtil | undefined = undefined;
  // 页面导航路由栈
  pathStack: NavPathStack = new NavPathStack();

  /**
   * 构建缩进布局页面UI
   */
  build() {
    // 导航目标页面容器
    NavDestination() {
      // 缩进视图组件，传入窗口信息和导航栈
      IndentedView({
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
// 导入窗口工具类和滑动视图组件
import { WindowUtil } from '../utils/WindowUtil';
import { SwiperView } from '../views/SwiperView';

/**
 * 滑动布局页面构建器函数
 *
 * 用于Navigation路由系统的页面构建，提供滑动布局示例页面的创建入口
 */
@Builder
export function SwiperBuilder() {
  SwiperLayout();
}

/**
 * 滑动布局示例页面组件
 *
 * 展示响应式滑动布局的实现方式，适配不同设备尺寸
 * 通过Swiper组件实现内容的横向滑动浏览功能
 *
 * 主要特性：
 * 1. 响应式滑动布局，支持多设备适配
 * 2. 基于断点的滑动项数量调整
 * 3. 导航页面容器，支持返回功能
 * 4. 滑动指示器和控制功能
 */
@Component
export struct SwiperLayout {
  // 从全局存储获取窗口工具类实例
  @StorageLink('windowUtil') windowUtil: WindowUtil | undefined = undefined;
  // 页面导航路由栈
  pageInfos: NavPathStack = new NavPathStack();

  /**
   * 构建滑动布局页面UI
   */
  build() {
    // 导航目标页面容器
    NavDestination() {
      // 滑动视图组件，传入窗口信息和导航栈
      SwiperView({
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
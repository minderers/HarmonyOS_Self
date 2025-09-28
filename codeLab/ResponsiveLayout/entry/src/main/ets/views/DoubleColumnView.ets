// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';
// 导入导航栏视图组件
import { NavigationBarView } from './NavigationBarView';
// 导入导航内容视图组件
import { NavigationContent1, NavigationContent2 } from './NavigationContentView';

/**
 * 双栏布局视图组件
 *
 * 这是一个响应式双栏布局组件，主要特性包括：
 * - 根据屏幕宽度自适应切换导航模式（堆栈模式/分割模式）
 * - 在小屏幕设备上使用堆栈模式，在中大屏设备上使用分割模式
 * - 支持左右双栏布局，左侧为导航栏，右侧为内容区域
 * - 提供页面路由和导航功能
 *
 * 响应式断点：
 * - WIDTH_SM（小屏）：使用堆栈导航模式，单栏显示
 * - WIDTH_MD及以上（中大屏）：使用分割导航模式，双栏显示
 *
 * @since 2023-xx-xx
 */
@Component
export struct DoubleColumnView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  @State isShowingSidebar: boolean = false; // 侧边栏显示状态标识
  pageInfos: NavPathStack = new NavPathStack(); // 页面信息导航栈
  pathStack: NavPathStack = new NavPathStack(); // 路径导航栈，用于页面路由管理

  /**
   * 页面映射构建器
   * 根据页面名称返回对应的页面组件
   * @param name 页面名称标识符
   */
  @Builder
  PageMap(name: string) {
    if (name === 'navigationContent1') {
      // 构建导航内容1页面
      NavigationContent1({ mainWindowInfo: this.mainWindowInfo })
    } else if (name === 'navigationContent2') {
      // 构建导航内容2页面
      NavigationContent2({ mainWindowInfo: this.mainWindowInfo })
    }
  }

  /**
   * 构建双栏布局视图
   * 根据屏幕断点自适应选择导航模式
   */
  build() {
    // [Start double_column_view]
    Navigation(this.pathStack) {
      // [StartExclude double_column_view]
      // 导航栏视图组件，作为双栏布局的左侧导航区域
      NavigationBarView({
        mainWindowInfo: this.mainWindowInfo,
        pageInfos: this.pageInfos,
        pathStack: this.pathStack,
        isShowingSidebar: this.isShowingSidebar
      })
      // [EndExclude double_column_view]
    }
    // 响应式导航模式：小屏使用堆栈模式，中大屏使用分割模式
    .mode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : NavigationMode.Split)
    // [End double_column_view]
    .width('100%') // 设置宽度为100%，占满父容器
    .height('100%') // 设置高度为100%，占满父容器
    .navDestination(this.PageMap) // 设置导航目标页面映射
    .backgroundColor('#B8EEB2') // 设置背景色为浅绿色
    .navBarWidth('50%') // 设置导航栏宽度为50%（在分割模式下生效）
  }
}
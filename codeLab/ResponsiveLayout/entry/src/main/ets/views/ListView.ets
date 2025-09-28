// 导入宽度断点类型工具类，用于响应式设计
import { WidthBreakpointType } from '../utils/WidthBreakpointType';
// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

/**
 * 列表视图组件
 *
 * 这是一个响应式列表布局组件，主要特性包括：
 * - 根据屏幕宽度动态调整列表的列数（lanes）和间距
 * - 支持多列布局，在大屏设备上显示多列，在小屏设备上显示单列
 * - 自适应列表项间距，不同断点下使用不同的间距值
 * - 智能布局权重管理，根据屏幕尺寸动态调整
 *
 * 响应式断点配置：
 * - 小屏（SM）：1列布局，8px间距，使用布局权重1
 * - 中屏（MD）：2列布局，12px间距，不使用布局权重
 * - 大屏（LG及以上）：3列布局，16px间距，不使用布局权重
 *
 * @since 2023-xx-xx
 */
@Component
export struct ListView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  pageInfos: NavPathStack = new NavPathStack(); // 页面导航栈，用于页面路由管理
  infoArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 列表数据源数组，包含12个示例项目
  listScroller: ListScroller = new ListScroller(); // 列表滚动控制器

  /**
   * 构建列表视图
   * 根据屏幕断点自适应调整列表布局
   */
  build() {
    Column() {
      // 标题栏，包含返回按钮和标题文本
      Row() {
        Image($r('app.media.ic_public_back'))
          .width(40)
          .height(40)
          .margin({ right: 12 }) // 右边距12px
          .onClick(() => {
            // 点击返回按钮，从导航栈中弹出当前页面
            this.pageInfos.pop();
          })
        // 页面标题文本
        Text($r('app.string.list'))
          .fontSize(24) // 标题字体大小24px
      }
      .width('100%') // 标题栏占满宽度
      .margin({ bottom: 12 }) // 底部边距12px

      // [Start list_view]
      // 响应式列表容器
      List({
        // 动态间距：小屏8px，中屏12px，大屏16px
        space: new WidthBreakpointType(8, 12, 16).getValue(this.mainWindowInfo.widthBp),
        scroller: this.listScroller // 绑定滚动控制器
      }) {
        // [StartExclude list_view]
        // 遍历数据源，生成列表项
        ForEach(this.infoArray, (item: number, index: number) => {
          ListItem() {
            Row() {} // 空行组件作为列表项内容占位符
            .width('100%') // 宽度占满列表项
            .height(60) // 固定高度60px
            .borderRadius(16) // 圆角半径16px
            .backgroundColor('#F1F3F5') // 浅灰色背景
            .margin({
              // 最后一项的底部边距处理：小屏避免导航指示器遮挡，大屏使用固定间距
              bottom: index === this.infoArray.length - 1 ?
              (this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ?
              this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) : 12) : 0
            })
          }
        }, (item: number, index: number) => JSON.stringify(item) + index) // 生成唯一键值
        // [EndExclude list_view]
      }
      .scrollBar(BarState.Off) // 隐藏滚动条
      // 响应式列数配置：小屏1列，中屏2列，大屏3列，列间距12px
      .lanes(new WidthBreakpointType(1, 2, 3).getValue(this.mainWindowInfo.widthBp), 12)
      // [End list_view]
      // 动态布局权重：小屏使用权重1占用剩余空间，大屏不使用权重
      .layoutWeight(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 1 : -1)
      .width('100%') // 列表宽度占满父容器
    }
    .width('100%') // 列容器宽度占满屏幕
    .height('100%') // 列容器高度占满屏幕
    .padding({
      // 顶部内边距：系统状态栏高度 + 12px额外间距
      top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
      left: 16, // 左侧内边距16px
      right: 16 // 右侧内边距16px
    })
  }
}
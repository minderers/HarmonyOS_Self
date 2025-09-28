// 导入JSON工具类，用于数据序列化和反序列化
import { JSON } from '@kit.ArkTS';
// 导入宽度断点类型工具类，用于响应式设计
import { WidthBreakpointType } from '../utils/WidthBreakpointType';
// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

/**
 * 网格布局视图组件
 *
 * 这是一个响应式网格布局组件，主要特性包括：
 * - 根据屏幕宽度动态调整网格列数和显示项目数量
 * - 支持触摸滚动，隐藏滚动条以提供更好的用户体验
 * - 自适应安全区域，避免系统UI遮挡
 * - 网格项目采用固定宽高比（1.8）设计
 *
 * 响应式断点配置：
 * - 小屏（SM）：2列网格，显示4个项目
 * - 中屏（MD）：3列网格，显示2个项目
 * - 大屏（LG）：4列网格，显示0个项目（显示全部）
 *
 * @since 2023-xx-xx
 */
@Component
export struct GridView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  pageInfos: NavPathStack = new NavPathStack(); // 页面导航栈，用于页面路由管理
  infoArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7]; // 网格数据源数组，包含8个示例项目
  listScroller: ListScroller = new ListScroller(); // 列表滚动控制器

  /**
   * 构建网格布局视图
   * 根据屏幕断点自适应调整网格列数和显示内容
   */
  build() {
    Scroll() {
      Column() {
        // 标题栏，包含返回按钮和标题文本
        Row() {
          // 返回按钮容器
          Row() {
            Image($r('app.media.ic_public_back'))
              .width(40)
              .height(40)
              .onClick(() => {
                // 点击返回按钮，从导航栈中弹出当前页面
                this.pageInfos.pop();
              })
          }
          .height(40)
          .width(40)
          .borderRadius(40) // 圆形按钮背景
          .backgroundColor('#0D000000') // 半透明黑色背景
          .justifyContent(FlexAlign.Center) // 居中对齐图标
          .margin({ right: 12 }) // 右边距12px

          // 页面标题文本
          Text($r('app.string.grid'))
            .fontSize(24) // 标题字体大小24px
        }
        .width('100%') // 标题栏占满宽度
        .margin({ bottom: 12 }) // 底部边距12px

        // [Start grid_view]
        // 响应式网格容器
        Grid() {
          // 遍历数据源，根据断点配置动态截取显示项目
          ForEach(this.infoArray.slice(new WidthBreakpointType(4, 2, 0).getValue(this.mainWindowInfo.widthBp)),
            (item: number) => {
              // [StartExclude grid_view]
              // 网格项目组件
              GridItem() {
                Row() {} // 空行组件作为网格项目内容占位符
                .width('100%') // 宽度占满网格项目
                .aspectRatio(1.8) // 设置宽高比为1.8（宽：高 = 1.8:1）
                .borderRadius(16) // 圆角半径16px
                .backgroundColor('#F1F3F5') // 浅灰色背景
              }
              // [EndExclude grid_view]
            }, (item: number, index: number) => JSON.stringify(item) + index) // 生成唯一键值
        }
        .width('100%') // 网格宽度占满父容器
        // 响应式列数模板：小屏2列，中屏3列，大屏4列
        .columnsTemplate(`repeat(${new WidthBreakpointType(2, 3, 4).getValue(this.mainWindowInfo.widthBp)}, 1fr)`)
        .columnsGap(12) // 列间距12px
        .rowsGap(12) // 行间距12px
        // [End grid_view]
      }
      .width('100%') // 列容器宽度占满父容器
    }
    .width('100%') // 滚动容器宽度占满屏幕
    .height('100%') // 滚动容器高度占满屏幕
    .padding({
      // 顶部内边距：系统状态栏高度 + 12px额外间距
      top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
      // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
      bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
      left: 16, // 左侧内边距16px
      right: 16 // 右侧内边距16px
    })
    .align(Alignment.Top) // 内容顶部对齐
    .scrollBar(BarState.Off) // 隐藏滚动条，提供更简洁的视觉效果
  }
}
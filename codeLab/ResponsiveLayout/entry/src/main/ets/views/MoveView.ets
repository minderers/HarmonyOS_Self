// 导入宽度断点类型工具类，用于响应式设计
import { WidthBreakpointType } from '../utils/WidthBreakpointType';
// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

/**
 * 移动端音乐播放器视图组件
 *
 * 这是一个响应式音乐播放器界面组件，主要特性包括：
 * - 采用栅格系统实现响应式布局，适配不同屏幕尺寸
 * - 小屏设备上使用垂直堆叠布局，大屏设备上使用左右分栏布局
 * - 包含专辑封面、播放信息和歌曲列表三个主要区域
 * - 底部固定播放控制栏，支持上一曲、播放/暂停、下一曲操作
 *
 * 响应式布局特性：
 * - 小屏（SM）：垂直堆叠，播放信息区域高度自动计算
 * - 中大屏（MD及以上）：左右分栏，左侧播放信息，右侧歌曲列表
 *
 * @since 2023-xx-xx
 */
@Component
export struct MoveView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  pathStack: NavPathStack = new NavPathStack(); // 路径导航栈，用于页面路由管理

  /**
   * 构建音乐播放器界面
   * 根据屏幕尺寸自适应选择垂直或水平布局
   */
  build() {
    Column() {
      // [Start move_view]
      // 主要内容区域的响应式栅格容器
      GridRow({
        columns: { xs: 4, sm: 4, md: 8, lg: 12, xl: 12 }, // 各断点下的列数配置
        gutter: 0, // 列间距为0
        breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp']}, // 断点阈值数组
        direction: GridRowDirection.Row // 水平排列方向
      }) {
        // 左侧播放信息区域（在小屏时为上半部分）
        GridCol({
          span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }, // 各断点下占用的列数
          offset: 0 // 无偏移
        }) {
          // [StartExclude move_view]
          Column() {
            // 返回按钮
            Image($r('app.media.ic_public_back'))
              .width(40)
              .height(40)
              .margin({ bottom: 12 }) // 底部边距12px
              .onClick(() => {
                // 点击返回按钮，从导航栈中弹出当前页面
                this.pathStack.pop();
              })

            // 专辑封面和播放信息的嵌套栅格
            GridRow({
              columns: { xs: 8, sm: 8, md: 8, lg: 12, xl: 12 }, // 内层栅格列数配置
              gutter: 8, // 列间距8px
              breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp']}, // 断点阈值数组
              direction: GridRowDirection.Row // 水平排列方向
            }) {
              // 专辑封面区域
              GridCol({
                span: { xs: 5, sm: 5, md: 8, lg: 12, xl: 12 }, // 各断点下占用的列数
                offset: 0 // 无偏移
              }) {
                Row() {} // 空行组件作为专辑封面占位符
                .width('100%') // 宽度占满栅格列
                .aspectRatio(1) // 正方形宽高比
                .borderRadius(24) // 圆角半径24px
                .backgroundColor('#F1F3F5') // 浅灰色背景
                .margin({
                  // 动态左右边距：小屏无边距，大屏8px边距
                  left: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 0 : 8,
                  right: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 0 : 8,
                  bottom: 12 // 底部边距12px
                })
              }
              .layoutWeight(1) // 设置布局权重

              // 播放信息文本区域
              GridCol({
                span: { xs: 3, sm: 3, md: 8, lg: 12, xl: 12 }, // 各断点下占用的列数
                offset: 0 // 无偏移
              }) {
                Column() {
                  // 播放列表标题
                  Text($r('app.string.playlist'))
                    .fontSize(20) // 字体大小20px
                    .opacity(0.8) // 透明度80%
                    .margin({ bottom: 8 }) // 底部边距8px
                  // 歌曲描述文本
                  Text($r('app.string.song_description'))
                    .fontSize(16) // 字体大小16px
                    .opacity(0.5) // 透明度50%
                }
                .width('100%') // 宽度占满栅格列
                .justifyContent(FlexAlign.Center) // 垂直居中对齐
                // 水平对齐方式：小屏左对齐，大屏居中对齐
                .alignItems(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? HorizontalAlign.Start :
                  HorizontalAlign.Center)
                .layoutWeight(1) // 设置布局权重
              }
              .layoutWeight(1) // 设置布局权重
              .width('100%') // 宽度占满父容器
            }
            .width('100%') // 内层栅格宽度占满父容器
            .layoutWeight(1) // 设置布局权重，占用剩余空间
          }
          .height('100%') // 列容器高度占满栅格列
          .alignItems(HorizontalAlign.Start) // 水平左对齐
          .padding({
            // 动态左右内边距：小屏12px，中屏16px，大屏24px
            left: new WidthBreakpointType(12, 16, 24).getValue(this.mainWindowInfo.widthBp),
            right: new WidthBreakpointType(12, 16, 24).getValue(this.mainWindowInfo.widthBp)
          })
          // [EndExclude move_view]
        }
        // 动态高度：小屏使用计算高度，大屏占满容器
        .height(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? this.getGridColHeight() : '100%')
        // 顶部内边距：状态栏高度 + 12px额外间距
        .padding({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12})
        .backgroundColor('#AAD3F1') // 浅蓝色背景

        // 右侧歌曲列表区域（在小屏时为下半部分）
        GridCol({
          span: { xs: 4, sm: 4, md: 4, lg: 8, xl: 8 }, // 各断点下占用的列数
          offset: 0 // 无偏移
        }) {
          // [StartExclude move_view]
          // 歌曲列表滚动容器
          Scroll() {
            Column() {
              // 歌曲列表标题
              Text($r('app.string.song_list'))
                .fontSize(16) // 字体大小16px
                .opacity(0.8) // 透明度80%
            }
            .alignItems(HorizontalAlign.Start) // 水平左对齐
            // 动态高度：小屏固定600px，大屏占满容器
            .height(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 600 : '100%')
            .width('100%') // 宽度占满滚动容器
            .padding({
              left: 16, // 左侧内边距16px
              right: 16, // 右侧内边距16px
              top: 12, // 顶部内边距12px
              bottom: 12 // 底部内边距12px
            })
          }
          .width('100%') // 滚动容器宽度占满栅格列
          .scrollBar(BarState.Off) // 隐藏滚动条
          // [EndExclude move_view]
        }
        .backgroundColor(Color.Pink) // 粉色背景
        .layoutWeight(1) // 设置布局权重
        // 动态顶部内边距：小屏无内边距，大屏加状态栏高度
        .padding({ top: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 0 :
          this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) })
      }
      // [End move_view]
      .width('100%') // 栅格行宽度占满父容器
      .layoutWeight(1) // 设置布局权重，占用剩余空间

      // 底部播放控制栏
      Row() {
        // 播放控制按钮组
        Row() {
          // 上一曲按钮
          Column() {
            Image($r('app.media.ic_previous'))
              .height(24) // 图标高度24px
              .aspectRatio(1) // 正方形宽高比
          }
          .layoutWeight(1) // 设置布局权重，平均分配空间
          // 播放/暂停按钮
          Column() {
            Image($r('app.media.ic_play_all'))
              .height(24) // 图标高度24px
              .aspectRatio(1) // 正方形宽高比
          }
          .layoutWeight(1) // 设置布局权重，平均分配空间
          // 下一曲按钮
          Column() {
            Image($r('app.media.ic_next'))
              .height(24) // 图标高度24px
              .aspectRatio(1) // 正方形宽高比
          }
          .layoutWeight(1) // 设置布局权重，平均分配空间
        }
        .width(120) // 按钮组宽度120px
        .height('100%') // 高度占满控制栏
        .margin({ right: 16 }) // 右边距16px
      }
      .justifyContent(FlexAlign.End) // 右对齐
      // 控制栏高度：导航指示器高度 + 32px
      .height(this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) + 32)
      .width('100%') // 宽度占满屏幕
      .backgroundColor('#F1F3F5') // 浅灰色背景
      // 底部内边距：导航指示器高度，避免被系统导航栏遮挡
      .padding({ bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) })
    }
  }

  /**
   * 计算小屏模式下左侧栅格列的高度
   * 根据状态栏、返回按钮和图片区域的高度进行计算
   * @returns 计算后的栅格列高度值
   */
  getGridColHeight(): number {
    let gridColHeight: number = 0;
    // 顶部状态栏避让区域的高度
    gridColHeight += this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height);
    // 返回按钮行的高度（40px图标 + 12px边距）
    gridColHeight += 40 + 12;
    // 专辑封面图片的高度（基于屏幕宽度计算的5/8比例 + 上下边距）
    gridColHeight += (this.getUIContext().px2vp(this.mainWindowInfo.windowSize.width) - 32) * 5 / 8 + 12 + 12;
    return gridColHeight;
  }
}
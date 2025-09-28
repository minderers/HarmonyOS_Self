// 导入宽度断点类型工具类，用于响应式设计
import { WidthBreakpointType } from '../utils/WidthBreakpointType';
// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

/**
 * 瀑布流布局视图组件
 *
 * 这是一个响应式瀑布流布局组件，主要特性包括：
 * - 根据屏幕宽度动态调整列数（2-4列）
 * - 支持不同高度的瀑布流项目自动排列
 * - 随机生成项目高度，模拟真实瀑布流效果
 * - 自适应安全区域，避免系统UI遮挡
 * - 支持垂直滚动浏览所有内容
 *
 * 响应式断点配置：
 * - 小屏（SM）：2列瀑布流
 * - 中屏（MD）：3列瀑布流
 * - 大屏（LG及以上）：4列瀑布流
 *
 * @since 2023-xx-xx
 */
@Component
export struct WaterFlowView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  pageInfos: NavPathStack = new NavPathStack(); // 页面导航栈，用于页面路由管理
  dataSource: WaterFlowDataSource = new WaterFlowDataSource(); // 瀑布流数据源
  itemHeightArray: number[] = []; // 瀑布流项目高度数组

  /**
   * 计算瀑布流项目的随机高度
   * 生成200-300之间的随机高度值，模拟真实瀑布流效果
   * @returns 随机高度值
   */
  getSize(): number {
    return 200 + Math.random() * 100;
  }

  /**
   * 设置瀑布流项目高度数组
   * 为24个瀑布流项目生成随机高度
   */
  setItemSizeArray() {
    for (let i = 0; i < 24; i++) {
      this.itemHeightArray.push(this.getSize());
    }
  }

  /**
   * 组件即将出现时的生命周期回调
   * 初始化数据源和项目高度数组
   */
  aboutToAppear(): void {
    this.dataSource = new WaterFlowDataSource();
    this.setItemSizeArray();
  }

  build() {
    Scroll() {
      Column() {
        Row() {
          Image($r('app.media.ic_public_back'))
            .width(40)
            .height(40)
            .margin({ right: 12 })
            .onClick(() => {
              this.pageInfos.pop();
            })
          Text($r('app.string.water_flow'))
            .fontSize(24)
        }
        .width('100%')
        .margin({ bottom: 12 })

        // [Start water_flow_view]
        WaterFlow() {
          LazyForEach(this.dataSource, (item: number, index: number) => {
            FlowItem() {
              Row() {}
              .width('100%')
              .height('100%')
              .borderRadius(16)
              .backgroundColor('#F1F3F5')
            }
            .width('100%')
            .height(this.itemHeightArray[index])
          }, (item: number, index: number) => JSON.stringify(item) + index)
        }
        .columnsTemplate(`repeat(${new WidthBreakpointType(2, 3, 4).getValue(this.mainWindowInfo.widthBp)}, 1fr)`)
        .columnsGap(12)
        .rowsGap(12)
        .width('100%')
        // [End water_flow_view]
      }
      .padding({
        top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
        bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
        left: 16,
        right: 16
      })
    }
    .width('100%')
    .height('100%')
    .align(Alignment.Center)
    .scrollBar(BarState.Off)
  }
}

export class WaterFlowDataSource implements IDataSource {
  private dataArray: number[] = [];

  constructor() {
    for (let i = 0; i < 24; i++) {
      this.dataArray.push(i);
    }
  }

  public getData(index: number): number {
    return this.dataArray[index];
  }

  public totalCount(): number {
    return this.dataArray.length;
  }

  registerDataChangeListener(listener: DataChangeListener): void {
  }

  unregisterDataChangeListener() {
  }
}
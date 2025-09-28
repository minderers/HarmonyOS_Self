/**
 * 宽度断点类型工具类
 *
 * 用于根据设备宽度断点返回对应的值，实现响应式设计
 * 支持泛型，可以存储任意类型的值（数字、字符串、对象等）
 *
 * 断点说明：
 * - sm (small): 对应WIDTH_XS和WIDTH_SM断点，主要用于手机设备
 * - md (medium): 对应WIDTH_MD断点，主要用于中等尺寸设备如小平板
 * - lg (large): 对应WIDTH_LG及以上断点，主要用于大屏设备如平板、三折叠等
 *
 * 使用示例：
 * - 列数设置: new WidthBreakpointType(1, 2, 3).getValue(currentBreakpoint)
 * - 间距设置: new WidthBreakpointType(8, 12, 16).getValue(currentBreakpoint)
 */
export class WidthBreakpointType<T> {
  // 小屏幕设备(手机)对应的值
  sm: T;
  // 中等屏幕设备(小平板)对应的值
  md: T;
  // 大屏幕设备(大平板、三折叠)对应的值
  lg: T;

  /**
   * 构造函数
   *
   * @param sm - 小屏幕设备对应的值
   * @param md - 中等屏幕设备对应的值
   * @param lg - 大屏幕设备对应的值
   */
  constructor(sm: T, md: T, lg: T) {
    this.sm = sm;
    this.md = md;
    this.lg = lg;
  }

  /**
   * 根据宽度断点获取对应的值
   *
   * @param widthBp - 当前设备的宽度断点
   * @returns 对应断点的值
   */
  getValue(widthBp: WidthBreakpoint): T {
    // XS和SM断点使用小屏幕值
    if (widthBp === WidthBreakpoint.WIDTH_XS || widthBp === WidthBreakpoint.WIDTH_SM) {
      return this.sm;
    }
    // MD断点使用中等屏幕值
    if (widthBp === WidthBreakpoint.WIDTH_MD) {
      return this.md;
    } else {
      // LG及以上断点使用大屏幕值
      return this.lg;
    }
  }
}
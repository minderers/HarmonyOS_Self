/**
 * 窗口工具类文件
 *
 * 提供完整的窗口管理功能，包括：
 * - 沉浸式模式控制和管理
 * - 窗口状态、尺寸、方向的监听和处理
 * - 系统避让区域的管理（状态栏、导航栏、键盘等）
 * - 分屏模式的设置和取消
 * - 窗口大小限制和调整功能
 * - 设备方向检测和查询
 * - 响应式断点信息管理
 *
 * 适用于需要精细控制窗口行为的HarmonyOS应用开发场景
 *
 * @author 开发者
 * @since HarmonyOS SDK
 */

// 导入ArkUI相关的显示、UI上下文和窗口API
import { display, UIContext, window } from '@kit.ArkUI';
// 导入业务错误处理模块
import { BusinessError } from '@kit.BasicServicesKit';
// 导入日志记录工具
import { hilog } from '@kit.PerformanceAnalysisKit';
// 导入应用启动选项、能力常量、意图和通用模块
import { StartOptions, AbilityConstant, Want, common } from '@kit.AbilityKit';
// 导入资源管理器，用于获取配置信息
import { resourceManager } from '@kit.LocalizationKit';
// 导入传感器服务，用于获取设备方向等信息
import { sensor } from '@kit.SensorServiceKit';
// 导入宽度和高度断点枚举类型
// import { WidthBreakpoint, HeightBreakpoint } from '@kit.ArkUI';
import './WidthBreakpointType'
/**
 * 沉浸式模式类型枚举
 * 定义了三种不同的窗口沉浸式显示模式
 * @enum {number}
 */
export enum ImmersiveType {
  /** 普通模式 - 显示状态栏、导航栏和窗口装饰 */
  NORMAL,
  /** 沉浸式模式 - 隐藏窗口装饰但保留系统栏 */
  IMMERSIVE,
  /** 全屏沉浸式模式 - 隐藏所有系统栏和窗口装饰 */
  FULLSCREEN_IMMERSIVE
}

/**
 * 窗口工具类
 * 提供窗口管理的核心功能，包括沉浸式模式设置、窗口状态监听、
 * 避让区域管理、分屏操作、窗口大小调整等功能
 *
 * 主要功能：
 * - 窗口沉浸式模式管理
 * - 窗口状态和尺寸变化监听
 * - 系统避让区域处理
 * - 窗口方向控制
 * - 分屏模式支持
 * - 窗口大小限制和调整
 *
 * @class WindowUtil
 */
export class WindowUtil {
  /** UI上下文，用于获取窗口断点信息 */
  public uiContext?: UIContext;
  /** 主窗口实例 */
  public mainWindow: window.Window;
  /** 窗口信息对象，包含窗口状态、大小、方向等信息 */
  public mainWindowInfo: WindowInfo = new WindowInfo();
  /**
   * 窗口状态变化回调函数
   * 当窗口状态发生变化时（如最大化、最小化、浮动等），更新窗口信息
   * @param statusType 新的窗口状态类型
   */
  public onStatusTypeChange: (statusType: window.WindowStatusType) => void = (statusType: window.WindowStatusType) => {
    this.mainWindowInfo.windowStatusType = statusType;
  }
  /**
   * 窗口尺寸变化回调函数
   * 当窗口大小发生变化时，更新窗口尺寸信息和断点信息
   * @param windowSize 新的窗口尺寸
   */
  public onWindowSizeChange: (windowSize: window.Size) => void = (windowSize: window.Size) => {
    // 更新窗口尺寸
    this.mainWindowInfo.windowSize = windowSize;
    // 更新宽度断点信息，用于响应式布局
    this.mainWindowInfo.widthBp = this.uiContext!.getWindowWidthBreakpoint();
    // 更新高度断点信息，用于响应式布局
    this.mainWindowInfo.heightBp = this.uiContext!.getWindowHeightBreakpoint();
  };
  /**
   * 避让区域变化回调函数
   * 当系统避让区域发生变化时（如键盘弹出、状态栏变化等），更新相应的避让区域信息
   * @param avoidOptions 避让区域选项，包含类型和区域信息
   */
  public onAvoidAreaChange: (avoidOptions: window.AvoidAreaOptions) => void =
    (avoidOptions: window.AvoidAreaOptions) => {
      // 根据不同的避让区域类型，更新对应的避让区域信息
      if (avoidOptions.type === window.AvoidAreaType.TYPE_SYSTEM) {
        // 系统避让区域（状态栏等）
        this.mainWindowInfo.AvoidSystem = avoidOptions.area;
      } else if (avoidOptions.type === window.AvoidAreaType.TYPE_CUTOUT) {
        // 屏幕挖孔避让区域
        this.mainWindowInfo.AvoidCutout = avoidOptions.area;
      } else if (avoidOptions.type === window.AvoidAreaType.TYPE_SYSTEM_GESTURE) {
        // 系统手势避让区域
        this.mainWindowInfo.AvoidSystemGesture = avoidOptions.area;
      } else if (avoidOptions.type === window.AvoidAreaType.TYPE_KEYBOARD) {
        // 键盘避让区域
        this.mainWindowInfo.AvoidKeyboard = avoidOptions.area;
      } else if (avoidOptions.type === window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR) {
        // 导航指示器避让区域
        this.mainWindowInfo.AvoidNavigationIndicator = avoidOptions.area;
      }
    };

  /**
   * 构造函数
   * @param mainWindow 主窗口实例
   */
  constructor(mainWindow: window.Window) {
    this.mainWindow = mainWindow;
  }

  /**
   * 设置窗口沉浸式模式类型
   * 根据不同的沉浸式模式类型，配置窗口的显示状态
   * @param type 沉浸式模式类型
   */
  setImmersiveType(type: ImmersiveType) {
    try {
      if (type === ImmersiveType.NORMAL) {
        // 普通模式：关闭全屏布局
        this.mainWindow.setWindowLayoutFullScreen(false)
          .then(() => {
            hilog.info(0x0000, 'testLog', `Succeeded in setting immersive mode.`);
          })
          .catch((err: BusinessError) => {
            hilog.error(0x0000, 'testLog', `Failed to set immersive mode. Code: ${err.code}, message: ${err.message}`);
          });
        // 显示系统栏（状态栏和导航栏）
        this.setSystemBarEnabled(true);
        // 显示窗口装饰（标题栏等），仅在调用loadContent()或setUIContent()后使用
        this.mainWindow.setWindowDecorVisible(true);
        // 恢复窗口状态
        this.recover();
      } else if (type === ImmersiveType.IMMERSIVE) {
        // 沉浸式模式：启用全屏布局
        this.mainWindow.setWindowLayoutFullScreen(true)
          .then(() => {
            hilog.info(0x0000, 'testLog', `Succeeded in setting immersive mode.`);
          })
          .catch((err: BusinessError) => {
            hilog.error(0x0000, 'testLog', `Failed to set immersive mode. Code: ${err.code}, message: ${err.message}`);
          });
        // 保留系统栏显示
        this.setSystemBarEnabled(true);
        // 隐藏窗口装饰
        this.mainWindow.setWindowDecorVisible(false);
        // 恢复窗口状态
        this.recover();
      } else if (type === ImmersiveType.FULLSCREEN_IMMERSIVE) {
        // 全屏沉浸式模式：启用全屏布局
        this.mainWindow.setWindowLayoutFullScreen(true)
          .then(() => {
            hilog.info(0x0000, 'testLog', `Succeeded in setting immersive mode.`);
          })
          .catch((err: BusinessError) => {
            hilog.error(0x0000, 'testLog', `Failed to set immersive mode. Code: ${err.code}, message: ${err.message}`);
          });
        // 如果窗口处于最大化状态或浮动状态且有装饰高度，则执行最大化操作
        if (this.mainWindow.getWindowStatus() === window.WindowStatusType.MAXIMIZE ||
          (this.mainWindow.getWindowStatus() === window.WindowStatusType.FLOATING &&
            this.mainWindow.getWindowDecorHeight() !== 0)) {
          this.mainWindow.maximize()
            .then(() => {
              hilog.info(0x0000, 'testLog', `Succeeded in maximizing the window.`);
            })
            .catch((err: BusinessError) => {
              hilog.error(0x0000, 'testLog',
                `Failed to maximize the window. Code: ${err.code}, message: ${err.message}`);
            });
        }
        // 隐藏系统栏
        this.setSystemBarEnabled(false);
        // 隐藏窗口装饰
        this.mainWindow.setWindowDecorVisible(false);
      }
      // 更新窗口信息中的沉浸式状态
      this.mainWindowInfo.isImmersive = type;
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, 'TestLog', `Failed to set immersive type. Code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 设置UI上下文
   * 获取并设置窗口的UI上下文，用于后续的断点信息获取等操作
   */
  setUIContext() {
    try {
      this.uiContext = this.mainWindow.getUIContext();
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, 'TestLog', `Failed to set UI context. Code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 设置系统栏的显示状态
   * 控制状态栏和导航指示器的显示或隐藏
   * @param isVisible 是否显示系统栏，true为显示，false为隐藏
   */
  setSystemBarEnabled(isVisible: boolean): void {
    // 设置状态栏的显示状态
    this.mainWindow.setSpecificSystemBarEnabled('status', isVisible)
      .then(() => {
        hilog.info(0x0000, 'testLog', `Succeeded in setting status bar to be invisible.`);
      })
      .catch((err: BusinessError) => {
        hilog.error(0x0000, 'testLog',
          `Failed to set status bar to be invisible. Code: ${err.code}, message: ${err.message}`);
      });
    // 设置导航指示器的显示状态
    this.mainWindow.setSpecificSystemBarEnabled('navigationIndicator', isVisible)
      .then(() => {
        hilog.info(0x0000, 'testLog', `Succeeded in setting navigation indicator to be invisible.`);
      })
      .catch((err: BusinessError) => {
        hilog.error(0x0000, 'testLog',
          `Failed to set navigation indicator to be invisible. Code: ${err.code}, message: ${err.message}`);
      });
  }

  /**
   * 恢复窗口状态
   * 如果窗口当前处于全屏状态，则将其恢复到之前的状态
   */
  recover(): void {
    try {
      // 检查窗口是否处于全屏状态
      if (this.mainWindow.getWindowStatus() === window.WindowStatusType.FULL_SCREEN) {
        // 恢复窗口到之前的状态
        this.mainWindow.recover()
          .then(() => {
            hilog.info(0x0000, 'testLog', `Succeeded in revocering the window.`);
          })
          .catch((err: BusinessError) => {
            hilog.error(0x0000, 'testLog', `Failed to revocer the window. Code: ${err.code}, message: ${err.message}`);
          });
      }
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, 'TestLog', `Failed to recover. Code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 设置窗口方向
   * 设置窗口的首选方向（横屏、竖屏等）
   * @param orientation 窗口方向枚举值
   */
  setWindowOrientation(orientation: window.Orientation): void {
    this.mainWindow.setPreferredOrientation(orientation)
      .then(() => {
        hilog.info(0x0000, 'testLog', `Succeeded in setting window orientation.`);
        // 更新窗口信息中的方向信息
        this.mainWindowInfo.orientation = orientation;
      })
      .catch((err: BusinessError) => {
        hilog.error(0x0000, 'testLog', `Failed to set window orientation. Code: ${err.code}, message: ${err.message}`);
      });
  }

  /**
   * 更新窗口信息并注册监听器
   * 初始化窗口状态、尺寸、断点信息和避让区域，并注册相关事件监听器
   * 这是窗口管理的核心初始化方法，通常在窗口创建后调用
   */
  updateWindowInfo(): void {
    try {
      // 初始化获取窗口状态
      this.mainWindowInfo.windowStatusType = this.mainWindow.getWindowStatus();
      // 注册窗口状态变化监听器
      this.mainWindow.on('windowStatusChange', this.onStatusTypeChange);

      // 初始化获取窗口尺寸信息
      let width: number = this.mainWindow.getWindowProperties().windowRect.width;
      let height: number = this.mainWindow.getWindowProperties().windowRect.height;
      let windowSize: window.Size = {
        width: width,
        height: height
      }
      this.mainWindowInfo.windowSize = windowSize;

      // 初始化获取宽度和高度断点信息，用于响应式布局
      this.mainWindowInfo.widthBp = this.uiContext!.getWindowWidthBreakpoint();
      this.mainWindowInfo.heightBp = this.uiContext!.getWindowHeightBreakpoint();

      // 注册窗口尺寸变化监听器，同时更新窗口尺寸和断点信息
      this.mainWindow.on('windowSizeChange', this.onWindowSizeChange);

      // 初始化获取各种避让区域信息
      // 系统避让区域（状态栏等）
      this.mainWindowInfo.AvoidSystem = this.mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
      // 导航指示器避让区域
      this.mainWindowInfo.AvoidNavigationIndicator =
        this.mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
      // 屏幕挖孔避让区域
      this.mainWindowInfo.AvoidCutout = this.mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_CUTOUT);
      // 系统手势避让区域
      this.mainWindowInfo.AvoidSystemGesture =
        this.mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM_GESTURE);
      // 键盘避让区域
      this.mainWindowInfo.AvoidKeyboard = this.mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_KEYBOARD);

      // 注册避让区域变化监听器
      this.mainWindow.on('avoidAreaChange', this.onAvoidAreaChange);
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, `TestLog`, `Failed to update window info. Code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 释放资源并取消事件监听
   * 取消所有已注册的窗口事件监听器，用于清理资源
   * 通常在窗口销毁或组件卸载时调用
   */
  release(): void {
    try {
      // 取消窗口状态变化监听
      this.mainWindow.off('windowStatusChange');
      // 取消窗口尺寸变化监听
      this.mainWindow.off('windowSizeChange');
      // 取消避让区域变化监听
      this.mainWindow.off('avoidAreaChange');
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, 'TestLog', `Failed to off. Code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 设置分屏模式
   * 启动指定的应用程序并设置为分屏模式的主窗口
   * @param bundleName 应用包名
   * @param abilityName 能力名称
   * @param moduleName 模块名称
   */
  setSplitScreen(bundleName: string, abilityName: string, moduleName: string): void {
    // 获取UI能力上下文
    let context = this.uiContext?.getHostContext() as common.UIAbilityContext;

    // 创建启动选项并设置为分屏主窗口模式
    let option: StartOptions = { windowMode: AbilityConstant.WindowMode.WINDOW_MODE_SPLIT_PRIMARY };
    // 创建Intent对象，指定要启动的应用信息
    let want: Want = { bundleName: bundleName, abilityName: abilityName, moduleName: moduleName };
    // 启动指定的应用能力
    context.startAbility(want, option).catch((err: BusinessError) => {
      hilog.error(0x0000, 'TestLog', `Failed to start ability. Code: ${err.code}, message: ${err.message}`);
    });
  }

  /**
   * 取消分屏模式
   * 终止当前应用，退出分屏模式
   */
  cancelSplitScreen(): void {
    // 获取UI能力上下文
    let context = this.uiContext?.getHostContext() as common.UIAbilityContext;
    // 终止当前应用
    context.terminateSelf().catch((err: BusinessError) => {
      hilog.error(0x0000, 'TestLog', `Failed to terminate self. Code: ${err.code}, message: ${err.message}`);
    });
  }

  /**
   * 设置窗口大小限制
   * 设置窗口的最大和最小尺寸限制
   * @param maxWidth 最大宽度
   * @param maxHeight 最大高度
   * @param minWidth 最小宽度
   * @param minHeight 最小高度
   */
  setWindowLimits(maxWidth: number, maxHeight: number, minWidth: number, minHeight: number): void {
    // 创建窗口大小限制对象
    let windowLimits: window.WindowLimits = {
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      minWidth: minWidth,
      minHeight: minHeight
    }
    // 应用窗口大小限制
    this.mainWindow.setWindowLimits(windowLimits).then((data: window.WindowLimits) => {
      hilog.info(0x0000, 'testLog', `Succeeded in changing the window limits. Cause: ${JSON.stringify(data)}`);
    }).catch((err: BusinessError) => {
      hilog.error(0x0000, 'testLog',
        `Failed to change the window limits. Cause code: ${err.code}, message: ${err.message}`);
    });
  }

  /**
   * 调整窗口大小
   * 将窗口调整到指定的宽度和高度
   * @param width 目标宽度
   * @param height 目标高度
   */
  resize(width: number, height: number): void {
    this.mainWindow.resize(width, height, (err: BusinessError) => {
      const errCode: number = err.code;
      if (errCode) {
        hilog.error(0x0000, 'testLog',
          `Failed to change the window size. Cause code: ${err.code}, message: ${err.message}`);
        return;
      }
      hilog.info(0x0000, 'testLog', 'Succeeded in changing the window size.');
    });
  }

  /**
   * 通过显示器查询设备方向
   * 使用显示器API获取当前设备的方向信息
   */
  queryOrientationByDisplay(): void {
    try {
      // 获取默认显示器对象，可用于查询设备方向等信息
      let displayClass: display.Display | null = display.getDefaultDisplaySync();
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, 'testLog', `Failed to query display orientation. Code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 通过资源管理器查询设备方向
   * 使用资源管理器API获取当前设备的方向配置信息
   */
  queryOrientationByResourceManager(): void {
    // 通过资源管理器获取配置方向信息
    let info: resourceManager.Direction | undefined =
      this.uiContext?.getHostContext()?.resourceManager.getConfigurationSync().direction;
    hilog.info(0x0000, 'testLog', `The Orientation is ${info}`);
  }

  /**
   * 查询设备角度
   * 通过重力传感器获取设备的旋转角度信息
   */
  queryDegree(): void {
    try {
      // 监听重力传感器数据，获取设备的重力信息
      sensor.on(sensor.SensorId.GRAVITY, (data: sensor.GravityResponse) => {
        // 根据重力传感器数据计算设备角度
        let degree: number = this.getCalDegree(data.x, data.y, data.z);
      })
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, 'TestLog', `Failed to query degree. Code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 计算设备旋转角度
   * 根据重力传感器的x、y、z轴数据计算设备的旋转角度
   * @param x X轴重力值
   * @param y Y轴重力值
   * @param z Z轴重力值
   * @returns 设备旋转角度（0-360度）
   */
  getCalDegree(x: number, y: number, z: number): number {
    let degree: number = 0;
    // 使用有效角度阈值系数（3）来判断设备是否平放
    // 如果设备接近平放状态，则返回0度
    if ((x * x + y * y) * 3 < z * z) {
      return degree;
    }
    // 根据重力传感器数据计算角度
    // 使用反正切函数计算角度，并转换为度数
    degree = 90 - (Number)(Math.round(Math.atan2(y, -x) / Math.PI * 180));
    // 确保角度在0-360度范围内
    return degree >= 0 ? degree % 360 : degree % 360 + 360;
  }
}

/**
 * 窗口信息类
 * 用于存储和管理窗口的各种状态信息，包括窗口状态、尺寸、方向、断点信息和避让区域等
 * 使用@Observed装饰器，支持数据变化的响应式监听
 *
 * 主要功能：
 * - 存储窗口基本状态（大小、方向、状态类型）
 * - 管理响应式断点信息（宽度断点、高度断点）
 * - 处理系统避让区域信息（状态栏、导航栏、键盘等）
 * - 记录沉浸式模式状态
 *
 * @class WindowInfo
 */
@Observed
export class WindowInfo {
  /** 窗口状态类型（最大化、最小化、浮动等） */
  public windowStatusType: window.WindowStatusType = window.WindowStatusType.UNDEFINED;
  /** 窗口沉浸式模式类型 */
  public isImmersive: ImmersiveType = ImmersiveType.NORMAL;
  /** 窗口方向（横屏、竖屏等） */
  public orientation: window.Orientation = window.Orientation.UNSPECIFIED;
  /** 窗口尺寸信息（宽度和高度） */
  public windowSize: window.Size = { width: 0, height: 0 };
  /** 宽度断点，用于响应式布局判断 */
  public widthBp: WidthBreakpoint = WidthBreakpoint.WIDTH_XS;
  /** 高度断点，用于响应式布局判断 */
  public heightBp: HeightBreakpoint = HeightBreakpoint.HEIGHT_SM;
  /** 系统避让区域（状态栏、导航栏等系统UI占用的区域） */
  public AvoidSystem?: window.AvoidArea;
  /** 导航指示器避让区域 */
  public AvoidNavigationIndicator?: window.AvoidArea;
  /** 屏幕挖孔避让区域（如刘海屏、挖孔屏的摄像头区域） */
  public AvoidCutout?: window.AvoidArea;
  /** 系统手势避让区域（用于系统手势操作的边缘区域） */
  public AvoidSystemGesture?: window.AvoidArea;
  /** 键盘避让区域（软键盘弹出时占用的区域） */
  public AvoidKeyboard?: window.AvoidArea;
}

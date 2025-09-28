import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import window from "@ohos:window";
import type { BusinessError as BusinessError } from "@ohos:base";
import { ImmersiveType, WindowUtil } from "@normalized:N&&&entry/src/main/ets/utils/WindowUtil&";
// 日志域标识，用于区分不同模块的日志
const DOMAIN = 0x0000;
/**
 * 应用程序入口Ability类
 *
 * 作为响应式布局应用的主入口，负责：
 * 1. 应用生命周期管理 (onCreate、onDestroy等)
 * 2. 窗口配置和管理 (沉浸式、自动旋转等)
 * 3. 页面路由初始化
 * 4. 全局状态管理
 *
 * 该类继承自UIAbility，是HarmonyOS应用的标准入口点
 */
export default class EntryAbility extends UIAbility {
    // 窗口工具类实例，用于管理窗口属性、状态变化监听和响应式断点处理
    windowUtil?: WindowUtil;
    /**
     * Ability创建回调
     *
     * 在Ability首次创建时调用，进行初始化设置
     * @param want - 启动意图，包含启动参数和标识
     * @param launchParam - 启动参数，包含启动类型和上一次的状态
     */
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        try {
            // 设置应用颜色模式为系统自动模式，支持深色/浅色主题切换
            this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x0000, 'TestLog', `设置颜色模式失败. Code: ${err.code}, message: ${err.message}`);
        }
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
    }
    /**
     * Ability销毁回调
     *
     * 在Ability被销毁时调用，用于清理资源
     */
    onDestroy(): void {
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    /**
     * 窗口舞台创建回调
     *
     * 在窗口舞台创建完成后调用，是配置窗口和加载页面的关键时机
     * @param windowStage - 窗口舞台对象，用于管理应用窗口
     */
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // 主窗口已创建，为此Ability设置主页面
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        // 获取主窗口并创建窗口工具类实例
        try {
            this.windowUtil = new WindowUtil(windowStage.getMainWindowSync());
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x0000, 'TestLog', `获取主窗口失败. Code: ${err.code}, message: ${err.message}`);
        }
        // 将窗口工具类实例存储到全局应用存储中，供其他页面使用
        AppStorage.setOrCreate('windowUtil', this.windowUtil);
        // 加载应用主页面
        windowStage.loadContent('pages/Index', (err) => {
            if (err.code) {
                hilog.error(DOMAIN, 'testTag', '加载页面内容失败. Cause: %{public}s', JSON.stringify(err));
                return;
            }
            hilog.info(DOMAIN, 'testTag', '页面内容加载成功.');
            // 设置UI上下文，用于获取窗口断点信息
            this.windowUtil!.setUIContext();
            // 设置沉浸式布局模式，隐藏状态栏装饰但保留状态栏功能
            this.windowUtil!.setImmersiveType(ImmersiveType.IMMERSIVE);
            // 为三折叠等大屏设备设置自动旋转，支持横竖屏自适应
            this.windowUtil!.setWindowOrientation(window.Orientation.AUTO_ROTATION);
            // 更新窗口信息并启动监听，获取初始窗口状态和尺寸信息
            this.windowUtil!.updateWindowInfo();
        });
    }
    /**
     * 窗口舞台销毁回调
     *
     * 在窗口舞台被销毁时调用，用于释放UI相关资源
     */
    onWindowStageDestroy(): void {
        // 主窗口被销毁，释放UI相关资源
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    /**
     * Ability切换到前台回调
     *
     * 当Ability从后台切换到前台时调用，应用变为可见状态
     */
    onForeground(): void {
        // Ability已切换到前台
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onForeground');
    }
    /**
     * Ability切换到后台回调
     *
     * 当Ability从前台切换到后台时调用，应用变为不可见状态
     */
    onBackground(): void {
        // Ability已切换到后台
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onBackground');
    }
}

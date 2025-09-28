# 实现固定样式和自定义样式弹窗

## 简介

本示例主要介绍如何给应用添加固定样式和自定义样式的弹窗，其中气泡提示（Popup）、即时反馈（Toast）、日期滑动选择器弹窗、文本滑动选择器弹窗、警告弹窗都属于固定样式弹窗，弹窗的样式固定，使用系统提供的API，传入相应的参数即可实现。
而自定义弹窗的样式和交互方式都可以自定义，可以实现更加复杂的交互场景。
## 预览效果
![](screenshots/device/MultipeDialog.gif)

## 工程目录
``` 
├──entry/src/main/ets                                   // 弹窗代码区
│  ├──entryability
│  │  └──EntryAbility.ets                               // 程序入口类
│  ├──entrybackupability 
│  │  └──EntryBackupAbility.ets       
│  ├──pages                              
│  │  ├──index.ets                                      // 首页
│  │  └──PersonalInformation.ets                        // 个人信息页
│  ├──utils                              
│  │  ├──CommonUtils.ets                                // 公共方法
│  │  └──Logger.ets                                     // 日志打印
│  └──view
│     ├──Dialog.ets                                     // 自定义弹窗                            
│     ├──TextCommonComponent.ets                        // 文本展示组件
│     └──TextInputComponent.ets                         // 文本输入组件
└──entry/src/main/resources                             // 应用资源目录
``` 

## 相关概念

- 警告弹窗：显示警告弹窗组件，可设置文本内容与响应回调。
- 自定义弹窗： 使用UIContext中获取到的PromptAction对象提供的openCustomDialog接口来实现自定义弹出框。
- 日期滑动选择器弹窗：根据指定范围的Date创建可以选择日期的滑动选择器，展示在弹窗上。
- 文本滑动选择器弹窗：根据指定的选择范围创建文本选择器，展示在弹窗上。
- 气泡弹窗：可绑定在组件上显示气泡弹窗提示，设置弹窗内容、交互逻辑和显示状态。主要用于屏幕录制、信息弹出提醒等显示状态。

## 相关权限

不涉及

## 使用说明

1. 进入个人信息页面后，若进行了编辑操作，但未保存，则在点击左上角返回按钮时，展示警告弹窗，点击确定按钮退出页面。
2. 进入个人信息页面后，点击出生日期选项，展示日期滑动选择弹窗，上下滑动日期，点击确定按钮，显示选中日期。
3. 进入个人信息页面后，点击性别选项，展示文本滑动选择弹窗，上下滑动文本，点击确定按钮，显示选中文本。
4. 进入个人信息页面后，点击兴趣爱好选项，展示自定义弹窗，选中多个兴趣爱好，点击确定，显示选中兴趣爱好。
5. 进入个人信息页面后，点击主页右上角菜单按钮，展示气泡弹窗，点击保存，可保存信息，之后退出页面不再弹出警告弹窗。

## 约束与限制

* 本示例仅支持标准系统上运行，支持设备：华为手机。

* HarmonyOS系统：HarmonyOS 5.0.5 Release及以上。

* DevEco Studio版本：DevEco Studio 5.0.5 Release及以上。

* HarmonyOS SDK版本：HarmonyOS 5.0.5 Release SDK及以上。

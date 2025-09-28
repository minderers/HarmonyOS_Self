# 实现页面与组件转场动画功能

### 介绍

本Codelab将介绍如何实现各种类型的转场动效。其中包括使用Navigation组件导航实现页面间转场，使用transition属性实现组件内转场，使用bindSheet实现模态转场，使用geometryTransition实现共享元素转场及卡片一镜到底动效。

### 效果预览

<img src="screenshots/device/home.gif" style="width:320px"></img>

### 相关概念

1. 页面间转场：一个页面消失，另外一个页面出现的动画效果。Navigation组件导航提供了默认的页面切换时的转场动画，同时也提供了自定义页面间转场动画的能力。
2. 组件内转场：组件内转场主要通过transition属性配置转场参数，在组件插入和删除时显示过渡动效。
3. 模态转场：新的页面覆盖在旧的界面上，旧的页面不消失的一种转场方式。
4. 共享元素转场：相同或者相似的两个元素做出的一种位置和大小匹配的过渡动画效果，也称一镜到底动效。

### 工程目录
```
├──entry/src/main/ets                         // 代码区
│   ├──constants
│   │   └──CommonConstants.ets                // 公共常量类
│   ├──utils
│   │   └──CustomNavigationUtil.ets           // 自定义转场动画工具类
│   ├──entryability
│   │   └──EntryAbility.ets                   // 程序入口类
│   ├──pages
│   │   ├──NavigationTransition.ets           // 页面间转场：默认
│   │   ├──CustomNavigationTransition.ets     // 页面间转场：自定义
│   │   ├──ComponentTransition.ets            // 组件间转场动画页面
│   │   ├──ModalTransition.ets                // 模态转场
│   │   ├──Index.ets                          // 应用首页
│   │   ├──longtaketransition
│   │   │   ├──LongTakeTransition.ets         // 卡片一镜到底列表页面
│   │   │   └──LongTakeDetail.ets             // 卡片一镜到底详情页面
│   │   └──geometrytransition 
│   │       ├──GeometryTransition.ets         // 共享元素转场页面
│   │       └──GeometryTransitionDetail.ets   // 共享元素转场详情页
│   └──views
│       └──TitleBar.ets                       // 自定义标题栏组件
└──entry/src/main/resources                   // 资源文件目录
```

### 相关权限

不涉及

### 依赖

不涉及

### 约束与限制

1.本示例仅支持标准系统上运行，支持设备：华为手机。

2.HarmonyOS系统：HarmonyOS 5.0.5 Release及以上。

3.DevEco Studio版本：DevEco Studio 5.0.5 Release及以上。

4.HarmonyOS SDK版本：HarmonyOS 5.0.5 Release SDK及以上。

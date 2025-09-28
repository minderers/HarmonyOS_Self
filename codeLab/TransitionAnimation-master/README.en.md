# Using the Transition Animation

### Introduction

This codelab describes how to implement various transition animations. The Navigation component is used for page transition, transition for component transition, and bindSheet for modal transition, and geometryTransition for shared element transition and long-take animations for widget expansion.

### Preview

<img src="screenshots/device/home_en.gif" style="width:320px"></img>

### Concepts

1. Page transition: refers to a transition animation where one page disappears and another page appears. Navigation: provides default transition animations for page switching and the capability of customizing the page transition animation.
2. Component transition: configures transition parameters by using the transition attribute, and performs transition animations when a component is inserted or deleted.
3. Modal transition: is a type of transition achieved by a modal – a view that appears on top of the current view while the current view remains.
4. Shared element transition: is a type of transition achieved by animating the size and position between styles of the same or similar elements.

### Project Directory
```
├──entry/src/main/ets                         // Code area
│   ├──constants
│   │   └──CommonConstants.ets                // Common constants
│   ├──utils
│   │   └──CustomNavigationUtil.ets           // Custom transition animation utility class
│   ├──entryability
│   │   └──EntryAbility.ets                   // Application entry
│   ├──pages
│   │   ├──NavigationTransition.ets           // Page transition (default) 
│   │   ├──CustomNavigationTransition.ets     // Page transition (customized)
│   │   ├──ComponentTransition.ets            // Component transition animations
│   │   ├──ModalTransition.ets                // Modal transition
│   │   ├──Index.ets                          // Application home page
│   │   ├──longtaketransition
│   │   │   ├──LongTakeTransition.ets         // Long-take animation page for widget/list expansion
│   │   │   └──LongTakeDetail.ets             // Long-take animation details page for widget expansion
│   │   └──geometrytransition 
│   │       ├──GeometryTransition.ets         // Transition page of the shared element
│   │       └──GeometryTransitionDetail.ets   // Transition details page of the shared element
│   └──views
│       └──TitleBar.ets                       // Customized title bar component
└──entry/src/main/resources                   // Directory of resource files
```

### Permissions

N/A

### Dependencies

N/A

### Constraints

1. The sample is only supported on Huawei phones with standard systems.
2. HarmonyOS: HarmonyOS 5.0.5 Release or later.
3. DevEco Studio version: DevEco Studio 5.0.5 Release or later.
4. HarmonyOS SDK version: HarmonyOS 5.0.5 Release SDK or later.

# HarmonyOS开发实战教程

## 目录

1. [ListItemEdit - 列表项编辑与滑动操作](#1-listitemedit---列表项编辑与滑动操作)
2. [MultipleDialog - 多种对话框交互实现](#2-multipledialog---多种对话框交互实现)
3. [MultiTabNavigation - 多样化标签页导航](#3-multitabnavigation---多样化标签页导航)
4. [ResponsiveLayout - 响应式布局设计](#4-responsivelayout---响应式布局设计)
5. [ToDoList - 简易待办事项应用](#5-todolist---简易待办事项应用)
6. [TransitionAnimation - 过渡动画效果实现](#6-transitionanimation---过渡动画效果实现)

## 1. ListItemEdit - 列表项编辑与滑动操作

### 项目概述

ListItemEdit项目展示了如何在HarmonyOS中实现列表项的编辑功能和滑动操作。该项目实现了一个待办事项列表，用户可以添加、编辑、完成和删除待办事项。

### 核心功能

- 列表项滑动显示操作菜单
- 列表项内容编辑
- 待办事项状态切换（完成/未完成）
- 列表项删除操作

### 关键技术点

#### 1. 列表项滑动操作

使用`swipeAction`属性为`ListItem`组件添加滑动操作功能：

```typescript
ListItem() {
  ToDoListItem({
    toDoItem: toDoItem,
    achieveData: this.achieveData,
    toDoData: this.toDoData
  })
}
.swipeAction({ end: this.itemEnd(toDoItem), edgeEffect: SwipeEdgeEffect.Spring })
```

#### 2. 自定义滑动菜单

通过`@Builder`装饰器创建自定义滑动菜单：

```typescript
@Builder
itemEnd(item: ToDo) {
  Row({ space: STYLE_CONFIG.ICON_GUTTER }) {
    Image($r('app.media.ic_public_settings_filled')).ImageStyle()
      .onClick(() => {
        this.getUIContext().getPromptAction().showToast({ message: $r('app.string.incomplete') });
      })
    Image($r('app.media.ic_public_detail_filled')).ImageStyle()
      .onClick(() => {
        this.getUIContext().getPromptAction().showToast({ message: $r('app.string.incomplete') });
      })
    Image($r('app.media.ic_public_delete_filled')).ImageStyle()
      .onClick(() => {
        this.deleteTodoItem(item);
      })
  }
  .padding(STYLE_CONFIG.OPERATION_BUTTON_PADDING)
  .justifyContent(FlexAlign.SpaceEvenly)
}
```

#### 3. 列表项编辑功能

通过条件渲染实现编辑模式切换：

```typescript
if (!this.isEdited) {
  // 显示普通文本
  Text(`${this.toDoItem.name}`)
    .maxLines(1)
    .fontSize($r('sys.float.ohos_id_text_size_headline9'))
    .layoutWeight(1)
    .decoration({ type: this.toDoItem.isCompleted ? TextDecorationType.LineThrough : TextDecorationType.None })
} else {
  // 显示文本输入框
  TextInput({ text: `${this.toDoItem.name}` })
    .maxLines(1)
    .fontSize($r('sys.float.ohos_id_text_size_headline9'))
    .layoutWeight(1)
    .backgroundColor(Color.Transparent)
    .id('textEdit')
    .onChange((value: string) => {
      // 更新待办事项数据
      this.toDoItem.name = value;
    })
    .onAppear(() => {
      // 请求输入框获取焦点
      focusControl.requestFocus('textEdit');
    })
}
```

#### 4. 数据模型设计

使用`@Observed`装饰器实现数据响应式：

```typescript
@Observed
export class ToDo {
  key: string = util.generateRandomUUID(true);
  name: string;
  isCompleted: boolean = false;

  constructor(name: string) {
    this.name = name;
  }
}
```

### 实现步骤

1. 创建数据模型（ToDo.ets）
2. 设计常量配置（Constants.ets）
3. 实现列表项组件（TodoListItem.ets）
4. 实现主页面（Index.ets）
5. 添加资源文件（图标、字符串等）

## 2. MultipleDialog - 多种对话框交互实现

### 项目概述

MultipleDialog项目展示了如何在HarmonyOS中实现各种类型的对话框交互，包括自定义对话框、日期选择器、文本选择器和警告对话框等。该项目以个人信息编辑页面为例，演示了不同对话框的使用场景。

### 核心功能

- 自定义对话框实现
- 日期选择器对话框
- 文本选择器对话框
- 警告对话框
- 弹出菜单（Popup）

### 关键技术点

#### 1. 自定义对话框实现

使用`ComponentContent`和`promptAction.openCustomDialog`创建自定义对话框：

```typescript
class PromptActionClass {
  private ctx: UIContext | undefined = undefined;
  private contentNode: ComponentContent<Object> | undefined = undefined;
  private options: promptAction.BaseDialogOptions | undefined = undefined;

  openDialog() {
    if (this.contentNode !== null) {
      this.ctx?.getPromptAction().openCustomDialog(this.contentNode, this.options)
        .then(() => {
          hilog.info(0xFF00, 'PersonalInformation', '%{public}s', 'OpenCustomDialog complete');
        })
        .catch((error: BusinessError) => {
          let message = (error as BusinessError).message;
          let code = (error as BusinessError).code;
          hilog.error(0xFF00, 'PersonalInformation', '%{public}s',
            `OpenCustomDialog args error code is ${code}, message is ${message}`);
        })
    }
  }
}
```

#### 2. 日期选择器对话框

使用`showDatePickerDialog`实现日期选择：

```typescript
this.getUIContext().showDatePickerDialog({
  start: new Date('1925-1-1'),
  end: new Date('2055-1-1'),
  selected: this.selectTime,
  lunarSwitch: true,
  showTime: false,
  onDateAccept: (value: Date) => {
    this.selectTime = value;
    let birthDateArray = JSON.stringify(value).slice(1, 11).split('-');
    let year = Number(birthDateArray[0]);
    let month = Number(birthDateArray[1]);
    let day = Number(birthDateArray[2]);
    this.birthDate = CommonUtils.getBirthDateValue(year, month, day);
    AppStorage.setOrCreate('isEdit', true);
  }
})
```

#### 3. 文本选择器对话框

使用`showTextPickerDialog`实现文本选择：

```typescript
this.getUIContext().showTextPickerDialog({
  range: this.sexArray,
  selected: this.select,
  canLoop: false,
  onAccept: (value: TextPickerResult) => {
    this.select = value.index as number;
    this.sex = value.value as string;
    AppStorage.setOrCreate('isEdit', true);
  },
  onChange: (value: TextPickerResult) => {
    this.select = value.index as number;
  }
})
```

#### 4. 弹出菜单（Popup）

使用`bindPopup`实现弹出菜单：

```typescript
.bindPopup(this.customPopup, {
  builder: this.PopupBuilder, // 气泡内容
  placement: Placement.Bottom, // 气泡弹出位置
  onStateChange: (e) => {
    if (!e.isVisible) {
      this.customPopup = false;
    }
  }
})
```

### 实现步骤

1. 创建对话框工具类（Dialog.ets）
2. 实现个人信息页面（PersonalInformation.ets）
3. 实现各种输入组件（TextInputComponent.ets、TextCommonComponent.ets）
4. 实现主页面（Index.ets）
5. 添加资源文件（图标、字符串等）

## 3. MultiTabNavigation - 多样化标签页导航

### 项目概述

MultiTabNavigation项目展示了HarmonyOS中各种标签页导航的实现方式，包括底部导航、顶部导航和侧边导航等多种样式。该项目提供了丰富的导航示例，适用于不同的应用场景。

### 核心功能

- 底部导航栏实现
- 顶部标签页导航
- 侧边导航栏实现
- 多级嵌套标签页
- 自定义标签页样式

### 关键技术点

#### 1. 路由配置

使用常量定义路由配置：

```typescript
static readonly ROUTES: Route[] = [
  {
    title: $r('app.string.bottom_nav'),
    child: [
      {
        text: $r('app.string.common_bottom_nav'),
        to: 'BottomTab'
      },
      {
        text: $r('app.string.rudder_bottom_nav'),
        to: 'RudderStyleTab'
      },
      {
        text: $r('app.string.video_slide'),
        to: 'TabContentOverflow'
      }
    ]
  },
  // 更多路由配置...
];
```

#### 2. 底部标签页导航

使用`Tabs`组件实现底部导航：

```typescript
Tabs({ barPosition: BarPosition.End }) {
  TabContent() {
    // 首页内容
  }
  .tabBar(this.TabBuilder($r('app.media.tab_homepage'), $r('app.media.tab_homepage_filled'), $r('app.string.home')))

  TabContent() {
    // 视频页内容
  }
  .tabBar(this.TabBuilder($r('app.media.tab_video'), $r('app.media.tab_video_filled'), $r('app.string.video')))
  
  // 更多标签页...
}
```

#### 3. 自定义标签栏样式

使用`@Builder`装饰器创建自定义标签栏：

```typescript
@Builder
TabBuilder(normalImg: Resource, selectedImg: Resource, text: Resource) {
  Column() {
    Image(this.currentIndex === this.currentTabIndex ? selectedImg : normalImg)
      .width(Constants.IMAGE_SIZE_TAB)
      .height(Constants.IMAGE_SIZE_TAB)
    Text(text)
      .fontSize(10)
      .fontColor(this.currentIndex === this.currentTabIndex ? '#1698CE' : '#6B6B6B')
      .margin({ top: 2 })
  }
  .width('100%')
  .height(50)
  .justifyContent(FlexAlign.Center)
  .onClick(() => {
    this.currentIndex = this.currentTabIndex;
  })
}
```

#### 4. 侧边导航实现

使用`SideBarContainer`组件实现侧边导航：

```typescript
SideBarContainer(SideBarContainerType.Embed) {
  SideBar() {
    // 侧边栏内容
  }
  .width(Constants.SIDE_TAB_WIDTH)
  .backgroundColor('#F1F3F5')

  Column() {
    // 主内容区域
  }
  .width(Constants.SIDE_CONTEND_WIDTH)
}
```

### 实现步骤

1. 定义路由和常量配置（Constants.ets）
2. 实现各种标签页样式组件（BottomTab.ets、LeftTab.ets等）
3. 实现标签页内容组件（VideoTabContent.ets等）
4. 实现主页面（Index.ets）
5. 添加资源文件（图标、字符串等）

## 4. ResponsiveLayout - 响应式布局设计

### 项目概述

ResponsiveLayout项目展示了如何在HarmonyOS中实现响应式布局设计，使应用能够适应不同屏幕尺寸和设备类型。该项目提供了多种布局示例，包括列表布局、网格布局、侧边栏布局等。

### 核心功能

- 响应式断点设计
- 列表布局适配
- 网格布局适配
- 侧边栏布局适配
- 双列和三列布局适配

### 关键技术点

#### 1. 响应式断点工具类

使用`WidthBreakpointType`类实现响应式断点：

```typescript
export class WidthBreakpointType<T> {
  // 小屏幕设备(手机)对应的值
  sm: T;
  // 中等屏幕设备(小平板)对应的值
  md: T;
  // 大屏幕设备(大平板、三折叠)对应的值
  lg: T;

  constructor(sm: T, md: T, lg: T) {
    this.sm = sm;
    this.md = md;
    this.lg = lg;
  }

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
```

#### 2. 窗口信息监听

使用`WindowUtil`类监听窗口变化：

```typescript
export class WindowUtil {
  // 主窗口信息
  mainWindowInfo: WindowInfo = new WindowInfo();
  
  // 监听窗口变化
  listenWindowChange() {
    // 获取窗口对象
    window.getLastWindow(this.ctx, (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'WindowUtil', 'Failed to obtain the window. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      // 获取窗口避让区域
      data.getWindowAvoidArea((err, avoidArea) => {
        if (err.code) {
          hilog.error(0x0000, 'WindowUtil', 'Failed to obtain the window avoidArea. Cause: %{public}s', JSON.stringify(err) ?? '');
          return;
        }
        this.mainWindowInfo.AvoidSystem = avoidArea;
      });
      
      // 监听窗口尺寸变化
      data.on('windowSizeChange', (size) => {
        this.mainWindowInfo.width = size.width;
        this.mainWindowInfo.height = size.height;
        this.mainWindowInfo.widthBp = this.getWidthBreakpoint(size.width);
      });
    });
  }
}
```

#### 3. 响应式列表布局

使用`lanes`属性实现响应式列数：

```typescript
List() {
  // 列表项内容
}
.width('100%')
// 响应式列数设置：小屏1列，中屏和大屏2列
.lanes(new WidthBreakpointType(1, 2, 2).getValue(this.mainWindowInfo.widthBp))
```

#### 4. 状态栏避让处理

根据系统状态栏高度设置内边距：

```typescript
.padding({
  // 根据系统状态栏高度设置顶部内边距，避免内容被状态栏遮挡
  top: this.getUIContext().px2vp(this.windowUtil?.mainWindowInfo.AvoidSystem?.topRect.height),
  left: 16,
  right: 16
})
```

### 实现步骤

1. 创建响应式断点工具类（WidthBreakpointType.ets）
2. 创建窗口工具类（WindowUtil.ets）
3. 实现各种布局示例组件（ListLayout.ets、GridLayout.ets等）
4. 实现主页面（Index.ets）
5. 添加资源文件（图标、字符串等）

## 5. ToDoList - 简易待办事项应用

### 项目概述

ToDoList项目实现了一个简单的待办事项应用，展示了HarmonyOS基本UI组件的使用和数据绑定。该项目结构简洁，适合初学者学习HarmonyOS应用开发的基础知识。

### 核心功能

- 待办事项列表显示
- 待办事项状态切换
- 简洁的UI设计

### 关键技术点

#### 1. 数据模型设计

使用单例模式实现数据模型：

```typescript
export class DataModel {
  /**
   * 保存的数据
   */
  public tasks: Array<Resource> = CommonConstants.TODO_DATA;

  /**
   * 获取数据
   */
  getData(): Array<Resource> {
    return this.tasks;
  }
}

export default new DataModel();
```

#### 2. 待办事项组件

实现可点击切换状态的待办事项组件：

```typescript
@Component
export default struct ToDoItem {
  public content?: string;
  @State isComplete: boolean = false;

  @Builder labelIcon(icon: Resource) {
    Image(icon)
      .objectFit(ImageFit.Contain)
      .width($r('app.float.checkbox_width'))
      .height($r('app.float.checkbox_width'))
      .margin($r('app.float.checkbox_margin'))
  }

  build() {
    Row() {
      if (this.isComplete) {
        this.labelIcon($r('app.media.ic_ok'));
      } else {
        this.labelIcon($r('app.media.ic_default'));
      }

      Text(this.content)
        .fontSize($r('app.float.item_font_size'))
        .fontWeight(CommonConstants.FONT_WEIGHT)
        .opacity(this.isComplete ? CommonConstants.OPACITY_COMPLETED : CommonConstants.OPACITY_DEFAULT)
        .decoration({ type: this.isComplete ? TextDecorationType.LineThrough : TextDecorationType.None })
    }
    .borderRadius(CommonConstants.BORDER_RADIUS)
    .backgroundColor($r('app.color.start_window_background'))
    .width(CommonConstants.LIST_DEFAULT_WIDTH)
    .height($r('app.float.list_item_height'))
    .onClick(() => {
      this.isComplete = !this.isComplete;
    })
  }
}
```

#### 3. 主页面实现

使用`ForEach`循环渲染待办事项列表：

```typescript
build() {
  Column({ space: CommonConstants.COLUMN_SPACE }) {
    Text($r('app.string.page_title'))
      .fontSize($r('app.float.title_font_size'))
      .fontWeight(FontWeight.Bold)
      .lineHeight($r('app.float.title_font_height'))
      .width(CommonConstants.TITLE_WIDTH)
      .margin({
        top: $r('app.float.title_margin_top'),
        bottom: $r('app.float.title_margin_bottom')
      })
      .textAlign(TextAlign.Start)

    ForEach(this.totalTasks, (item: string) => {
      ToDoItem({ content: item })
    }, (item: string) => JSON.stringify(item))
  }
  .width(CommonConstants.FULL_LENGTH)
  .height(CommonConstants.FULL_LENGTH)
  .backgroundColor($r('app.color.page_background'))
}
```

### 实现步骤

1. 定义常量配置（CommonConstant.ets）
2. 创建数据模型（DataModel.ets）
3. 实现待办事项组件（ToDoItem.ets）
4. 实现主页面（ToDoListPage.ets）
5. 添加资源文件（图标、字符串等）

## 6. TransitionAnimation - 过渡动画效果实现

### 项目概述

TransitionAnimation项目展示了HarmonyOS中各种过渡动画的实现方式，包括组件过渡、导航过渡、模态过渡和几何变换过渡等。该项目提供了丰富的动画示例，帮助开发者创建流畅的用户界面过渡效果。

### 核心功能

- 组件过渡动画
- 导航过渡动画
- 自定义导航过渡
- 几何变换过渡
- 模态过渡动画

### 关键技术点

#### 1. 自定义导航过渡

使用`customNavContentTransition`实现自定义导航过渡：

```typescript
.customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
  // 获取源（from）和目标（to）导航视图的动画对象
  const fromParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(from.navDestinationId || '');
  const toParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(to.navDestinationId || '');
  CustomTransition.getInstance().operation = operation;
  if (!fromParam.animation && !toParam.animation) {
    return undefined;
  }
  // 实现NavigationAnimatedTransition协议
  const customAnimation: NavigationAnimatedTransition = {
    timeout: 1000,
    transition: (transitionProxy: NavigationTransitionProxy) => {
      fromParam.animation && fromParam.animation(transitionProxy);
      toParam.animation && toParam.animation(transitionProxy);
    }
  };
  return customAnimation;
})
```

#### 2. 几何变换过渡

使用`sharedTransition`实现几何变换过渡：

```typescript
Image(this.imageSrc)
  .width('100%')
  .height(240)
  .objectFit(ImageFit.Cover)
  .sharedTransition(this.transitionId, {
    duration: 1000,
    curve: Curve.Smooth,
    delay: 100
  })
```

#### 3. 组件过渡动画

使用`transition`属性实现组件过渡：

```typescript
Column() {
  // 组件内容
}
.transition({
  type: TransitionType.All,
  opacity: this.isShow ? 1 : 0,
  scale: { x: this.isShow ? 1 : 0.5, y: this.isShow ? 1 : 0.5 },
  translate: { x: this.isShow ? 0 : 100, y: 0 }
})
```

#### 4. 模态过渡动画

使用`animateTo`实现模态过渡：

```typescript
animateTo({
  duration: 300,
  curve: Curve.Smooth,
  iterations: 1,
  playMode: PlayMode.Normal
}, () => {
  this.isShow = true;
})
```

### 实现步骤

1. 定义常量和工具类（CommonConstants.ets、CustomNavigationUtil.ets）
2. 实现各种过渡动画示例组件（ComponentTransition.ets、NavigationTransition.ets等）
3. 实现几何变换过渡示例（GeometryTransition.ets、GeometryTransitionDetail.ets）
4. 实现主页面（Index.ets）
5. 添加资源文件（图片、字符串等）

## 总结

通过这六个项目，我们学习了HarmonyOS应用开发的多个方面，包括：

1. **UI组件与交互**：列表、对话框、标签页等基础UI组件的使用和交互实现
2. **布局与适配**：响应式布局设计，适应不同屏幕尺寸和设备类型
3. **动画与过渡**：各种过渡动画效果的实现，提升用户体验
4. **数据管理**：数据模型设计和状态管理
5. **导航与路由**：页面导航和路由配置

这些项目提供了丰富的示例代码和实现方法，可以作为HarmonyOS应用开发的参考和学习资源。通过学习和实践这些项目，开发者可以掌握HarmonyOS应用开发的核心技能，并能够应用到实际项目中。
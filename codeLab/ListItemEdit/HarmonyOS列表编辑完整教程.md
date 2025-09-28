# HarmonyOS 列表编辑完整教程

## 项目创建与配置

### 第一步：创建新项目

1. **打开DevEco Studio**
2. **创建新项目**：
   - File → New → Create Project
   - 选择 "Empty Ability"
   - Project name: ListItemEdit
   - Bundle name: com.example.listitemdemo
   - Language: ArkTS
   - API Version: 17

3. **项目配置**：
   - 确保选择合适的设备类型（手机、平板等）
   - 点击 "Finish" 完成项目创建

### 第二步：项目目录结构

创建完成后，我们需要建立完整的目录结构：

```
ListItemEdit/
├── AppScope/
│   └── app.json5                    # 应用级配置文件
├── entry/
│   ├── src/main/
│   │   ├── ets/                     # ArkTS源码目录
│   │   │   ├── entryability/
│   │   │   │   └── EntryAbility.ets # 应用入口
│   │   │   ├── pages/
│   │   │   │   └── Index.ets        # 主页面
│   │   │   ├── view/
│   │   │   │   └── TodoListItem.ets # 列表项组件
│   │   │   ├── model/
│   │   │   │   └── ToDo.ets         # 数据模型
│   │   │   └── common/
│   │   │       └── Constants.ets    # 常量定义
│   │   └── resources/               # 资源文件
│   │       ├── base/
│   │       │   ├── element/
│   │       │   │   ├── string.json  # 字符串资源
│   │       │   │   └── color.json   # 颜色资源
│   │       │   └── media/           # 图片资源
│   │       └── rawfile/             # 原始文件
│   └── build-profile.json5          # 构建配置
├── hvigor/
└── oh-package.json5                 # 包依赖配置
```

### 第三步：配置应用级文件

**AppScope/app.json5** - 应用级配置文件：

```json
{
  "app": {
    "bundleName": "com.example.listitemedit",
    "vendor": "example",
    "versionCode": 1000000,
    "versionName": "1.0.0",
    "icon": "$media:app_icon",
    "label": "$string:app_name"
  }
}
```

**entry/build-profile.json5** - 模块构建配置：

```json
{
  "apiType": "stageMode",
  "buildOption": {
    "sourceOption": {
      "workers": [
        "./src/main/ets/workers/worker.ets"
      ]
    },
    "arkOptions": {
      "obfuscation": {
        "ruleOptions": {
          "enable": true,
          "files": ["./obfuscation-rules.txt"]
        },
        "consumerFiles": ["./consumer-rules.txt"]
      }
    }
  },
  "buildOptionSet": [
    {
      "name": "release",
      "arkOptions": {
        "obfuscation": {
          "ruleOptions": {
            "enable": true,
            "files": ["./obfuscation-rules.txt"]
          },
          "consumerFiles": ["./consumer-rules.txt"]
        }
      }
    }
  ],
  "targets": [
    {
      "name": "default",
      "runtimeOS": "HarmonyOS"
    }
  ]
}
```

**oh-package.json5** - 依赖包配置：

```json
{
  "name": "listitemdemo",
  "version": "1.0.0",
  "description": "Please describe the basic information.",
  "main": "",
  "author": "",
  "license": "",
  "dependencies": {}
}
```

## 资源文件配置

### 字符串资源配置

**entry/src/main/resources/base/element/string.json**：

```json
{
  "string": [
    {
      "name": "module_desc",
      "value": "module description"
    },
    {
      "name": "EntryAbility_desc",
      "value": "description"
    },
    {
      "name": "EntryAbility_label",
      "value": "ListItemEdit"
    },
    {
      "name": "app_name",
      "value": "待办事项管理"
    },
    {
      "name": "app_name_description",
      "value": "一个展示列表编辑功能的HarmonyOS应用"
    },
    {
      "name": "todo",
      "value": "待办事项"
    },
    {
      "name": "undo",
      "value": "未完成"
    },
    {
      "name": "done",
      "value": "已完成"
    },
    {
      "name": "edit",
      "value": "编辑"
    },
    {
      "name": "deleted",
      "value": "已删除"
    },
    {
      "name": "incomplete",
      "value": "功能开发中..."
    }
  ]
}
```

**entry/src/main/resources/base/element/string-array.json**：

```json
{
  "strarray": [
    {
      "name": "available_things",
      "value": [
        "晨练",
        "准备早餐",
        "阅读经典",
        "学习ArkTS",
        "看电视放松",
        "整理房间",
        "购买生活用品",
        "写工作报告",
        "学习新技能",
        "与朋友聚餐"
      ]
    }
  ]
}
```

**entry/src/main/resources/base/element/color.json**：

```json
{
  "color": [
    {
      "name": "background_color",
      "value": "#F5F5F5"
    },
    {
      "name": "start_window_background",
      "value": "#FFFFFF"
    },
    {
      "name": "start_window_background_dark",
      "value": "#000000"
    }
  ]
}
```

### 模块配置文件

**entry/src/main/module.json5** - 模块配置文件：

```json
{
  "module": {
    "name": "entry",
    "type": "entry",
    "description": "$string:module_desc",
    "mainElement": "EntryAbility",
    "deviceTypes": [
      "phone",
      "tablet",
      "2in1"
    ],
    "deliveryWithInstall": true,
    "installationFree": false,
    "pages": "$profile:main_pages",
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ets",
        "description": "$string:EntryAbility_desc",
        "icon": "$media:layered_image",
        "label": "$string:EntryAbility_label",
        "startWindowIcon": "$media:startIcon",
        "startWindowBackground": "$color:start_window_background",
        "exported": true,
        "skills": [
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              "action.system.home"
            ]
          }
        ]
      }
    ],
    "extensionAbilities": [
      {
        "name": "EntryBackupAbility",
        "srcEntry": "./ets/entrybackupability/EntryBackupAbility.ets",
        "type": "backup",
        "exported": false,
        "metadata": [
          {
            "name": "ohos.extension.backup",
            "resource": "$profile:backup_config"
          }
        ]
      }
    ],
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```

**entry/src/main/resources/base/profile/main_pages.json** - 页面路由配置：

```json
{
  "src": [
    "pages/Index"
  ]
}
```

## 数据模型实现

### 创建ToDo数据模型

**entry/src/main/ets/model/ToDo.ets**：

```typescript
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// 导入工具库，用于生成UUID
import { util } from '@kit.ArkTS'

/**
 * 待办事项数据模型类
 *
 * 这个类定义了待办事项的数据结构和基本行为
 * 使用@Observed装饰器使其成为可观察对象，当属性发生变化时
 * 能够自动通知UI组件进行更新
 *
 * 主要属性：
 * - key: 唯一标识符，用于区分不同的待办事项
 * - name: 待办事项的名称/内容
 * - isCompleted: 完成状态，true表示已完成，false表示未完成
 */
@Observed
export class ToDo {
  /**
   * 唯一标识符
   * 使用util.generateRandomUUID(true)生成带连接符的UUID
   * 这确保每个待办事项都有一个全局唯一的标识符
   */
  key: string = util.generateRandomUUID(true);

  /**
   * 待办事项名称
   * 存储用户输入的待办事项内容
   */
  name: string;

  /**
   * 完成状态
   * false: 未完成（默认状态）
   * true: 已完成
   */
  isCompleted: boolean = false;

  /**
   * 构造函数
   * 创建新的待办事项实例
   *
   * @param name - 待办事项的名称，由用户提供
   */
  constructor(name: string) {
    this.name = name;
  }

  /**
   * 切换完成状态
   * 便捷方法，用于在完成/未完成状态之间切换
   */
  toggleCompleted(): void {
    this.isCompleted = !this.isCompleted;
  }

  /**
   * 获取显示文本
   * 根据完成状态返回不同的显示效果
   *
   * @returns 格式化后的显示文本
   */
  getDisplayText(): string {
    return this.isCompleted ? `✓ ${this.name}` : this.name;
  }

  /**
   * 克隆当前对象
   * 创建一个新的ToDo实例，具有相同的属性值但不同的key
   *
   * @returns 新的ToDo实例
   */
  clone(): ToDo {
    const newTodo = new ToDo(this.name);
    newTodo.isCompleted = this.isCompleted;
    return newTodo;
  }
}
```

## 常量管理实现

### 创建常量定义文件

**entry/src/main/ets/common/Constants.ets**：

```typescript
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 样式配置常量
 *
 * 这个配置对象包含了应用中所有UI组件的尺寸、间距、动画等样式参数
 * 使用Record<string, number>类型确保所有值都是数字类型
 * 集中管理样式常量有以下优势：
 * 1. 便于维护和修改
 * 2. 确保UI风格的一致性
 * 3. 避免魔法数字分散在代码中
 * 4. 便于主题切换和动态样式调整
 */
export const STYLE_CONFIG: Record<string, number> = {
  // 图片和图标尺寸相关
  'IMAGE_SIZE': 32,              // 普通图片的标准尺寸（像素）
  'IMAGE_MARGIN': 4,             // 图片的外边距
  'ICON_GUTTER': 4,              // 图标之间的间距
  'MENU_IMAGE_SIZE': 24,         // 菜单中图标的尺寸
  'IMAGE_ICON_OK_SIZE': 15,      // 完成状态图标的尺寸
  'CUSTOM_CHECKBOX_SIZE': 20,    // 自定义复选框的尺寸

  // 按钮和操作区域相关
  'OPERATION_BUTTON_PADDING': 4, // 操作按钮的内边距
  'MENU_HEIGHT': 56,             // 菜单栏的高度

  // 列表和布局相关
  'LIST_ITEM_GUTTER': 12,        // 列表项之间的间距
  'TODO_ITEM_HEIGHT': 80,        // 待办事项条目的高度
  'TODO_ITEM_PADDING_VERTICAL': 4, // 待办事项条目的垂直内边距
  'TEXT_MARGIN_LEFT': 40,        // 文本左边距
  'IMAGE_MARGIN_RIGHT': 30,      // 图片右边距

  // 边框和装饰相关
  'BORDER_WIDTH': 3,             // 边框宽度

  // 动画相关
  'ANIMATION_DURATION': 600,     // 动画持续时间（毫秒）
};

/**
 * 通用常量类
 *
 * 包含应用中使用的百分比、字符串等常量
 * 使用static readonly确保常量不可修改
 */
export class Constant {
  /**
   * 百分比常量 - 12%
   * 通常用于头部区域或小比例布局
   */
  static readonly PERCENT_12: string = '12%';

  /**
   * 百分比常量 - 100%
   * 表示占满父容器的完整尺寸
   */
  static readonly PERCENT_FULL: string = '100%';

  /**
   * 百分比常量 - 90%
   * 常用于内容区域，留出一定边距
   */
  static readonly PERCENT_90: string = '90%';

  /**
   * 百分比常量 - 80%
   * 用于更紧凑的布局
   */
  static readonly PERCENT_80: string = '80%';

  /**
   * Z轴层级常量
   * 用于控制组件的显示层级
   */
  static readonly Z_INDEX_DEFAULT: number = 1;
  static readonly Z_INDEX_POPUP: number = 100;
  static readonly Z_INDEX_TOAST: number = 999;

  /**
   * 动画曲线常量
   * 定义不同类型的动画效果
   */
  static readonly ANIMATION_CURVE_EASE: string = 'ease';
  static readonly ANIMATION_CURVE_LINEAR: string = 'linear';
  static readonly ANIMATION_CURVE_EASE_IN_OUT: string = 'ease-in-out';

  /**
   * 延迟时间常量（毫秒）
   */
  static readonly DELAY_SHORT: number = 200;
  static readonly DELAY_MEDIUM: number = 500;
  static readonly DELAY_LONG: number = 1000;

  /**
   * 透明度常量
   */
  static readonly OPACITY_TRANSPARENT: number = 0;
  static readonly OPACITY_HALF: number = 0.5;
  static readonly OPACITY_FULL: number = 1;

  /**
   * 圆角半径常量
   */
  static readonly BORDER_RADIUS_SMALL: number = 4;
  static readonly BORDER_RADIUS_MEDIUM: number = 8;
  static readonly BORDER_RADIUS_LARGE: number = 16;
  static readonly BORDER_RADIUS_ROUND: number = 50;
}

/**
 * 业务逻辑常量
 * 包含应用业务相关的常量定义
 */
export class BusinessConstant {
  /**
   * 列表操作类型
   */
  static readonly OPERATION_ADD: string = 'add';
  static readonly OPERATION_DELETE: string = 'delete';
  static readonly OPERATION_EDIT: string = 'edit';
  static readonly OPERATION_TOGGLE: string = 'toggle';

  /**
   * 数据存储键名
   */
  static readonly STORAGE_KEY_TODOS: string = 'todo_list_data';
  static readonly STORAGE_KEY_SETTINGS: string = 'app_settings';

  /**
   * 最大数据限制
   */
  static readonly MAX_TODO_ITEMS: number = 100;
  static readonly MAX_TODO_NAME_LENGTH: number = 50;

  /**
   * 默认数据
   */
  static readonly DEFAULT_TODO_ITEMS: string[] = [
    '晨练',
    '准备早餐',
    '阅读经典',
    '学习ArkTS',
    '看电视放松'
  ];
}
```

## 列表项组件实现

### 创建TodoListItem组件

**entry/src/main/ets/view/TodoListItem.ets**：

```typescript
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// 导入常量配置
import { STYLE_CONFIG, Constant } from '../common/Constants';
// 导入数据模型
import { ToDo } from '../model/ToDo';

/**
 * 待办事项列表项组件
 *
 * 这是一个功能完整的列表项组件，包含以下特性：
 * 1. 自定义复选框，支持完成状态切换
 * 2. 在线编辑功能，可直接修改任务名称
 * 3. 状态相关的视觉效果（删除线、透明度等）
 * 4. 平滑的动画过渡效果
 * 5. 响应式布局，适配不同屏幕尺寸
 *
 * 组件使用了多种状态管理装饰器：
 * - @Link: 与父组件双向绑定的数组数据
 * - @ObjectLink: 监听对象属性变化
 * - @State: 组件内部状态管理
 */
@Component
export struct ToDoListItem {
  /**
   * UI上下文对象
   * 用于获取界面相关的API，如动画、对话框等
   */
  UIContext = this.getUIContext();

  /**
   * 已完成任务数组的引用
   * 使用@Link装饰器与父组件双向绑定
   * 当这个数组发生变化时，父组件也会同步更新
   */
  @Link achieveData: ToDo[];

  /**
   * 未完成任务数组的引用
   * 使用@Link装饰器与父组件双向绑定
   */
  @Link toDoData: ToDo[];

  /**
   * 当前任务对象的引用
   * 使用@ObjectLink装饰器监听对象属性变化
   * 当ToDo对象的任何属性发生变化时，UI会自动更新
   */
  @ObjectLink toDoItem: ToDo;

  /**
   * 编辑状态标识
   * 控制组件是否处于编辑模式
   * false: 显示模式，只能查看和切换完成状态
   * true: 编辑模式，可以修改任务名称
   */
  @State isEdited: boolean = false;

  /**
   * 添加/移除已完成任务的方法
   *
   * 这个方法负责处理任务状态的切换逻辑：
   * 1. 切换任务的完成状态
   * 2. 使用动画效果在不同列表间移动任务
   * 3. 更新父组件的数据数组
   *
   * 动画实现：
   * - 使用UIContext.animateTo创建平滑过渡效果
   * - 动画持续时间由STYLE_CONFIG.ANIMATION_DURATION控制
   * - 在动画回调中执行数据操作，确保视觉效果连贯
   */
  addAchieveData() {
    // 第一步：切换任务的完成状态
    this.toDoItem.isCompleted = !this.toDoItem.isCompleted;

    // 第二步：使用动画效果执行数据迁移
    this.UIContext.animateTo({
      duration: STYLE_CONFIG.ANIMATION_DURATION,  // 动画持续时间
      curve: Curve.EaseInOut,                     // 动画曲线
      iterations: 1,                              // 动画次数
      playMode: PlayMode.Normal                   // 播放模式
    }, () => {
      // 动画回调函数：在动画执行期间进行数据操作

      if (this.toDoItem.isCompleted) {
        // 任务标记为完成：从未完成列表移动到已完成列表

        // 从未完成列表中过滤掉当前任务
        let tempData = this.toDoData.filter(item => item.key !== this.toDoItem.key);
        this.toDoData = tempData;

        // 将当前任务添加到已完成列表的末尾
        this.achieveData.push(this.toDoItem);

      } else {
        // 任务取消完成：从已完成列表移动回未完成列表

        // 从已完成列表中过滤掉当前任务
        let tempData = this.achieveData.filter(item => item.key !== this.toDoItem.key);
        this.achieveData = tempData;

        // 将当前任务重新添加到未完成列表的末尾
        this.toDoData.push(this.toDoItem);
      }
    });
  }

  /**
   * 组件构建方法
   * 定义了组件的UI结构和布局
   */
  build() {
    // 使用Flex布局作为根容器
    Flex({
      justifyContent: FlexAlign.SpaceBetween,  // 主轴两端对齐
      alignItems: ItemAlign.Center             // 交叉轴居中对齐
    }) {
      // 主要内容区域：水平排列的复选框、文本和编辑按钮
      Row({ space: STYLE_CONFIG.ICON_GUTTER }) {

        // 条件渲染：根据编辑状态显示不同内容
        if (!this.isEdited) {
          // 显示模式的内容

          // 自定义复选框容器
          Row() {
            // 条件渲染：根据完成状态显示对勾图标
            if (this.toDoItem.isCompleted) {
              Image($r('app.media.ic_public_ok_filled'))
                .width(STYLE_CONFIG.IMAGE_ICON_OK_SIZE)    // 图标宽度
                .aspectRatio(1)                            // 保持1:1宽高比
                .borderRadius(STYLE_CONFIG.IMAGE_ICON_OK_SIZE) // 圆形图标
                .fillColor(Color.White)                    // 图标颜色为白色
                .transition(TransitionEffect.IDENTITY)     // 过渡效果
            }
            // 注意：未完成状态下不显示任何图标，只显示空的圆形边框
          }
          .width(STYLE_CONFIG.CUSTOM_CHECKBOX_SIZE)        // 复选框容器宽度
          .justifyContent(FlexAlign.Center)                // 内容居中
          .aspectRatio(1)                                  // 保持1:1宽高比（圆形）
          .borderRadius(STYLE_CONFIG.CUSTOM_CHECKBOX_SIZE) // 圆形边框
          // 动态背景色：完成状态下显示系统主题色，未完成状态下透明
          .backgroundColor(this.toDoItem.isCompleted ?
            $r('sys.color.ohos_id_color_floating_button_bg_normal') :
            Color.Transparent)
          .borderWidth(1)                                  // 边框宽度
          .borderColor($r('sys.color.ohos_id_color_focused_content_tertiary')) // 边框颜色
          .onClick(() => {
            // 点击复选框切换完成状态
            this.addAchieveData();
          })

          // 任务名称文本显示
          Text(`${this.toDoItem.name}`)
            .maxLines(1)                                   // 最大显示行数
            .fontSize($r('sys.float.ohos_id_text_size_headline9')) // 系统标准字体大小
            .layoutWeight(1)                               // 占用剩余空间
            // 动态文本装饰：完成状态下添加删除线
            .decoration({
              type: this.toDoItem.isCompleted ?
                TextDecorationType.LineThrough :
                TextDecorationType.None
            })
            .fontColor(this.toDoItem.isCompleted ?
              $r('sys.color.ohos_id_color_text_secondary') :
              $r('sys.color.ohos_id_color_text_primary'))  // 动态文字颜色

        } else {
          // 编辑模式的内容

          // 文本输入框，用于编辑任务名称
          TextInput({
            text: `${this.toDoItem.name}`,                 // 初始文本内容
            placeholder: '请输入任务名称'                   // 占位符文本
          })
            .maxLines(1)                                   // 最大行数
            .fontSize($r('sys.float.ohos_id_text_size_headline9')) // 字体大小与显示模式保持一致
            .layoutWeight(1)                               // 占用剩余空间
            .backgroundColor(Color.Transparent)           // 透明背景
            .borderWidth(0)                                // 无边框
            .id('textEdit')                                // 设置组件ID，用于焦点控制
            .onChange((value: string) => {
              // 输入内容变化时的回调
              // 实时更新ToDo对象的name属性
              this.toDoItem.name = value;

              // 可以在这里添加输入验证逻辑
              if (value.length > 50) {
                // 如果输入超过50个字符，可以截断或提示
                console.warn('任务名称过长，建议控制在50字符以内');
              }
            })
            .onAppear(() => {
              // 组件出现时的回调
              // 自动请求输入焦点，方便用户立即编辑
              focusControl.requestFocus('textEdit');
            })
            .onBlur(() => {
              // 失去焦点时自动退出编辑模式
              this.isEdited = false;
            })
        }

        // 空白填充区域，将编辑按钮推到右侧
        Blank()

        // 条件渲染：编辑状态下显示确认按钮，否则显示编辑按钮
        if (this.isEdited) {
          // 编辑模式：确认按钮
          Image($r('app.media.ic_public_ok_filled'))
            .width(STYLE_CONFIG.MENU_IMAGE_SIZE)           // 按钮图标尺寸
            .aspectRatio(1)                                // 保持1:1宽高比
            .fillColor($r('sys.color.ohos_id_color_primary')) // 主题色
            .onClick(() => {
              // 点击确认按钮，退出编辑模式
              this.isEdited = false;

              // 可以在这里添加保存逻辑
              console.info('任务编辑完成:', this.toDoItem.name);
            })

        } else {
          // 显示模式：编辑按钮
          Text($r('app.string.edit'))
            .fontColor($r('sys.color.ohos_id_color_text_secondary')) // 次要文本颜色
            .fontSize($r('sys.float.ohos_id_text_size_caption'))      // 较小字体
            .onClick(() => {
              // 点击编辑按钮，进入编辑模式
              this.isEdited = true;

              console.info('开始编辑任务:', this.toDoItem.name);
            })
        }
      }
      .width(Constant.PERCENT_FULL)                        // 行容器占满宽度
    }
    .width(Constant.PERCENT_FULL)                          // 主容器占满宽度
    .height(STYLE_CONFIG.TODO_ITEM_HEIGHT)                 // 固定高度
    .padding({
      left: $r('sys.float.ohos_id_default_padding_start'), // 系统标准左内边距
      right: $r('sys.float.ohos_id_default_padding_end'),  // 系统标准右内边距
      top: STYLE_CONFIG.TODO_ITEM_PADDING_VERTICAL,        // 垂直内边距
      bottom: STYLE_CONFIG.TODO_ITEM_PADDING_VERTICAL
    })
    .borderRadius($r('sys.float.ohos_id_corner_radius_default_m')) // 系统标准圆角
    .backgroundColor(Color.White)                          // 白色背景
    // 添加点击涟漪效果
    .stateStyles({
      pressed: {
        .backgroundColor($r('sys.color.ohos_id_color_click_effect')) // 按下时的背景色
      },
      normal: {
        .backgroundColor(Color.White)                      // 正常状态的背景色
      }
    })
  }
}
```

## 主页面实现

### 创建Index主页面

**entry/src/main/ets/pages/Index.ets**：

```typescript
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// 导入数据模型
import { ToDo } from '../model/ToDo';
// 导入列表项组件
import { ToDoListItem } from '../view/TodoListItem';
// 导入常量配置
import { STYLE_CONFIG, Constant, BusinessConstant } from '../common/Constants';
// 导入系统API
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

/**
 * 扩展Image组件的样式
 * 使用@Extend装饰器为Image组件添加统一的样式配置
 * 这样可以在多个地方复用相同的样式，保持UI一致性
 */
@Extend(Image)
function ImageStyle() {
  .width(STYLE_CONFIG.IMAGE_SIZE)                          // 图片宽度
  .aspectRatio(1)                                          // 保持1:1宽高比
  .margin(STYLE_CONFIG.IMAGE_MARGIN)                       // 图片外边距
  .borderRadius(STYLE_CONFIG.BORDER_RADIUS_SMALL)          // 小圆角
  .backgroundColor($r('sys.color.ohos_id_color_button_normal')) // 按钮背景色
}

/**
 * 待办事项列表主页面组件
 *
 * 这是应用的主要界面，包含以下核心功能：
 * 1. 待办事项的显示和管理
 * 2. 添加新的待办事项
 * 3. 任务状态切换（完成/未完成）
 * 4. 滑动删除操作
 * 5. 在线编辑功能
 * 6. 分类显示（未完成/已完成）
 *
 * 页面采用响应式设计，支持多种设备尺寸
 * 使用List组件实现高性能的列表渲染
 * 所有操作都有相应的用户反馈和动画效果
 */
@Entry
@Component
struct ToDoList {
  /**
   * 未完成任务数据数组
   * 使用@State装饰器标记为组件状态
   * 当数组发生变化时，相关的UI组件会自动重新渲染
   */
  @State toDoData: ToDo[] = [];

  /**
   * 已完成任务数据数组
   * 存储用户已经完成的待办事项
   */
  @State achieveData: ToDo[] = [];

  /**
   * 加载状态标识
   * 用于显示加载动画或禁用操作按钮
   */
  @State isLoading: boolean = false;

  /**
   * 搜索关键词
   * 用于实现任务搜索功能（可扩展）
   */
  @State searchKeyword: string = '';

  /**
   * 删除待办事项的方法
   *
   * 这个方法处理任务删除的完整逻辑：
   * 1. 根据任务状态从对应数组中删除
   * 2. 显示删除成功的提示信息
   * 3. 记录删除操作的日志
   * 4. 处理可能出现的异常情况
   *
   * @param item - 要删除的待办事项对象
   */
  deleteTodoItem(item: ToDo) {
    try {
      // 设置加载状态，防止重复操作
      this.isLoading = true;

      // 根据任务的完成状态，从对应的数组中删除
      if (item.isCompleted) {
        // 从已完成任务数组中删除
        this.achieveData = this.achieveData.filter(todoItem => item.key !== todoItem.key);
        hilog.info(0x0000, 'ToDoList', `已完成任务删除: ${item.name}`);
      } else {
        // 从未完成任务数组中删除
        this.toDoData = this.toDoData.filter(todoItem => item.key !== todoItem.key);
        hilog.info(0x0000, 'ToDoList', `未完成任务删除: ${item.name}`);
      }

      // 显示删除成功的Toast提示
      this.getUIContext().getPromptAction().showToast({
        message: $r('app.string.deleted'),
        duration: 2000,                                    // 显示2秒
        bottom: 100                                        // 距离底部100px
      });

      // 可以在这里添加数据持久化逻辑
      this.saveDataToPersistence();

    } catch (error) {
      // 异常处理：记录错误日志并提示用户
      let err = error as BusinessError;
      hilog.error(0x0000, 'ToDoList',
        `删除任务失败 - code: ${err.code}, message: ${err.message}`);

      // 显示错误提示
      this.getUIContext().getPromptAction().showToast({
        message: '删除失败，请重试',
        duration: 2000
      });
    } finally {
      // 无论成功失败，都要重置加载状态
      this.isLoading = false;
    }
  }

  /**
   * 数据持久化方法（扩展功能）
   * 将当前的任务数据保存到本地存储
   */
  private saveDataToPersistence() {
    // 这里可以实现数据持久化逻辑
    // 例如使用preferences API保存到本地
    const allData = {
      toDoData: this.toDoData,
      achieveData: this.achieveData,
      timestamp: new Date().getTime()
    };

    hilog.info(0x0000, 'ToDoList', '数据已保存到本地存储');
  }

  /**
   * 滑动操作菜单构建器
   * 使用@Builder装饰器定义可复用的UI构建函数
   * 当用户左滑列表项时，会显示这个操作菜单
   *
   * @param item - 当前操作的待办事项对象
   */
  @Builder
  itemEnd(item: ToDo) {
    // 水平排列的操作按钮行
    Row({ space: STYLE_CONFIG.ICON_GUTTER }) {

      // 设置按钮（功能待实现）
      Image($r('app.media.ic_public_settings_filled'))
        .ImageStyle()                                      // 应用统一的图片样式
        .onClick(() => {
          // 设置功能的点击处理
          this.getUIContext().getPromptAction().showToast({
            message: $r('app.string.incomplete'),
            duration: 1500
          });

          hilog.info(0x0000, 'ToDoList', `设置操作: ${item.name}`);
        })

      // 详情按钮（功能待实现）
      Image($r('app.media.ic_public_detail_filled'))
        .ImageStyle()
        .onClick(() => {
          // 详情功能的点击处理
          this.getUIContext().getPromptAction().showToast({
            message: $r('app.string.incomplete'),
            duration: 1500
          });

          hilog.info(0x0000, 'ToDoList', `详情操作: ${item.name}`);
        })

      // 删除按钮
      Image($r('app.media.ic_public_delete_filled'))
        .ImageStyle()
        .fillColor($r('sys.color.ohos_id_color_alert'))    // 警告色，表示危险操作
        .onClick(() => {
          // 删除确认逻辑
          this.showDeleteConfirmDialog(item);
        })
    }
    .padding(STYLE_CONFIG.OPERATION_BUTTON_PADDING)       // 操作按钮区域内边距
    .justifyContent(FlexAlign.SpaceEvenly)                // 按钮等间距分布
    .backgroundColor($r('sys.color.ohos_id_color_sub_background')) // 子背景色
    .borderRadius($r('sys.float.ohos_id_corner_radius_default_m'))  // 圆角
  }

  /**
   * 显示删除确认对话框
   * 为重要操作提供二次确认，防止误删
   *
   * @param item - 要删除的任务项
   */
  showDeleteConfirmDialog(item: ToDo) {
    this.getUIContext().showAlertDialog({
      title: '确认删除',
      message: `确定要删除任务"${item.name}"吗？此操作不可撤销。`,
      alignment: DialogAlignment.Center,
      primaryButton: {
        value: '取消',
        fontColor: $r('sys.color.ohos_id_color_text_secondary'),
        action: () => {
          hilog.info(0x0000, 'ToDoList', '用户取消删除操作');
        }
      },
      secondaryButton: {
        value: '删除',
        fontColor: $r('sys.color.ohos_id_color_alert'),
        action: () => {
          this.deleteTodoItem(item);
        }
      }
    });
  }

  /**
   * 组件生命周期：即将出现
   * 在组件显示前执行初始化操作
   */
  aboutToAppear() {
    hilog.info(0x0000, 'ToDoList', '待办事项页面初始化');

    // 加载本地存储的数据
    this.loadDataFromPersistence();

    // 如果没有数据，添加一些示例数据
    if (this.toDoData.length === 0 && this.achieveData.length === 0) {
      this.initializeDefaultData();
    }
  }

  /**
   * 从本地存储加载数据（扩展功能）
   */
  private loadDataFromPersistence() {
    // 这里可以实现从preferences或数据库加载数据的逻辑
    hilog.info(0x0000, 'ToDoList', '从本地存储加载数据');
  }

  /**
   * 初始化默认数据
   * 为新用户提供一些示例任务
   */
  private initializeDefaultData() {
    BusinessConstant.DEFAULT_TODO_ITEMS.forEach(item => {
      this.toDoData.push(new ToDo(item));
    });

    hilog.info(0x0000, 'ToDoList', `初始化${this.toDoData.length}个默认任务`);
  }

  /**
   * 主页面构建方法
   * 定义了整个页面的UI结构和布局
   */
  build() {
    // 垂直布局的主容器
    Column() {

      // 页面头部区域
      Row({ space: STYLE_CONFIG.LIST_ITEM_GUTTER }) {

        // 页面标题
        Text($r('app.string.todo'))
          .fontSize($r('sys.float.ohos_id_text_size_headline7'))  // 大标题字体
          .fontWeight(FontWeight.Bold)                           // 粗体
          .fontColor($r('sys.color.ohos_id_color_text_primary')) // 主要文本颜色
          .maxLines(1)                                           // 单行显示

        // 空白填充，将添加按钮推到右侧
        Blank()

        // 任务统计信息（可选功能）
        Text(`${this.toDoData.length + this.achieveData.length}`)
          .fontSize($r('sys.float.ohos_id_text_size_body2'))
          .fontColor($r('sys.color.ohos_id_color_text_secondary'))
          .opacity(0.6)

        // 添加按钮
        Image($r('app.media.ic_public_add_filled'))
          .width(STYLE_CONFIG.MENU_IMAGE_SIZE)                   // 按钮尺寸
          .aspectRatio(1)                                        // 保持正方形
          .fillColor($r('sys.color.ohos_id_color_primary'))     // 主题色
          .borderRadius(STYLE_CONFIG.BORDER_RADIUS_ROUND)        // 圆形按钮
          .backgroundColor($r('sys.color.ohos_id_color_button_normal')) // 按钮背景
          .padding(4)                                            // 内边距
          .onClick(() => {
            // 添加新任务的处理逻辑
            this.showAddTaskDialog();
          })
          // 添加按钮状态样式
          .stateStyles({
            pressed: {
              .scale({ x: 0.95, y: 0.95 })                      // 按下时缩放效果
            },
            normal: {
              .scale({ x: 1, y: 1 })                            // 正常状态
            }
          })
      }
      .height(Constant.PERCENT_12)                              // 头部高度占12%
      .width(Constant.PERCENT_FULL)                             // 占满宽度
      .padding({
        left: $r('sys.float.ohos_id_max_padding_start'),        // 系统标准左内边距
        right: $r('sys.float.ohos_id_max_padding_end'),         // 系统标准右内边距
        top: $r('sys.float.ohos_id_max_padding_top'),           // 顶部内边距
        bottom: $r('sys.float.ohos_id_elements_margin_vertical_m') // 底部内边距
      })
      .backgroundColor(Color.White)                             // 白色背景

      // 主要内容区域：任务列表
      List({
        initialIndex: 0,                                        // 初始显示位置
        space: STYLE_CONFIG.LIST_ITEM_GUTTER                    // 列表项间距
      }) {

        // 未完成任务部分
        if (this.toDoData.length !== 0) {
          // 未完成任务的分组标题
          ListItem() {
            Text($r('app.string.undo'))
              .fontSize($r('sys.float.ohos_id_text_size_headline8'))   // 标题字体
              .fontWeight(FontWeight.Medium)                           // 中等粗细
              .fontColor($r('sys.color.ohos_id_color_text_primary'))   // 主要文本颜色
              .margin({
                left: $r('sys.float.ohos_id_default_padding_start'),   // 左边距
                top: $r('sys.float.ohos_id_elements_margin_vertical_m'), // 顶部边距
                bottom: $r('sys.float.ohos_id_elements_margin_vertical_s') // 底部边距
              })
          }
          .selectable(false)                                           // 标题不可选择
        }

        // 遍历未完成任务数组，生成列表项
        ForEach(this.toDoData, (toDoItem: ToDo) => {
          ListItem() {
            // 使用ToDoListItem组件显示任务
            ToDoListItem({
              toDoItem: toDoItem,                                     // 当前任务对象
              achieveData: this.achieveData,                          // 已完成任务数组引用
              toDoData: this.toDoData                                 // 未完成任务数组引用
            })
          }
          // 配置滑动操作
          .swipeAction({
            end: this.itemEnd(toDoItem),                              // 左滑显示的操作菜单
            edgeEffect: SwipeEdgeEffect.Spring                        // 边缘弹性效果
          })
          // 列表项动画效果
          .transition(TransitionEffect.asymmetric(
            TransitionEffect.move(TransitionEdge.START).animation({
              duration: 300,
              curve: Curve.EaseOut
            }),
            TransitionEffect.move(TransitionEdge.END).animation({
              duration: 300,
              curve: Curve.EaseIn
            })
          ))
        }, (toDoItem: ToDo) => toDoItem.key)                          // 使用key作为唯一标识

        // 已完成任务部分
        if (this.achieveData.length !== 0) {
          // 已完成任务的分组标题
          ListItem() {
            Text($r('app.string.done'))
              .fontSize($r('sys.float.ohos_id_text_size_headline8'))
              .fontWeight(FontWeight.Medium)
              .fontColor($r('sys.color.ohos_id_color_text_secondary')) // 次要文本颜色
              .opacity(0.8)                                             // 降低透明度
              .margin({
                left: $r('sys.float.ohos_id_default_padding_start'),
                top: $r('sys.float.ohos_id_elements_margin_vertical_l'), // 较大的顶部边距
                bottom: $r('sys.float.ohos_id_elements_margin_vertical_s')
              })
          }
          .selectable(false)
        }

        // 遍历已完成任务数组，生成列表项
        ForEach(this.achieveData, (toDoItem: ToDo) => {
          ListItem() {
            ToDoListItem({
              toDoItem: toDoItem,
              achieveData: this.achieveData,
              toDoData: this.toDoData
            })
          }
          .swipeAction({
            end: this.itemEnd(toDoItem),
            edgeEffect: SwipeEdgeEffect.Spring
          })
          // 已完成任务的特殊样式
          .opacity(0.7)                                               // 降低整体透明度
          .transition(TransitionEffect.asymmetric(
            TransitionEffect.move(TransitionEdge.START).animation({
              duration: 300,
              curve: Curve.EaseOut
            }),
            TransitionEffect.move(TransitionEdge.END).animation({
              duration: 300,
              curve: Curve.EaseIn
            })
          ))
        }, (toDoItem: ToDo) => toDoItem.key)

        // 空状态提示（当没有任务时显示）
        if (this.toDoData.length === 0 && this.achieveData.length === 0) {
          ListItem() {
            Column() {
              Image($r('app.media.ic_empty_list'))
                .width(100)
                .height(100)
                .opacity(0.3)

              Text('暂无任务')
                .fontSize($r('sys.float.ohos_id_text_size_body1'))
                .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                .margin({ top: 16 })

              Text('点击右上角的+按钮添加新任务')
                .fontSize($r('sys.float.ohos_id_text_size_body2'))
                .fontColor($r('sys.color.ohos_id_color_text_tertiary'))
                .margin({ top: 8 })
            }
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
            .padding(40)
          }
          .selectable(false)
        }

      }
      .layoutWeight(1)                                                // 占用剩余空间
      .listDirection(Axis.Vertical)                                   // 垂直方向
      .edgeEffect(EdgeEffect.Spring)                                  // 边缘弹性效果
      .friction(0.6)                                                  // 摩擦系数
      .scrollBar(BarState.Off)                                        // 隐藏滚动条
      .padding({
        top: $r('sys.float.ohos_id_default_padding_top'),             // 顶部内边距
        left: $r('sys.float.ohos_id_default_padding_start'),          // 左内边距
        right: $r('sys.float.ohos_id_default_padding_end'),           // 右内边距
        bottom: $r('sys.float.ohos_id_default_padding_bottom')        // 底部内边距
      })
      .divider({
        strokeWidth: 1,                                               // 分割线宽度
        color: $r('sys.color.ohos_id_color_list_separator'),          // 分割线颜色
        startMargin: $r('sys.float.ohos_id_default_padding_start'),   // 起始边距
        endMargin: $r('sys.float.ohos_id_default_padding_end')        // 结束边距
      })

    }
    .backgroundColor($r('app.color.background_color'))                // 页面背景色
    .height(Constant.PERCENT_FULL)                                    // 占满高度
    .width(Constant.PERCENT_FULL)                                     // 占满宽度
  }

  /**
   * 显示添加任务对话框
   * 使用系统提供的TextPickerDialog选择预定义任务
   */
  showAddTaskDialog() {
    try {
      this.getUIContext().showTextPickerDialog({
        // 从字符串数组资源中获取可选任务列表
        range: this.getUIContext().getHostContext()?.resourceManager
          .getStringArrayValueSync($r('app.strarray.available_things').id),
        selected: 0,                                                  // 默认选中第一项
        canLoop: true,                                                // 允许循环滚动
        onAccept: (value: TextPickerResult) => {
          // 用户确认选择后的回调
          const selectedText = this.getUIContext().getHostContext()?.resourceManager
            .getStringArrayValueSync($r('app.strarray.available_things').id)[Number(value.index)];

          if (selectedText) {
            // 在未完成任务列表开头添加新任务
            this.toDoData.unshift(new ToDo(selectedText));

            // 显示添加成功的提示
            this.getUIContext().getPromptAction().showToast({
              message: `已添加任务：${selectedText}`,
              duration: 2000
            });

            // 记录操作日志
            hilog.info(0x0000, 'ToDoList', `新增任务: ${selectedText}`);

            // 保存数据
            this.saveDataToPersistence();
          }
        },
        onCancel: () => {
          // 用户取消选择的回调
          hilog.info(0x0000, 'ToDoList', '用户取消添加任务');
        }
      });
    } catch (error) {
      // 异常处理
      let err = error as BusinessError;
      hilog.error(0x0000, 'ToDoList',
        `显示添加对话框失败 - code: ${err.code}, message: ${err.message}`);

      this.getUIContext().getPromptAction().showToast({
        message: '添加任务失败，请重试',
        duration: 2000
      });
    }
  }

  /**
   * 组件生命周期：即将消失
   * 在组件销毁前执行清理操作
   */
  aboutToDisappear() {
    // 保存当前数据状态
    this.saveDataToPersistence();

    hilog.info(0x0000, 'ToDoList', '待办事项页面销毁');
  }
}
```

## 应用入口实现

### 创建EntryAbility入口文件

**entry/src/main/ets/entryability/EntryAbility.ets**：

```typescript
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';

/**
 * EntryAbility应用入口类
 *
 * 这是HarmonyOS应用的主要入口点，负责管理应用的生命周期
 * 包括应用的创建、销毁、前台/后台切换等关键事件的处理
 *
 * 主要功能：
 * 1. 应用初始化和配置
 * 2. 窗口管理和设置
 * 3. 生命周期事件处理
 * 4. 系统事件响应
 * 5. 错误处理和日志记录
 */
export default class EntryAbility extends UIAbility {
  /**
   * 窗口对象引用
   * 用于管理应用窗口的各种属性和行为
   */
  private mainWindow: window.WindowStage | undefined = undefined;

  /**
   * 应用创建生命周期回调
   *
   * 当应用首次启动时调用，用于初始化应用的基本配置
   * 这是应用生命周期的第一个阶段
   *
   * @param want - 启动意图信息，包含启动应用的相关参数
   * @param launchParam - 启动参数，包含启动类型等信息
   */
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 记录应用创建日志
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');

    // 在这里可以进行以下初始化操作：
    // 1. 全局变量初始化
    // 2. 数据库连接建立
    // 3. 网络配置初始化
    // 4. 用户偏好设置加载

    try {
      // 初始化应用配置
      this.initializeAppConfig();

      // 设置全局错误处理
      this.setupGlobalErrorHandler();

      hilog.info(0x0000, 'testTag', '应用初始化完成');

    } catch (error) {
      hilog.error(0x0000, 'testTag', '应用初始化失败: %{public}s', JSON.stringify(error));
    }
  }

  /**
   * 应用销毁生命周期回调
   *
   * 当应用被系统终止时调用，用于清理资源和保存重要数据
   * 这是应用生命周期的最后阶段
   */
  onDestroy(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');

    try {
      // 执行清理操作：
      // 1. 保存用户数据
      this.saveUserData();

      // 2. 关闭数据库连接
      this.closeDatabaseConnections();

      // 3. 取消网络请求
      this.cancelNetworkRequests();

      // 4. 清理定时器和监听器
      this.clearTimersAndListeners();

      hilog.info(0x0000, 'testTag', '应用清理完成');

    } catch (error) {
      hilog.error(0x0000, 'testTag', '应用清理失败: %{public}s', JSON.stringify(error));
    }
  }

  /**
   * 窗口阶段创建生命周期回调
   *
   * 当应用的UI窗口准备就绪时调用，这是设置UI相关配置的最佳时机
   *
   * @param windowStage - 窗口舞台对象，用于管理应用窗口
   */
  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    try {
      // 保存窗口引用
      this.mainWindow = windowStage;

      // 设置主页面路径
      windowStage.loadContent('pages/Index', (err) => {
        if (err.code) {
          hilog.error(0x0000, 'testTag', '页面加载失败: %{public}s', JSON.stringify(err));
          return;
        }
        hilog.info(0x0000, 'testTag', '页面加载成功');
      });

      // 配置窗口属性
      this.configureWindow(windowStage);

      // 设置窗口事件监听
      this.setupWindowEventListeners(windowStage);

    } catch (error) {
      hilog.error(0x0000, 'testTag', '窗口创建失败: %{public}s', JSON.stringify(error));
    }
  }

  /**
   * 窗口阶段销毁生命周期回调
   *
   * 当应用窗口被销毁时调用，用于清理窗口相关的资源
   */
  onWindowStageDestroy(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');

    try {
      // 清理窗口事件监听器
      this.clearWindowEventListeners();

      // 清空窗口引用
      this.mainWindow = undefined;

      hilog.info(0x0000, 'testTag', '窗口销毁完成');

    } catch (error) {
      hilog.error(0x0000, 'testTag', '窗口销毁失败: %{public}s', JSON.stringify(error));
    }
  }

  /**
   * 应用前台生命周期回调
   *
   * 当应用从后台切换到前台时调用
   * 这是恢复应用状态和更新UI的好时机
   */
  onForeground(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');

    try {
      // 前台操作：
      // 1. 恢复暂停的操作
      this.resumePausedOperations();

      // 2. 刷新数据
      this.refreshData();

      // 3. 重新建立网络连接
      this.reconnectNetwork();

      // 4. 更新UI状态
      this.updateUIState();

      hilog.info(0x0000, 'testTag', '应用已切换到前台');

    } catch (error) {
      hilog.error(0x0000, 'testTag', '前台切换失败: %{public}s', JSON.stringify(error));
    }
  }

  /**
   * 应用后台生命周期回调
   *
   * 当应用从前台切换到后台时调用
   * 这是保存状态和暂停非必要操作的时机
   */
  onBackground(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');

    try {
      // 后台操作：
      // 1. 保存当前状态
      this.saveCurrentState();

      // 2. 暂停动画和定时器
      this.pauseAnimationsAndTimers();

      // 3. 释放临时资源
      this.releaseTempResources();

      // 4. 暂停网络请求
      this.pauseNetworkRequests();

      hilog.info(0x0000, 'testTag', '应用已切换到后台');

    } catch (error) {
      hilog.error(0x0000, 'testTag', '后台切换失败: %{public}s', JSON.stringify(error));
    }
  }

  /**
   * 初始化应用配置
   * 设置应用的基本配置参数
   */
  private initializeAppConfig(): void {
    // 这里可以初始化全局配置
    // 例如：主题设置、语言配置、网络配置等
    hilog.info(0x0000, 'testTag', '初始化应用配置');
  }

  /**
   * 设置全局错误处理器
   * 捕获并处理应用中的未处理异常
   */
  private setupGlobalErrorHandler(): void {
    // 设置全局异常处理逻辑
    hilog.info(0x0000, 'testTag', '设置全局错误处理器');
  }

  /**
   * 配置窗口属性
   * 设置窗口的各种显示属性
   *
   * @param windowStage - 窗口舞台对象
   */
  private configureWindow(windowStage: window.WindowStage): void {
    windowStage.getMainWindow().then((mainWindow) => {
      // 设置窗口全屏显示
      mainWindow.setWindowLayoutFullScreen(true);

      // 设置状态栏和导航栏样式
      mainWindow.setWindowSystemBarEnable(['status', 'navigation']);

      // 设置状态栏内容颜色
      mainWindow.setWindowSystemBarProperties({
        statusBarColor: '#FFFFFF',           // 状态栏背景色
        statusBarContentColor: '#000000',    // 状态栏内容颜色
        navigationBarColor: '#FFFFFF',       // 导航栏背景色
        navigationBarContentColor: '#000000' // 导航栏内容颜色
      });

      hilog.info(0x0000, 'testTag', '窗口配置完成');
    }).catch((error) => {
      hilog.error(0x0000, 'testTag', '窗口配置失败: %{public}s', JSON.stringify(error));
    });
  }

  /**
   * 设置窗口事件监听器
   * 监听窗口的各种事件
   *
   * @param windowStage - 窗口舞台对象
   */
  private setupWindowEventListeners(windowStage: window.WindowStage): void {
    // 可以在这里设置窗口事件监听器
    // 例如：窗口大小变化、方向变化等
    hilog.info(0x0000, 'testTag', '设置窗口事件监听器');
  }

  /**
   * 清理窗口事件监听器
   */
  private clearWindowEventListeners(): void {
    // 清理在setupWindowEventListeners中设置的监听器
    hilog.info(0x0000, 'testTag', '清理窗口事件监听器');
  }

  /**
   * 保存用户数据
   */
  private saveUserData(): void {
    // 保存用户的重要数据
    hilog.info(0x0000, 'testTag', '保存用户数据');
  }

  /**
   * 关闭数据库连接
   */
  private closeDatabaseConnections(): void {
    // 关闭所有数据库连接
    hilog.info(0x0000, 'testTag', '关闭数据库连接');
  }

  /**
   * 取消网络请求
   */
  private cancelNetworkRequests(): void {
    // 取消所有正在进行的网络请求
    hilog.info(0x0000, 'testTag', '取消网络请求');
  }

  /**
   * 清理定时器和监听器
   */
  private clearTimersAndListeners(): void {
    // 清理所有定时器和事件监听器
    hilog.info(0x0000, 'testTag', '清理定时器和监听器');
  }

  /**
   * 恢复暂停的操作
   */
  private resumePausedOperations(): void {
    // 恢复在后台时暂停的操作
    hilog.info(0x0000, 'testTag', '恢复暂停的操作');
  }

  /**
   * 刷新数据
   */
  private refreshData(): void {
    // 刷新应用数据
    hilog.info(0x0000, 'testTag', '刷新应用数据');
  }

  /**
   * 重新建立网络连接
   */
  private reconnectNetwork(): void {
    // 重新建立网络连接
    hilog.info(0x0000, 'testTag', '重新建立网络连接');
  }

  /**
   * 更新UI状态
   */
  private updateUIState(): void {
    // 更新UI显示状态
    hilog.info(0x0000, 'testTag', '更新UI状态');
  }

  /**
   * 保存当前状态
   */
  private saveCurrentState(): void {
    // 保存应用当前状态
    hilog.info(0x0000, 'testTag', '保存当前状态');
  }

  /**
   * 暂停动画和定时器
   */
  private pauseAnimationsAndTimers(): void {
    // 暂停所有动画和定时器
    hilog.info(0x0000, 'testTag', '暂停动画和定时器');
  }

  /**
   * 释放临时资源
   */
  private releaseTempResources(): void {
    // 释放临时占用的资源
    hilog.info(0x0000, 'testTag', '释放临时资源');
  }

  /**
   * 暂停网络请求
   */
  private pauseNetworkRequests(): void {
    // 暂停非必要的网络请求
    hilog.info(0x0000, 'testTag', '暂停网络请求');
  }
}
```

## 构建和运行

### 编译项目

1. **打开终端**，导航到项目根目录
2. **执行构建命令**：
   ```bash
   # 清理项目
   hvigor clean
   
   # 构建项目
   hvigor assembleHap
   
   # 或者构建调试版本
   hvigor assembleHap --mode debug
   ```

3. **检查构建结果**：
   - 构建成功后，HAP文件会生成在 `entry/build/default/outputs/default/` 目录下

### 安装和运行

1. **连接设备**：
   - 使用USB连接HarmonyOS设备
   - 或者启动HarmonyOS模拟器

2. **安装应用**：
   ```bash
   # 安装HAP文件到设备
   hdc install entry/build/default/outputs/default/entry-default-signed.hap
   
   # 启动应用
   hdc shell aa start -a EntryAbility -b com.example.listitemdemo
   ```

3. **在DevEco Studio中运行**：
   - 点击工具栏的"Run"按钮
   - 选择目标设备
   - 等待应用安装和启动

## 功能测试和验证

### 基本功能测试

1. **添加任务测试**：
   - 点击右上角的"+"按钮
   - 从对话框中选择一个任务
   - 验证任务是否添加到未完成列表中

2. **状态切换测试**：
   - 点击任务左侧的复选框
   - 验证任务是否从未完成列表移动到已完成列表
   - 验证视觉效果（删除线、透明度变化）

3. **编辑功能测试**：
   - 点击任务右侧的"编辑"按钮
   - 修改任务名称
   - 点击确认按钮或点击其他区域
   - 验证修改是否保存

4. **删除功能测试**：
   - 左滑任务项
   - 点击删除按钮
   - 确认删除操作
   - 验证任务是否被删除

### 边界情况测试

1. **空状态测试**：
   - 删除所有任务
   - 验证空状态提示是否正确显示

2. **长文本测试**：
   - 添加很长的任务名称
   - 验证文本是否正确截断或换行

3. **大量数据测试**：
   - 添加大量任务（50+）
   - 验证列表滚动性能
   - 验证内存使用情况

## 常见问题和解决方案

### 编译问题

**问题1**：找不到模块或包
```
Module not found: @kit.ArkTS
```

**解决方案**：
- 检查oh-package.json5中的依赖配置
- 确保HarmonyOS SDK版本正确
- 执行`hvigor clean`清理项目后重新构建

**问题2**：资源文件无法加载
```
Resource not found: app.string.todo
```

**解决方案**：
- 检查string.json文件是否存在
- 验证资源名称拼写是否正确
- 确保资源文件格式正确

### 运行时问题

**问题1**：应用崩溃或无法启动
**解决方案**：
- 检查hilog日志：`hdc hilog`
- 验证权限配置是否正确
- 检查代码中的空指针异常

**问题2**：UI显示异常
**解决方案**：
- 检查@State、@Link等装饰器使用是否正确
- 验证数据绑定逻辑
- 检查CSS样式是否冲突

### 性能问题

**问题1**：列表滚动卡顿
**解决方案**：
- 检查是否在build方法中进行复杂计算
- 考虑使用LazyForEach替代ForEach
- 优化图片资源大小

**问题2**：内存占用过高
**解决方案**：
- 检查是否有内存泄漏
- 及时释放不需要的对象引用
- 优化数据结构设计

## 项目扩展建议

### 数据持久化扩展

可以添加preferences API来实现数据持久化：

```typescript
import preferences from '@ohos.data.preferences';

class TodoStorage {
  private static prefs: preferences.Preferences;

  static async init(context: Context) {
    this.prefs = await preferences.getPreferences(context, 'todo_storage');
  }

  static async saveTodos(todos: ToDo[]) {
    await this.prefs.put('todo_list', JSON.stringify(todos));
    await this.prefs.flush();
  }

  static async loadTodos(): Promise<ToDo[]> {
    const todoStr = await this.prefs.get('todo_list', '[]') as string;
    return JSON.parse(todoStr);
  }
}
```

### 网络功能扩展

可以添加网络同步功能：

```typescript
import { http } from '@kit.NetworkKit';

class TodoSyncService {
  private static readonly BASE_URL = 'https://api.example.com';

  static async syncTodos(todos: ToDo[]) {
    const httpRequest = http.createHttp();
    try {
      const response = await httpRequest.request(`${this.BASE_URL}/todos`, {
        method: http.RequestMethod.POST,
        header: {
          'Content-Type': 'application/json'
        },
        extraData: JSON.stringify(todos)
      });
      return response;
    } finally {
      httpRequest.destroy();
    }
  }
}
```

这个完整的教程涵盖了从项目创建到功能实现的所有细节，每个文件都包含了完整的代码和详细的注释，新手可以按照步骤完全复现整个项目。
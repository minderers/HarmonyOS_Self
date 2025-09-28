if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ToDoList_Params {
    toDoData?: ToDo[];
    achieveData?: ToDo[];
}
import { ToDo } from "@bundle:com.example.listitemedit/entry/ets/model/ToDo";
import { ToDoListItem } from "@bundle:com.example.listitemedit/entry/ets/view/TodoListItem";
import { STYLE_CONFIG, Constant } from "@bundle:com.example.listitemedit/entry/ets/common/Constants";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
function __Image__ImageStyle(): void {
    Image.width(STYLE_CONFIG.IMAGE_SIZE);
    Image.aspectRatio(1);
    Image.margin(STYLE_CONFIG.IMAGE_MARGIN);
}
class ToDoList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__toDoData = new ObservedPropertyObjectPU([], this, "toDoData");
        this.__achieveData = new ObservedPropertyObjectPU([], this, "achieveData");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ToDoList_Params) {
        if (params.toDoData !== undefined) {
            this.toDoData = params.toDoData;
        }
        if (params.achieveData !== undefined) {
            this.achieveData = params.achieveData;
        }
    }
    updateStateVars(params: ToDoList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__toDoData.purgeDependencyOnElmtId(rmElmtId);
        this.__achieveData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__toDoData.aboutToBeDeleted();
        this.__achieveData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __toDoData: ObservedPropertyObjectPU<ToDo[]>;
    get toDoData() {
        return this.__toDoData.get();
    }
    set toDoData(newValue: ToDo[]) {
        this.__toDoData.set(newValue);
    }
    private __achieveData: ObservedPropertyObjectPU<ToDo[]>;
    get achieveData() {
        return this.__achieveData.get();
    }
    set achieveData(newValue: ToDo[]) {
        this.__achieveData.set(newValue);
    }
    /**
     * Delete a to-do/completed item.
     */
    deleteTodoItem(item: ToDo) {
        if (item.isCompleted) {
            this.achieveData = this.achieveData.filter(todoItem => item.key !== todoItem.key);
        }
        else {
            this.toDoData = this.toDoData.filter(todoItem => item.key !== todoItem.key);
        }
        try {
            this.getUIContext().getPromptAction().showToast({ message: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" } });
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x0000, 'Index', `showToast failed. error code=${error.code}, message=${error.message}`);
        }
    }
    // Item Swipe left to display the toolbar.
    itemEnd(item: ToDo, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: STYLE_CONFIG.ICON_GUTTER });
            Row.padding(STYLE_CONFIG.OPERATION_BUTTON_PADDING);
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
            __Image__ImageStyle();
            Image.onClick(() => {
                this.getUIContext().getPromptAction().showToast({ message: { "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" } });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
            __Image__ImageStyle();
            Image.onClick(() => {
                this.getUIContext().getPromptAction().showToast({ message: { "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" } });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
            __Image__ImageStyle();
            Image.onClick(() => {
                this.deleteTodoItem(item);
            });
        }, Image);
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
            Column.height(Constant.PERCENT_FULL);
            Column.width(Constant.PERCENT_FULL);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: STYLE_CONFIG.LIST_ITEM_GUTTER });
            Row.height(Constant.PERCENT_12);
            Row.width(Constant.PERCENT_FULL);
            Row.padding({
                left: { "id": 125829724, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" },
                right: { "id": 125829726, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" },
            });
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
            Text.fontSize({ "id": 125829675, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
            Image.width(STYLE_CONFIG.MENU_IMAGE_SIZE);
            Image.aspectRatio(1);
            Image.onClick(() => {
                // Adds data to the to-do list array based on the selection result of the text selection.
                this.getUIContext().showTextPickerDialog({
                    range: this.getUIContext().getHostContext()?.resourceManager.getStringArrayValueSync({ "id": 16777227, "type": 10009, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" }.id),
                    onAccept: (value: TextPickerResult) => {
                        this.toDoData.unshift(new ToDo(this.getUIContext().getHostContext()?.resourceManager
                            .getStringArrayValueSync({ "id": 16777227, "type": 10009, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" }.id)[Number(value.index)]));
                    },
                });
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // The to-do data display list gadget is bound to the data variable toDoData.
            List.create({ initialIndex: 0, space: STYLE_CONFIG.LIST_ITEM_GUTTER });
            // The to-do data display list gadget is bound to the data variable toDoData.
            List.layoutWeight(1);
            // The to-do data display list gadget is bound to the data variable toDoData.
            List.listDirection(Axis.Vertical);
            // The to-do data display list gadget is bound to the data variable toDoData.
            List.edgeEffect(EdgeEffect.Spring);
            // The to-do data display list gadget is bound to the data variable toDoData.
            List.padding({
                top: { "id": 125829727, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" },
                left: { "id": 125829723, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" },
                right: { "id": 125829725, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" },
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.toDoData.length !== 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            ListItem.create(deepRenderFunction, true);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                                Text.fontSize({ "id": 125829676, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                            }, Text);
                            Text.pop();
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const toDoItem = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.swipeAction({ end: this.itemEnd.bind(this, toDoItem), edgeEffect: SwipeEdgeEffect.Spring });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ToDoListItem(this, {
                                        toDoItem: toDoItem,
                                        achieveData: this.__achieveData,
                                        toDoData: this.__toDoData
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 111, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            toDoItem: toDoItem,
                                            achieveData: this.achieveData,
                                            toDoData: this.toDoData
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        toDoItem: toDoItem
                                    });
                                }
                            }, { name: "ToDoListItem" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.toDoData, forEachItemGenFunction, (toDoItem: ToDo) => toDoItem.key, false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.achieveData.length !== 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            ListItem.create(deepRenderFunction, true);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                                Text.fontSize({ "id": 125829676, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                            }, Text);
                            Text.pop();
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const toDoItem = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.swipeAction({ end: this.itemEnd.bind(this, toDoItem), edgeEffect: SwipeEdgeEffect.Spring });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ToDoListItem(this, {
                                        toDoItem: toDoItem,
                                        achieveData: this.__achieveData,
                                        toDoData: this.__toDoData
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 129, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            toDoItem: toDoItem,
                                            achieveData: this.achieveData,
                                            toDoData: this.toDoData
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        toDoItem: toDoItem
                                    });
                                }
                            }, { name: "ToDoListItem" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.achieveData, forEachItemGenFunction, (toDoItem: ToDo) => toDoItem.key, false, false);
        }, ForEach);
        ForEach.pop();
        // The to-do data display list gadget is bound to the data variable toDoData.
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ToDoList";
    }
}
registerNamedRoute(() => new ToDoList(undefined, {}), "", { bundleName: "com.example.listitemedit", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ToDoListItem_Params {
    UIContext?;
    achieveData?: ToDo[];
    toDoData?: ToDo[];
    toDoItem?: ToDo;
    isEdited?: boolean;
}
import { STYLE_CONFIG, Constant } from "@bundle:com.example.listitemedit/entry/ets/common/Constants";
import type { ToDo } from '../model/ToDo';
export class ToDoListItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.UIContext = this.getUIContext();
        this.__achieveData = new SynchedPropertyObjectTwoWayPU(params.achieveData, this, "achieveData");
        this.__toDoData = new SynchedPropertyObjectTwoWayPU(params.toDoData, this, "toDoData");
        this.__toDoItem = new SynchedPropertyNesedObjectPU(params.toDoItem, this, "toDoItem");
        this.__isEdited = new ObservedPropertySimplePU(false, this, "isEdited");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ToDoListItem_Params) {
        if (params.UIContext !== undefined) {
            this.UIContext = params.UIContext;
        }
        this.__toDoItem.set(params.toDoItem);
        if (params.isEdited !== undefined) {
            this.isEdited = params.isEdited;
        }
    }
    updateStateVars(params: ToDoListItem_Params) {
        this.__toDoItem.set(params.toDoItem);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__achieveData.purgeDependencyOnElmtId(rmElmtId);
        this.__toDoData.purgeDependencyOnElmtId(rmElmtId);
        this.__toDoItem.purgeDependencyOnElmtId(rmElmtId);
        this.__isEdited.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__achieveData.aboutToBeDeleted();
        this.__toDoData.aboutToBeDeleted();
        this.__toDoItem.aboutToBeDeleted();
        this.__isEdited.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private UIContext;
    private __achieveData: SynchedPropertySimpleOneWayPU<ToDo[]>;
    get achieveData() {
        return this.__achieveData.get();
    }
    set achieveData(newValue: ToDo[]) {
        this.__achieveData.set(newValue);
    }
    private __toDoData: SynchedPropertySimpleOneWayPU<ToDo[]>;
    get toDoData() {
        return this.__toDoData.get();
    }
    set toDoData(newValue: ToDo[]) {
        this.__toDoData.set(newValue);
    }
    private __toDoItem: SynchedPropertyNesedObjectPU<ToDo>;
    get toDoItem() {
        return this.__toDoItem.get();
    }
    private __isEdited: ObservedPropertySimplePU<boolean>;
    get isEdited() {
        return this.__isEdited.get();
    }
    set isEdited(newValue: boolean) {
        this.__isEdited.set(newValue);
    }
    /**
     * Add a completed data item.
     */
    addAchieveData() {
        this.toDoItem.isCompleted = !this.toDoItem.isCompleted;
        this.UIContext.animateTo({ duration: STYLE_CONFIG.ANIMATION_DURATION }, () => {
            if (this.toDoItem.isCompleted) {
                let tempData = this.toDoData.filter(item => item.key !== this.toDoItem.key);
                this.toDoData = tempData;
                this.achieveData.push(this.toDoItem);
            }
            else {
                let tempData = this.achieveData.filter(item => item.key !== this.toDoItem.key);
                this.achieveData = tempData;
                this.toDoData.push(this.toDoItem);
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
            Flex.width(Constant.PERCENT_FULL);
            Flex.height(STYLE_CONFIG.TODO_ITEM_HEIGHT);
            Flex.padding({
                left: { "id": 125829723, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" },
                right: { "id": 125829725, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" },
                top: STYLE_CONFIG.TODO_ITEM_PADDING_VERTICAL,
                bottom: STYLE_CONFIG.TODO_ITEM_PADDING_VERTICAL
            });
            Flex.borderRadius({ "id": 125829720, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
            Flex.backgroundColor(Color.White);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: STYLE_CONFIG.ICON_GUTTER });
            Row.width(Constant.PERCENT_FULL);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isEdited) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(STYLE_CONFIG.CUSTOM_CHECKBOX_SIZE);
                        Row.justifyContent(FlexAlign.Center);
                        Row.aspectRatio(1);
                        Row.borderRadius(STYLE_CONFIG.CUSTOM_CHECKBOX_SIZE);
                        Row.backgroundColor(this.toDoItem.isCompleted ? { "id": 125829528, "type": 10001, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" } :
                            Color.Transparent);
                        Row.borderWidth(1);
                        Row.borderColor({ "id": 125829177, "type": 10001, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                        Row.onClick(() => {
                            this.addAchieveData();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.toDoItem.isCompleted) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                                    Image.width(STYLE_CONFIG.IMAGE_ICON_OK_SIZE);
                                    Image.aspectRatio(1);
                                    Image.borderRadius(STYLE_CONFIG.IMAGE_ICON_OK_SIZE);
                                    Image.fillColor(Color.White);
                                    Image.transition(TransitionEffect.IDENTITY);
                                }, Image);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.toDoItem.name}`);
                        Text.maxLines(1);
                        Text.fontSize({ "id": 125829677, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                        Text.layoutWeight(1);
                        Text.decoration({ type: this.toDoItem.isCompleted ? TextDecorationType.LineThrough : TextDecorationType.None });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    if (!If.canRetake('textEdit')) {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            TextInput.create({ text: `${this.toDoItem.name}` });
                            TextInput.maxLines(1);
                            TextInput.fontSize({ "id": 125829677, "type": 10002, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                            TextInput.layoutWeight(1);
                            TextInput.backgroundColor(Color.Transparent);
                            TextInput.id('textEdit');
                            TextInput.onChange((value: string) => {
                                // Update to-do data.
                                this.toDoItem.name = value;
                            });
                            TextInput.onAppear(() => {
                                // Requests the input box to obtain the focus.
                                focusControl.requestFocus('textEdit');
                            });
                        }, TextInput);
                    }
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEdited) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                        Image.width(STYLE_CONFIG.MENU_IMAGE_SIZE);
                        Image.aspectRatio(1);
                        Image.onClick(() => {
                            this.isEdited = false;
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                        Text.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "com.example.listitemedit", "moduleName": "entry" });
                        Text.onClick(() => {
                            this.isEdited = true;
                        });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

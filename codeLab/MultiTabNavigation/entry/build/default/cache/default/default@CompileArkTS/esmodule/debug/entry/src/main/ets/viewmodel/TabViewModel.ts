import { TabItem, BottomTabModel, ClassifyModel } from "@bundle:com.example.multitabs/entry/ets/viewmodel/TabItem";
export function initTabData(): TabItem[] {
    let tabDataArray: TabItem[] = [];
    TabItemData.forEach((item: TabItem) => {
        tabDataArray.push(new TabItem(item.id, item.name));
    });
    return tabDataArray;
}
export function initTabTuData(): BottomTabModel[] {
    let tabTuDataArray: BottomTabModel[] = [];
    TabTuItemData.forEach((item: BottomTabModel) => {
        tabTuDataArray.push(new BottomTabModel(item.defaultImage, item.selectImage, item.title, item.middleMode));
    });
    return tabTuDataArray;
}
export function initSideData(): ClassifyModel[] {
    let tabDataArray: ClassifyModel[] = [];
    ClassifyData.forEach((item: ClassifyModel) => {
        tabDataArray.push(new ClassifyModel(item.classifyId, item.classifyName));
    });
    return tabDataArray;
}
const TabItemData: TabItem[] = [
    new TabItem(0, { "id": 16777307, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(1, { "id": 16777328, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(2, { "id": 16777295, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(3, { "id": 16777322, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(4, { "id": 16777297, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(5, { "id": 16777316, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(6, { "id": 16777319, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(7, { "id": 16777318, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new TabItem(8, { "id": 16777355, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" })
];
const TabTuItemData: BottomTabModel[] = [
    new BottomTabModel({ "id": 16777437, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777426, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777336, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new BottomTabModel({ "id": 16777444, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777431, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777291, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new BottomTabModel({ "id": 16777430, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777430, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, '', true),
    new BottomTabModel({ "id": 16777441, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777428, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777320, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new BottomTabModel({ "id": 16777443, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777429, "type": 20000, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }, { "id": 16777338, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" })
];
const ClassifyData: ClassifyModel[] = [
    new ClassifyModel(0, { "id": 16777327, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new ClassifyModel(1, { "id": 16777313, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new ClassifyModel(2, 'HarmonyOS'),
    new ClassifyModel(3, { "id": 16777357, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new ClassifyModel(4, { "id": 16777303, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new ClassifyModel(5, { "id": 16777293, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" }),
    new ClassifyModel(6, { "id": 16777308, "type": 10003, params: [], "bundleName": "com.example.multitabs", "moduleName": "entry" })
];

import util from "@ohos:util";
/**
 * Indicates the type of a to-do task.
 * @class
 */
@Observed
export class ToDo {
    key: string = util.generateRandomUUID(true);
    name: string;
    isCompleted: boolean = false;
    /**
     * Creates a new instance of a to-do item.
     * @param {string} name - To-do item name.
     */
    constructor(name: string) {
        this.name = name;
    }
}

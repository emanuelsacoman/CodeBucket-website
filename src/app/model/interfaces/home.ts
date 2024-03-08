export class Home {
    private _id!: string;
    private _title!: string;
    private _description!: string;

    constructor(id: string, title: string, description: string) {
        this._id = id;
        this._title = title;
        this._description = description;

    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    } 
}

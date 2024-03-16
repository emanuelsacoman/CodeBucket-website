export class ComandosEdit {
    private _id!: string;
    private _title!: string;
    private _description!: string;
    private _search!: string;
    private _placeholder!: string;

    constructor(title: string, description: string, search: string, placeholder: string){
        this._title = title;
        this._description = description;
        this._search = search;
        this._placeholder = placeholder;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get search(): string {
        return this._search;
    }

    public set search(value: string) {
        this._search = value;
    }

    public get placeholder(): string {
        return this._placeholder;
    }

    public set placeholder(value: string) {
        this._placeholder = value;
    }
}
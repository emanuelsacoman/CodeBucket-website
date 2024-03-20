export class ComandosEdit {
    private _id!: string;
    private _title!: string;
    private _description!: string;
    private _search!: string;
    private _placeholder!: string;
    private _lb!: string;
    private _rb!: string;
    private _dropImg!: any;

    constructor(title: string, description: string, search: string, placeholder: string, lb: string, rb: string){
        this._title = title;
        this._description = description;
        this._search = search;
        this._placeholder = placeholder;
        this._lb = lb;
        this._rb = rb;
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

    public get lb(): string {
        return this._lb;
    }

    public set lb(value: string) {
        this._lb = value;
    }

    public get rb(): string {
        return this._rb;
    }

    public set rb(value: string) {
        this._rb = value;
    }
    
    get dropImg(): any {
        return this._dropImg;
    }

    set dropImg(dropImg: any) {
        this._dropImg = dropImg;
    }
}
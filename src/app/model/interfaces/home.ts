export class Home {
    private _id!: string;
    private _title!: string;
    private _description!: string;
    private _botImg!: any;
    private _alt!: string;
    private _link!: string;

    constructor(id: string, title: string, description: string, botImg: any, alt: string, link: string) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._alt = alt;
        this._botImg = botImg;
        this._link = link;
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

    get botImg(): any {
        return this._botImg;
    }

    set botImg(botImg: any) {
        this._botImg = botImg;
    }

    public get alt(): string {
        return this._alt;
    }

    public set alt(value: string) {
        this._alt = value;
    }

    public get link(): string {
        return this._link;
    }

    public set link(value: string) {
        this._link = value;
    }
    
}

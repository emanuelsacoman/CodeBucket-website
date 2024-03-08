export class Outro{
    private _id!: string;
    private _link!: string;
    private _alt!: string;
    private _botImg!: any;

    constructor(id: string, botImg: any, alt: string, link: string){
        this._alt = alt;
        this._botImg = botImg;
        this._link = link;
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
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
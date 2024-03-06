export class Command {
    private _id!: string;
    private _nome!: string;
    private _descricao!: string;
    private _imgUrl!: any;
    private _alt!: string;

    constructor(nome: string, descricao: string, imgUrl: any, alt: string) {
        this._nome = nome;
        this._descricao = descricao;
        this._imgUrl = imgUrl;
        this._alt = alt;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(value: string) {
        this._nome = value;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public set descricao(value: string) {
        this._descricao = value;
    }

    public get imgUrl(): any {
        return this._imgUrl;
    }

    public set imgUrl(value: any) {
        this._imgUrl = value;
    }

    public get alt(): string {
        return this._alt;
    }

    public set alt(value: string) {
        this._alt = value;
    }
}

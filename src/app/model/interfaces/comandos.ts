export class ComandosEdit {
    private _id!: string;

    constructor(){

    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }
}
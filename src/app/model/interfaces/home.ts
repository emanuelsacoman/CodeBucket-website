export class Home {
    private _id!: string;
    private _title!: string;
    private _description!: string;
    private _bottext!: string;

    constructor(id: string, title: string, description: string, bottext: string) {
        this._id = id;
        this._title = title;
        this._description = description; 
        this._bottext = bottext; 

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

    get bottext(): string {
        return this._bottext;
    }

    set bottext(bottext: string) {
        this._bottext = bottext;
    } 
}

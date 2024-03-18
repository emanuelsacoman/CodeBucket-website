export class Footer {
    private _id!: string;
    private _miniD!: string;
    private _rights!: string;
    private _afiliated!: string;
    private _homeRouter!: string;
    private _commandsRouter!: string;
  
    constructor(miniD: string, rights: string, afiliated: string, homeRouter: string, commandsRouter: string) {
        this._miniD = miniD;
        this._rights = rights;
        this._afiliated = afiliated;
        this._homeRouter = homeRouter;
        this._commandsRouter = commandsRouter;
    }
  
    public get id(): string {
      return this._id;
    }
  
    public set id(value: string) {
      this._id = value;
    }
  
    public get miniD(): string {
      return this._miniD;
    }
  
    public set miniD(value: string) {
      this._miniD = value;
    }
  
    public get rights(): string {
      return this._rights;
    }
  
    public set rights(value: string) {
      this._rights = value;
    }
  
    public get afiliated(): string {
      return this._afiliated;
    }
  
    public set afiliated(value: string) {
      this._afiliated = value;
    }
  
    public get homeRouter(): string {
      return this._homeRouter;
    }
  
    public set homeRouter(value: string) {
      this._homeRouter = value;
    }
  
    public get commandsRouter(): string {
      return this._commandsRouter;
    }
  
    public set commandsRouter(value: string) {
      this._commandsRouter = value;
    }
  }
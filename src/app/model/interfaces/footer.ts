export class Footer {
    private _id!: string;
    private _miniD!: string;
    private _rights!: string;
    private _afiliated!: string;
  
    constructor(miniD: string, rights: string, afiliated: string) {
        this._miniD = miniD;
        this._rights = rights;
        this._afiliated = afiliated;
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
  }
export class Users {
    public Id: number;
    public name: string;
    public pwd:string;
    
    constructor(Id:number,name: string,pwd:string) {
    this.Id = Id;
    this.name = name;
    this.pwd = pwd;
    }
    }
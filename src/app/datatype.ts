export class Product {
    select?:boolean;
    name: string;
    expiry: Date;
    stock: number;
    heading?: string;
    subheading?: string;
    tags?: string;
    description?: string;
    id?: string;
}

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}

export class UserDetails{
    userId:string;
    name:string;
    lastname:string;
    email:string;
    password:string;
    isAdmin:boolean;
}
export class AdminSettings{
    settingId:number;
    settingDescription:{
        AllowEdit:boolean;
        AllowMultipleDelete:boolean;
        AllowProductCreate:boolean;
        AllowProductSearch:boolean;
    };
    lastUpdatedBy:string;
    lastUpdateTime:Date;
}
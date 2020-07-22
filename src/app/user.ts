export class User {
    id:number;
    emailId:string;
    userName:string;
    password:string;
    confirmPassword:string;
    roles:string[] = [];
    mobile:string;
    phone:string;
    constructor(){
     }
}

export class Role {

    role_id:string;
    name:string;
    constructor(){
    }
}

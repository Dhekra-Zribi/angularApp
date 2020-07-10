import { User } from './user';

export class Role {
    role_id: string;
    name:string;
    users:Array<User> =[];
}

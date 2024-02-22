import {User} from "./User.model";

export type Group = {
    id: string;
    logo: string;
    name: string;
    motto: string;
    users: User[];
}
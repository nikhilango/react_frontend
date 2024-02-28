import {User} from "./User.model";

export type Group = {
    id: string;
    name: string;
    description: string;
    logo_url: string;
    member_count: number;
    users: User[];
}
import {User} from "./User.model";

export type Group = {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    memberCount: number;
    users: User[];
}
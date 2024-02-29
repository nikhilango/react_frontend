import { AxiosInstance } from "axios";
import defaultAxiosInstance from "../config/Api";
import api from '../config/Api';
import { Group } from "../types/models/Group";


const GroupsService = ({
    getGroup: async (userId: string) => {
        return await api.get<Group>(`/group/${userId}`);
    },

    getAllGroups: () => {
        return api.get("/group")
    },

    createGroup: (group: Group) => {
        return api.post("/group", group).then((res: any) => {
            return res.data;
        })
    },

    updateGroup: (group: Group) => {
        return api.put(`/group/${group.id}`, group);
    },

    deleteGroup: (id: string) => {
        return api.delete(`/group/${id}`);
    }
})

export default GroupsService;
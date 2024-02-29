import { useEffect, useState } from "react";
import UserService from "../../Services/UserService";
import { User } from "../../types/models/User.model";

interface Props {
    groupId: string;
}


const GroupUserList: React.FC<Props> = ({groupId}) => {

    const [users, setUsers] = useState<User[]>([]);



    useEffect(() => {
        UserService.getUserFromGroup(groupId).then((data) => {
          setUsers(data.data);
        })
    }, [groupId])
    
    return(
        <div>
            {users.map((user) =>
                (   
                    <div>
                        <p>{user.email}</p>
                    </div>
                )
            )}
        </div>
    )
}

export default GroupUserList;
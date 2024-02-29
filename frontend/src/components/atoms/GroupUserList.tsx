import { useEffect, useState } from "react";
import UserService from "../../Services/UserService";
import { User } from "../../types/models/User.model";

// Define the properties expected by the GroupUserList component
interface Props {
    groupId: string; // The unique identifier for the group
  }
  
  // Functional component for displaying a list of users in a group
  const GroupUserList: React.FC<Props> = ({ groupId }) => {
    
    // State to store the list of users
    const [users, setUsers] = useState<User[]>([]);
  
    // Effect hook to fetch users from the group when the groupId changes
    useEffect(() => {
      // Fetch users from the group using the UserService
      UserService.getUserFromGroup(groupId)
        .then((data) => {
          setUsers(data.data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }, [groupId]);
  
    // Render the component
    return (
      <div>
        {/* Map through the list of users and display their emails */}
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default GroupUserList;
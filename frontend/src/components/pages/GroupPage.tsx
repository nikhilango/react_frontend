import { useNavigate, useParams } from 'react-router-dom';
import { Group } from '../../types/models/Group';
import { useEffect, useState } from 'react';
import GroupsService from '../../Services/GroupsService';
import GroupForm from "../molecules/GroupForm";

// GroupPage component to manage individual groups
const GroupPage = () => {
  // Hook for navigation
  const navigate = useNavigate();
  
  // Retrieve groupId from the route parameters
  const { groupId } = useParams();

  // State to store the details of the group
  const [group, setGroup] = useState<Group>({
    id: "",
    name: "",
    description: "",
    logoUrl: "",
    memberCount: 0,
    users: [],
  });

  // Fetch group details when the component mounts
  useEffect(() => {
    return () => {
      // Check if groupId exists before fetching group details
      if (groupId) {
        GroupsService.getGroup(groupId).then((res) => {
          return setGroup(res.data);
        });
      }
    };
  }, [groupId]);

  // Handle form submission for creating/updating a group
  const submitActionHandler = (values: Group) => {
    if (groupId !== undefined) {
      // Update existing group
      GroupsService.updateGroup(values).then(() => {
        navigate('/');
      });
    } else {
      // Create a new group
      GroupsService.createGroup(values).then(() => {
        navigate('/');
      });
    }
  };

  // Render the GroupForm component with the group details and submit handler
  return <GroupForm group={group} submitActionHandler={submitActionHandler} />;
}

export default GroupPage;
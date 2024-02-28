import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../types/models/User.model';
import { Group } from '../../types/models/Group';
import UserService from '../../Services/UserService';
import UserForm from '../molecules/UserForm/UserForm';
import { useEffect, useState } from 'react';
import GroupsService from '../../Services/GroupsService';
import GroupForm from "../molecules/GroupForm";

const GroupPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [group, setGroup] = useState<Group>({
    id: "",
    name: "",
    description: "",
    logo_url: "",
    member_count: 0,
    users: [],
  });

  useEffect(() => {
    return () => {
    if (groupId) {
        GroupsService.getGroup(groupId).then((res) => {
        return setGroup(res.data);
        });
    }
    };
  }, [groupId]);

  const submitActionHandler = (values: Group) => {
    if (groupId !== undefined) {
      GroupsService.updateGroup(values).then(() => {
        navigate('../');
      });
    } else {
      GroupsService.createGroup(values).then(() => {
        navigate('/');
      });
    }
  };

  return <GroupForm group={group} submitActionHandler={submitActionHandler} />;
}

export default GroupPage;
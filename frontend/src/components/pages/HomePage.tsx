import { Box } from '@mui/system';
import logo from "../../images/team-placeholder.png";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Group } from '../../types/models/Group';
import GroupsService from '../../Services/GroupsService';
import authorities from "../../config/Authorities"
import AuthorityService from '../../Services/AuthorityService';
import "../../HomePage.css";

export default function HomePage() {

  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const navigate = useNavigate();



 

  useEffect(() => {
    GroupsService().getAllGroups().then((data) => {
      setGroupsList(data.data);
    });
  })

  if ([authorities.USER_MODIFY].some(AuthorityService.hasAuthority)) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection={'column'}
      >
      <h1>ADMIN</h1>
      <Button 
        onClick={() => navigate("/users")}
        size="small"
        variant="contained"
      >
        See All Users
      </Button>
      <h1>Groups</h1>
      <div>
        {groupsList.map((group) =>
            (
            <>
                <img src={logo} alt="" />
                <h1>{group.name}</h1>
                <h2>{group.motto}</h2>
                <p>{group.users.length}</p>
                <Button onClick={() => navigate("/some/link")}>View Users</Button>
            </>
            )
        )}
      </div>
    </Box>
    );
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection={'column'}
    >
      <h1>Groups</h1>
      <div className='group_container' onClick={() => navigate("/some/link")}>
          <img src={logo} alt="" />
          <div className='group_description'>
            <h1 className='group_name'>Group Name</h1>
            <h4 className='group_motto'>Group Motto</h4>
            <p>10 Users</p>
          </div>
      </div>

    </Box>
  );
}

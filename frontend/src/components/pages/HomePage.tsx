import { Box } from '@mui/system';
import logo from "../../images/team-placeholder.png";
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Group } from '../../types/models/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsService from '../../Services/GroupsService';
import "../../HomePage.css";
import { userInfo } from 'os';
import authorities from '../../config/Authorities';
import AuthorityService from '../../Services/AuthorityService';
import UserService from '../../Services/UserService';
import GroupUserList from '../atoms/GroupUserList';
import ActiveUserContext, { ActiveUserContextType } from '../../Contexts/ActiveUserContext';

export default function HomePage() {

  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const [groupOfUser, setGroupOfUser] = useState<Group>();
  const navigate = useNavigate();
  const {user} = useContext(ActiveUserContext)

  useEffect(() => {
    GroupsService.getAllGroups().then((data : any) => {
      setGroupsList(data.data);
    });
  }, []);

  useEffect(() => {
    GroupsService.getGroup(user!.group_id).then((data : any) => {
      setGroupOfUser(data.data);
    });
  }, [user]);

  if ([authorities.USER_MODIFY].some(AuthorityService.hasAuthority)) {
     return (
       <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection={'column'}
      >
      <h1>ADMIN</h1>
      <div className='action_buttons'>
        <div className='see_all_users_button'>
          <Button
            onClick={() => navigate("/users")}
            size="small"
            variant="contained"
          >
            See All Users
          </Button>
        </div>
        <div className='group_add_button'>
          <Button
            onClick={() => navigate("/groupedit")}
            size='small'
            variant='contained'
          >
            Add Group
          </Button>
        </div>
      </div>
      <h1>Groups</h1>
      <div>
        {groupsList.map((group) =>
            (
            <div className='group_container'>
              <img src={logo} alt="" />
              <div className='group_description'>
                <h1 className='group_name'>{group.name}</h1>
                <h4 className='group_motto'>{group.description}</h4>
                <Accordion className='dropdown'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Users: {group.memberCount}
                  </AccordionSummary>
                  <AccordionDetails>
                    <GroupUserList groupId={group.id}></GroupUserList>
                  </AccordionDetails>
                </Accordion>
                <Button
                  onClick={() => navigate("/groupedit/" + group.id)}
                >
                  Edit Group
                </Button>
                <Button
                  onClick={() => GroupsService.deleteGroup(group.id)}
                >
                  Delete Group
                </Button>
              </div>
            </div>
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
      <div>
        <div className='group_container'>
          <img src={logo} alt="" />
          <div className='group_description'>
            <h1 className='group_name'>{groupOfUser?.name}</h1>
            <h4 className='group_motto'>{groupOfUser?.description}</h4>
            <Accordion className='dropdown'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Users: {groupOfUser?.memberCount}
              </AccordionSummary>
              <AccordionDetails>
                <GroupUserList groupId={groupOfUser?.id}></GroupUserList>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      
      </div>
    </Box>
  );
}


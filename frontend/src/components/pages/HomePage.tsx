import { Box } from '@mui/system';
import logo from "../../images/team-placeholder.png";
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Group } from '../../types/models/Group';
import GroupsService from '../../Services/GroupsService';
import "../../HomePage.css";
import authorities from '../../config/Authorities';
import AuthorityService from '../../Services/AuthorityService';
import GroupUserList from '../atoms/GroupUserList';
import ActiveUserContext, { ActiveUserContextType } from '../../Contexts/ActiveUserContext';

export default function HomePage() {

  // State to store the list of groups
  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const [groupOfUser, setGroupOfUser] = useState<Group>();
  const navigate = useNavigate();
  const {user} = useContext(ActiveUserContext)

  // Fetch all groups when the component mounts
  useEffect(() => {
    GroupsService.getAllGroups().then((data: any) => {
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
      // Render the admin view
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection={'column'}
      >
        <h1>ADMIN</h1>
        {/* Action buttons for the admin */}
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
        {/* Render each group in the admin view */}
        <div>
          {groupsList.map((group) => (
            <div className='group_container' key={group.id}>
              <img src={logo} alt="" />
              <div className='group_description'>
                <h1 className='group_name'>{group.name}</h1>
                <h4 className='group_motto'>{group.description}</h4>
                {/* Accordion to show users in the group */}
                <Accordion className='dropdown'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Users: {group.memberCount}
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* Render the list of users in the group */}
                    <GroupUserList groupId={group.id}></GroupUserList>
                  </AccordionDetails>
                </Accordion>
                {/* Buttons for editing and deleting the group */}
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
          ))}
        </div>
      </Box>
    );
  }

  // Render the user view if the user doesn't have admin authorities
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection={'column'}
    >
      <h1>Groups</h1>
      {/* Render each group in the user view */}
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


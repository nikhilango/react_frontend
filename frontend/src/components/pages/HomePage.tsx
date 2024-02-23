import { Box } from '@mui/system';
import logo from "../../images/team-placeholder.png";
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

  const handleEditGroup = (id: string) => {
    navigate('../useredit/' + id);
  };

  useEffect(() => {
    GroupsService.getAllGroups().then((data: any) => {
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
      <Button
        onClick={() => navigate("/groupedit")}
        size='small'
        variant='contained'
      >
        Add Group
      </Button>
      <h1>Groups</h1>
      {/* <div>
        {groupsList.map((group) =>
            (
            <div className='group_container'>
              <img src={logo} alt="" />
              <div className='group_description'>
                <h1 className='group_name'>Googlers</h1>
                <h4 className='group_motto'>Lorem ipsum dolor sit amet.</h4>
                <Accordion className='dropdown'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    10 Users
                  </AccordionSummary>
                  <AccordionDetails>
                    Freddy Ortega,
                    Karissa Andrews,
                    Julio Mcpherson,
                    Laci Huang,
                    Naima Kennedy,
                    Camilla Washington,
                    Jorden Huffman,
                    Rudy Gamble
                  </AccordionDetails>
                </Accordion>
                <Button
                  onClick={() => handleEditGroup(group.id)}
                  size='small'
                  variant='contained'
                >
                  Edit Group
                </Button>
              </div>
            </div>
            )
        )}
      </div> */}
      <div className='group_container'>
        <img src={logo} alt="" />
        <div className='group_description'>
          <h1 className='group_name'>Googlers</h1>
          <h4 className='group_motto'>Lorem ipsum dolor sit amet.</h4>
          <Accordion className='dropdown'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              10 Users
            </AccordionSummary>
            <AccordionDetails>
              Freddy Ortega,
              Karissa Andrews,
              Julio Mcpherson,
              Laci Huang,
              Naima Kennedy,
              Camilla Washington,
              Jorden Huffman,
              Rudy Gamble
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className='group_container'>
        <img src={logo} alt="" />
        <div className='group_description'>
          <h1 className='group_name'>Googlers</h1>
          <h4 className='group_motto'>Lorem ipsum dolor sit amet.</h4>
          <Accordion className='dropdown'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              10 Users
            </AccordionSummary>
            <AccordionDetails>
              Freddy Ortega,
              Karissa Andrews,
              Julio Mcpherson,
              Laci Huang,
              Naima Kennedy,
              Camilla Washington,
              Jorden Huffman,
              Rudy Gamble
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className='group_container'>
        <img src={logo} alt="" />
        <div className='group_description'>
          <h1 className='group_name'>Googlers</h1>
          <h4 className='group_motto'>Lorem ipsum dolor sit amet.</h4>
          <Accordion className='dropdown'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              10 Users
            </AccordionSummary>
            <AccordionDetails>
              Freddy Ortega,
              Karissa Andrews,
              Julio Mcpherson,
              Laci Huang,
              Naima Kennedy,
              Camilla Washington,
              Jorden Huffman,
              Rudy Gamble
            </AccordionDetails>
          </Accordion>
        </div>
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
      <div className='group_container'>
        <img src={logo} alt="" />
        <div className='group_description'>
          <h1 className='group_name'>Googlers</h1>
          <h4 className='group_motto'>Lorem ipsum dolor sit amet.</h4>
          <Accordion className='dropdown'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              10 Users
            </AccordionSummary>
            <AccordionDetails>
              Freddy Ortega,
              Karissa Andrews,
              Julio Mcpherson,
              Laci Huang,
              Naima Kennedy,
              Camilla Washington,
              Jorden Huffman,
              Rudy Gamble
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

    </Box>
  );
}

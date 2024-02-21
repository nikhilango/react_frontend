import { Box } from '@mui/system';
import logo from '../../logo1.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Group } from '../../types/models/Group';
import LogoutIcon from '@mui/icons-material/Logout';

export default function HomePage() {

  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const navigate = useNavigate();


  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection={'column'}
    >
      <h1>Welcome to the Homepage</h1>
      <img
        src={logo}
        style={{ filter: 'invert(100%)' }}
        className='App-logo'
        alt='logo'
      />
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

      <LogoutIcon 
        sx={{position: "fixed", top: 0, right: 0, zIndex: 2000, height: 50, width: 50, marginRight: 5}}>
      </LogoutIcon>

    </Box>
  );
}

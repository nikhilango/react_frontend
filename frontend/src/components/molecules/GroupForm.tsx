import { useFormik } from 'formik';
import { Group } from '../../types/models/Group';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useEffect, useState } from 'react';
import { User } from '../../types/models/User.model';
import UserService from '../../Services/UserService';

interface GroupProps {
  group: Group;
    submitActionHandler: (values: Group) => void;
  }

const GroupForm = ({ group, submitActionHandler }: GroupProps) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.getAllUsers().then((data: any) => {
      setUsers(data.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: group.id,
      name: group ? group.name : '',
      logoUrl: group ? group.logoUrl : '',
      description: group ? group.description : '',
      memberCount: group ? group.memberCount : 0,
      users: group ? group.users : [],

    },
    validationSchema: object({
      firstName: string().required().min(2).max(50),
      lastName: string().required().min(2).max(50),
      email: string().required().email(),
    }),
    onSubmit: (values: Group) => {
      console.log("submit");
      //submitActionHandler(values);
    },
    enableReinitialize: true,
  });

  const handleAutocompleteChange = (event: any, value: any) => {
    formik.setFieldValue('users', value);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ paddingTop: '15px' }}>
          <TextField
            id='name'
            label='Name'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.name && formik.errors.name)}
            value={formik.values.name}
          />
          <TextField
            id='description'
            label='Description'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.description && formik.errors.description)}
            value={formik.values.description}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            options={users}
            getOptionLabel={(option) => option.email}
            onChange={(event, value) => handleAutocompleteChange(event, value)}
            value={formik.values.users}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Users"
              />
            )}
          />
        </Box>
        <div>
          <Button
            sx={{ marginTop: '15px', marginRight: '10px' }}
            variant='contained'
            color='success'
            type='submit'
            onClick={() => {
              submitActionHandler(formik.values)
            }}
          >
            {group.id && 'Save'}
            {!group.id && 'Add'}
          </Button>
          <Button
            sx={{ marginTop: '15px' }}
            variant='contained'
            color='error'
            onClick={() => {
              navigate('/');
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}

export default GroupForm;
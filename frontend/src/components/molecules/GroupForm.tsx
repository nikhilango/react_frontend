import { useFormik } from 'formik';
import { Group } from '../../types/models/Group';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

interface GroupProps {
  group: Group;
    submitActionHandler: (values: Group) => void;
  }

const GroupForm = ({ group, submitActionHandler }: GroupProps) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: group.id,
      logo: group ? group.logo : '',
      name: group ? group.name : '',
      motto: group ? group.motto : '',
      users: group ? group.users : [],
    },
    validationSchema: object({
      firstName: string().required().min(2).max(50),
      lastName: string().required().min(2).max(50),
      email: string().required().email(),
    }),
    onSubmit: (values: Group) => {
      submitActionHandler(values);
    },
    enableReinitialize: true,
  });

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
          {formik.errors.name && formik.touched.name ? (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
          ) : null}
          <TextField
            id='motto'
            label='Motto'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.motto && formik.errors.motto)}
            value={formik.values.motto}
          />
          {formik.errors.motto && formik.touched.motto ? (
            <div style={{ color: 'red' }}>{formik.errors.motto}</div>
          ) : null}
        </Box>
        <div>
          <Button
            sx={{ marginTop: '15px', marginRight: '10px' }}
            variant='contained'
            color='success'
            type='submit'
            disabled={!(formik.dirty && formik.isValid)}
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
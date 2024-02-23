import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage';
import UserTable from '../components/pages/UserPage/UserTable';
import UserPage from '../components/pages/UserPage/UserPage';
import authorities from '../config/Authorities';
import GroupPage from "../components/pages/GroupPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={'/'} 
      element={<PrivateRoute requiredAuths={[]} element={<HomePage />} />}
      />
      <Route path={'/login'} element={<LoginPage />} />

      <Route
        path={'/users'}
        element={<PrivateRoute requiredAuths={[authorities.USER_MODIFY]} element={<UserTable />} />}
      />
      <Route
        path='/useredit'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_MODIFY]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/useredit/:userId'
        element={
          <PrivateRoute
            requiredAuths={[authorities.DEFAULT]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/groupedit'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_MODIFY]}
            element={<GroupPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/groupedit/:groupId'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_MODIFY]}
            element={<GroupPage />}
          ></PrivateRoute>
        }
      />
      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;

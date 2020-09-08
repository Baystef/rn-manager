import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const Stack = createStackNavigator();

const Router = ({ user }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = () => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    isLoggedIn();
  }, [user]);

  const authScreens = {
    login: LoginForm,
  };

  const mainScreens = {
    employeeList: EmployeeList,
    employeeCreate: EmployeeCreate,
    employeeEdit: EmployeeEdit,
  };

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {Object.entries({
        // Use some screens conditionally based on some condition
        ...(!loggedIn ? authScreens : mainScreens),
      }).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

const mapStateToProps = ({ auth: { user } }) => {
  return { user };
};

export default connect(mapStateToProps, null)(Router);

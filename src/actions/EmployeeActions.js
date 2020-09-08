import firebase from 'firebase';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_EDIT_SUCCESS,
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value },
  };
};

export const employeeCreate = ({ name, phone, shift, navigation }) => {
  const {
    currentUser: { uid },
  } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${uid}/employees`)
      .push({
        name,
        phone,
        shift,
      })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        navigation.navigate('employeeList');
      });
  };
};

export const employeesFetch = () => {
  const {
    currentUser: { uid },
  } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${uid}/employees`)
      .on('value', (snapshot) => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeEdit = ({ name, phone, shift, uid: eid, navigation }) => {
  const {
    currentUser: { uid },
  } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${uid}/employees/${eid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_EDIT_SUCCESS });
        navigation.navigate('employeeList');
      });
  };
};

export const employeeDelete = ({ navigation, uid: eid }) => {
  const {
    currentUser: { uid },
  } = firebase.auth();
  return () => {
    firebase
      .database()
      .ref(`/users/${uid}/employees/${eid}`)
      .remove()
      .then(() => {
        navigation.navigate('employeeList');
      });
  };
};

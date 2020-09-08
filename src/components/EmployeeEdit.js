import React, { useLayoutEffect, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { employeeUpdate, employeeEdit, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

const EmployeeEdit = ({
  navigation,
  employeeUpdate: employeeUpdateAct,
  employeeEdit: employeeEditAct,
  employeeDelete: employeeDeleteAct,
  route: {
    params: { employee },
  },
  name,
  phone,
  shift,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    for (let prop in employee) {
      const value = employee[prop];
      employeeUpdateAct({ prop, value });
    }
  }, [employee, employeeUpdateAct]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Employee',
    });
  }, [navigation]);

  const onButtonPress = () => {
    employeeEditAct({ name, phone, shift, uid: employee.uid, navigation });
  };

  const onTextPress = () => {
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  };

  const onAccept = () => {
    const { uid } = employee;
    employeeDeleteAct({ navigation, uid });
  };

  const onDecline = () => {
    setModalVisible(false);
  };

  return (
    <Card>
      <EmployeeForm />
      <CardSection>
        <Button onPress={onButtonPress}>Save Changes</Button>
      </CardSection>
      <CardSection>
        <Button onPress={onTextPress}>Text Schedule</Button>
      </CardSection>
      <CardSection>
        <Button onPress={() => setModalVisible(true)}>Fire Employee</Button>
      </CardSection>

      <Confirm visible={modalVisible} onAccept={onAccept} onDecline={onDecline}>
        Are you sure you want to delete this?
      </Confirm>
    </Card>
  );
};

const mapStateToProps = ({ employeeForm: { name, phone, shift } }) => {
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeEdit,
  employeeDelete,
})(EmployeeEdit);

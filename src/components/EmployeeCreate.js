import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

const EmployeeCreate = (props) => {
  const {
    navigation,
    name,
    phone,
    shift,
    employeeCreate: employeeCreateAct,
  } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create Employee',
    });
  }, [navigation]);

  const onButtonPress = () => {
    employeeCreateAct({ name, phone, navigation, shift: shift || 'Monday' });
  };

  return (
    <Card>
      <EmployeeForm {...props} />
      <CardSection>
        <Button onPress={onButtonPress}>Create</Button>
      </CardSection>
    </Card>
  );
};

const mapStateToProps = ({ employeeForm: { name, phone, shift } }) => {
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(
  EmployeeCreate,
);

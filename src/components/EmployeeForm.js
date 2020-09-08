import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

const EmployeeForm = ({
  name,
  phone,
  shift,
  employeeUpdate: employeeUpdateAct,
}) => {
  return (
    <View>
      <CardSection>
        <Input
          label="Name"
          placeholder="John"
          value={name}
          onChangeText={(value) => employeeUpdateAct({ prop: 'name', value })}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Phone"
          placeholder="234701234587"
          value={phone}
          onChangeText={(value) => employeeUpdateAct({ prop: 'phone', value })}
        />
      </CardSection>
      <CardSection style={styles.pickerContainerStyle}>
        <Text style={styles.pickerTextStyle}>Shift</Text>
        <Picker
          selectedValue={shift}
          onValueChange={(value) =>
            employeeUpdateAct({ prop: 'shift', value })
          }>
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </CardSection>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainerStyle: {
    flexDirection: 'column',
  },
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
});

const mapStateToProps = ({ employeeForm: { name, phone, shift } }) => {
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);

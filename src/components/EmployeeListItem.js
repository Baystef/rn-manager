import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';

const EmployeeListItem = ({ employee, navigation }) => {
  const { name } = employee;

  const onRowPress = () => {
    navigation.navigate('employeeEdit', { employee });
  };

  return (
    <TouchableWithoutFeedback onPress={onRowPress}>
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>{name}</Text>
        </CardSection>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
});

export default EmployeeListItem;

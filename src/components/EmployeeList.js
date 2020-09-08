import React, { useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import EmployeeListItem from './EmployeeListItem';

const EmployeeList = ({
  navigation,
  employeesFetch: employeesFetchAct,
  employees,
}) => {
  const isEmployeeAdded = JSON.stringify(employees);
  useEffect(() => {
    employeesFetchAct();
  }, [isEmployeeAdded, employeesFetchAct]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Employees',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('employeeCreate')}>
          <Text>+ Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.phone}
        data={employees}
        renderItem={({ item }) => (
          <EmployeeListItem employee={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const mapStateToProps = ({ employees }) => {
  employees = Object.keys(employees).map((uid) => {
    return { ...employees[uid], uid };
  });
  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);

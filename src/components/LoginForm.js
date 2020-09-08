import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const LoginForm = ({
  emailChanged: emailChangedAct,
  passwordChanged: passwordChangedAct,
  loginUser: loginUserAct,
  email,
  password,
  error,
  loading,
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Please Login',
    });
  }, [navigation]);

  const onEmailChange = (text) => {
    emailChangedAct(text);
  };

  const onPasswordChange = (text) => {
    passwordChangedAct(text);
  };

  const onButtonPress = () => {
    loginUserAct({ email, password });
  };

  const renderButton = () => {
    if (loading) {
      return <Spinner />;
    }
    return <Button onPress={onButtonPress}>Login</Button>;
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      );
    }
  };

  return (
    <Card>
      <CardSection>
        <Input
          label="Email"
          placeholder="email@gmail.com"
          onChangeText={onEmailChange}
          value={email}
        />
      </CardSection>

      <CardSection>
        <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={onPasswordChange}
          value={password}
        />
      </CardSection>
      {renderError()}
      <CardSection>{renderButton()}</CardSection>
    </Card>
  );
};

const styles = StyleSheet.create({
  errorTextStyle: {
    color: 'red',
    fontSize: 20,
    alignSelf: 'center',
  },
});

const mapStateToProps = ({ auth: { email, password, error, loading } }) => {
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(LoginForm);

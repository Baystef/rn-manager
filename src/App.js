import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import reducers from './reducers';

import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(thunk));

const App = () => {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyAlowTPGrsNk8YS5XieSuvhu6ToswgC3PY',
      authDomain: 'manager-6a46d.firebaseapp.com',
      databaseURL: 'https://manager-6a46d.firebaseio.com',
      projectId: 'manager-6a46d',
      storageBucket: 'manager-6a46d.appspot.com',
      messagingSenderId: '134172220575',
      appId: '1:134172220575:web:8f4d940d1589b26bb696aa',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

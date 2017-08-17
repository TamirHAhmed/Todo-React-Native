import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import store from './store/index';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import TodoScreen from './screens/TodoScreen';


const MainNavigator = TabNavigator({
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen } ,
    todo: { screen: TodoScreen }
  }, 
  {
    animationEnabled: false,
    swipeEnabled: false,
    backBehavior: 'none',
    lazy: true,
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      tabBarVisible: false
    }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});

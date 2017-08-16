import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class WelcomeScreen extends Component {

    async componentWillMount() {
        let token = await AsyncStorage.getItem('token');
        this.props.authSetToken(token); //set state of token

        if (token) {
            this.props.fetchTodoList();
            this.props.navigation.navigate('todo');
            
        } else {
            this.props.navigation.navigate('auth');
        }
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text>Welcome</Text>
                <ActivityIndicator animating />
            </View>
        );
    }
}

export default connect(null,actions)(WelcomeScreen);

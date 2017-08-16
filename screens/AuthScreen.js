import React, { Component } from 'react';
import { 
    View, Text, ActivityIndicator,     
    UIManager, LayoutAnimation, KeyboardAvoidingView,
    Keyboard
} from 'react-native';

import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    state = { email: '', password: ''};

    componentWillUnmount() {
        console.log('******************************** will unmounted');
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental 
        && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    //after receiving the token
    componentWillReceiveProps(nextProps) {
         this.onAuthComplete(nextProps);
    }
    
    onHandleSubmit = () => {
        //call the login action
        this.props.authLogin(this.state.email, this.state.password);
    }

    onAuthComplete(props) {
        if(props.token) {
            Keyboard.dismiss();
            this.setState({ email: '', password: '' });
            this.props.fetchTodoList();
            this.props.navigation.navigate('todo');
        }
    }

    renderSubmit() {
        if(this.props.isLoading) {
            return <ActivityIndicator animating />
        }else {
            return (                 
                <Button 
                    title="Submit" 
                    onPress={this.onHandleSubmit}
                />
            );
        }
    }

    renderError() {
        if(this.props.error) {
            return <Text style={styles.errorTextStyle}>{this.props.error}</Text>;
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.containerStyle}>
                <Text>Login Screen</Text>
                 <View style={styles.formStyle}>
                    <FormLabel>Email</FormLabel>
                    <FormInput 
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </View>
                <View style={styles.formStyle}>
                    <FormLabel>Password</FormLabel>
                    <FormInput 
                        password
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                {this.renderSubmit()}
                {this.renderError()}
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    containerStyle: {
        flex:1, 
        flexDirection:'column',  
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 16
    },
    formStyle: {
         marginBottom: 10 
    }
}


function mapStateToProps({ auth }) {
    return { token: auth.token, isLoading: auth.isLoading, error: auth.error };
}

export default connect(mapStateToProps,actions)(AuthScreen)

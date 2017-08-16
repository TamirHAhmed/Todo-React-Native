import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, FlatList, 
    TouchableOpacity, KeyboardAvoidingView, Keyboard
 } from 'react-native';

import { 
    Button, List, ListItem, 
    CheckBox, Header, Icon, 
    FormInput, FormLabel  
} from 'react-native-elements';

import { connect } from 'react-redux';
import * as actions from '../actions';


class TodoScreen extends Component {

    state = { todoChange: '', selectedItem: {}, newTodo: '' }

     //after receiving the token
    componentWillReceiveProps(nextProps) {
         if(!nextProps.token)
            this.props.navigation.navigate('auth');
    }

    onAdd = () => {
        this.props.todoAdd(this.state.newTodo);
        this.setState({ newTodo: '' });
        Keyboard.dismiss();
    }

    onCheck = (item) => {
        this.props.todoToggle(item);
    }

    onEdit = (item) => {
        this.setState({ todoChange: item.todoItem, selectedItem: item });
    }

    onDelete = () => {
        this.props.todoDelete(this.state.selectedItem.id);
        this.onCancelChange();
    }

    onCancelChange = () => {
        this.setState({ todoChange: '', selectedItem: {}});
    }

    onSubmitChange = () => {
        this.props.todoUpdate(this.state.selectedItem, this.state.todoChange);
        this.onCancelChange();
    }

    onLogout = () => {
        this.props.authLogout();
    }

    renderHeader() {
        if(!_.isEmpty(this.state.selectedItem)) {
            return(
                 <Header
                    leftComponent={
                        <Icon 
                            name='close' 
                            color='red'
                            onPress={this.onCancelChange}  
                        />
                    }
                    centerComponent={
                        <Icon 
                            name='delete-forever' 
                            color='red'
                            onPress={this.onDelete}  
                        />
                    }
                    rightComponent={
                        <Icon 
                            name='check' 
                            color='green'
                            onPress={this.onSubmitChange}  
                        />
                    }
                    outerContainerStyles={{ paddingTop: 0 }}
                />
            );
        }else {
            return( 
                <Header  
                    centerComponent={<Text>Todo App</Text>}
                    rightComponent={
                        <Icon 
                            name='power-settings-new' 
                            color='red'
                            onPress={this.onLogout}  
                        />
                    }
                /> );
        }
    }

    renderEdit(item){
        if(item.id === this.state.selectedItem.id){
            return (
                 <View style={{ marginBottom: 10 }}>
                    <FormLabel>Edit Todo</FormLabel>
                    <FormInput 
                        value={this.state.todoChange}
                        onChangeText={todoChange => this.setState({ todoChange })}
                    /> 
                </View>
            );
        }else {
             return <Text>{item.todoItem}</Text>;
        }
    }

    renderItem = (item) => {
        return (
            <View style={{ flex:1, flexDirection: 'row'}}>

                <View style={{ flex: 2, justifyContent: 'center'}}>
                    <TouchableOpacity  onPress={() => this.onEdit(item)}>
                        {this.renderEdit(item)}
                    </TouchableOpacity >
                </View>
                <View  style={{ flex: 1, justifyContent:'flex-end'}}>
                    <CheckBox
                        title=''
                        checked={item.isDone}
                        onPress={() => this.onCheck(item)}
                        containerStyle= {{  backgroundColor: 'transparent', borderColor: 'transparent'}}
                    
                    />
                </View>
            </View>
        );
    }

    renderFooter() {
        if(_.isEmpty(this.state.selectedItem)) {
            return(
                 <KeyboardAvoidingView style={styles.todoAddStyle}  behavior="padding">
                    <View style={{ padding:25, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <FormInput 
                            value={this.state.newTodo}
                            onChangeText={newTodo => this.setState({ newTodo })}
                        /> 
                        <Icon 
                            name='check' 
                            color='green'
                            onPress={this.onAdd}  
                        />
                    </View>
                </KeyboardAvoidingView>
            );
        }
    }

    render() {
        console.log(this.props);
        return(
            <View style={{ flex: 1 }}>
                {this.renderHeader()}
                <View style={styles.containerStyle}>
                    <FlatList
                        data={_.orderBy(this.props.todoList, ['isDone','date'], ['asc', 'desc'])}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={(item, index) => item.id}
                        extraData={this.state}
                    />
                </View>
               {this.renderFooter()}
            </View>
        );
    }
}

const styles = {
    todoAddStyle: {
        backgroundColor:'#ECECEC', 
        borderTopColor: '#bbb', 
        borderTopWidth: 1
    },
    containerStyle: {
        marginTop: 70, 
        padding: 15, 
        flex: 1
    }
}

const mapStateToProps = ({ todo, auth }) => {
    return { todoList: todo, token: auth.token }
}

export default connect(mapStateToProps, actions)(TodoScreen);


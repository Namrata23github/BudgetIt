import React, { Component } from 'react';
import { View, Event, Text, TextInput, Platform,StyleSheet, TouchableHighlight, AsyncStorage, Picker } from 'react-native';
import t from 'tcomb-form-native';
import {StackNavigator, NavigationActions} from 'react-navigation'
import StorageObject from '../Components/StorageObject.js'
import { ListItem,Icon } from 'react-native-elements'

const Form = t.form.Form;
var storage = StorageObject.getInstance();

export default class ViewCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    UNSAFE_componentWillMount() {
        this.getData();
    }

    getData=()=> {
        const arr = [];
        const list = [];
        storage.getAllDataForKey('category')
            .then(users => {
                this.setState({
                    list: users,
                    selectedService: 'select category'
                });
            }
            );
    }
    render() {

        return (
            <View>
                {this.state.list.map((data, i) => (
                        <ListItem
                            key={i}
                            title={data.categoryname}
                            // rightIcon={
                            // //    < Icon
                            // //     name={'circle'}
                            // // size={0.1}
                            // //     />
                            // }
                        />)
                    )
                    }
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    TextStyle: {
        color: "#000000",
        fontSize: 17,
        height: 36,
        paddingVertical: Platform.OS === "ios" ? 7 : 0,
        paddingHorizontal: 7,
        borderRadius: 4,
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 5
    },
    labelStyle: {
        color: "#000000",
        fontSize: 17,
        marginBottom: 7,
        fontWeight: "500"
    },
    floatStyle: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        bottom: 10,
        right: 10,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 100,
    }
});

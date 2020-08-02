import React, { Component } from 'react';
import { View, StyleSheet,Text, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import StorageObject from '../Components/StorageObject.js'
const Form = t.form.Form;

var storage = StorageObject.getInstance();
const CategoryStruct = t.struct({
    category: t.String
})

let options = {label: 'Add Category',};

export default class MGAddCategory extends Component
{
    static catid=0;

    storeCategory = (value) => {
        storage.save({
            key: "category",
            id:MGAddCategory.catid++,
            data: {
                categoryname: value.category
            }
        })
        this.getCategory();
        this.clearForm();
    }
    
    
    getCategory = () => {
        storage.getAllDataForKey("category").then(users => {
            users.map((data) => (console.log(data)))
        }); }
    
    onPressStoreCategory = () => {
        var value = this.refs.form.getValue();
        if (value) {
            this.storeCategory(value);
        }
    }
    clearForm = () => {
        this.setState({ value: null });
    }
    render()
    {
        return(
            <View>
        <View style={styles.container}>
            <Form
                ref="form"
                type={CategoryStruct}
                options={options}
            />
             <TouchableHighlight style={styles.button} onPress={this.onPressStoreCategory} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
        </View>
        </View>)
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
    }
});
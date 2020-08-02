import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, Platform, Header } from 'react-native';
import t from 'tcomb-form-native';
import StorageObject from '../Components/StorageObject.js'

const Form = t.form.Form;
var storage = StorageObject.getInstance();
const Positive = t.refinement(t.Number, function (n) {
    return n >= 0;
});
const Limit = t.struct({
    limitamount: Positive,
});

let options = {
    label: 'Expense Limit',
    fields: {
        limitamount: {
            label: "Add limit in percentage",
            error: "Add valid limit"
        }
    },
    auto: 'placeholder'
}

export default class MGExpenseLimit extends Component {
    constructor() {
        super();
        this.state = {
            limit: 0
        }
    }
    onPress = () => {
        var value = this.refs.form.getValue();
        if (value) {
            storage.save({
                key: "expenselimit",
                id: "expense",
                data: {
                    limitamount: value.limitamount,
                }
            })

        }
        this.props.navigation.goBack();
    }
    UNSAFE_componentWillMount() {
        this.getLimit();
    }
    getLimit = () => {
        storage.getAllDataForKey("expenselimit").then(users => {
            users.map((data) => (this.setState({ limit: data.limitamount })))
        });
    }
    render() {
        defaultValue = {
            limitamount: this.state.limit
        }
        return (
            <View>
                <View style={styles.container}>

                    <Form
                        ref="form"
                        type={Limit}
                        options={options}
                        value={defaultValue}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
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
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import moment from 'moment'
import StorageObject from '../Components/StorageObject.js'


let dateKey;
let time;
let dateIncome
const Form = t.form.Form;
var storage = StorageObject.getInstance();
const myFormatFunction = (date) => {
    return moment(date).format('ll');
}

const Positive = t.refinement(t.Number, function (n) {
    return n >= 0;
});
const Income=t.struct({
    amount : Positive,
    date:t.Date
});

let options = {
    label: 'Income Detail',
    fields: {
        amount:{
                label: 'Income',
                error: 'Enter valid income',
                placeholder: 'Income',
                keyboardType: 'numeric'

        },
        date:
        {
            mode: 'date',
            config: {
                format: (date) => myFormatFunction(date)
            }
        }
    },
    auto:'placeholder'
}

export default class MGIncomeDescription extends Component {
    flag=0;
    onPress = () => { 
        var value = this.refs.form.getValue();
        if (value) {
            dateKey = moment(value.date).format('L');
            dateIncome="income"+dateKey.toString();

            time = moment(value.date).format('LTS');

            this.flag=1;
            this.storeExpense(value);

        }}
    clearForm = () => {
        this.setState({ value: null });
    }
    onPressAndAnother = () => {
        var value = this.refs.form.getValue();
        if (value) {
            dateKey = moment(value.date).format('L');
            dateIncome="income"+dateKey.toString();
            time = moment(value.date).format('LTS');
            this.storeExpense(value);
            this.clearForm();
        }
    }
    storeExpense = (value) => {
        storage.save({
            key:dateIncome,
            id: time,
            data: {
                amount:value.amount,
                date:dateKey,
                time:time
            }
        })
        if(this.flag==1)
        {this.flag=0;
            this.props.route.params.refresh()
            this.props.navigation.goBack();            
        }

    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                <Form
                    ref="form"
                    type={Income}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this.onPressAndAnother} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save and add another</Text>
                </TouchableHighlight>
            </View>
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
    }
});
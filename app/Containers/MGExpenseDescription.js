import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Picker, Text, TouchableHighlight, TextInput, Platform, Header } from 'react-native';
import t from 'tcomb-form-native';
import moment from 'moment'
import StorageObject from '../Components/StorageObject'

let dateKey;
let time;
const Form = t.form.Form;
var storage = StorageObject.getInstance();
const myFormatFunction = (date) => {
    return moment(date).format('lll');
}

const Positive = t.refinement(t.Number, function (n) {
    return n >= 0;
});

const Expense = t.struct({
    itemname: t.String,
    price: Positive,
    date: t.Date,
    note: t.maybe(t.String),
});

let options = {
    label: 'Expense Detail',
    fields: {
        itemname: {
            label: 'Item Name',
            placeholder: 'Item Name',
            error: 'Enter item name',

        },
        price: {
            label: 'Price',
            error: 'Enter valid price and price can\'t be empty',
            placeholder: 'Price',
            keyboardType: 'numeric'

        },
        note: {
            placeholder: 'Note'
        },
        date:
            {
                mode: 'datetime',
                config: {
                    format: (date) => myFormatFunction(date)
                }
            }
    },

    auto: 'placeholder',

}
export default class MGExpenseDescription extends Component {
    flag = 0;

    UNSAFE_componentWillMount() {
        this.getCategoryData();
        this.setDate();
    }
    setDate() {
        this.state.value.date = new Date(this.props.route.params.datetime)
        this.setState({ flag: 1 })
    }
    getCategoryData() {
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

    storeExpense = (values) => {
        console.log(time)
        storage.save({
            key: dateKey,
            id: time,
            data: {
                itemname: values.itemname,
                price: values.price,
                time: time,
                date: dateKey,
                category: this.state.PickerValueHolder,
                note: values.note,
                dateTime: values.date

            }
        })

        storage.getAllDataForKey(dateKey.toString()).then(users => {
            users.map((data) => (console.log(data)))
        });
        if (this.flag == 1) {
            this.flag = 0;
            this.props.route.params.refresh();
            this.props.navigation.goBack();
        }

    }

    constructor() {
        super();

        this.state = {
            PickerValueHolder: '',
            list: [],
            value: {
                itemname: '',
                price: '',
                date: new Date(moment()),
                note: ''
            }
        }

    }
    onFormChange = (value) => {
        this.setState({ value });
    }
    onPress = () => {
        var values = this.refs.form.getValue();
        if (values) {
            dateKey = moment(values.date).format('L');
            time = moment(values.date).format('LTS');
            this.flag = 1;
            this.storeExpense(values);

        }
    }
    clearForm = () => {
        this.setState({ value: {
            itemname: '',
            price: '',
            date: new Date(moment()),
            note: ''
        }});
    }
    onPressAndAnother = () => {
        var values = this.refs.form.getValue();
        if (values) {
            dateKey = moment(values.date).format('L');
            time = moment(values.date).format('LTS');
            this.storeExpense(values);
            this.clearForm();
        }
    }
    render() {
        this.state.value.date = new Date(moment());
        let categoryItems = this.state.list.map((data, i) => { return <Picker.Item key={i} value={data.categoryname.toString()} label={data.categoryname.toString()} /> })
        return (
            < View >
                <ScrollView>
                    <View style={styles.container}>
                        <Form
                            ref="form"
                            type={Expense}
                            options={options}
                            value={this.state.value}
                            onChange={this.onFormChange}
                        />
                        <Picker
                            selectedValue={this.state.PickerValueHolder}

                            onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })} >


                            {categoryItems}
                        </Picker>
                        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={this.onPressAndAnother} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Save and add another</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View >
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

import React, { Component } from 'react';
import { StyleSheet, View, Picker, Text, TouchableHighlight,ScrollView } from 'react-native';
import t from 'tcomb-form-native';
import moment from 'moment'
import StorageObject from '../Components/StorageObject.js'

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
export default class MGEditExpenseList extends Component {


    UNSAFE_componentWillMount() {
        this.getCategoryData();
        this.getData();
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
            });
    }

    getData() {
        const { params } = this.props.route;
        if (params) {
            this.state.PickerValueHolder = params.data.category;
            this.state.value.itemname = params.data.itemname;
            this.state.value.price = params.data.price;
            this.state.value.date = new Date(params.data.dateTime);
            this.state.value.note = params.data.note;
        }

    }

    storeExpense = (value) => {
        if (value) {
            this.removeData();
            storage.save({
                key: dateKey,
                id: time,
                data: {
                    itemname: value.itemname,
                    price: value.price,
                    time: time,
                    date: dateKey,
                    category: this.state.PickerValueHolder,
                    note: value.note,
                    dateTime: value.date

                }

            })
        }
        storage.getAllDataForKey(dateKey.toString()).then(users => {
            users.map((data) => (console.log(data)))
        });
        this.props.route.params.refresh();
        this.props.navigation.goBack();
    }


    constructor() {
        super();
        this.state = {
            PickerValueHolder: '',
            list: [],
            value: {
                itemname: '',
                price: '',
                date: '',
                note: ''
            }
        }
    }

    onPress = () => {
        var value = this.refs.form.getValue();
        if (value) {
            dateKey = moment(value.date).format('L');
            time = moment(value.date).format('LTS');
            this.storeExpense(value);

        }
    }
    clearForm = () => {
        this.setState({ value: null });
    }
    onPressAndAnother = () => {
        var value = this.refs.form.getValue();
        if (value) {
            dateKey = moment(value.date).format('L');
            time = moment(value.date).format('LTS');
            this.storeExpense(value);
        }
    }
    removeData = () => {
        const { params } = this.props.route;
        const rowID = params ? params.rowID : null;
        const data = params ? params.data : null;
        storage.remove({
            key: data.date,
            id: data.time
        });
    }
    onPressDelete=()=>{
        const { params } = this.props.route;
        const rowID = params ? params.rowID : null;
        const data = params ? params.data : null;
        storage.remove({
            key: data.date,
            id: data.time
        });
        this.props.route.params.refresh();
        this.props.navigation.goBack();
    }
    onFormChange=(value) =>{
        this.setState({value}); 
      }

    render() {
        const { params } = this.props.route;
        const rowID = params ? params.rowID : null;
        const data = params ? params.data : null;


        let categoryItems = this.state.list.map((dataCategory, i) => {
            return <Picker.Item key={i} value={dataCategory.categoryname.toString()}
                label={dataCategory.categoryname.toString()} />
        })
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
                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })}
                        prompt="Select category">
                        {categoryItems}
                    </Picker>
                    <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this.onPressDelete} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Delete</Text>
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

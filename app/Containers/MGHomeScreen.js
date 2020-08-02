import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import moment from 'moment'
import MGHeader from '../Components/MGHeader.js'
import StorageObject from '../Components/StorageObject.js'
import { ListItem, Icon } from 'react-native-elements'
import { configure, localNotification, } from '../Containers/Notification.js';

configure();
var storage = StorageObject.getInstance();
const Form = t.form.Form;

const DateForm = t.struct({
    date: t.Date,
});
const myFormatFunction = (date) => {
    return moment(date).format('ll');
}

let options = {
    fields: {
        date:
            {
                label: 'Choose Date',
                mode: 'datetime',
                config: {
                    format: (date) => myFormatFunction(date)
                }
            }
    }
}

export default class MGHomeScreen extends Component {
    
    price = 0;
    incomeprice = 0;
    notificationFlag=0;
    constructor() {

        super();
        this.state = {
            dateExpense: moment().format('L').toString(),
            datetime: moment(),

            list: [],
            price: 0,
            flag: 0,
            incomeprice: 0,
            limit: 0,
            flagg: 0
        }
    }


    UNSAFE_componentWillMount() {

        this.notificationFlag=0;
        { this.setState({ flag: 0 }) }
        { this.getData() }
        { this.totalExpense() }
        { this.totalIncome() }
        { this.getLimit() }

    }
    getLimit = () => {

        storage.getAllDataForKey("expenselimit").then(users => {
            users.map((data) => (this.setState({ limit: data.limitamount })))
        });
    }
    totalIncome = () => {
        todayDate = (moment(this.state.datetime).format('L')).toString();
        arrDate = todayDate.split('/');
        sum = 0;
        this.incomeprice = 0;
        arr = new Array();
        for (i = 1; i < 31; i++) {
            (i < 10) ? (d = ('0' + i).toString()) : (d = (i.toString()));
            str = ("income" + (arrDate[0] + "/" + d + "/" + arrDate[2])).toString();
            storage.getAllDataForKey(str).then(users => {
                users.map((data) => (this.incomeprice = this.incomeprice + data.amount, this.setState({ flag: 1, incomeprice: this.incomeprice })))
            });

        }
    }

    totalExpense = () => {
        todayDate = (moment(this.state.datetime).format('L')).toString();
        arrDate = todayDate.split('/');
        sum = 0;
        this.price = 0
        arr = new Array();
        for (i = 1; i < 31; i++) {
            (i < 10) ? (d = ('0' + i).toString()) : (d = (i.toString()));
            str = (arrDate[0] + "/" + d + "/" + arrDate[2]).toString();
            storage.getAllDataForKey(str).then(users => {
                users.map((data) => (this.price = this.price + data.price, this.setState({ flag: 1, price: this.price })))
            });
        }

    }

    checkForNotification = () => {

        checkMonth = ((moment(this.state.datetime).format('L')).toString()).split('/');
        currentMonth = ((moment().format('L')).toString()).split('/')
        if (checkMonth[0] == currentMonth[0]) {
            budget = (this.state.limit / 100) * this.state.incomeprice;
            if (this.state.price >= budget && budget != 0) {
                console.log("notification")
                localNotification();
            }
        }
    }

    getData() {

        const arr = [];
        const list = [];
        (storage.getAllDataForKey(this.state.dateExpense)
            .then(users => {
                this.setState({
                    list: users,
                    flag: 0
                });
            }
            ));
    }

    onPressButton = () => {
        var value = this.refs.form.getValue();
        if (value) {
            let dateEx = moment(value.date).format('L');
            this.state.dateExpense = dateEx.toString();
            this.state.datetime = value.date;
            this.getData()
            this.UNSAFE_componentWillMount();
        }
    }
    addTotal = () => {
        storage.save({
            key: "totalExpense",
            id: "expense",
            data: {
                totalexpense: this.state.price
            }
        })
        storage.save({
            key: "totalIncome",
            id: "income",
            data: {
                totalincome: this.state.incomeprice
            }
        })
    }
    refreshFunction = () => {
        this.UNSAFE_componentWillMount();
    }
    render() {
        let categoryItems = this.state.list
        {
            if(!this.notificationFlag)
            {            
                this.checkForNotification();
                this.notificationFlag=1;
            }
            this.addTotal();
        }


        defaultdata = {
            date: new Date(this.state.datetime)
        }
        return (
            <View style={{ flex: 1 }}>
                <MGHeader />
                <View style={[styles.container]}>
                    <Form
                        ref="form"
                        type={DateForm}
                        value={defaultdata}
                        options={options}
                    />

                    <TouchableHighlight style={styles.button} onPress={this.onPressButton.bind(this)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Expense List</Text>
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight
                            style={[styles.floatStyle, { marginTop: 30, marginLeft: 20, backgroundColor: 'green' }]}
                            onPress={() => this.props.navigation.navigate('MGIncomeDescription', { refresh: this.refreshFunction })}>
                            <Text style={{ fontSize: 30 }}>+</Text>
                        </TouchableHighlight>
                        <View style={{ flex: 0.45 }}>
                            <Text style={styles.labelStyle}>Total Income </Text>
                            <Text style={styles.TextStyle}>{this.incomeprice}</Text>
                        </View>
                        <View style={{ flex: 0.5, marginLeft: 20 }}>
                            <Text style={styles.labelStyle}>  Total Expense </Text>
                            <Text style={styles.TextStyle}>
                                {this.price}
                            </Text>
                        </View>
                        <View>

                            <TouchableHighlight
                                style={[styles.floatStyle, { marginTop: 30, marginLeft: 20 }]}
                                onPress={() => this.props.navigation.navigate('MGExpenseDescription', { refresh: this.refreshFunction ,datetime:this.state.datetime})}>
                                <Text style={{ fontSize: 30 }}>-</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View >
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        
                            {this.state.list.map((data, i) => (
                                <ListItem
                                    key={i}
                                    title={data.itemname}
                                    // rightIcon={
                                    //     < Icon
                                    //         name={'edit'}
                                    //         size={30}
                                    //     />}
                                    subtitle={"price: " + data.price + " category: " + data.category + " time: " + data.time}
                                    onPress={() => {
                                        this.props.navigation.navigate('MGEditExpenseList', {
                                            data: data,
                                            refresh: this.refreshFunction
                                        })
                                    }}

                                />)
                            )
                            }
                     
                    </ScrollView>
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
        marginBottom: 8,
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

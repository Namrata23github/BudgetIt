import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Share } from 'react-native';
import MGHeader from '../Components/MGHeader.js'
import moment from 'moment'
import StorageObject from '../Components/StorageObject.js'

var storage = StorageObject.getInstance();
export default class MGSettings extends Component {

    messageExpense = "";
    messageIncome = "";
    messagetotal = "";

    UNSAFE_componentWillMount() {
        this.ExpenseDetail();
        this.incomeDetail();
        this.total();
    }

    shareExpenseDetail = () => {
       sharemessage= ("\n DETAILS OF CURRENT MONTH \n\nEXPENSES DETAIL \n\n"+this.messageExpense +"\n\n INCOME DETAIL\n" +this.messageIncome + "\n\n TOTAL \n"+ this.messagetotal).toString();
       console.log(sharemessage)
        Share.share({ message: (sharemessage) },
            {
                dialogTitle: 'This is share dialog title',
                excludedActivityTypes: ['com.apple.uikit.activity.mail'
                ],
            })
            .then(console.log("sshare"))

            console.log((this.messageExpense + this.messageIncome + this.messagetotal).toString())
    }
    ExpenseDetail = () => {
        todayDate = moment().format('L');
        arrDate = todayDate.split('/');
        sum = 0;
        arr = new Array();
        for (i = 1; i < 31; i++) {
            (i < 10) ? (d = ('0' + i).toString()) : (d = (i.toString()));
            strExpense = (arrDate[0] + "/" + d + "/" + arrDate[2]).toString();
            storage.getAllDataForKey(strExpense).then(users => {
                users.map((data) =>
                    (this.messageExpense = (this.messageExpense +
                        " date: " + strExpense +
                        " category: " + data.category +
                        " itemname: " + data.itemname +
                        " price: " + data.price +"\n").toString()))
            });
        }

    }
    total = () => {
        storage.getAllDataForKey("totalExpense")
            .then(users => {
                users.map((data) =>
                    (this.messagetotal = this.messagetotal +
                        "\n total expense this month:  " + ((data.totalexpense).toString()).toString()))
            })

        storage.getAllDataForKey("totalIncome")
            .then(users => {
                users.map((data) =>
                    (this.messagetotal = this.messagetotal +
                        "\n total income this month:  " + ((data.totalincome).toString()).toString()))
            })
    }
    incomeDetail = () => {
        todayDate = moment().format('L');
        arrDate = todayDate.split('/');
        sum = 0;
        arr = new Array();
        for (i = 1; i < 31; i++) {
            (i < 10) ? (d = ('0' + i).toString()) : (d = (i.toString()));
            str = ("income" + (arrDate[0] + "/" + d + "/" + arrDate[2])).toString();
            storage.getAllDataForKey(str).then(users => {
                users.map((data) => (this.messageIncome = (this.messageIncome + " income date: " + str.substring(6) + " income: " + data.amount+"\n").toString())
                )
            })
        }
    }

    render() {
        return (
            <View>
                <MGHeader />
                <View style={styles.container}>
                    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'
                        onPress={() => this.props.navigation.navigate('MGViewCategory')}>
                        <Text style={styles.buttonText}>View Categories</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={() => this.props.navigation.navigate('MGAddCategory')}>
                        <Text style={styles.buttonText}>Add Categories</Text>
                    </TouchableHighlight >

                    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'
                        onPress={() => this.props.navigation.navigate('MGExpenseLimit')}>
                        <Text style={styles.buttonText}>Add Maximum Limit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'
                        onPress={this.shareExpenseDetail.bind(this)}>
                        <Text style={styles.buttonText}>Generate Report</Text>
                    </TouchableHighlight>
                </View>
            </View>);
    }
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
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

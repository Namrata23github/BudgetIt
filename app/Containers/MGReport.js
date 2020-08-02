import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import MGHeader from '../Components/MGHeader.js'
import t from 'tcomb-form-native';
import moment from 'moment'
import MGPieChart from '../Containers/MGPieChart.js'

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
export default class MGReport extends Component {
    constructor() {
        super()
        this.state = {
            datetime: moment(),
            selectedIndex: 0,
            piedate:(moment().format('L')).toString()
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
    onPress()
    {
        value = this.refs.form.getValue()
        if (value) {
        this.setState({piedate:(moment(value.date).format('L')).toString()})
        this.state.datetime = value.date;
        }

    }

    updateIndex(selectedIndex) {
      
        this.setState({ selectedIndex })
    }
   
    render() {
        const buttons = ['date', 'month']
        const { selectedIndex } = this.state
/*       const chartButton=['pie','histogram']

 */        
defaultdata = {
    date: new Date(this.state.datetime)
}
return (
            <View style={{ flex: 1 }}>
                <MGHeader />
                <View style={styles.container}>
                    <Form
                        ref="form"
                        type={DateForm}
                        options={options}
                        value={defaultdata}

                    />

                 <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Generate Pie Chart</Text>
                </TouchableHighlight>
                </View>
                 <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 40 }}
                /> 
                <MGPieChart dateofpie={this.state.piedate}
                selectedindex={this.state.selectedIndex}/>
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
        marginBottom: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
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
});

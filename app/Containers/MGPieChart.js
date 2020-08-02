import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Pie } from 'react-native-pathjs-charts'
import StorageObject from '../Components/StorageObject.js'
import PropTypes from 'prop-types';
import { Table, Rows } from 'react-native-table-component';

var storage = StorageObject.getInstance();
var arrayOfCategory = new Array();
const palleteDate = [
  { 'r': 25, 'g': 99, 'b': 201 },//blue
  { 'r': 24, 'g': 175, 'b': 35 },//greeb
  { 'r': 190, 'g': 31, 'b': 69 },//dark pink
  { 'r': 100, 'g': 36, 'b': 199 },//purple
  { 'r': 214, 'g': 207, 'b': 32 },
  { 'r': 198, 'g': 84, 'b': 45 },
  { 'r': 100, 'g': 84, 'b': 45 },
  { 'r': 198, 'g': 100, 'b': 45 },
  { 'r': 198, 'g': 84, 'b': 100 },
  { 'r': 50, 'g': 84, 'b': 45 },
  { 'r': 198, 'g': 50, 'b': 45 },
  { 'r': 198, 'g': 84, 'b': 50 },
  { 'r': 30, 'g': 30, 'b': 45 },
  { 'r': 198, 'g': 30, 'b': 30 },
  { 'r': 30, 'g': 84, 'b': 30 },
  { 'r': 100, 'g': 50, 'b': 45 },
  { 'r': 198, 'g': 50, 'b': 100 }
]
export default class MGPieChart extends React.Component {
  static proptypes = {
    dateofpie: PropTypes.any,
    selectedindex: PropTypes.any
  }
  price = 0;
  j = 0;
  dataOfGraph = new Array();
  dataOfGraphMonth = new Array();
  dataOfLegend = new Array();
  dataOfLegendHead = new Array();
  constructor(props) {
    super(props);
    this.state = {
      flag: 0,
      flagg: 0,
      dateGraph: '',
      index: 0,
      flaggg: 0,
      monthDataSet: false
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.dataOfGraphMonth.length = 0;
    this.dataOfGraph.length = 0;
    this.dataOfLegend.length = 0;
    this.setState({ index: nextProps.selectedindex })
    this.setState({ dateGraph: nextProps.dateofpie })
    this.getData()

  }
  UNSAFE_componentWillMount() {
    this.setState({ index: this.props.selectedindex })
    this.setState({ dateGraph: this.props.dateofpie })
    this.getData()
  }

  getData() {
    arrayOfCategory.length = 0;
    storage.getAllDataForKey("category").then(users => {
      users.map((data) => (arrayOfCategory.push(data.categoryname))), this.setState({ flag: 1 }),
        this.getIndex();
    })

  }
  getIndex = () => {
    this.dataOfGraphMonth.length = 0;
    this.dataOfGraph.length = 0;
    switch (this.state.index) {
      case 0: this.getbudgetOnDate();
        break;
      case 1: this.getdataOfMonth();
        break;
    }
  }

  legendData = () => {
    this.dataOfLegend.length = 0;
    console.log(this.dataOfGraph);
    this.dataOfGraph.map((data) =>
      ((data.price != 0) ?
        (this.dataOfLegend.push([<View style={{ width: 20, height: 20, backgroundColor: this.string(data.color) }}></View>, data.category]))
        : (console.log(data.category))
      ))
  }

  getbudgetOnDate = () => {
    sum = 0;
    i = 0;
    arrayOfCategory.map((category, index) => (this.dataOfGraph.push({ category: category.toString(), price: 0, color: palleteDate[i++] }),
      storage.getAllDataForKey(this.state.dateGraph)
        .then(users => {
          users.map((data) =>
            ((data.category == category) ?
              (this.dataOfGraph[index].price = this.dataOfGraph[index].price + data.price) :
              (this.setState({ flagg: 1 })
              )
            )
          ), this.legendData()
        })
    ))

  }

  rgbToHex(r, g, b) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
  }

  string(c) {
    return this.rgbToHex(Math.floor(c.r), Math.floor(c.g), Math.floor(c.b))
  }

  componentToHex(c) {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }

  getdataOfMonth = () => {
    j = 0;
    this.dataOfGraph.length = 0;
    this.dataOfGraphMonth.length = 0;
    for (i = 1; i <= 31; i++) {
      let dateStr = this.createDateStringOfMonth(i);
      storage.getAllDataForKey(dateStr)
        .then(users => {
          users.map((data) => { this.dataOfGraphMonth.push(data) }), (++j > 30) ? (this.getbudgetOnMonth()) : (console.log(''))
        }).catch((err) => { console.log(err.message) })
    }


  }

  getbudgetOnMonth = () => {
    this.dataOfGraph.length = 0;
    j = 0
    arrayOfCategory.map((category, index) => (this.dataOfGraph.push({ category: category.toString(), price: 0, color: palleteDate[j++] }),
      this.dataOfGraphMonth.map((dataa) =>
        ((dataa.category == category) ?
          (this.dataOfGraph[index].price = this.dataOfGraph[index].price + dataa.price) :
          (this.setState({ flagg: 1 })
          )
        ), this.legendData()
      )))

  }
  createDateStringOfMonth = (i) => {
    arrDate = this.state.dateGraph.split('/');
    (i < 10) ? (d = ('0' + i).toString()) : (d = (i.toString()));
    str = ((arrDate[0] + "/" + d + "/" + arrDate[2])).toString();
    return str
  }

  render() {
console.log(this.dataOfLegend)
    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 300,
      height: 300,
      color: '#2980B9',
      r: 0,
      R: 0,
      legendPosition: 'bottom',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: true,
        color: 'black'
      }
    }

    return (
        <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row' }}>

          <View style={styles.pieStyle}>
            <Pie
              data={this.dataOfGraph}
              options={options}
              accessorKey="price"
              r={30}
              R={120}
              label={{
                fontFamily: 'Arial',
                fontSize: 5,
                fontWeight: true,
                color: 'black'
              }}
              legendPosition="bottom"
            />
          </View>
          <View style={[styles.containers, { flex: 0.3 }]}>

            <Table borderStyle={{borderColor: 'transparent' }}>
              <Rows data={this.dataOfLegend} textStyle={styles.text} style={{ width: 100 , borderWidth: 1,borderColor:'black' }} />
            </Table>
          </View>
          </View>

        </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieStyle:{ marginTop: -10, marginBottom: -50,marginRight:-10 ,marginLeft:-20, flex: 0.9 },
  containers: { padding: 5, width: 110 },
  head: { height: 40, width: 100},
  text: { margin: 6 ,fontSize:8},
  
});

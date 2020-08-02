import React, { Component } from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Platform, Image } from 'react-native';
import MGHomeScreen from '../Containers/MGHomeScreen.js';
import MGExpenseDescription from '../Containers/MGExpenseDescription.js'
import MGSettings from '../Containers/MGSettings.js'
import MGReport from '../Containers/MGReport.js'
import MGIncomeDescription from '../Containers/MGIncomeDescription.js'
import MGAddCategory from '../Containers/MGAddCategory.js'
import MGEditExpenseList from '../Containers/MGEditExpenseList.js'
import MGExpenseLimit from '../Containers/MGExpenseLimit.js'
import MGViewCategory from '../Containers/MGViewCategory.js'
import MGGenerateReport from '../Containers/MGGenerateReport.js'
const imageSource = {
    settingsDefault: require('../resources/images/expense/icon-setting-nonselect.png'),
    settingsSelected: require('../resources/images/expense/icon-setting-select.png'),
    reportDefault: require('../resources/images/expense/icon-report-nonselect.png'),
    reportSelected: require('../resources/images/expense/icon-report-select.png'),
    expenseDefault: require('../resources/images/expense/icon-expense-nonselect.png'),
    expenseSelected: require('../resources/images/expense/icon-expense-select.png'),
};


const TabBarNavigator = createBottomTabNavigator();

export default class MGTabBarContainer extends Component {
    render() {
        return (<NavigationContainer >
            <TabBarNavigator.Navigator
            >
                <TabBarNavigator.Screen 
                name="Expense"
                 component={expenseStackScreen} />
                <TabBarNavigator.Screen 
                name="Settings" 
                component={settingStackScreen} />
              
                
                

            </TabBarNavigator.Navigator>
        </NavigationContainer>);
    }
}

const TabStyles = StyleSheet.create({
    expenseIcon: {
        ...Platform.select({
            ios: {
                width: 30,
                height: 30
            },
            android: {
                width: 25,
                height: 25
            }
        })
    },
    reportIcon: {
        width: 30,
        height: 30,
    },
    settingsIcon: {
        ...Platform.select({
            ios: {
                width: 30,
                height: 30
            },
            android: {
                width: 25,
                height: 25
            }
        })
    }
});

const TABS = {
    EXPENSE: 0,
    REPORT: 1,
    SETTING: 2
};

const ExpenseStack = createStackNavigator()

function expenseStackScreen() {
    return (
        <ExpenseStack.Navigator
       
        >
            <ExpenseStack.Screen name="MGHomeScreen" component={MGHomeScreen} />
            <ExpenseStack.Screen name="MGExpenseDescription" component={MGExpenseDescription} />
            <ExpenseStack.Screen name="MGEditExpenseList" component={MGEditExpenseList} />
            <ExpenseStack.Screen name="MGIncomeDescription" component={MGIncomeDescription} />

        </ExpenseStack.Navigator>
    );
};
const SettingStack = createStackNavigator()

function settingStackScreen() {
    return (
        <SettingStack.Navigator>
            <SettingStack.Screen name="MGSettings" component={MGSettings} />
            <SettingStack.Screen name="MGAddCategory" component={MGAddCategory} />
            <SettingStack.Screen name="MGExpenseLimit" component={MGExpenseLimit} />
            <SettingStack.Screen name="MGViewCategory" component={MGViewCategory} />
            <SettingStack.Screen name="MGGenerateReport" component={MGGenerateReport} />

        </SettingStack.Navigator>
    );
}


// const ReportStack = createStackNavigator()

// function reportStackScreen() {
//     return (
//         <ReportStack.Navigator
//         screenOptions={{
//             headerShown: false
//           }}>
//             <ReportStack.Screen name="MGReport" component={MGReport} />
//         </ReportStack.Navigator>
//     );
// }



    // MGHomeScreen: {
    //     screen: MGHomeScreen,
    // },
    // MGExpenseDescription: {
    //     screen: MGExpenseDescription,
    //     navigationOptions: {
    //         title: 'Expense Description',
    //         headerStyle: {
    //             backgroundColor: '#48BBEC',
    //           },
    //           headerTitleStyle: {
    //             fontWeight: 'bold',
    //             color:'white',
    //             fontSize:20
    //           },
    //     }
    // },

    // MGEditExpenseList: {
    //     screen: MGEditExpenseList,
    //     navigationOptions: {
    //         title: 'Edit Expense',
    //         headerStyle: {
    //             backgroundColor: '#48BBEC',
    //           },
    //           headerTitleStyle: {
    //             fontWeight: 'bold',
    //             color:'white',
    //             fontSize:20
    //           },
    //     }
    // },
    // MGIncomeDescription: {
    //     screen: MGIncomeDescription,
    //     navigationOptions: {
    //         title: 'Income Description',
    //         headerStyle: {
    //             backgroundColor: '#48BBEC',
    //           },
    //           headerTitleStyle: {
    //             fontWeight: 'bold',
    //             color:'white',
    //             fontSize:20
    //           },
    //     }
    // },



// const SettingStack = createStackNavigator({
//     MGSettings: {
//         screen: MGSettings,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     MGAddCategory: {
//         screen: MGAddCategory,
//         navigationOptions: {
//             title: 'Add Category',
//             headerStyle: {
//                 backgroundColor: '#48BBEC',
//               },
//               headerTitleStyle: {
//                 fontWeight: 'bold',
//                 color:'white',
//                 fontSize:20
//               },
//         }
//     },
//     MGExpenseLimit: {
//         screen: MGExpenseLimit,
//         navigationOptions: {
//             title: 'Expense Limit',
//             headerStyle: {
//                 backgroundColor: '#48BBEC',
//               },
//               headerTitleStyle: {
//                 fontWeight: 'bold',
//                 color:'white',
//                 fontSize:20
//               },
//         }
//     },

//     MGViewCategory: {
//         screen: MGViewCategory,
//         navigationOptions: {
//             title:  'Categories',
//             headerStyle: {
//                 backgroundColor: '#48BBEC',
//               },
//               headerTitleStyle: {
//                 fontWeight: 'bold',
//                 color:'white',
//                 fontSize:20
//               },
//         }
//     },
//     MGGenerateReport: {
//         screen: MGGenerateReport
//     }
// });




// TabNavigator({
//     Expense: {
//         screen: ExpenseStack,
//         navigationOptions: ({ navigation }) => {
//             return {
//                 tabBarLabel: 'Expense',
//                 tabBarIcon: ({ focused }) => (
//                     <Image
//                         source={focused ? imageSource.expenseSelected : imageSource.expenseDefault}
//                         style={TabStyles.expenseIcon}
//                         resizeMode='contain'
//                     />
//                 ),
//                 tabBarOnPress: (tab) => {
//                     if (!tab.focused) {
//                         navigation.dispatch(NavigationActions.popToTop());
//                         tab.jumpToIndex(TABS.EXPENSE);
//                     }
//                 }
//             };
//         }
//     },
//     Report: {
//         screen: MGReport,
//         navigationOptions: ({ navigation }) => {
//             return {
//                 tabBarLabel: 'Report',
//                 tabBarIcon: ({ focused }) => (
//                     <Image
//                         source={focused ? imageSource.reportSelected : imageSource.reportDefault}
//                         style={TabStyles.reportIcon}
//                         resizeMode='contain'
//                     />
//                 ),
//                 tabBarOnPress: (tab) => {
//                     if (!tab.focused) {
//                         navigation.dispatch(NavigationActions.popToTop());
//                         tab.jumpToIndex(TABS.REPORT);
//                     }
//                 }
//             };
//         }
//     },
//     Settings: {
//         screen: SettingStack,
//         navigationOptions: ({ navigation }) => {
//             return {
//                 tabBarLabel: "Settings",
//                 tabBarIcon: ({ focused }) => (
//                     <Image
//                         source={focused ? imageSource.settingsSelected : imageSource.settingsDefault}
//                         style={TabStyles.settingsIcon}
//                         resizeMode='contain'
//                     />
//                 ),
//                 header: null,
//                 tabBarOnPress: (tab) => {
//                     if (!tab.focused) {
//                         navigation.dispatch(NavigationActions.popToTop());
//                         tab.jumpToIndex(TABS.SETTING);
//                     }
//                 }
//             };
//         }
//     }
// }, {
//         tabBarPosition: 'bottom',
//         initialRouteName: 'Expense',
//         order: ['Expense', 'Report', 'Settings'],
//         animationEnabled: false,
//         swipeEnabled: false,
//         tabBarOptions: {
//             upperCaseLabel: false,
//             showIcon: true,
//             tabStyle: {
//                 backgroundColor: '#48BBEC'
//             },
//             labelStyle: {
//                 fontSize: 9,
//                 fontWeight: 'bold',
//                 marginTop: 1,
//                 color: 'black',
//                 alignItems: 'center',
//                 ...Platform.select({
//                     android: {
//                         marginBottom: 20
//                     }

//                 })
//             },
//             style: {
//                 backgroundColor: '#48BBEC',
//                 height: 50
//             }
//         },
//     });
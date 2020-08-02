import React, { Component } from 'react';
import { Header } from 'react-native-elements'
export default class MGHeader extends Component {
    render() {
        return (
            <Header
                placement="left"
                backgroundColor="#48BBEC"
                leftComponent={{  color: '#fff' }}
                centerComponent={{ text: 'Money Guard', style: { color: '#fff',fontSize: 20 } }}
                rightComponent={{  color: '#fff' }}
            />
        );
    }
}
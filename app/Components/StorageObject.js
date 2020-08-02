import Storage from 'react-native-storage';
import { View, Event, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import {AsyncStorage} from   '@react-native-community/async-storage'
export default class StorageObject {
static myInstance = null;
    static getInstance() {
        if (StorageObject.myInstance == null) {
            StorageObject.myInstance = new Storage({
                size: 1000,
            
                storageBackend: AsyncStorage,
            
                defaultExpires: 3556952000,
            
                enableCache: true,
            
                sync: {
                }
            })
        }

        return StorageObject.myInstance;
    }

}
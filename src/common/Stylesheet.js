import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');

const styles= StyleSheet.create({

    YCenter : {
        justifyContent: 'center'
    },

    XCenter : {
        alignItems : 'center'
    } , 

    FlexOne : {
        flex:1
    }
}) 

export default styles; 
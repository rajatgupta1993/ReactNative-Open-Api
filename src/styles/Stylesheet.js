import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');

const styles= StyleSheet.create({

    YCenter : {
        justifyContent: 'center'
    },

    XCenter : {
        alignItems : 'center'
    }, 

    FlexOne : {
        flex:1
    },

    WhiteBg : {
        backgroundColor:'#fff'    
    },

    AppPaddingLeft:{
        paddingLeft:20
    },

    AppPaddingRight:{
        paddingRight:20
    },

    AppPaddingLeftRight:{
        paddingLeft:20,
        paddingRight:20
    },

    AppPaddingTop :{
        paddingTop:20
    }, 
    BoxUnderline : {
        borderColor:'#888',
        borderWidth:2,
        padding :10,
    },

    h3 : {
        fontSize:18,
        fontWeight:'700',
        color:'#333',
    }

}) 

export default styles; 
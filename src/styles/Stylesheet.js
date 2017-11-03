import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    YCenter: {
        justifyContent: 'center'
    },

    XCenter: {
        alignItems: 'center'
    },

    FlexOne: {
        flex: 1
    },

    ScreenWidthHeight: {
        height: height,
        width: width,
    },

    WhiteBg: {
        backgroundColor: '#fff'
    },

     BlackBg: {
        backgroundColor: '#343434'
    },

    AppPaddingLeft: {
        paddingLeft: 20
    },

    AppPaddingRight: {
        paddingRight: 20
    },

    AppPaddingX: {
        paddingHorizontal: 20,
    },

    AppPaddingTop: {
        paddingTop: 20
    },
    BoxUnderline: {
        borderColor: '#000',
        borderWidth: 2,
        padding: 10,
    },

    h3: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },

    ActivityIndicator: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Text12BoldBlack : {
        fontSize:12,
        fontWeight:'500',
        color:'#000'
    },

    Text12BoldWhite : {
        fontSize:12,
        fontWeight:'400',
        color:'#fff'
    }

})

export default styles; 
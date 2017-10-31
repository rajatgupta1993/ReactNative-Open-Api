import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator
} from 'react-native';

// import DetailsHeader from 'src/js/components/detailsHeader';
// import { object, string, func } from 'prop-types';
// import DataTable from 'src/js/components/dataTable';
// import Error from '../error';
import Stylesheet from '../../../styles/Stylesheet'

class UserInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { accessToken: props.accessToken };

        this.handleTokenChng = this.handleTokenChng.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleTokenChng(text) {
        this.setState({ accessToken: text });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.getUserDetails(this.state.accessToken);
    }

    render() {
        const { userData, store, isLoading } = this.props;
        console.log(store);
        console.log(isLoading);
        return (
             <View style={[Stylesheet.AppPaddingLeftRight, Stylesheet.AppPaddingTop, Stylesheet.FlexOne, Stylesheet.WhiteBg]}>
                {(isLoading)? ( <ActivityIndicator
                    animating={true}
                    color='#bc2b78'
                    size="large"
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 80 }}
                />) :(
                        <View style={[Stylesheet.BoxUnderline]}>
                            <Text style={Stylesheet.h3}>Set Access Token </Text>
                            <TextInput
                                style={{ height: 40, marginBottom: 20, marginTop: 10 }}
                                multiline={true}
                                autoGrow={true}
                                selectTextOnFocus={true}
                                placeholder="Paste authorization token here"
                                onChangeText={this.handleTokenChng}
                                value={this.state.accessToken} />

                            <Button style={{}}
                                title="Submit"
                                onPress={this.handleFormSubmit.bind(this)} />
                        </View> )}

                        {(userData != null && userData.ClientKey != null) && (
                            <View style={[Stylesheet.BoxUnderline, { marginTop: 20 }]}>
                                <Text> Login Succesfully </Text>
                            </View>)}
                            
                 
                    </View>
           
                   
        );
}
}

// UserInfo.propTypes = {
//     accessToken: string,
//     userData: object,
//     match: object,
//     getUserDetails: func.isRequired,
// };

// UserInfo.defaultProps = {
//     userData: {},
//     match: {},
// };

//export default bindHandlers(UserInfo);
export default UserInfo;

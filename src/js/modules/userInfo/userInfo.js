import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView
} from 'react-native';

// import DetailsHeader from 'src/js/components/detailsHeader';
 import { object, string, func } from 'prop-types';
// import DataTable from 'src/js/components/dataTable';
 import Error from '../error';
import Stylesheet from '../../../styles/Stylesheet'
import DataTable from '../../components/dataTable'
import ActivityIndicator from '../../components/activityIndicator'

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
            <ScrollView style={[Stylesheet.FlexOne, Stylesheet.WhiteBg]}>
             <View style={[Stylesheet.AppPaddingX, Stylesheet.AppPaddingTop, Stylesheet.FlexOne]}>

                  <Error>
                        Please enter correct access token below.
                   </Error>
                {(isLoading)? ( <ActivityIndicator
                    animating={true}
                    color='#4c4cff'
                    size="large"
                      />) :(
                        <View style={[Stylesheet.BoxUnderline]}>
                            <Text style={Stylesheet.h3}>Set Access Token </Text>
                            <TextInput
                                style={{ height: 40, marginBottom: 20, marginTop: 10 }}
                                multiline={true}
                                //autoGrow={true}
                                selectTextOnFocus={true}
                                placeholder="Paste authorization token here"
                                onChangeText={this.handleTokenChng}
                                value={this.state.accessToken} />

                            <Button style={{}}
                                title="Submit"
                                onPress={this.handleFormSubmit.bind(this)} />
                        </View> )}

                        {(userData != null && userData.ClientKey != null) && (
                            <View style={[Stylesheet.BoxUnderline, { marginTop: 20,height:400}]}>
                                <DataTable data={userData}/>
                            </View>)}
                            
                 
                    </View>
                    </ScrollView>
           
                   
        );
}
}

UserInfo.propTypes = {
    accessToken: string,
    userData: object,
    getUserDetails: func.isRequired,
};

// UserInfo.defaultProps = {
//     userData: {},
//     match: {},
// };

//export default bindHandlers(UserInfo);
export default UserInfo;

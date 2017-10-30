import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,  
  TextInput, 
} from 'react-native';

// import DetailsHeader from 'src/js/components/detailsHeader';
// import { object, string, func } from 'prop-types';
// import DataTable from 'src/js/components/dataTable';
// import Error from '../error';

class UserInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { accessToken: props.accessToken };
    }

    handleTokenChng(event) {
        this.setState({ accessToken: event.target.value });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.getUserDetails(this.state.accessToken);
    }

    render() {
        return (
            
            <TextInput
                 style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                 placeholder="Paste authorization token here"
                 onChangeText={this.handleTokenChng}
                 value={this.state.accessToken} 
            />
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

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,   
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
         

            <Text> Add Token 1</Text>
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

import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, } from 'native-base';
import * as queries from './queries';
import { object } from 'prop-types';
import Error from '../error';
import ActivityIndicator from '../../components/activityIndicator';
import Stylesheet from '../../../styles/Stylesheet';
import InstrumentRow from './instrumentRow';
const { width, height } = Dimensions.get('window');


class searchInstrument extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            instrumentSearchResult: []
        }
    }
    onSearchTextChange(text) {
        console.log(text);
        this.setState({ searchTerm: text });
        if (text.length <= 1) {
            this.setState({ instrumentSearchResult: [] })
        } else {
            queries.fetchInstrumentsByKeyword(text, this.props, (response) => {
                console.log(response);
                this.setState({
                    instrumentSearchResult: response.Data
                })
            });
        }



    }

    render() {
        console.log("props in searchInstrument", this.props);
        return (

            <Container style={{flex:1}}>

                <View style={{ backgroundColor: '#888', padding: 10 }}>
                    <Item style={{ backgroundColor: '#444', paddingHorizontal: 5 }}>
                        <Icon name="ios-search" />
                        <Input placeholder="Search"
                            onChangeText={this.onSearchTextChange.bind(this)}
                            value={this.state.searchTerm}
                            style={{ color: '#fff', height: 40, marginTop: 2 }} />
                        <Icon name="md-close"
                            onPress={() => this.setState({ searchTerm: '', instrumentSearchResult: [] })} />
                    </Item>
                </View>

                {(this.props.isLoading) ? (
                    <ActivityIndicator 
                        animating={true}
                        color='#4c4cff'
                        size="large"
                    />) : (
                        <ScrollView style={{ flex: 1 }}>
                            {(this.state.instrumentSearchResult.length !== 0) ? (<View style={{ flex: 1 }}>
                                <InstrumentRow
                                    data={this.state.instrumentSearchResult} />
                            </View>) :
                                (<View style={{height:height-60, flex: 1 ,backgroundColor:'#444',justifyContent:'center', alignItems:'center'}}>
                                    <Icon name= "md-search"/>
                                    <Text style={{fontSize:16, fontFamily:'roboto'}}> Find Instrument </Text>
                                </View>)}
                        </ScrollView>)}
            </Container>

        );
    }
}



//export default bindHandlers(Orders);
export default searchInstrument
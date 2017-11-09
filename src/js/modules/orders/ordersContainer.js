import { connect } from 'react-redux';
import * as errorActions from '../error/actions';
import * as loaderActions from '../loader/actions';
import Orders from './orders';

// this module handles detail page which has child routing for other modules
// like introduction, ref, portfolio and other, so store is attached here and
// passed down as props to other modules
const mapStateToProps = (store, props) => {
   // console.log('props in test4', props);
    return {
        ...props.navigation.state.params
    };
};

// using withRouter to fix the issue of react-router-dom v4 not working with the redux container 
export default connect(mapStateToProps)(Orders);

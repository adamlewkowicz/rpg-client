import { bindActionCreators } from 'redux';
import actions from './actions';

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  dispatch
});
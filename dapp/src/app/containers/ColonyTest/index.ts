import { connect } from 'react-redux'
import { ColonyTest } from "../../components/ColonyTest";
import { setColonyAddress, fetchDomainCount } from "../../actions/colony";

function mapStateToProps(state: any) {
    return {
      count: state.colony.domainCount
    };
  }
  
  function mapDispatchToProps(dispatch: any) {
    return {
      setAddress: (address: string) => dispatch(setColonyAddress(address)),
      getCount: () => dispatch(fetchDomainCount())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ColonyTest);
  
  
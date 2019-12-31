import { connect } from 'dva'
import Redirect from 'umi/redirect'
const privateroute = ({ isLogin, children }) => {
    if (isLogin) {
        return (
            <>
            {children}
            </>
        )
    } else {
        <Redirect to='/login'></Redirect>
    }

}


export default connect(
    ({ login }) => {
        return {
            isLogin: login.isLogin
        }
    },
    () => {

    }
)(privateroute) 
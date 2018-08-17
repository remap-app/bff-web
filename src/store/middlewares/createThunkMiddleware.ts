import thunk from 'redux-thunk'
import api from '../../api'
const createThunkMiddleware = () => thunk.withExtraArgument({ api })
export default createThunkMiddleware
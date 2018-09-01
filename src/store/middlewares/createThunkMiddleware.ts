import thunk from 'redux-thunk'
import api from '../../api'
import auth from '../../auth'
const createThunkMiddleware = () => thunk.withExtraArgument({ api, auth })
export default createThunkMiddleware

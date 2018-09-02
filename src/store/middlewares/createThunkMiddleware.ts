import thunk from 'redux-thunk'
import api from '../../api'
import auth from '../../auth'
import cookies from '../../cookies'

const createThunkMiddleware = () => thunk.withExtraArgument({ api, auth, cookies })

export default createThunkMiddleware

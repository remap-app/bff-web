import { createBrowserHistory, createMemoryHistory, History } from 'history'
import { isServer } from '../helpers'
const history: History = isServer ? createMemoryHistory() : createBrowserHistory()
export default history

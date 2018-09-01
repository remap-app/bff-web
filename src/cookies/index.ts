import Cookies = require('universal-cookie')

const cookies = new (Cookies.default || Cookies)() // FIXME

export default cookies

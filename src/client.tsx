import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Root } from './containers/Root'

interface IInitialData {
  restaurants: any;
}

const el = document.getElementById('initial-data')
let attr
let initialData: IInitialData
if (el) {
  attr = el.getAttribute('data-json')
}
if (attr) {
  initialData = JSON.parse(attr)
}

const main = () => {
  ReactDOM.hydrate(
    <Root {...initialData} />,
    document.getElementById('app')
  )
}

main()

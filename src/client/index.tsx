import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '../routes/Routes'

const main = () => {
  ReactDOM.hydrate(
    <BrowserRouter><Routes /></BrowserRouter>,
    document.getElementById('app')
  )
}

main()

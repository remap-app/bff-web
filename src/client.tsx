import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root } from './containers/Root';

const main = () => {
  ReactDOM.hydrate(
    <Root />,
    document.getElementById('app')
  )
}

main()

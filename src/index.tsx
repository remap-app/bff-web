import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root } from './containers/Root';

const main = () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div'))
  )
}

main()

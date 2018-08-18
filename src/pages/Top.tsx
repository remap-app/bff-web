import * as React from 'react'
import { connect } from 'react-redux'
import { App, IProps as IAppProps} from '../components/App'
import { IState } from '../reducer'

export interface IProps extends IAppProps {}

const Top = (props: IProps): JSX.Element => {
  return (
    <App restaurants={props.restaurants} />
  )
}

export default connect(
  (state: IState) => ({ restaurants: state.restaurants.data })
)(Top)

import * as React from 'react'
import { withStyle } from 'styledux'
import AppBar from '@material-ui/core/AppBar'
import { LocationDetect } from '../LocationDetect'
import * as s from './index.css'

export interface IProps {
  onLocationDetect: () => void
}

export const GlobalHeader = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <AppBar color='primary' className={s.root}>
      <LocationDetect onClick={props.onLocationDetect} />
    </AppBar>
  )
})

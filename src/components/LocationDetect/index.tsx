import * as React from 'react'
import { withStyle } from 'styledux'
import { Button } from '@material-ui/core'
import LocationOn from '@material-ui/icons/LocationOn'
import classnames from 'classnames'
import * as s from './index.css'

export interface IProps {
  onClick: () => void;
  className?: string;
}

export const LocationDetect = withStyle(s)((props: IProps):JSX.Element => {
  return (
    <Button variant='fab' color='secondary' onClick={props.onClick} className={classnames(s.root, props.className)}>
      <LocationOn color='primary' />
    </Button>
  )
})
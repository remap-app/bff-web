import * as React from 'react'
import { withStyle } from 'styledux'
import Grid from '@material-ui/core/Grid'
import classnames from 'classnames'
import * as s from './index.css'

export interface IProps {
  className?: string;
  children: React.ReactNode;
}

export const GridVerticalCenter = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <Grid className={classnames(s.root, props.className)} container alignItems='center' justify='center'>
      {props.children}
    </Grid>
  )
})

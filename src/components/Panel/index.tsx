import * as React from 'react'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import * as s from './index.css'

export interface IProps {
  className?: string;
  children: React.ReactNode;
}

export const Panel = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <div className={classnames(s.root, props.className)}>
      {props.children}
    </div>
  )
})

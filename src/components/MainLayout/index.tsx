import * as React from 'react'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import * as s from './index.css'

export interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <div className={classnames(s.root, props.className)}>
      {props.children}
    </div>
  )
})

import * as React from 'react'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import * as s from './index.css'

export interface IProps {
  component?: React.ComponentClass;
  className?: string;
}

export const MediaPlaceholder = withStyle(s)((props: IProps): JSX.Element => {
  const { component: Component = 'div', className, ...rest } = props
  return (
    <Component className={classnames(s.root, className)} {...rest}>
      <VisibilityOff className={s.icon} />
    </Component>
  )
})

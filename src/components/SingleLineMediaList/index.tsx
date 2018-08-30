import * as React from 'react'
import { withStyle } from 'styledux'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import classnames from 'classnames'
import * as s from './index.css'

export interface IProps {
  images: string[];
  className?: string;
}

export const SingleLineMediaList = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <div className={classnames(s.root, props.className)}>
      <GridList>
        {props.images.map(src => {
          return (
            <GridListTile key={src}>
              <img src={src} />
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  )
})

import * as React from 'react'
import { withStyle } from 'styledux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Linkify from 'react-linkify'
import { pick } from 'lodash'
import classnames from 'classnames'
import { IData as IRestaurant } from '../../modules/restaurant'
import * as s from './index.css'

export interface IProps {
  restaurant: IRestaurant;
  className?: string;
}

const nameMap: { [key: string]: string } = {
  name: '店名',
  name_kane: 'よみ',
  url: 'URL',
  url_mobile: 'モバイル URL',
  coupon_url: 'クーポン URL',
  tel: 'TEL',
  opening_times: '営業時間',
  access: 'アクセス',
  holiday: '定休日',
  credit_card: 'クレジットカード',
  non_smoking: '禁煙',
  lunch: 'ランチ',
  children: 'お子様',
}

export const ResturantInfo = withStyle(s)((props: IProps): JSX.Element => {
  const data = pick(props.restaurant, Object.keys(nameMap))
  return (
    <Paper className={classnames(s.root, props.className)}>
      <Table>
        <TableBody>
          {Object.entries(data).map(([key, val]) => {
            return (
              <TableRow key={key}>
                <TableCell component='th' scope='row'>
                  {nameMap[key]}
                </TableCell>
                <TableCell>{typeof val === 'object' && val !== null
                  ? Object.values(val).map((v: string) => <div key={v}><Linkify>{v}</Linkify></div>)
                  : <Linkify>{val}</Linkify>
                }</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
})
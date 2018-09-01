import * as React from 'react'
import { withStyle } from 'styledux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { LocationDetect } from '../LocationDetect'
import * as s from './index.css'

export interface IProps {
  onLocationDetect: () => void
}

export const GlobalHeader = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <AppBar color='primary' className={s.root} position='static'>
      <Toolbar>
        <LocationDetect onClick={props.onLocationDetect} />
        <IconButton color='inherit' aria-label='Menu'>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
})

// {auth && (
//   <div>
//     <IconButton
//       aria-owns={open ? 'menu-appbar' : null}
//       aria-haspopup="true"
//       onClick={this.handleMenu}
//       color="inherit"
//     >
//       <AccountCircle />
//     </IconButton>
//     <Menu
//       id="menu-appbar"
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={open}
//       onClose={this.handleClose}
//     >
//       <MenuItem onClick={this.handleClose}>Profile</MenuItem>
//       <MenuItem onClick={this.handleClose}>My account</MenuItem>
//     </Menu>
//   </div>
// )}
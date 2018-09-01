import * as React from 'react'
import { withStyle } from 'styledux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import { LocationDetect } from '../LocationDetect'
import { IData as IUser } from '../../modules/auth'
import * as s from './index.css'

export interface IProps {
  onLocationDetect: () => void;
  onSignout: () => void;
  onSignin: () => void;
  user: IUser;
  signedIn: Boolean;
}

interface IState {
  anchorEl?: HTMLElement | null;
}

export const GlobalHeader = withStyle(s)(
  class extends React.Component<IProps, IState> {
    state = { anchorEl: null }

    handleSignout = () => {
      this.closeMenu()
      this.props.onSignout()
    }

    handleSignin = () => {
      this.props.onSignin()
    }

    handleClose = () => {
      this.closeMenu()
    }
    handleMenu = (event: any) => { // TODO
      this.setState({ anchorEl: event.currentTarget })
    }

    closeMenu() {
      this.setState({ anchorEl: null })
    }

    render(): JSX.Element {
      const opened: boolean = Boolean(this.state.anchorEl)

      return (
        <AppBar color='primary' className={s.root} position='static'>
          <Toolbar className={s.toolbar}>
            {/* <IconButton color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton> */}
            <div className={s.locContainer}><LocationDetect onClick={this.props.onLocationDetect} /></div>
            {this.props.signedIn ? (
              <div>
                <IconButton
                  color='inherit'
                  aria-owns={opened ? 'menu-appbar' : undefined}
                  aria-label='Menu'
                  onClick={this.handleMenu}
                >
                  <Avatar alt={this.props.user.displayName} src={this.props.user.photoURL}>
                    {this.props.user.displayName ? this.props.user.displayName.slice(0, 1) : null}
                  </Avatar>
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={opened}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleSignout}>Sign out</MenuItem>
                </Menu>
              </div>
            ) : <Button onClick={this.handleSignin} color='inherit'>Sign in</Button>}
          </Toolbar>
        </AppBar>
      )
    }
  }
)

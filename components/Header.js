import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from '../routes'
const Header = () => {
  return (
    <Menu style={{ marginTop: '10px', backgroundColor: '' }}>
      <a
        href={'https://morgancsit.github.io/lba-frontend/index.html'}
        className="item"
      >
        <Icon name="home" color="" />
        Home
      </a>
      <Link route="/">
        <a className="item">
          <Icon name="th list" color="" />
          Channels
        </a>
      </Link>
    </Menu>
  )
}

export default Header

import React from "react";
import { Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item>Tripify</Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>Trips</Menu.Item>
        <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;

import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">{/* <a href="/">메인</a> */}</Menu.Item>
      <SubMenu title={<span>마스터 관리</span>}>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;

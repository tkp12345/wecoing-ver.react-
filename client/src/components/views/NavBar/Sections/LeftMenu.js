import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      {/* <a href="/">메인</a> */}
    </Menu.Item>
    <SubMenu title={<span>마스터 관리</span>}>
      {/* <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">준비중</Menu.Item>
        <Menu.Item key="setting:2">준비중</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">준비중</Menu.Item>
        <Menu.Item key="setting:4">준비중</Menu.Item>
      </MenuItemGroup> */}
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu
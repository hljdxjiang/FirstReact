import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { VideoCameraOutlined } from "@ant-design/icons";
import * as menudata from "../../router/allMenus";
// {
//       key: "/app/ui",
//       title: "UI",
//       icon: "scan",
//       subs: [
//         { key: "/app/ui/buttons", title: "按钮", component: "Buttons" },
//         { key: "/app/ui/icons", title: "图标", component: "Icons" },
//         { key: "/app/ui/spins", title: "加载中", component: "Spins" },
//         { key: "/app/ui/modals", title: "对话框", component: "Modals" },
//         {
//           key: "/app/ui/notifications",
//           title: "通知提醒框",
//           component: "Notifications",
//         },
//         { key: "/app/ui/tabs", title: "标签页", component: "Tabs" },
//         { key: "/app/ui/banners", title: "轮播图", component: "Banners" },
//         { key: "/app/ui/wysiwyg", title: "富文本", component: "WysiwygBundle" },
//         { key: "/app/ui/drags", title: "拖拽", component: "Drags" },
//         { key: "/app/ui/gallery", title: "画廊", component: "Gallery" },
//         { key: "/app/ui/map", title: "地图", component: "MapUi" },
//       ],
//     }
const renderIcon = (key) => {
  return <VideoCameraOutlined />;
};
const renderMenu = (item) => {
  return (
    <Menu.Item key={item.key}>
      <Link to={item.key}>
        {renderIcon(item.icon)}
        <span>{item.title}</span>
      </Link>
    </Menu.Item>
  );
};
const renderSubMenu = (item) => {
  return (
    <Menu.SubMenu
      key={item.key}
      title={
        <span>
          {renderIcon(item.icon)}
          <span>{item.title}</span>
        </span>
      }
    >
      {item.children.map((subitem) => renderMenu(subitem))}
    </Menu.SubMenu>
  );
};

class Menus extends React.Component {
  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {menudata.default.menus.map((item) => {
          return item.children ? renderSubMenu(item) : renderMenu(item);
        })}
      </Menu>
    );
  }
}

export default Menus;

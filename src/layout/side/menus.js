import React from "react";
import { Menu, message } from "antd";
import { Link } from "react-router-dom";
import { VideoCameraOutlined } from "@ant-design/icons";
import axios from "../../commons/ajax";
import { getUserID } from "../../commons/localstore";
import { adminuser } from "../../commons";
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

class Menus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auths: [],
    };
  }
  hasSubMenus = (item) => {
    if (getUserID() === adminuser) {
      return true;
    }
    if (this.hasMenus(item)) {
      return true;
    } else {
      item.children &&
        Array.from(item.children).map((sitem) => {
          if (this.hasMenus(sitem)) {
            return true;
          }
        });
    }
    return false;
  };
  hasMenus = (orgmenu) => {
    if (getUserID() === adminuser) {
      return true;
    }
    var rs = Array.from(this.state.auths).find(
      (item) => item.funcid === orgmenu.key && item.ftype === "0"
    );
    if (rs) {
      return true;
    }
    return false;
  };
  renderIcon = (key) => {
    return <VideoCameraOutlined />;
  };
  renderMenu = (item) => {
    return this.hasMenus(item) ? (
      <Menu.Item key={item.key}>
        <Link to={item.key}>
          {this.renderIcon(item.icon)}
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    ) : (
      ""
    );
  };
  renderSubMenu = (item) => {
    return this.hasSubMenus(item) ? (
      <Menu.SubMenu
        key={item.key}
        title={
          <span>
            {this.renderIcon(item.icon)}
            <span>{item.title}</span>
          </span>
        }
      >
        {item.children.map((subitem) => this.renderMenu(subitem))}
      </Menu.SubMenu>
    ) : (
      ""
    );
  };

  componentWillMount() {
    this.init();
  }
  async init() {
    let auths = await this.getAuths();
    if (auths === null || auths === undefined) {
      auths = [];
    }
    await this.setState({ auths: auths });
  }
  getAuths = () => {
    return axios
      .get("/api/auth/getauths")
      .then(async (response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              return response.data.result;
            } else {
              message.warning(response.data.message, 3);
            }
          } else {
            message.warning("数据初始化异常，请于管理员联系", 3);
          }
        } else {
          message.warning("服务器连接异常，请与管理员联系", 3);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {menudata.default.menus.map((item) => {
          return item.children
            ? this.renderSubMenu(item)
            : this.renderMenu(item);
        })}
      </Menu>
    );
  }
}

export default Menus;

export default {
  menus: [
    // 菜单相关路由
    {
      key: "/index/dashboard/index",
      title: "首页",
      icon: "mobile",
      component: "Dashboard",
    },
    {
      title: "订单管理",
      icon: "scan",
      key: "order",
      children: [
        {
          key: "/index/OrderQuery",
          title: "订单查询",
          icon: "scan",
          component: "OrderQuery",
        },
        {
          key: "/index/NewOrder",
          title: "创建订单",
          icon: "scan",
          component: "NewOrder",
        },
      ],
    },
    {
      title: "课程管理",
      icon: "scan",
      key: "course",
      children: [
        {
          key: "/index/Subjects",
          title: "学科管理",
          component: "Subjects",
        },
        {
          key: "/index/CourseManager",
          title: "课程管理",
          component: "CourseManager",
        },
      ],
    },
    {
      title: "用户权限",
      icon: "scan",
      key: "user",
      children: [
        {
          key: "/index/user",
          title: "用户管理",
          component: "UserManager",
        },
        {
          key: "/index/auth",
          title: "权限管理",
          component: "RoleManager",
        },
      ],
    },
  ],
  others: [], // 非菜单相关路由
};

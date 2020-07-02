export default {
  routers: [
    // 菜单相关路由
    {
      key: "/index/dashboard/index",
      name: "首页",
      component: "Dashboard",
    },
    {
      key: "/index/OrderQuery",
      name: "订单查询",
      component: "OrderQuery",
    },
    {
      key: "/index/Subjects",
      name: "学科管理",
      component: "Subjects",
    },
    {
      key: "/index/CourseManager",
      name: "课程管理",
      component: "CourseManager",
    },
    {
      key: "/index/CourseEdit",
      name: "课程管理",
      component: "EditMain",
    },
    {
      key: "/index/NewOrder",
      name: "创建订单",
      component: "NewOrder",
    },
    {
      key: "/index/user",
      name: "用户管理",
      component: "UserManager",
    },
    {
      key: "/index/auth",
      name: "权限管理",
      component: "RoleManager",
    },
  ],
  others: [], // 非菜单相关路由
};

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
          key: "/index/OrderType",
          title: "学科管理",
          component: "OrderType",
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
    {
      title: "销售线索",
      icon: "scan",
      key: "salesleads",
      children: [
        {
          key: "/index/mysales",
          title: "我的客户",
          component: "MySales",
        },
        {
          key: "/index/publicpond",
          title: "公海数据",
          component: "PublicPond",
        },
        {
          key: "/index/OrderQuery",
          title: "订单查询",
          component: "OrderQuery",
        },
        {
          key: "/index/allocate",
          title: "数据分配",
          component: "Allocate",
        },
        {
          key: "/index/datasetting",
          title: "数据规则设置",
          component: "DataSetting",
        },
      ],
    },
    {
      title: "OA办公",
      icon: "scan",
      key: "office",
      children: [
        {
          key: "/index/attendance",
          title: "考勤信息",
          component: "Attendance",
        },
        {
          key: "/index/expense",
          title: "报销申请",
          component: "Expense",
        },
        {
          key: "/index/offwork",
          title: "请假申请",
          component: "Offwork",
        },
      ],
    },
    {
      title: "系统设定",
      icon: "scan",
      key: "system",
      children: [
        {
          key: "/index/parameter",
          title: "系统参数",
          component: "Parameter",
        },
        {
          key: "/index/process",
          title: "流程编辑",
          component: "Process",
        },
        {
          key: "/index/notice",
          title: "公告管理",
          component: "Notice",
        },
      ],
    },
  ],
  others: [], // 非菜单相关路由
};

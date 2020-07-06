export default {
  authdata: [
    {
      key: "order_manager",
      title: "订单权限",
      children: [
        {
          key: "order_export",
          title: "订单导出",
        },
        {
          key: "order_showmobile",
          title: "查看手机号",
        },
        {
          key: "order_query_groups",
          title: "查询本组订单",
        },
        {
          key: "order_query_all",
          title: "查询全部订单",
        },
      ],
    },
    {
      key: "subject_manager",
      title: "科目管理",
      children: [
        {
          key: "create_subject",
          title: "创建科目",
        },
        {
          key: "edit_subject",
          title: "修改科目",
        },
      ],
    },
    {
      key: "course_manager",
      title: "课程管理",
      children: [
        {
          key: "add_course",
          title: "创建科目",
        },
        {
          key: "edit_course",
          title: "修改科目",
        },
      ],
    },
    {
      key: "user_manager",
      title: "用户管理",
      children: [
        {
          key: "add_user",
          title: "创建用户",
        },
        {
          key: "edit_user",
          title: "修改用户",
        },
        {
          key: "create_group",
          title: "创建分组",
        },
        {
          key: "del_group",
          title: "删除分组",
        },
        {
          key: "edit_group",
          title: "修改分组",
        },
      ],
    },
    {
      key: "auth_manager",
      title: "角色管理",
      children: [
        {
          key: "delete_auth",
          title: "删除角色",
        },
        {
          key: "create_auth",
          title: "创建角色",
        },
        {
          key: "edit_auth",
          title: "修改角色",
        },
      ],
    },
  ],
};

myApp.controller('AccordionDemoCtrl', function ($scope, $state, $http) {
  $scope.oneAtATime = true;
  $scope.groups = [{
      title: '信息管理',
      content: [{
          a: "公司列表",
          url: 'backstagpe.details'
        },
        {
          a: "职位列表",
          url: 'backstagpe.details'
        },

      ],
      open: false,
    },
    {
      title: '内容管理',
      content: [{
        a: 'Article列表',
        url: 'backstagpe.list'
      }, ],
      open: false,
    },
    {
      title: '后台管理',
      content: [{
          a: '账号管理',
          url: 'backstagpe.details'
        },
        {
          a: '角色管理',
          url: 'backstagpe.details'
        },
        {
          a: '修改管理',
          url: 'backstagpe.details'
        },
        {
          a: '模块管理',
          url: 'backstagpe.details'
        },

      ],
      open: false,
    }
  ];
  //风琴菜单状态保存
  $scope.clickopen = function (index) {
    //保存一个数据
    sessionStorage.setItem("session", index)
  }
  if (window.sessionStorage.getItem("session")) {
    session = parseInt(window.sessionStorage.getItem("session"))
    $scope.groups[session].open = true;
  }
  //侧边栏高亮
  $scope.clickclass = function (x, y) {
    //父级索引for循环
    for (let r = 0; r < $scope.groups.length; r++) {
      //子级索引for循环
      for (let i = 0; i < $scope.groups[r].content.length; i++) {
        $scope.groups[r].content[i].isOrgancolor1 = false;
      }
    }
    $scope.groups[x].content[y].isOrgancolor1 = true;
    sessionStorage.setItem("sessionx", x)
    sessionStorage.setItem("sessiony", y)
  }
  sessionx = window.sessionStorage.getItem("sessionx")
  sessiony = window.sessionStorage.getItem("sessiony")
  if (sessionx !== null && sessiony !== null) {
    $scope.groups[sessionx].content[sessiony].isOrgancolor1 = true;
  }

  //退出
  $scope.quitclick = function () {
    $http({
      method: "post",
      url: "/carrots-admin-ajax/a/logout",
    }).then(function (res) {
      if (res.data.code == 0) {
        sessionStorage.removeItem("sessiony")
        sessionStorage.removeItem("sessionx")
        sessionStorage.removeItem("session")
        $state.go("loginPage")
      }
    })
  }
});
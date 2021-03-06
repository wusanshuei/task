myApp.controller('loginCtrl', function ($scope, $http, $state, $timeout,$location) {
    //$on用于接收event与data，$on接受数据
    // $scope.$on('$locationChangeStart', function (event, next, current) {
    //     //preventDefault() 方法阻止元素发生默认的行为
    //     event.preventDefault();
    // });
    var pathUrl = $location.path() 
    if (pathUrl == "/loginPage") {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    }
    $scope.loginSubmit = function () {
        //发送请求验证用户名密码+++
        // $http.post('/carrots-admin-ajax/a/login', 'name=' + $scope.username + '&pwd=' + $scope.password, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // .then(function successCallback(xhr) {
        // console.log('success code:' + xhr.data.code + '-message:' + xhr.data.message);
        // }, function errorCallback(xhr) {
        // console.log('connection error');
        // });
        $http({
                method: 'POST',
                url: '/carrots-admin-ajax/a/login',
                data: 'name=' + $scope.username + '&pwd=' + $scope.password,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (xhr) {
                    console.log(xhr)
                    if (xhr.data.code == 0) {
                        $scope.showTxt = false;
                        $scope.over = false;
                        $scope.overs = false;
                        $state.go('backstagpe.text');
                    } else if (xhr.data.code == -5003) {
                        $scope.over = true;
                        $scope.message = xhr.data.message;
                        console.log($scope.message)
                        //提示行显示+++
                        $scope.showTxt = true;
                        //延迟显示提示行+++
                        $scope.timeout = $timeout(function () {
                            $scope.showTxt = false;
                            $scope.over = false;
                        }, 1000);
                    } else {
                        $scope.overs = true;
                        $scope.message = xhr.data.message;
                        console.log($scope.message)
                        //提示行显示+++
                        $scope.showTxt = true;
                        //延迟显示提示行+++
                        $scope.timeout = $timeout(function () {
                            $scope.showTxt = false;
                            $scope.overs = false;
                        }, 1000);
                    }
                    console.log('登录系统正常');
                }
                //第一个是post成功的函数，这个则是post失败的函数
                ,
                function (xhr) {
                    console.log('登录系统异常，请检查相关设置');
                });
    }
});
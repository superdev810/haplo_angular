angular.module('ustadium', [
  // login service
  'loginService',
  'ustadium.mock',
  'ustadium.directives',

  // different app sections
  'ustadium.home',
  'ustadium.feeds',
  'ustadium.users',
  'ustadium.pages',
  'ustadium.error',
  'ustadium.constants',
  'ustadium.restapi',
  'ustadium.menuservice',

  // components
  'ngAnimate',
  'toastr',
  'ui-notification',
  'ui.bootstrap',
  '720kb.socialshare'
])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  })
  // .config(['$httpProvider', function ($httpProvider) {
  //   // $httpProvider.interceptors.push('delayHTTP');
  //   $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
  //     return {
  //       'request': function (config) {
  //         config.headers = config.headers || {};
  //         if (localStorage.getItem('userToken')) {
  //           config.headers.Authorization = 'Bearer ' + localStorage.getItem('userToken');
  //           config.headers['Content-Type'] = 'application/json';
  //         }
  //         return config;
  //       },
  //       'responseError': function(response) {
  //         if(response.status === 401 || response.status === 403) {
  //           // $location.path('/signin');
  //         }
  //         return $q.reject(response);
  //       }
  //     };
  //   }]);
  // }])
  .config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 50,
      horizontalSpacing: 50,
      positionX: 'right',
      positionY: 'top'
    });
  })
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .run(function ($rootScope, $window, menuService) {
    $rootScope.socialShare = {
      appId: '2231777543',
      title:'ustadium',
      description: '',
      siteName: 'ustadium web app',
      url: 'https://ustadium-webapp.herokuapp.com',
      image: 'http://ustadium-media.s3.amazonaws.com/content/feed/83/679440c47511e69db3ad3abdce3545/master.jpg',
      type: 'website'
    }
    // google analytics
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      var realURL = toState.url;
      if (!!$window.ga) {
        // resolves variables inside urls, ex: /error/:error in /error/unauthorized
        for (var v in toParams) {
          realURL = realURL.replace(':' + v, toParams[v]);
        }
        $window.ga('send', 'pageview', realURL);
      }
    });
    /**
     * $rootScope.doingResolve is a flag useful to display a spinner on changing states.
     * Some states may require remote data so it will take awhile to load.
     */
    var resolveDone = function () { $rootScope.doingResolve = false; };
    $rootScope.doingResolve = false;

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.doingResolve = true;
    });
    $rootScope.$on('$stateChangeSuccess', resolveDone);
    $rootScope.$on('$stateChangeError', resolveDone);
    $rootScope.$on('$statePermissionError', resolveDone);

    // add menu list on topbar
    menuService.addMenuItem('topbar', {
      title: 'Register',
      state: 'app.register',
      roles: ['*'],
      position: 5
    });

    menuService.addMenuItem('topbar', {
      title: 'Feeds',
      state: 'app.feeds',
      type: 'dropdown',
      roles: ['*'],
      position: 0
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'app.feeds', {
      title: 'Hot',
      state: 'app.feeds',
      params: '{type: "Hot"}',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'app.feeds', {
      title: 'New',
      state: 'app.feeds',
      params: '{type: "New"}',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'app.feeds', {
      title: 'Subscribed',
      state: 'app.feeds',
      params: '{type: "Subscribed"}',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'app.feeds', {
      title: 'Created',
      state: 'app.feeds',
      params: '{type: "Created"}',
      roles: ['*']
    });

  })
  .controller('BodyController', function ($scope, $rootScope, $state, $stateParams, loginService, $http, $timeout, $uibModal, $log, menuService) {

    var vm = this;
    // Initial menuService
    // vm.accountMenu = menuService.getMenu('account').items[0];
    $scope.authentication = {
      user: {
        roles: '*'
      }
    }
    $scope.menu = menuService.getMenu('topbar');
    console.log($scope.menu);
    console.log('Menu View Flag: ', $scope.menu.shouldRender($scope.authentication.user));
    // Expose $state and $stateParams to the <body> tag
    $scope.$state = $state;
    $scope.$stateParams = $stateParams;

    // loginService exposed and a new Object containing login user/pwd
    $scope.ls = loginService;

    $scope.login = {
      working: false,
      wrong: false,
      errMsg: ''
    };

    $scope.loginMe = function () {
      // setup promise, and 'working' flag
      console.log($scope.login);
      var loginPromise = $http.post(base + '/auth/token', $scope.login);
      $scope.login.working = true;
      $scope.login.wrong = false;

      var userInfo = loginService.loginUser(loginPromise);
      console.log('User INFO: ', userInfo);

      loginPromise.catch(function (err) {
        console.log(err);
        $scope.login.wrong = true;
        $scope.login.errMsg = err.data.data.message;
        var errCode = err.data.code;

        $timeout(function () {
          $scope.login.wrong = false;
          if(errCode == "002"){
            $scope.login.email = err.data.data.data.userEmail;
            $scope.open();
          }
        }, 3000);
      });
      loginPromise.finally(function () {
        $scope.login.working = false;
      });
    };

    $rootScope.$on('VERIFY_CALLBACK', $scope.verifyCallback);

    $scope.verifyCallback = function (verifyPromise) {
      console.log('Verify Callback');
      $scope.login.working = true;
      $scope.login.wrong = false;

      var userInfo = loginService.loginUser(verifyPromise);

      verifyPromise.catch(function (err) {
        console.log(err);
        $scope.login.wrong = true;
        $scope.login.errMsg = err.data.data.message;
        var errCode = err.data.code;

        $timeout(function () {
          $scope.login.wrong = false;
        }, 3000);
      });
      verifyPromise.finally(function () {
        $scope.login.working = false;
      });
    }

    $scope.logoutMe = function () {
      loginService.logoutUser();
      $scope.login.working = false;

    };

    $scope.forgetPassword =function (size) {
      var forgotInstance = $uibModal.open({
        templateUrl: 'forgotPassword.html',
        controller: ForgotPasswordCtrl,
        size: size,
        resolve: {
          forgot: function () {
            return $scope.login;
          }
        }
      })
    }

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: ModalInstanceCtrl,
        size: size,
        resolve: {
          login: function () {
            return $scope.login;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  });

// Verify Modal Controller
var ModalInstanceCtrl = function ($scope, $rootScope, $uibModalInstance, login, Authentication, loginService) {

  $scope.send = function () {
    verifyParams = {
      verifyCode: $scope.verifyCode,
      email: login.email
    }
    // call verify rest api
    console.log('Verify Params: ', verifyParams);
    var verifyPromise = Authentication.verify(verifyParams);

    // Send Broadcast with verify promise
    // $rootScope.$broadcast('VERIFY_CALLBACK', verifyPromise);

    // close the modal
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};

// Forgot Password Controller
var ForgotPasswordCtrl = function ($scope, $rootScope, $uibModalInstance, forgot, Authentication, loginService, Notification) {

  $scope.fp = forgot;
  $scope.fp.reset = false;

  $scope.sendForgotPassword = function () {
    var forgotParams = {
      username: $scope.fp.username,
      phone: $scope.fp.phone,
      email: $scope.fp.email?$scope.fp.email:null
    }
    // call verify rest api
    console.log('Forgot Params: ', forgotParams);
    var forgotPromise = Authentication.forgotPassword(forgotParams);
    forgotPromise.then(function (success) {
      console.log(success);
      $scope.fp.reset = true;
    }, function (err) {
      console.log(err);
      Notification.error({message: err.statusText, delay: 5000});
    })

    // Send Broadcast with verify promise
    // $rootScope.$broadcast('VERIFY_CALLBACK', verifyPromise);

    // close the modal
    // $uibModalInstance.close();
  };

  $scope.setNewPassword = function () {
    console.log('Set New Password');
    var resetParams = {
      username: $scope.fp.username,
      phone: $scope.fp.phone,
      password: $scope.fp.password,
      code: $scope.fp.code
    }

    console.log(resetParams);
    var resetPromise = Authentication.resetForgotPassword(resetParams);
    resetPromise.then(function (success) {
      console.log(success);
      Notification.success({message: "Password reset success", delay: 5000});
      // close the modal
      $uibModalInstance.close();

    }, function (err) {
      console.log(err);
      Notification.error({message: err.statusText, delay: 5000});
    })

  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};

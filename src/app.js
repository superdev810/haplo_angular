angular.module('ustadium', [
  // login service
  'loginService',
  'ustadium.mock',
  'ustadium.directives',

  // different app sections
  'ustadium.home',
  'ustadium.users',
  'ustadium.feeds',
  'ustadium.pages',
  'ustadium.error',
  'ustadium.constants',
  'ustadium.restapi',

  // components
  'ngAnimate',
  'toastr',
  'ui-notification',
  'ui.bootstrap'
])
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  })
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
  .run(function ($rootScope, $window) {
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
  })
  .controller('BodyController', function ($scope, $rootScope, $state, $stateParams, loginService, $http, $timeout, $uibModal, $log) {
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

      // loginPromise.catch(function (err) {
      //   console.log(err);
      //   $scope.login.wrong = true;
      //   $scope.login.errMsg = err.data.data.message;
      //   var errCode = err.data.code;
      //
      //   $timeout(function () {
      //     $scope.login.wrong = false;
      //     if(errCode == "002"){
      //       $scope.login.email = err.data.data.data.userEmail;
      //       $scope.open();
      //     }
      //   }, 3000);
      // });
      // loginPromise.finally(function () {
      //   $scope.login.working = false;
      // });
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
    };

    $scope.forgetPassword =function () {
      console.log('forget');
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

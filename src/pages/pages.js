angular.module('ustadium.pages', ['ustadium.grandfather'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.admin', {
        url: '/admin',
        templateUrl: 'pages/admin.tpl.html',
        accessLevel: accessLevels.admin
      })
      .state('app.user', {
        url: '/user',
        templateUrl: 'pages/user.tpl.html',
        accessLevel: accessLevels.user
      })
      .state('app.terms', {
        url: '/terms-and-service',
        templateUrl: 'pages/terms_and_service.tpl.html',
      })
      .state('app.support', {
        url: '/support',
        templateUrl: 'pages/support.tpl.html',
      })
      .state('app.download', {
        url: '/download',
        templateUrl: 'pages/download.tpl.html',
        controller: 'DownloadController'
      });
  })
  .controller('DownloadController', function ($window, $location, deviceDetector, $scope) {
    console.log('download link');
    $scope.customUAEntry = deviceDetector.custom["Custom_UA_Entry"];
    console.log($scope.customUAEntry);

    $scope.deviceDetector = deviceDetector;
    console.log($scope.deviceDetector.raw.os);
    if($scope.deviceDetector.raw.os.ios){
      $window.location.href = 'https://itunes.apple.com/us/app/ustadium/id1184610766?mt=8';
    }
    if($scope.deviceDetector.raw.os.android){
      $window.location.href = 'https://play.google.com/store/apps/details?id=com.ustadium.android&hl=en';
    }
  });

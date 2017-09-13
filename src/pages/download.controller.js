angular.module('ustadium.pages', ['ustadium.grandfather'])
.controller('DownloadController', function ($scope, $state, HomeRequest, $document, Notification, $location) {
  $location.href = 'https://itunes.apple.com/us/app/ustadium/id1184610766?mt=8';
});

/**
 * Created by superdev on 7/15/2017.
 */
angular.module('users.services', [])
  .factory('Authentication', Authentication);

Authentication.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function Authentication($window, $http, RestAPI, ApiEndpoints) {
  var auth = {
    user: $window.user,
    signup: signUp,
    verify: verify,
    forgotPassword: forgotPassword,
    resetForgotPassword: resetForgotPassword,
    getUser: getUser,
    updateUser: updateUser
  };

  return auth;

  function signUp(data) {
    console.log(data);
    return $http.post(base + '/auth/signup', data);
  }

  function verify(data) {
    console.log(data);
    return $http.post(base + '/auth/verify', data);
  }

  function forgotPassword(data) {
    console.log(data);
    return $http.post(base + '/auth/forgot-password', data);
  }

  function resetForgotPassword(data) {
    console.log(data);
    return $http.post(base + '/auth/reset-forgotten-password', data);
  }

  function getUser(data) {
    console.log(data);
    return $http.get(base + '/api/users/' + data);
  }

  function updateUser(data, userInfo) {
    console.log(data);
    return $http.put(base + '/api/users/' + data, userInfo);
  }
}

/**
 * Created by superdev on 7/15/2017.
 */
angular.module('ustadium.restapi',[])
  .service('RestAPI', function ($http, $q, $rootScope, ApiEndpoints) {
    return {
      call : call
    }

    function call(apiObj, apiParam){
      var deferred = $q.defer();
      var api_method = apiObj.method;
      if (apiObj.method == "GET")
      {
        $http({
          method  : apiObj.method,
          url     : apiObj.url,
          headers : apiObj.headers,
          params  : apiParam
        }).then(
          function(response)
          {
            deferred.resolve(response);
          },
          function (error)
          {
            deferred.reject(error);
          }
        );
      }
      else if (apiObj.method == "POST")
      {
        console.log(apiObj);
        $http.post(apiObj.url, apiParam).then(
          function(response)
          {
            deferred.resolve(response);
          },
          function (error)
          {
            console.log(error);
            deferred.reject(error);
          }
        );
      }

      return deferred.promise;
    }
  })

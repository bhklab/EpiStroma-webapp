var myModule = angular.module("myApp");
myModule.factory('RESTService', function($http, $cookies) {
    var SERVER_URL = "https://205.210.128.1:5000/";

    function get(url, params) {
        return $http.get(SERVER_URL + url, params).then(function(result) {
            return result.data;
        });
    }

    function post(url, data) {
        data.token = $cookies.get('token');
        return $http.post(SERVER_URL + url, data).then(function(result) {
            return result.data;
        });
    }

    var service = {
        get: get,
        post: post
    }

    service.token = null;

    return service;
});

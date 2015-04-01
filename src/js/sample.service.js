var app = angular.module('app');

app.service('sampleService', ['$http','$q','$log', function($http, $q) {
    'use strict';

    var service = {};
    var runData = {};


    service.fetchData = function () {

        var deferred = $q.defer(),
            url;

        url = 'data/sample.json';

        $http.get(url)
            .success(function(response){

                deferred.resolve(response);

            })
            .error(function (error) {

                deferred.reject(error);

            });


        return deferred.promise;
    };

    service.getRunData = function () {
        return runData;
    };

    return service;

}]);

(function ( window, document, undefined ) {
'use strict';

var MainController = function ($scope, sampleService) {


    $scope.data = {};
    $scope.colorScheme = 'avocado';
	// $scope.colorScheme = 'old time';
	// $scope.colorScheme = 'pale dawn';

    $scope.data.getTheme = function(key) {
    	$scope.colorScheme = key;
		$scope.fetchMapData();
    };

    $scope.fetchMapData = function() {
	    sampleService.fetchData()
	        .then(function (result) {

	        	$scope.data.allMapStyles = result;
	        	var mapStyle = result[$scope.colorScheme];
	        	$scope.changeTheme(mapStyle);
	    });
	};

    $scope.changeTheme = function(mapStyle) {

        var center  = new google.maps.LatLng(36.000, -100.000);
        var MY_MAPTYPE_ID = 'custom_style';                              

          var mapOptions = {
            zoom: 4,
            center: center,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            },
            mapTypeId: MY_MAPTYPE_ID
          };

         var map = new google.maps.Map(document.getElementById('mapCanvas'),
              mapOptions);

          var styledMapOptions = {
            name: 'Custom Style'
          };

          var customMapType = new google.maps.StyledMapType(mapStyle, styledMapOptions);

          map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    };
	
	$scope.fetchMapData();

};

angular.module('app')
    .controller('MainController', MainController);

})( window, document );

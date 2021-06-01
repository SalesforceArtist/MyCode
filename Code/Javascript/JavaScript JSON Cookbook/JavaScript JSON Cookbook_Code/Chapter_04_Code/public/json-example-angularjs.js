var app = angular.module("aprsapp", []);
 
app.controller("AprsController", function($scope, $http) {
  $scope.json = "";
  $scope.message = "Loaded..."; 
  $scope.doAjax = function()
  {
    $scope.debug = "Fetching...";    
    $scope.json= "";
    $scope.message = "";
    var request = { 
      call: "kf6gpe-7"
    };
    var promise = $http({
      url:"/", 
      method: "POST",
      data: request
    });
    promise.success(function(result, status, headers, config) {
      $scope.debug = "Loaded.";    
      $scope.json = result;
      $scope.message = result.call + ":" + result.lat + ", " + result.lng;
    });
    promise.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });
  }
});

 
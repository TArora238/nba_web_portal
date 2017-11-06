/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

  function HomeController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // bind here all data from the form
      if (localStorage.getItem('portalToken')) {
        if ($state.current.name == "home") {
          // $scope.mCtrl.checkDoctorToken(1);
          // $state.go('app.prospects');
        }
      }
      vm.services=[false,false,false,false,false,false];
      vm.why=[false,false,false];
      vm.blog=[false,false,false];


    }
  }
})();



/**=========================================================
 * Module: Dashboard
=========================================================*/

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('LocationController', LocationController);

    LocationController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout','Colors','uiCalendarConfig'];

  function LocationController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout,Colors,uiCalendarConfig) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // $scope.mCtrl.checkToken();
      // $scope.mCtrl.checkDoctorToken();




    }
  }
})();

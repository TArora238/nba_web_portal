/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
  'use strict';

  angular
    .module('app.pages')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

  function LoginController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // bind here all data from the form
      if (localStorage.getItem('adminToken')) {
        if ($state.current.name == "login") {
          // $scope.mCtrl.checkDoctorToken(1);
          // $state.go('app.prospects');
        }
      }
      vm.login = {};
      vm.loginAdmin = function(form) {
        console.log(vm.login.admin_email, vm.login.admin_password);
        if (!vm.login.admin_email || vm.login.admin_email.trim().length == 0) {
          toaster.pop('warning', 'Enter a valid email', '');
          return false;
        }
        if (!vm.login.admin_password || vm.login.admin_password.trim().length == 0) {
          toaster.pop('warning', 'Enter a valid password', '');
          return false;
        }
        $scope.mCtrl.hitInProgress = true;
        cfpLoadingBar.start();
        $.post(api.url + "email_login", {
            admin_email: vm.login.admin_email.replace(/\s/g, '').toLowerCase(),
            admin_password: vm.login.admin_password,
            device_type: 0,
            device_id: localStorage.getItem('user')
          })
          .success(function(data, status) {
              if (typeof data === 'string')
                  var data = JSON.parse(data);
              $scope.mCtrl.flagPopUps(data.flag,data.is_error);
              if (data.is_error == 0) {
                      $scope.mCtrl.setLoginData(data, 1);
                  }
           })
      };
    }
  }
})();



/**=========================================================
 * Module: Dashboard
=========================================================*/

(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout','Colors','uiCalendarConfig'];

  function DashboardController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout,Colors,uiCalendarConfig) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      $scope.mCtrl.checkToken();
      $scope.mCtrl.checkDoctorToken();
      vm.dashboard = {};



    }
  }
})();


/**=========================================================
 * Module: Support
=========================================================*/

(function() {
  'use strict';

  angular
    .module('app.support')
    .controller('SupportController', SupportController);

  SupportController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

  function SupportController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      $scope.mCtrl.checkToken();
      $scope.mCtrl.checkDoctorToken();
      vm.support = {};

    }
  }
})();


/**=========================================================
 * Module: Customer List
=========================================================*/

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

  function CustomersController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      $scope.mCtrl.checkToken();
      // $scope.mCtrl.checkDoctorToken();


      vm.dtOptions = {
        "scrollX": true
      };
      vm.ngDialogPop = function(template, className) {
        ngDialog.openConfirm({
          template: template,
          className: 'ngdialog-theme-default ' + className,
          scope: $scope,
          closeByEscape: false,
          closeByDocument: false
        }).then(function(value) {}, function(reason) {});

      };

      vm.initTable = function() {
        cfpLoadingBar.start();
        vm.pf_patient_list = [];
        $http.get(api.url + "getCustomers",{headers : {'Authorization':'bearer '+localStorage.getItem('adminToken')}})
          .then(function(data, status) {
                  cfpLoadingBar.complete();
            if (typeof data === 'string') data = JSON.parse(data);
            console.log(data);
              data=data.data;
            // $scope.mCtrl.successPopUps(data);
            $timeout(function () {
                vm.customers = data.data.customersArray;
                vm.totalItems = data.data.count;
                console.log(vm.customers)
            })
          },
              function(data, status) {
                  $scope.mCtrl.errorPopUps(data.responseJSON);
              });
      }
      vm.initTable();
      vm.patientDetails = function(patient) {
        localStorage.setItem('pfPatientData', JSON.stringify(patient));
        $state.go('app.pfPatientProfile');
      }
    }
  }
})();


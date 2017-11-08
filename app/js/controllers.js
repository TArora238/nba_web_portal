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
 * Module: Location
=========================================================*/

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('LocationController', LocationController);

    LocationController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

  function LocationController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // $scope.mCtrl.checkToken();
      // $scope.mCtrl.checkDoctorToken();
      vm.location="";
      vm.checkLocation = function () {
          cfpLoadingBar.start();
          vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
          console.log(vm.locationObj);
          if(vm.locationObj!=null) {
              $.post(api.url + "check_location", {
                  "latitude": vm.locationObj.latitude,
                  "longitude": vm.locationObj.longitude
              }).success(function (data, status) {
                  if (typeof data === 'string')
                      var data = JSON.parse(data);
                  console.log(data);
                  cfpLoadingBar.complete();
                  if (data.is_error == 0) {
                      vm.notServing = false;
                      localStorage.setItem('serving_area',JSON.stringify(data.serving_area));
                      $timeout(function () {
                          vm.categories = data.categories;
                          cfpLoadingBar.start();
                          localStorage.setItem("categories", JSON.stringify(vm.categories));
                          $state.go("app.categories");
                      });
                  }
                  else{
                      toaster.pop("error","We don't serve in this area","");
                      vm.notServing = true;
                  }

              })
          }
          else vm.locationObj = '';
      }



    }
  }
})();

/**=========================================================
 * Module: Services
=========================================================*/

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CategoryListController', CategoryListController);

    CategoryListController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

  function CategoryListController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // $scope.mCtrl.checkToken();
      // $scope.mCtrl.checkDoctorToken();


      vm.location = "";
      vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
      vm.location += vm.locationObj.state+","+vm.locationObj.country;
      vm.categories = JSON.parse(localStorage.getItem("categories"));
      vm.chooseCat = function (d) {
          localStorage.setItem("selectedCategory",JSON.stringify(d));
          $state.go("app.subService");
      }
    }
  }
})();

/**=========================================================
 * Module: Sub Services
=========================================================*/

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('SubServiceController', SubServiceController);

    SubServiceController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

  function SubServiceController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // $scope.mCtrl.checkToken();
      // $scope.mCtrl.checkDoctorToken();


      vm.location="London,UK";
      vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
      vm.choosingSubServ=1;
      vm.chooseService = function (d) {
          vm.service=d;
          if(vm.service.additional_services.length==0){
              localStorage.setItem("selectedService",JSON.stringify(d));
              $state.go("app.bookingTime");
          }
          else{
              localStorage.setItem("selectedService",JSON.stringify(vm.service));
              for (var i=0;i<vm.service.additional_services.length;i++){
                  vm.service.additional_services[i].check=false;
              }
              vm.choosingSubServ=0;
          }
      };
      vm.additionalServices=[];
      vm.chooseAddService = function (d,c,i) {
          console.log(d,c,i);
          if(c){
              if(vm.additionalServices.indexOf(i)<0)vm.additionalServices.push(i);
          }
          else {
              console.log(i);
              for(var j=0;j<vm.additionalServices.length;j++){
                  if(vm.additionalServices[j]==i)vm.additionalServices.splice(j,1);
              }


              console.log(vm.additionalServices);
          }
      };
      vm.resetService = function () {
          vm.choosingSubServ=1;
          vm.service='';
      };
      vm.continueToBookingTime = function () {
          console.log(vm.additionalServices);
          vm.addOnServices=[];
          for(var j=0;j<vm.additionalServices.length;j++){
              vm.addOnServices.push(vm.service.additional_services[vm.additionalServices[j]]);
          }
          localStorage.setItem("additionalServices",JSON.stringify(vm.addOnServices));
          $state.go("app.bookingTime");
      }
    }
  }
})();

/**=========================================================
 * Module: Booking Time
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('BookingTimeController', BookingTimeController);

    BookingTimeController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function BookingTimeController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // $scope.mCtrl.checkToken();
            // $scope.mCtrl.checkDoctorToken();
            vm.bookingTime = new Date();
            vm.selectedDay = new Date();
            vm.show = true;
            vm.today = moment(new Date()).format("DD/MM/YYYY");
            vm.totalPrice = 0;
            vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
            vm.service = JSON.parse(localStorage.getItem("selectedService"));
            vm.additionalServices = JSON.parse(localStorage.getItem("additionalServices"));

            vm.totalPrice += vm.service.service_price;
            for(var i=0;i<vm.additionalServices.length;i++ ){
                vm.totalPrice+=vm.additionalServices[i].as_price;
            }
            vm.time={
                hour:'',
                minute:'',
                period:''
            };
            vm.hours=[];
            vm.minutes=['00','30'];
            vm.periods=['AM','PM'];
            for(var i=1;i<13;i++){
                vm.hours[i]=i;
            }
            vm.check_time = function (time) {
                vm.now = new Date();
                console.log(vm.bookingTime);
                console.log(typeof vm.bookingTime);
                if(typeof vm.bookingTime==='object')
                vm.bookTime = vm.bookingTime;
                else vm.bookTime = new Date(vm.bookingTime);
                console.log(vm.bookTime);
                // return false;
                if (!time.hour || !time.minute || !time.period) {
                    vm.invalidDate = true;
                    return false;
                }
                vm.hour=0;
                if(time.period=='AM')vm.hour=time.hour;
                else vm.hour=time.hour+12;
                vm.bookTime.setHours(vm.hour);
                vm.bookTime.setMinutes(time.minute);
                vm.bookTime.setSeconds(0);
                vm.bookTime.setMilliseconds(0);
                vm.startDiff = vm.bookTime.getTime() - vm.now.getTime();
                vm.startHours = Math.floor(vm.startDiff / 1000 / 60 / 60);
                if(vm.startHours<2){
                    toaster.pop('error','Booking can not start before 2 hours from now','');
                    return false;
                }
                else vm.invalidDate = false;
            };
            vm.goToDetails = function () {
                if(vm.startHours<2){
                    vm.invalidDate = true;
                    toaster.pop('error','Booking can not start before 2 hours from now','');
                    return false;
                }
                if (!vm.time.hour || !vm.time.minute || !vm.time.period) {
                    vm.invalidDate = true;
                    toaster.pop('error','Choose a time for your booking','');
                    return false;
                }

                localStorage.setItem("totalPrice",vm.totalPrice);
                localStorage.setItem("bookingTime",vm.bookTime);
                $state.go("app.details")
            }
        }
    }
})();



/**=========================================================
 * Module: Details
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function DetailsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // $scope.mCtrl.checkToken();
            // $scope.mCtrl.checkDoctorToken();
            vm.today = moment(new Date()).format("DD/MM/YYYY");
            vm.totalPrice = 0;
            vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
            vm.service = JSON.parse(localStorage.getItem("selectedService"));
            vm.additionalServices = JSON.parse(localStorage.getItem("additionalServices"));
            vm.totalPrice = localStorage.getItem("totalPrice");
            vm.bookingTime = new Date(localStorage.getItem("bookingTime")).toISOString();
            vm.code='+44';
            vm.codes=['+44','+91'];
            vm.personal={};
            vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
            vm.address = vm.locationObj;
            vm.address.addressLabel = 'Home';
            console.log(vm.address);
            vm.chooseAddressLabel = function (a) {
              vm.address.addressLabel = a;
            };
            vm.goToPayment = function () {
                if (!localStorage.getItem('portalToken') || localStorage.getItem('portalToken') == null) {
                    //verify otp process
                    $state.go("app.payment");
                }
                else {
                    //skip otp process

                }
            };

            vm.chooseCode = function (c) {
                vm.code=c;
            }
        }
    }
})();



/**=========================================================
 * Module: Payment Details
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function PaymentController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // $scope.mCtrl.checkToken();
            // $scope.mCtrl.checkDoctorToken();

            vm.today = moment(new Date()).format("DD/MM/YYYY");
            vm.totalPrice = 0;
            vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
            vm.service = JSON.parse(localStorage.getItem("selectedService"));
            vm.additionalServices = JSON.parse(localStorage.getItem("additionalServices"));
            vm.totalPrice = localStorage.getItem("totalPrice");
            vm.bookingTime = new Date(localStorage.getItem("bookingTime")).toISOString();
            vm.goToThanks = function () {
                $state.go("app.thanks");
            };
            vm.address = 'asdfdsfsd';

            vm.addCard={
                cardNo:'',
                month:'',
                year:'',
                cvv:'',
                invalidDate:false

            }

        }
    }
})();


/**=========================================================
 * Module: Payment Details
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('ThanksController', ThanksController);

    ThanksController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function ThanksController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // $scope.mCtrl.checkToken();
            // $scope.mCtrl.checkDoctorToken();

            vm.today = moment(new Date()).format("DD/MM/YYYY");
            vm.totalPrice = 0;
            vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
            vm.service = JSON.parse(localStorage.getItem("selectedService"));
            vm.additionalServices = JSON.parse(localStorage.getItem("additionalServices"));
            vm.totalPrice = localStorage.getItem("totalPrice");
            vm.bookingTime = new Date(localStorage.getItem("bookingTime")).toISOString();
            vm.goToThanks = function () {
                $state.go("app.thanks");
            };


        }
    }
})();

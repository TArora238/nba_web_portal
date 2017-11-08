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
          // $scope.mCtrl.checkPortalToken(1);
          // $state.go('app.prospects');
        }
      }
      vm.services=[false,false,false,false,false,false];
      vm.why=[false,false,false];
      vm.blog=[false,false,false];
        vm.ngDialogPop = function(template, className) {
            ngDialog.openConfirm({
                template: template,
                className: 'ngdialog-theme-default ' + className,
                scope: $scope
            }).then(function(value) {}, function(reason) {});

        };
      var user = localStorage.getItem("user");
      localStorage.clear();
      localStorage.setItem("user",user);
      localStorage.setItem("loggedIn",0);
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
      // $scope.mCtrl.checkPortalToken();
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
      };
      vm.autoDetect = function() {
            if (navigator.geolocation) {
                cfpLoadingBar.start();
                navigator.geolocation.getCurrentPosition(vm.usePosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
      };
      vm.usePosition = function (position) {
          var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'latLng': latlng }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  if (results[1]) {
                      $timeout(function () {
                          console.log(results);
                          vm.location = results[1].formatted_address;
                          var place_id = results[1].place_id;
                          var latitude = results[1].geometry.location.lat();
                          var longitude = results[1].geometry.location.lng();
                          var addressComponents = results[1].address_components;
                          console.log(addressComponents);
                          var addressObj={
                              street_route:''
                          };
                          for (var i = 0; i < addressComponents.length; i++) {

                              if(addressComponents[i].types[0]=='street_number'){
                                  addressObj.apt_address = addressComponents[i].long_name
                              }

                              if(addressComponents[i].types[0]=='route'){
                                  addressObj.street_route = addressComponents[i].long_name
                              }
                              if(addressComponents[i].types[0]=='sublocality'){
                                  addressObj.street_route = addressObj.street_route + ', ' + addressComponents[i].long_name;
                              }
                              if(addressComponents[i].types[0]=='sublocality_level_1'){
                                  addressObj.street_route = addressObj.street_route + ', ' + addressComponents[i].long_name;
                              }
                              if(addressComponents[i].types[0]=='sublocality_level_2'){
                                  addressObj.street_route = addressObj.street_route + ', ' + addressComponents[i].long_name;
                              }
                              addressObj.street_route = addressObj.street_route.replace(/^(\,\ )/, "");


                              if(addressComponents[i].types[0]=='postal_town'){
                                  addressObj.city = addressComponents[i].long_name
                              }
                              if(addressComponents[i].types[0]=='administrative_area_level_2'){
                                  addressObj.city = addressObj.city + ', ' + addressComponents[i].long_name;
                              }

                              if(addressComponents[i].types[0]=='locality'){
                                  if (!addressObj.city)
                                      addressObj.city = addressComponents[i].long_name

                              }

                              if(addressComponents[i].types[0]=='administrative_area_level_1'){
                                  addressObj.state = addressComponents[i].long_name
                              }

                              if(addressComponents[i].types[0]=='country'){
                                  addressObj.country = addressComponents[i].long_name
                              }
                              if(addressComponents[i].types[0]=='postal_code_prefix'||addressComponents[i].types[0]=='postal_code'){
                                  addressObj.postal_code = addressComponents[i].long_name
                              }
                          }
                          addressObj.latitude=latitude;
                          addressObj.longitude=longitude;
                          addressObj.place_id=place_id;
                          localStorage.setItem('addressComponents',JSON.stringify(addressObj));
                          cfpLoadingBar.complete();
                      });


                  }
              }
          });
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
      if(localStorage.getItem("loggedIn")==1){
          $rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                  $rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                  $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

          $scope.mCtrl.checkPortalToken();
          $rootScope.loggedIn=true;
      }
      else $rootScope.loggedIn = false;

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
      // $scope.mCtrl.checkPortalToken();
        if(localStorage.getItem("loggedIn")==1){
            $rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                  $rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                  $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

            $scope.mCtrl.checkPortalToken();
            $rootScope.loggedIn=true;
        }
        else $rootScope.loggedIn = false;

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
            if(localStorage.getItem("loggedIn")==1){
                $rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                  $rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                  $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

                $scope.mCtrl.checkPortalToken();
                $rootScope.loggedIn=true;
            }
            else $rootScope.loggedIn = false;
            vm.bookingTime = new Date();
            vm.selectedDay = new Date();
            if(vm.selectedDay.getMinutes()>0){
                vm.selectedDay.setMinutes(0);
                vm.selectedDay.setHours(vm.selectedDay.getHours()+1);
                vm.selectedDay.setSeconds(0);
                vm.selectedDay.setMilliseconds(0);
            }
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
                else {
                    vm.selectedDay = new Date(vm.bookTime);
                    vm.invalidDate = false;
                }
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

    DetailsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout','$interval','ngDialog'];

    function DetailsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout,$interval,ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // $scope.mCtrl.checkToken();
            if(localStorage.getItem("loggedIn")==1){
                $rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                  $rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                  $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

                $scope.mCtrl.checkPortalToken();
                $rootScope.loggedIn=true;
            }
            else $rootScope.loggedIn = false;
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
            $rootScope.address_id='';
            if($rootScope.loggedIn){
                if($rootScope.userAddress!=null&&$rootScope.userAddress.length>0){
                    $rootScope.address_id=$rootScope.userAddress[0].address_id;
                    vm.savedAddress=($rootScope.userAddress.length-1).toString();
                }
                else{
                    $rootScope.userAddress=[];
                }
                console.log($rootScope.userProfile);
                vm.personal.fullName=$rootScope.userProfile.user_name;
                vm.personal.email=$rootScope.userProfile.user_email;
                var m = $rootScope.userProfile.user_mobile.split("-");
                vm.personal.phone=m[1];
                vm.code=m[0];

            }
            else vm.savedAddress='';
            vm.ngDialogPop = function(template, className) {
                ngDialog.openConfirm({
                    template: template,
                    className: 'ngdialog-theme-default ' + className,
                    scope: $scope
                }).then(function(value) {}, function(reason) {});

            };
            vm.addNewAddress = function () {

            };
            vm.generateOTP = function (i) {
                if(!vm.personal.fullName||vm.personal.fullName.length<2){
                    toaster.pop("error",'Enter a valid name','');
                    return false;
                }
                if(!vm.personal.email){
                    toaster.pop("error",'Enter a valid email','');
                    return false;
                }
                var mob = vm.personal.phone.replace(/[^0-9]/g, "");
                if(!vm.personal.phone||mob.length<7){
                    toaster.pop("error",'Enter a valid mobile','');
                    return false;
                }

                if(!vm.address.apt_address){
                    toaster.pop("error",'Enter a valid appartment address','');
                    return false;
                }

                if(!vm.address.locality){
                    toaster.pop("error",'Enter a valid locality','');
                    return false;
                }

                if(!vm.address.city){
                    toaster.pop("error",'Enter a valid city','');
                    return false;
                }

                if(!vm.address.state){
                    toaster.pop("error",'Enter a valid state','');
                    return false;
                }

                if(!vm.address.postal_code){
                    toaster.pop("error",'Enter a valid postal code','');
                    return false;
                }
                if(vm.address.addressLabel=='Other'&&!vm.address.addressLabelOther){
                    toaster.pop("error",'Enter a valid address label','');
                    return false;
                }
                cfpLoadingBar.start();
                $.post(api.url + "send_otp", {
                    user_mobile: vm.code + '-' + mob,
                    device_type: 0,
                    device_id: localStorage.getItem('user'),
                    app_version: "100",
                    device_token: "1234",
                    app_type: 0
                })
                    .success(function(data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        console.log(data);
                        $timeout(function() {
                            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                            if (data.is_error == 0) {
                                // localStorage.setItem('',JSON.stringify($rootScope.personal));

                                vm.OTP={};
                                vm.resendOTP = 1;
                                vm.resendOTPCounter = 30;
                                vm.firstResend = 1;
                                var resend1 = $interval(function() {
                                    if (vm.resendOTPCounter > 0 && vm.firstResend == 1)
                                    {
                                        --vm.resendOTPCounter;
                                        if(vm.resendOTPCounter<10){
                                            vm.OTPCounter='0'+vm.resendOTPCounter;
                                        }
                                        else{
                                            vm.OTPCounter=vm.resendOTPCounter;
                                        }
                                    }

                                }, 1000);
                                $timeout(function() {
                                    if (vm.firstResend == 1) {
                                        vm.resendOTP = 0;
                                        $interval.cancel(resend1);
                                        // $scope.$apply();
                                    }
                                }, 30000);

                                if(i==1){
                                    localStorage.setItem("personalData",JSON.stringify(vm.personal));
                                    ngDialog.openConfirm({
                                        template: 'otp_modal',
                                        className: 'ngdialog-theme-default biggerPop',
                                        scope: $scope
                                    }).then(function(value) {}, function(reason) {});
                                }
                            }
                        });
                    })
            };
            vm.verifyOTP = function () {
                cfpLoadingBar.start();
                vm.OTP_formatted = '';
                vm.OTP_formatted = vm.OTP_formatted + vm.OTP.a + vm.OTP.b + vm.OTP.c + vm.OTP.d;

                $.post(api.url + "verify_otp", {
                    user_mobile: vm.code + '-' + vm.personal.phone.replace(/[^0-9]/g, ""),
                    otp: vm.OTP_formatted,
                    device_type: 0,
                    device_id: localStorage.getItem('user'),
                    app_version: "100",
                    device_token: "1234",
                    app_type: 0
                })
                    .success(function(data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        console.log(data);
                        //vm.loading=false;
                        $timeout(function() {
                            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                            if (data.is_error == 0) {
                                // $rootScope.setLoginData(data, 1);
                                ngDialog.close();
                                vm.otpSent = 0;
                                if (data.access_token) localStorage.setItem('portalToken', data.access_token);
                                if (data.user_address.length > 0) localStorage.setItem('userAddress', JSON.stringify(data.user_address))
                                else localStorage.removeItem('userAddress');
                                if (data.user_cards.length > 0) localStorage.setItem('userCards', JSON.stringify(data.user_cards))
                                else localStorage.removeItem('userCards');
                                if (data.user_profile) localStorage.setItem('userProfile', JSON.stringify(data.user_profile));
                                $scope.mCtrl.user_name=JSON.parse(localStorage.getItem('userProfile')).user_name;
                                $rootScope.loggedIn = true;
                                if (data.countries) {
                                    localStorage.setItem('userCountries', JSON.stringify(data.countries));
                                    $scope.mCtrl.countries = data.countries;
                                }
                                localStorage.setItem('loggedIn',1);
                                vm.addAddress();
                            }
                        })
                    })
            };
            vm.addAddress = function () {
                var label = '';
                if(vm.address.addressLabel!='Other'){
                    label=vm.address.addressLabel;
                }
                else label = vm.address.addressLabelOther;
                if($scope.mCtrl.countries){
                    for(var i=0;i<$scope.mCtrl.countries.length;i++){
                        if(vm.address.country.toLowerCase()==$scope.mCtrl.countries[i].country_name.toLowerCase()){
                            vm.address.country_id = $scope.mCtrl.countries[i].country_id;
                        }
                    }
                }
                else vm.address.country_id=1;
                var data = {
                    "access_token": localStorage.getItem('portalToken'),
                    "post_code": vm.address.postal_code,
                    "latitude": vm.address.latitude,
                    "longitude": vm.address.longitude,
                    "apt_address": vm.address.apt_address,
                    "street_route": vm.address.locality,
                    "place_id": vm.address.place_id,
                    "city": vm.address.city,
                    "address_title": label,
                    "country_id": vm.address.country_id||1,
                    "country": vm.address.country
                };
                $.post(api.url + "add_address", data)
                    .success(function(data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        console.log(data);
                        $timeout(function() {
                            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                            if (data.is_error == 0) {
                                if (data.user_address.length > 0) localStorage.setItem('userAddress', JSON.stringify(data.user_address));
                                else localStorage.removeItem('userAddress');
                                $rootScope.address_id=data.user_address[data.user_address.length-1].address_id;
                                localStorage.setItem("address_id",$rootScope.address_id);
                                vm.savedAddress=($rootScope.userAddress.length-1).toString();
                                $state.go('app.payment');
                            }
                        })
                    });




            };
            vm.goToPayment = function () {
                if (!$rootScope.loggedIn) {
                    //verify otp process
                    vm.generateOTP(1);
                }
                else {
                    //skip otp process
                    vm.checkDetails();
                }
            };
            vm.checkDetails = function () {
                if(!vm.personal.fullName||vm.personal.fullName.length<2){
                    toaster.pop("error",'Enter a valid name','');
                    return false;
                }
                if(!vm.personal.email){
                    toaster.pop("error",'Enter a valid email','');
                    return false;
                }
                var mob = vm.personal.phone.replace(/[^0-9]/g, "");
                if(!vm.personal.phone||mob.length<7){
                    toaster.pop("error",'Enter a valid mobile','');
                    return false;
                }
                localStorage.setItem("personalData",JSON.stringify(vm.personal));
                if($rootScope.userAddress.length==0){
                    if(!vm.address.apt_address){
                        toaster.pop("error",'Enter a valid appartment address','');
                        return false;
                    }

                    if(!vm.address.locality){
                        toaster.pop("error",'Enter a valid locality','');
                        return false;
                    }

                    if(!vm.address.city){
                        toaster.pop("error",'Enter a valid city','');
                        return false;
                    }

                    if(!vm.address.state){
                        toaster.pop("error",'Enter a valid state','');
                        return false;
                    }

                    if(!vm.address.postal_code){
                        toaster.pop("error",'Enter a valid postal code','');
                        return false;
                    }
                    if(vm.address.addressLabel=='Other'&&!vm.address.addressLabelOther){
                        toaster.pop("error",'Enter a valid address label','');
                        return false;
                    }
                    vm.addAddress();
                    return false;
                }

                if(!$rootScope.address_id&&$rootScope.userAddress.length>0){
                    toaster.pop("error",'Choose an address','');
                    return false;
                }

                localStorage.setItem("address_id",$rootScope.address_id);
                $state.go('app.payment');
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
            if(localStorage.getItem("loggedIn")==1){
                $rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                $rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

                $scope.mCtrl.checkPortalToken();
                $rootScope.loggedIn=true;
            }

            vm.today = moment(new Date()).format("DD/MM/YYYY");
            vm.totalPrice = 0;
            vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
            vm.service = JSON.parse(localStorage.getItem("selectedService"));
            vm.additionalServices = JSON.parse(localStorage.getItem("additionalServices"));
            vm.totalPrice = localStorage.getItem("totalPrice");
            vm.bookingTime = new Date(localStorage.getItem("bookingTime")).toISOString();

            $rootScope.card_id='';
            if($rootScope.loggedIn){

                if($rootScope.userCards!=null&&$rootScope.userCards.length>0){
                    for(var i=0;i<$rootScope.userCards.length;i++){
                        console.log($rootScope.userCards[i]);
                        if($rootScope.userCards[i].default_status){
                            $rootScope.card_id=$rootScope.userCards[i].card_id;
                            vm.savedCard=i.toString();
                            console.log(vm.savedCard);
                            break;
                        }
                    }
                }
                else{
                    $rootScope.userCards=[];
                }

                $rootScope.address_id=localStorage.getItem("address_id");
                for(var i=0;i<$rootScope.userAddress.length;i++){
                    console.log($rootScope.userAddress[i]);
                    if($rootScope.userAddress[i].address_id==$rootScope.address_id){
                        vm.address=$rootScope.userAddress[i];
                        break;
                    }
                }
            }
            else {
                vm.savedCard = '';
                vm.address = $rootScope.userAddress[$rootScope.userAddress.length-1];
            }
            vm.cardSelect = function (c) {
                console.log(c);
              $rootScope.card_id = $rootScope.userCards[c].card_id;
              console.log($rootScope.card_id);
              // vm.savedCard=c;
            };
            vm.goToThanks = function () {
                if (!$rootScope.loggedIn) {
                    //add card process
                    vm.addCardUser();
                }
                else {
                    //direct card process
                    // vm.addCardUser();
                    if($rootScope.userCards.length==0){
                        vm.addCardUser();
                    }
                    else vm.checkPayment();
                }

            };
            vm.checkPayment = function () {
                console.log($rootScope.card_id);
                console.log(vm.savedCard);

                if(!$rootScope.card_id&&$rootScope.userCards.length>0){
                    toaster.pop("error",'Choose a card','');
                    return false;
                }

                localStorage.setItem("card_id",$rootScope.card_id);
                vm.bookArtist();
            };


            vm.addCard={
                number:'',
                month:'',
                year:'',
                cvv:''
            };
            vm.addCardUser = function() {
                if(!vm.addCard.number||!vm.addCard.month||!vm.addCard.year||!vm.addCard.cvv){
                    toaster.pop("error","Enter all card details","");
                    return false;
                }
                $scope.mCtrl.hitInProgress = true;
                cfpLoadingBar.start();
                console.log(vm.addCard);
                Stripe.card.createToken({
                    number: vm.addCard.number,
                    cvc: vm.addCard.cvv,
                    exp_month: parseInt(vm.addCard.month.month),
                    exp_year: vm.addCard.year
                }, stripeCardResponseHandler);

                function stripeCardResponseHandler(status, response) {
                    if (response.error) {
                        cfpLoadingBar.complete();
                        $scope.mCtrl.hitInProgress = false;
                        toaster.pop('error', response.error.message, '');
                    } else {
                        var data = {
                            "access_token": localStorage.getItem('portalToken'),
                            "stripe_token": response.id,
                            "card_brand": response.card.brand
                        };
                        $.post(api.url + "add_card", data)
                            .success(function(data, status) {
                                if (typeof data === 'string')
                                    var data = JSON.parse(data);
                                console.log(data);
                                $timeout(function() {
                                    $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                                    if (data.is_error == 0) {
                                        if (data.user_cards.length > 0) {
                                            localStorage.setItem('userCards', JSON.stringify(data.user_cards));
                                            $rootScope.userCards= data.user_cards;
                                            $scope.addCardView=0;
                                        }
                                        else {
                                            $rootScope.userCards= [];
                                            $scope.addCardView=1;
                                            localStorage.removeItem('userCards');
                                        }
                                        for(var i=0;i<$rootScope.userCards.length;i++){
                                            console.log($rootScope.userCards[i]);
                                            if($rootScope.userCards[i].default_status){
                                                $rootScope.card_id=$rootScope.userCards[i].card_id;
                                                vm.savedCard=i.toString();
                                                console.log(vm.savedCard);
                                                break;
                                            }
                                        }
                                        localStorage.setItem('card_id', data.user_cards[data.user_cards.length - 1].card_id);
                                        $rootScope.card_id =   localStorage.getItem('card_id');
                                        vm.bookArtist();
                                    }
                                })
                            })
                    }
                }
            };
            vm.bookArtist = function () {
                cfpLoadingBar.start();
                var bookTime = moment(vm.bookingTime).format("YYYY-MM-DD HH:MM");
                var as_ids = '';
                for(var i=0;i<vm.additionalServices.length;i++ ){
                    as_ids+=vm.additionalServices[i].as_id;
                    if(i<vm.additionalServices.length-1)as_ids+=',';
                }
                vm.personal = localStorage.getItem("personalData");
                $rootScope.address_id=localStorage.getItem("address_id");
                $.post(api.url + "book_artist", {
                    "access_token": localStorage.getItem('portalToken'),
                    "card_id":$rootScope.card_id,
                    "address_id":$rootScope.address_id,
                    "service_id":vm.service.service_id,
                    "user_mobile":$rootScope.userProfile.user_mobile,
                    "user_email":$rootScope.userProfile.user_email||"asd@sdf.sdf",
                    "as_id":as_ids,
                    "start_time":bookTime
                //    vm.personal.email
                })
                    .success(function(data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        console.log(data);
                        //$scope.loading=false;
                        cfpLoadingBar.complete();
                        $timeout(function() {
                            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                            if (data.is_error == 0) {
                                $state.go("app.thanks");
                            }
                        });
                    });
                // $state.go("app.thanks");
            };





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
            // $scope.mCtrl.checkPortalToken();

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

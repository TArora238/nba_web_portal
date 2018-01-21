/**=========================================================
 * Module: Home Controller
 =========================================================*/

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout','anchorSmoothScroll'];

  function HomeController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout,anchorSmoothScroll) {
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
      vm.how=[true,false,false,false];
        $scope.carouselIndex = 0;
        $scope.$watch('carouselIndex',function(newVal){
            console.log(newVal);
            vm.changeSlide(newVal);
        });
      vm.changeSlide = function (a) {
          $scope.carouselIndex = a;
          vm.how=[false,false,false,false];
          vm.how[a]=true;
      };
      vm.slides = [{
          id:0,
          img:"app/img/PNG/screen_1.jpg"
      },{
          id:1,
          img:"app/img/PNG/screen_2.jpg"
      },{
          id:2,
          img:"app/img/PNG/screen_1.jpg"
      },{
          id:3,
          img:"app/img/PNG/screen_2.jpg"
      }];
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
 * Module: About Us
 =========================================================*/



(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function AboutController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var user = localStorage.getItem("user");
            localStorage.clear();
            localStorage.setItem("user",user);
            localStorage.setItem("loggedIn",0);
        }
    }
})();

/**=========================================================
 * Module: Terms
 =========================================================*/



(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('TermsController', TermsController);

    TermsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function TermsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var user = localStorage.getItem("user");
            localStorage.clear();
            localStorage.setItem("user",user);
            localStorage.setItem("loggedIn",0);
        }
    }
})();


/**=========================================================
 * Module: FAQs
 =========================================================*/



(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('FAQController', FAQController);

    FAQController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function FAQController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var user = localStorage.getItem("user");
            localStorage.clear();
            localStorage.setItem("user",user);
            localStorage.setItem("loggedIn",0);
        }
    }
})();


/**=========================================================
 * Module: Support
 =========================================================*/



(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('SupportController', SupportController);

    SupportController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function SupportController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var user = localStorage.getItem("user");
            localStorage.clear();
            localStorage.setItem("user",user);
            localStorage.setItem("loggedIn",0);
        }
    }
})();




/**=========================================================
 * Module: Login Controller
 =========================================================*/



(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function LoginController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var user = localStorage.getItem("user");
            localStorage.clear();
            localStorage.setItem("user",user);
            localStorage.setItem("loggedIn",0);

        }
    }
})();


/**=========================================================
 * Module: Artist Sign Up Controller
 =========================================================*/



(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('ArtistController', ArtistController);

    ArtistController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout'];

    function ArtistController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var user = localStorage.getItem("user");
            localStorage.clear();
            localStorage.setItem("user",user);
            localStorage.setItem("loggedIn",0);
            $.get( "http://54.218.55.240:3002/register_data")
            .success(function(data, status) {
                cfpLoadingBar.complete();
                if (typeof data === 'string') data = JSON.parse(data);
                console.log(data);
                $timeout(function () {
                    vm.document_types = data.document_types;
                    vm.experience_types = data.experience_types;
                    vm.skills = data.skills;
                    console.log(data)
                })
            });
            vm.profile = {};
            vm.selected = [];
            vm.toggleMultiple = function (item) {
                var idx = vm.selected.indexOf(item);
                if (idx > -1) {
                    vm.selected.splice(idx, 1);
                } else {
                    vm.selected.push(item);
                }
                // console.log(vm.selected);
            };
            vm.exists = function (item) {
                // console.log(item);
                // console.log(vm.selected.indexOf(parseInt(item)) > -1);
                return vm.selected.indexOf(parseInt(item)) > -1;
            };
            vm.experienceSelect = function(sT) {
                vm.profile.artist_experience = sT;
            };
            vm.uploadFile = function() {
                $('.fileUpload').trigger('click');
            };
            $scope.fileUpload = function(files) {
                if (files.length > 0) {
                    console.log(files);
                    vm.fileToBeCropped = '';
                    vm.myCroppedImage = '';
                    vm.myImage = '';
                    var reader = new FileReader(); // instance of the FileReader
                    reader.readAsDataURL(files[0]); // read the local file
                    vm.profile.fileName = files[0].name;
                    reader.onloadend = function () {
                        var f = this.result;
                        $timeout(function () {
                            vm.myImage = f;
                            vm.ngDialogPop("imageCropPopUp", "bigPop");
                        });
                    };
                }
                else {
                    toaster.pop('error', 'Please choose a file', '');

                }
            };
            vm.saveCroppedPic = function () {
                // ngDialog.close("ngdialog4");
                var blob = $scope.mCtrl.dataURItoBlob(vm.myCroppedImage);
                console.log(blob);
                vm.file = blob;
                console.log(vm.file);
                vm.profile.file = vm.file;
                $timeout(function () {
                    console.log(vm.profile.file);
                    if(!vm.profile.file){
                        vm.profile.file = vm.file;
                    }
                    console.log(vm.profile.file);
                }, 1000);
            };
            vm.addArtistFn = function () {

                if (vm.profile.artist_name.trim().length == 0) {
                    toaster.pop('warning', 'Enter a valid name', '');
                    return false;
                }
                if (!vm.profile.artist_mobile) {
                    toaster.pop('warning', 'Enter a valid mobile', '');
                    return false;
                } else var mobile = vm.profile.artist_mobile.replace(/[^0-9]/g, "");
                if (mobile.length < 9) {
                    toaster.pop('warning', 'Enter a valid mobile', '');
                    return false;
                }
                // var mobile='';
                if (!mobile) {
                    toaster.pop('warning', 'Enter a valid mobile', '');
                    return false;
                } else {
                    mobile = vm.profile.artist_mobile.replace(/[^0-9]/g, "");
                    if (mobile.length < 9) {
                        toaster.pop('warning', 'Enter a valid mobile', '');
                        return false;
                    }
                }
                if (!vm.profile.artist_email || vm.profile.artist_email.trim().length == 0) {
                    toaster.pop('warning', 'Enter a valid email', '');
                    return false;
                }
                if (!vm.profile.artist_experience) {
                    toaster.pop('warning', 'Enter a valid experience', '');
                    return false;
                }
                if (vm.selected.length==0) {
                    toaster.pop('warning', 'Select at least one skill', '');
                    return false;
                }
                if(!vm.profile.file){
                    toaster.pop('warning', 'Select a profile pic', '');
                    return false;
                }
                var form = new FormData();
                cfpLoadingBar.start();
                vm.profile.artistSkills = '';
                for(var i=0;i<vm.selected.length;i++){
                    vm.profile.artistSkills+=vm.selected[i].toString();
                    if(i<vm.selected.length-1)vm.profile.artistSkills+=',';
                }
                console.log(vm.profile.artistSkills);
                form.append('access_token', localStorage.getItem("adminToken"));
                form.append('artist_email', vm.profile.artist_email);
                form.append('artist_name', vm.profile.artist_name);
                form.append('artist_experience', vm.profile.artist_experience);
                form.append('artist_about', vm.profile.artist_about);
                // form.append('serving_areas', vm.profile.serving_areas);
                form.append('artist_skills', vm.profile.artistSkills);
                form.append('artist_mobile', vm.profile.countryCode+'-' + vm.profile.artist_mobile.replace(/[^0-9]/g, ""));
                if(vm.profile.file)form.append("artist_image", vm.profile.file);
                $http({
                    url: api.url + 'add_artist',
                    method: 'POST',
                    data: form,
                    transformRequest: false,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                    .then(function (data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        console.log(data);
                        var data = data.data;
                        cfpLoadingBar.complete();
                        if (data.is_error == 0) {
                            $state.reload();
                        }
                    });
            }

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
        if(localStorage.getItem("loggedIn")==1){
            if(localStorage.getItem('userAddress'))$rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
            else $rootScope.userCards=[];
            if(localStorage.getItem('userCards'))$rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
            else $rootScope.userCards=[];
            $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));
            if(localStorage.getItem("categories")!=null)vm.categories = JSON.parse(localStorage.getItem("categories"));
            else vm.categories = [];
            localStorage.setItem("categories",JSON.stringify(vm.categories));
            // if(vm.categories.length!=0)
            // $state.go("app.categories");
            $rootScope.loggedIn=true;
        }
        else $rootScope.loggedIn = false;
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
                          if(data.categories.length==0){
                              toaster.pop("error","We don't serve in this area","");
                              vm.notServing = true;
                              return false;
                          }
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
          console.log(localStorage.getItem('userCards'));
          if(localStorage.getItem('userAddress'))$rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
          else $rootScope.userCards=[];
          if(localStorage.getItem('userCards'))$rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
          else $rootScope.userCards=[];
          $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

          $scope.mCtrl.checkPortalToken();
          $rootScope.loggedIn=true;
      }
      else $rootScope.loggedIn = false;

      vm.location = "";
      localStorage.setItem("additionalServices",JSON.stringify([]));
      if(localStorage.getItem('addressComponents')!=null){
          vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
          vm.location += vm.locationObj.state+","+vm.locationObj.country;
      }
      if(localStorage.getItem("categories")!=null)vm.categories = JSON.parse(localStorage.getItem("categories"));
      else vm.categories=[];
      console.log(vm.categories);
      localStorage.setItem("categories",JSON.stringify(vm.categories));
      if(vm.categories.length==0)
            $state.go("app.location");

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
            if(localStorage.getItem('userAddress'))$rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
            else $rootScope.userCards=[];
            if(localStorage.getItem('userCards'))$rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
            else $rootScope.userCards=[];
            $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

            $scope.mCtrl.checkPortalToken();
            $rootScope.loggedIn=true;
        }
        else $rootScope.loggedIn = false;

      vm.location="London,UK";
      vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
      vm.choosingSubServ=1;
      vm.additionalServices=[];
      vm.chooseService = function (d) {
          vm.service=d;
          if(vm.service.header.length==0){
              console.log(vm.service);
              localStorage.setItem("selectedService",JSON.stringify(d));
              $state.go("app.bookingTime");
          }
          else{
              localStorage.setItem("selectedService",JSON.stringify(vm.service));
              console.log(vm.service);
              for (var i=0;i<vm.service.header.length;i++){
                  vm.additionalServices[i]=[];
                  for(var j=0;j<vm.service.header[i].additional_services.length;j++){
                      vm.service.header[i].additional_services[j].check=false;
                  }
              }
              vm.choosingSubServ=0;
          }
      };
      localStorage.setItem("additionalServices",JSON.stringify([]));

      vm.chooseAddService = function (add_serv,check,index,can_multiple,headerIndex) {
          console.log(add_serv,check,index,can_multiple,headerIndex);
          if(check){
              if(can_multiple){
                  if(vm.additionalServices[headerIndex].indexOf(index)<0)vm.additionalServices[headerIndex].push(index);
              }
              else{
                  vm.additionalServices[headerIndex][0]=index;
                  for(var j=0;j<vm.service.header[headerIndex].additional_services.length;j++){
                      if(j!=index)vm.service.header[headerIndex].additional_services[j].check=false;
                      else vm.service.header[headerIndex].additional_services[j].check=true;

                  }
                  console.log(vm.service.header[headerIndex].additional_services);
              }
              console.log(vm.additionalServices);
          }
          else {

              console.log(index);
              if(can_multiple){
                  for(var j=0;j<vm.additionalServices[headerIndex].length;j++){
                      if(vm.additionalServices[j]==index)vm.additionalServices[headerIndex].splice(j,1);
                  }
              }
              else{
                  vm.additionalServices[headerIndex]=[];
                  for(var j=0;j<vm.service.header[headerIndex].additional_services.length;j++){
                      vm.service.header[headerIndex].additional_services[j].check=false;
                  }
              }
          }
          console.log(vm.additionalServices);
      };
      vm.resetService = function () {
          vm.choosingSubServ=1;
          vm.service='';
      };
      vm.continueToBookingTime = function () {
          console.log(vm.additionalServices);
          vm.addOnServices=[];
          for (var i=0;i<vm.service.header.length;i++){
              for(var j=0;j<vm.service.header[i].additional_services.length;j++){
                  vm.service.header[i].additional_services[j].check=false;
              }
          }
          for(var i=0;i<vm.additionalServices.length;i++){
              for(var j=0;j<vm.additionalServices[i].length;j++)
              vm.addOnServices.push(vm.service.header[i].additional_services[vm.additionalServices[i][j]]);
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
                if(localStorage.getItem('userAddress'))$rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                else $rootScope.userCards=[];
                if(localStorage.getItem('userCards'))$rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                else $rootScope.userCards=[];
                $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

                $scope.mCtrl.checkPortalToken();
                $rootScope.loggedIn=true;
            }
            else $rootScope.loggedIn = false;
            vm.today = moment(new Date()).format("MM/DD/YYYY");
            vm.tomorrowDate = moment(vm.today).add('days', 1);
            vm.tomorrow = moment(vm.tomorrowDate).format("MM/DD/YYYY");
            vm.bookingTime = new Date();
            vm.bookingTime.setDate(vm.bookingTime.getDate()+1);
            console.log(vm.bookingTime);
            vm.selectedDay = new Date();
            if(vm.selectedDay.getMinutes()>0){
                vm.selectedDay.setMinutes(0);
                vm.selectedDay.setHours(vm.selectedDay.getHours()+1);
                vm.selectedDay.setSeconds(0);
                vm.selectedDay.setMilliseconds(0);
            }
            vm.show = true;
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
            for(var i=7;i<22;i++){
                if(i<10)vm.hours[i-7]='0'+i;
                else vm.hours[i-7]=i;
            }
            console.log(vm.hours);
            vm.check_time = function (time) {
                vm.now = new Date();
                console.log(vm.bookingTime);
                console.log(typeof vm.bookingTime);
                if(typeof vm.bookingTime==='object')
                vm.bookTime = vm.bookingTime;
                else vm.bookTime = new Date(vm.bookingTime);
                console.log(vm.bookTime);
                // return false;   || !time.period
                if (!time.hour || !time.minute ) {
                    vm.invalidDate = true;
                    return false;
                }
                // vm.hour=0;
                // if(time.period=='AM')vm.hour=time.hour;
                // else vm.hour=time.hour+12;
                vm.bookTime.setHours(parseInt(time.hour));
                vm.bookTime.setMinutes(time.minute);
                vm.bookTime.setSeconds(0);
                vm.bookTime.setMilliseconds(0);
                console.log(vm.bookTime)
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
                $scope.mCtrl.hitInProgress = true;
                if(vm.startHours<2){
                    vm.invalidDate = true;
                    toaster.pop('error','Booking can not start before 2 hours from now','');
                    return false;
                }
                //|| !vm.time.period
                if (!vm.time.hour || !vm.time.minute ) {
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
                if(localStorage.getItem('userAddress'))$rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                else $rootScope.userAddress=[];
                if(localStorage.getItem('userCards'))$rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                else $rootScope.userCards=[];
                $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

                $scope.mCtrl.checkPortalToken();
                $rootScope.loggedIn=true;
            }
            else $rootScope.loggedIn = false;
            $scope.mCtrl.hitInProgress = false;
            vm.totalPrice = 0;
            vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
            vm.service = JSON.parse(localStorage.getItem("selectedService"));
            vm.additionalServices = JSON.parse(localStorage.getItem("additionalServices"));
            vm.totalPrice = localStorage.getItem("totalPrice");
            vm.bookingTime = new Date(localStorage.getItem("bookingTime")).toISOString();
            vm.code='+44';
            vm.codes=['+44','+91'];
            vm.personal={};

            if(localStorage.getItem('addressComponents')!=null){
                vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
                vm.address = vm.locationObj;
                vm.address.addressLabel = 'Home';
            }
            else{
                vm.address = {};
                vm.address.addressLabel = 'Home';
            }
            console.log(vm.address);
            vm.chooseAddressLabel = function (a) {
              vm.address.addressLabel = a;
            };
            $rootScope.address_id='';
            if($rootScope.loggedIn){
                if($rootScope.userAddress!=null&&$rootScope.userAddress.length>0){
                    if(localStorage.getItem("address_id")==null){
                        $rootScope.address_id=$rootScope.userAddress[0].address_id;
                        vm.savedAddress=(0).toString();
                    }
                    else{
                        $rootScope.address_id=localStorage.getItem("address_id");
                        vm.savedAddress=($rootScope.userAddress.length-1).toString();
                    }

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

            vm.addressSelect = function (c) {
                console.log(c);
                $rootScope.address_id = $rootScope.userAddress[c].address_id;
                console.log($rootScope.address_id);
                localStorage.setItem("address_id",$rootScope.address_id);
                $rootScope.selectedAddress = $rootScope.userAddress[c];
                localStorage.setItem("selectedAddress",JSON.stringify($rootScope.selectedAddress));
                // vm.savedCard=c;
            };

            vm.ngDialogPop = function(template, className) {
                ngDialog.openConfirm({
                    template: template,
                    className: 'ngdialog-theme-default ' + className,
                    scope: $scope
                }).then(function(value) {}, function(reason) {});

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
                $scope.mCtrl.hitInProgress = true;
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
                            $scope.mCtrl.hitInProgress = false;
                            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                            if (data.is_error == 0) {
                                // $rootScope.setLoginData(data, 1);
                                ngDialog.close();
                                vm.otpSent = 0;
                                if (data.access_token) localStorage.setItem('portalToken', data.access_token);
                                if (data.user_profile.access_token) localStorage.setItem('portalToken', data.user_profile.access_token);
                                if (data.user_address.length > 0) localStorage.setItem('userAddress', JSON.stringify(data.user_address))
                                else localStorage.setItem('userAddress',[]);
                                if (data.user_cards.length > 0) localStorage.setItem('userCards', JSON.stringify(data.user_cards))
                                else localStorage.setItem('userCards',[]);
                                if (data.user_profile) localStorage.setItem('userProfile', JSON.stringify(data.user_profile));
                                $scope.mCtrl.user_name=JSON.parse(localStorage.getItem('userProfile')).user_name;
                                $rootScope.loggedIn = true;
                                if (data.countries) {
                                    localStorage.setItem('userCountries', JSON.stringify(data.countries));
                                    $scope.mCtrl.countries = data.countries;
                                }
                                localStorage.setItem('loggedIn',1);
                                console.log("verify otp process");
                                vm.addAddressPopMode=0;
                                vm.addAddress();
                            }
                        })
                    })
            };
            vm.addAddress = function (i) {

                if(i&&localStorage.getItem("addressComponents")==null){
                    toaster.pop("error",'Choose a valid location','');
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
                $scope.mCtrl.hitInProgress = true;
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
                            $scope.mCtrl.hitInProgress = false;
                            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                            if (data.is_error == 0) {
                                if (data.user_address.length > 0) localStorage.setItem('userAddress', JSON.stringify(data.user_address));
                                else localStorage.setItem('userAddress',[]);
                                $rootScope.address_id=data.user_address[data.user_address.length-1].address_id;
                                localStorage.setItem("address_id",$rootScope.address_id);
                                vm.savedAddress=($rootScope.userAddress.length-1).toString();
                                $rootScope.selectedAddress = $rootScope.userAddress[$rootScope.userAddress.length-1];
                                localStorage.setItem("selectedAddress",JSON.stringify($rootScope.selectedAddress));
                                if(i){
                                    $rootScope.address_id=data.address_id;
                                    localStorage.setItem("address_id",$rootScope.address_id);
                                    ngDialog.close();
                                    if(vm.addAddressPopMode==1)$state.reload();
                                    if(vm.addAddressPopMode==0)vm.saveProfileData();

                                }
                                else vm.saveProfileData()
                            }
                        })
                    });
            };
            vm.addAddressPop = function () {
                vm.addAddressPopMode=1;
                localStorage.removeItem('addressComponents');
                vm.ngDialogPop('addAddressModal','biggerPop');
                vm.locationSelected = false;
            };
            vm.location='';
            vm.checkLocation = function () {
                // cfpLoadingBar.start();
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
                                if(data.categories.length==0){
                                    toaster.pop("error","We don't serve in this area","");
                                    vm.notServing = true;
                                    vm.locationSelected = false;
                                    return false;
                                }
                                vm.locationSelected = true;
                                vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
                                vm.address = vm.locationObj;
                                vm.address.addressLabel = 'Home';
                            });
                        }
                        else{
                            toaster.pop("error","We don't serve in this area","");
                            vm.notServing = true;
                            vm.locationSelected = false;
                        }

                    })
                }
                else {
                    vm.locationSelected = false;
                    vm.locationObj = '';
                }
            };
            vm.autoDetect = function() {
                if (navigator.geolocation) {
                    cfpLoadingBar.start();
                    navigator.geolocation.getCurrentPosition(vm.usePosition);
                } else {
                    vm.locationSelected = false;
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
                                vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
                                vm.address = vm.locationObj;
                                vm.address.addressLabel = 'Home';
                                vm.locationSelected = true;
                            });


                        }
                    }
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
                    vm.addAddressPopMode=0;
                    vm.addAddress();
                    return false;
                }

                if(!$rootScope.address_id&&$rootScope.userAddress.length>0){
                    toaster.pop("error",'Choose an address','');
                    return false;
                }

                localStorage.setItem("address_id",$rootScope.address_id);
                vm.saveProfileData();
            };
            vm.chooseCode = function (c) {
                vm.code=c;
            };
            vm.saveProfileData = function () {
                $.post(api.url + "edit_user_profile", {
                    "access_token": localStorage.getItem('portalToken'),
                    "user_mobile": vm.code + '-' + vm.personal.phone.replace(/[^0-9]/g, ""),
                    "user_email": vm.personal.email,
                    "user_name": vm.personal.fullName
                })
                    .success(function (data,status) {
                        if (data.user_profile) localStorage.setItem('userProfile', JSON.stringify(data.user_profile));
                        $state.go("app.payment");
                    });
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

    PaymentController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout','ngDialog'];

    function PaymentController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout,ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // $scope.mCtrl.checkToken();
            if(localStorage.getItem("loggedIn")==1){
                if(localStorage.getItem('userAddress'))$rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                else $rootScope.userAddress=[];
                if(localStorage.getItem('userCards'))$rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                else $rootScope.userCards=[];
                $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

                $scope.mCtrl.checkPortalToken();
                $rootScope.loggedIn=true;
            }
            $scope.mCtrl.hitInProgress = false;
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
            vm.ngDialogPop = function(template, className) {
                ngDialog.openConfirm({
                    template: template,
                    className: 'ngdialog-theme-default ' + className,
                    scope: $scope
                }).then(function(value) {}, function(reason) {});

            };
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
                vm.checkLocation();
            };


            vm.addCard={
                number:'',
                month:'',
                year:'',
                cvv:''
            };
            vm.addCardUser = function(i) {
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
                                    $scope.mCtrl.hitInProgress = false;
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
                                            localStorage.setItem('userCards',[]);
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
                                        if(i){
                                            ngDialog.close();
                                            $state.reload();
                                        }
                                        else vm.checkLocation();
                                    }
                                })
                            })
                    }
                }
            };
            vm.checkLocation = function(){
                // if(localStorage.getItem('selectedAddress'))
                //     $rootScope.selectedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
                // else{
                    $rootScope.savedAddress=vm.address;
                // }
                vm.locationObj = JSON.parse(localStorage.getItem('addressComponents'));
                console.log(vm.locationObj);
                if(vm.locationObj!=null) {
                    $.post(api.url + "check_location", {
                        "latitude": $rootScope.savedAddress.latitude,
                        "longitude": $rootScope.savedAddress.longitude
                    }).success(function (data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        console.log(data);
                        cfpLoadingBar.complete();
                        if (data.is_error == 0) {

                            vm.notServing = false;

                            $timeout(function () {
                                if(data.categories.length==0){
                                    toaster.pop("error","We don't serve in this area","");
                                    vm.notServing = true;
                                    vm.locationSelected = false;
                                    return false;
                                }
                                vm.area_id = data.area_info.area_id;
                                vm.bookArtist();
                            });
                        }
                        else{
                            toaster.pop("error","We don't serve in this area","");
                            vm.notServing = true;
                            vm.locationSelected = false;
                        }

                    })
                }
            };
            vm.promo = '';
            vm.specialInst = '';
            vm.coupon =  '';
            vm.removePromo = function () {
                vm.promo = '';
                vm.coupon = '';
                vm.totalPrice = vm.originalTotalPrice;
            };
            vm.checkPromo = function () {
                if(!vm.promo){
                    toaster.pop("error","Enter a promo code","");
                    return false;
                }
                $scope.mCtrl.hitInProgress = true;
                vm.coupon =  '';
                $.post("http://54.218.55.240:3003/check_code", {
                    access_token:localStorage.getItem('portalToken'),
                    coupon:vm.promo
                })
                    .success(function(data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.hitInProgress = false;
                        $timeout(function() {
                            if (data.is_error == 0) {
                                vm.promoResponse = 'Promo code "'+vm.promo+'" applied successfully';
                                console.log(data);
                                vm.coupon = vm.promo;
                                vm.promo_value = data.promo_value;
                                vm.promo_type = data.promo_type;
                                vm.originalTotalPrice = vm.totalPrice;
                                if(vm.promo_type == 1 ) vm.totalPrice -= vm.promo_value;
                                if(vm.promo_type == 2 ) vm.totalPrice -= (vm.promo_value/100)*vm.totalPrice;

                            }
                            else {
                                toaster.pop("error","Invalid Code","");
                                vm.coupon='';
                            }
                        });
                    });
            };
            vm.bookArtist = function () {
                $scope.mCtrl.hitInProgress = true;
                cfpLoadingBar.start();
                var bookTime = moment(vm.bookingTime).format("YYYY-MM-DD HH:MM");
                var as_ids = '';
                console.log(vm.additionalServices);
                for(var i=0;i<vm.additionalServices.length;i++ ){
                    as_ids+=vm.additionalServices[i].as_id;
                    if(i<vm.additionalServices.length-1)as_ids+=',';
                }
                console.log(as_ids);
                // return false;
                vm.personal = JSON.parse(localStorage.getItem("personalData"));
                console.log($rootScope.userProfile.user_email);
                console.log(vm.personal);
                $rootScope.address_id=localStorage.getItem("address_id");
                var data ={
                    "access_token": localStorage.getItem('portalToken'),
                    "card_id":$rootScope.card_id,
                    "address_id":$rootScope.address_id,
                    "service_id":vm.service.service_id,
                    "user_name":$rootScope.userProfile.user_name||vm.personal.fullName,
                    "user_mobile":$rootScope.userProfile.user_mobile,
                    "user_email":$rootScope.userProfile.user_email||vm.personal.email,
                    "start_time":bookTime,
                    "area_id":vm.area_id
                };
                if(vm.specialInst){data.additional_comment = vm.specialInst}
                if(vm.coupon){data.coupon = vm.coupon}
                if(as_ids){ data.as_id=as_ids;}
                $.post(api.url + "book_artist", data)
                    .success(function(data, status) {
                        if (typeof data === 'string')
                            var data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.hitInProgress = false;
                        //$scope.loading=false;
                        cfpLoadingBar.complete();
                        $timeout(function() {
                            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                            if (data.is_error == 0) {
                                $state.go("app.thanks");
                            }
                            else{
                                toaster.pop("error",data.err,'');
                                return false;
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

            // vm.today = moment(new Date()).format("DD/MM/YYYY");
            // vm.totalPrice = 0;
            // vm.category = JSON.parse(localStorage.getItem("selectedCategory"));
            // vm.service = JSON.parse(localStorage.getItem("selectedService"));
            // vm.additionalServices = JSON.parse(localStorage.getItem("additionalServices"));
            // vm.totalPrice = localStorage.getItem("totalPrice");
            // vm.bookingTime = new Date(localStorage.getItem("bookingTime")).toISOString();
            vm.goToThanks = function () {
                $state.go("app.thanks");
            };


        }
    }
})();

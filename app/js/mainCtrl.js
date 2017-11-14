// ========================================================
// *   Run Function for Main Ctrl
// *   Main configs needed before everything
// ========================================================
(function() {
  'use strict';

  angular
    .module('portalPanel')
    .run(mainRun);
  mainRun.$inject = ['$http', '$state', '$timeout', 'api', 'cfpLoadingBar', '$interval', '$rootScope'];

  function mainRun($http, $state, $timeout, api, cfpLoadingBar, $interval, $rootScope) {
    // console.log("execution");
    // console.log('inside main run');
    var aT = window.location.href.split("token=");
    if (aT[1])
      localStorage.setItem('portalToken', aT[1]);
    if (typeof localStorage === 'object') {
      try {
        localStorage.setItem('localStorage', 1);
        localStorage.removeItem('localStorage');
      } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function() {};
        alert('Your web browser does not support storing settings locally, most common cause of this is using "Private Browsing Mode". Some settings may not work properly for you. Please switch to normal browsing mode.');
      }
    }

    // if (!localStorage.getItem('portalToken')) {
    //   localStorage.removeItem('portalToken');
    //   $state.go('home');
    // }
    $('input').attr('autocomplete', 'new-password');
    $rootScope.get_settings = function() {

      if (localStorage.getItem('user')) {
        $.post(api.url + "get_settings", {
            device_type: 0,
            app_type: 0,
            server_type: 0,
            app_version: 100,
            device_id: localStorage.getItem('user')
          })
          .success(function(data, status) {
            if (typeof data === 'string')
              var data = JSON.parse(data);
            // console.log(api.url);
            // api.url = data.port + '/';
            // console.log(api.url);

            Stripe.setPublishableKey(data.stripe_key);
            $timeout(function() {
              $rootScope.messageList = data.popup;

              // $rootScope.$emit('init');
            });
            $rootScope.profile = {};
            // $rootScope.checkPortalToken();
          });

      } else {
        $rootScope.deviceId();
      }

    };
    $rootScope.deviceId = function() {
      new Fingerprint2().get(function(result, components) {
        var hash = result;
        localStorage.setItem('user', hash);
        $rootScope.get_settings();
      });
    };
    $rootScope.deviceId();

    $rootScope.days = [];
    $rootScope.months = [];
    $rootScope.birthYears = [];
    $rootScope.newYears = [];
    var d = new Date();
    $rootScope.today = new Date();
    // console.log($rootScope.today);
    $rootScope.next_month_date = new Date();
    $rootScope.next_month_date.setDate(7);
    $rootScope.next_month_date.setMonth($rootScope.next_month_date.getMonth() + 1);
    $rootScope.next_month_date = moment($rootScope.next_month_date).format('MMM DD, YYYY');
    // console.log($rootScope.next_month_date);
    d.getYear();
    // console.log(d.getYear());
    for (var i = 0; i < 31; i++) {
      $rootScope.days[i] = i + 1;
    }
    for (var j = 0; j < 12; j++) {
      // console.log($rootScope.months[j]);
      $rootScope.months[j] = {
        month: '',
        month_name: ''
      };
      if (j + 1 == 1) $rootScope.months[j].month_name = 'Jan';
      if (j + 1 == 2) $rootScope.months[j].month_name = 'Feb';
      if (j + 1 == 3) $rootScope.months[j].month_name = 'Mar';
      if (j + 1 == 4) $rootScope.months[j].month_name = 'Apr';
      if (j + 1 == 5) $rootScope.months[j].month_name = 'May';
      if (j + 1 == 6) $rootScope.months[j].month_name = 'Jun';
      if (j + 1 == 7) $rootScope.months[j].month_name = 'Jul';
      if (j + 1 == 8) $rootScope.months[j].month_name = 'Aug';
      if (j + 1 == 9) $rootScope.months[j].month_name = 'Sept';
      if (j + 1 == 10) $rootScope.months[j].month_name = 'Oct';
      if (j + 1 == 11) $rootScope.months[j].month_name = 'Nov';
      if (j + 1 == 12) $rootScope.months[j].month_name = 'Dec';
      if(j<9){
          $rootScope.months[j].month = '0'+(j + 1).toString();
      }
      else {
          $rootScope.months[j].month = j + 1;
      }
    }
    var currentYear = 1900 + d.getYear();
    var cY = currentYear - 13;
    // console.log(cY);
    for (var i = cY; i > 1900; i--) {
      $rootScope.birthYears[cY - i] = i;
    }
    for (var i = currentYear; i < 2100; i++) {
      $rootScope.newYears[i - currentYear] = i;
    }
  }

})();






/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
  'use strict';

  angular
    .module('app.mainCtrl')
    .controller('mainController', mainController)

  mainController.$inject = ['$http', '$state', '$scope', '$timeout', 'api', 'cfpLoadingBar', '$interval', '$rootScope', 'ngDialog', 'toaster','$anchorScroll','$location'];
  // 'toaster', 'toastrConfig',
  // toaster, toastrConfig,
  function mainController($http, $state, $scope, $timeout, api, cfpLoadingBar, $interval, $rootScope, ngDialog, toaster,$anchorScroll,$location) {
    var vm = this;

    // $rootScope.$on('init', function() {
      activate();
    // });
    ////////////////

    function activate() {
      $rootScope.$on("$locationChangeSuccess", function() {
        $timeout(function() {
          $(window).scrollTop(0);
          window.scrollTo(0, 0);
          ngDialog.close();
          $('.modal-backdrop').remove();
        });
      });
        vm.goToScrollID = function (a) {
            $location.hash(a);
            $anchorScroll.yOffset = 70;
            $anchorScroll();
        };
        vm.scrollHeader=false;
        // console.log(vm.scrollHeader);
        $(document).ready(function() {
            $(window).on("scroll", function () {
                $timeout(function () {
                    if($(window).width()>500){
                        if($(window).scrollTop() > 20) {
                            vm.scrollHeader=true;
                        } else {
                            vm.scrollHeader=false;
                        }
                    }
                })
            });
        });  
      // console.log(api.url);

      vm.emailPattern = /^[a-z0-9A-Z]+[a-zA-Z0-9.+_]+@[a-z0-9A-Z.-]+\.[a-zA-Z]{2,7}$/;
      vm.namePattern = /^[a-zA-Z 0-9]*$/;
      vm.amountPattern = /^\d+(\.\d{1,2})?$/;

      vm.today = new Date();
      vm.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      vm.ngDialogPop = function(template, className) {
        ngDialog.openConfirm({
          template: template,
          className: 'ngdialog-theme-default ' + className,
          scope: $scope
        }).then(function(value) {}, function(reason) {});

      };
      vm.signInPop = function () {
          vm.login={
              phone:'',
              name:'',
              email:''
          };
          vm.ngDialogPop("signInModal","bigPop");
      };
        vm.code='+44';
        vm.codes=['+44','+91'];
        vm.chooseCode = function (c) {
            vm.code=c;
        };

      vm.signInFn = function (i) {
          var mob = vm.login.phone.replace(/[^0-9]/g, "");
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
                      vm.flagPopUps(data.flag, data.is_error);
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

                          if(i==2){
                              localStorage.setItem("personalData",JSON.stringify(vm.login));
                          }
                          ngDialog.close();
                          vm.ngDialogPop("otp_modal",'biggerPop');
                      }
                  });
              })
      };
        vm.verifyOTPLogin = function (i) {
            cfpLoadingBar.start();
            vm.OTP_formatted = '';
            vm.OTP_formatted = vm.OTP_formatted + vm.OTP.a + vm.OTP.b + vm.OTP.c + vm.OTP.d;

            $.post(api.url + "verify_otp", {
                user_mobile: vm.code + '-' + vm.login.phone.replace(/[^0-9]/g, ""),
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
                        vm.flagPopUps(data.flag, data.is_error);
                        if (data.is_error == 0) {
                            // $rootScope.setLoginData(data, 1);
                            ngDialog.close();
                            vm.otpSent = 0;
                            if (data.access_token) localStorage.setItem('portalToken', data.access_token);
                            if (data.user_address.length > 0) localStorage.setItem('userAddress', JSON.stringify(data.user_address))
                            else localStorage.setItem('userAddress',[]);
                            if (data.user_cards.length > 0) localStorage.setItem('userCards', JSON.stringify(data.user_cards))
                            else localStorage.setItem('userCards',[]);
                            if (data.user_profile) localStorage.setItem('userProfile', JSON.stringify(data.user_profile));
                            vm.user_name=JSON.parse(localStorage.getItem('userProfile')).user_name;
                            $rootScope.loggedIn = true;
                            if (data.countries) {
                                localStorage.setItem('userCountries', JSON.stringify(data.countries));
                                vm.countries = data.countries;
                            }
                            // localStorage.setItem("categories",JSON.stringify(data.categories));
                            localStorage.setItem('loggedIn',1);
                            if(i){$state.reload();}
                            else $state.go("app.location");
                        }
                    })
                })
        };
      vm.loginRedirect = function() {
        localStorage.removeItem('portalToken');
        $state.go('home');
      };



      vm.checkToken = function() {
          cfpLoadingBar.complete();
          if (!localStorage.getItem('portalToken') || localStorage.getItem('portalToken') == null) {
              localStorage.removeItem('portalToken');
              $state.go('home');
              return false;
          }
      };



      vm.hitInProgress = false;

        $rootScope.currentState = function() {
            if ($state.current.name == 'app.subService') vm.bookingStep = 1;
            if ($state.current.name == 'app.bookingTime') vm.bookingStep = 2;
            if ($state.current.name == 'app.details') vm.bookingStep = 3;
            if ($state.current.name == 'app.payment') vm.bookingStep = 4;
        };
        $rootScope.currentState();

        vm.flagPopUps = function (flag, error) {
            cfpLoadingBar.complete();
            vm.hitInProgress = false;
            if(flag==4||flag==5){
                localStorage.removeItem('portalToken');
                $state.go('home');
                cfpLoadingBar.complete();
            }
            if (!$rootScope.messageList || $rootScope.messageList.length == 0) {
                $rootScope.get_settings();
                return false;
            }
            else {
                if ($rootScope.messageList[flag]) {
                    if (error == 1) toaster.pop('error', $rootScope.messageList[flag].text, '');
                    else toaster.pop('success', $rootScope.messageList[flag].text, '');
                }
                else {
                    if (error == 1) toaster.pop('error', 'Something went wrong', '');
                    else toaster.pop('success', 'Success', '');
                }
                vm.hitInProgress = false;
            }
        };

      vm.states=[];
      vm.getLocation = function(query) {
        if(query.length<4)return false;
        return $.post(api.url + 'get_zipcode', {
          zipcode: query
        }).then(function(data, status) {
          if (typeof data === 'string')
            var data = JSON.parse(data);
          if (data.is_error == 0) {
            vm.states = data.zip_info;
            $timeout(function() {
              return vm.states;
            })
          }
        });
      };

      vm.checkPortalToken = function(login) {
        console.log(localStorage.getItem('portalToken'));
        // if (!localStorage.getItem('portalToken')) {
        //   localStorage.removeItem('portalToken')
        //   $state.go('home');
        // } else {
          $.post(api.url + "access_token_login", {
              access_token: localStorage.getItem('portalToken'),
              device_type: 0,
              app_type: 2,
              device_token: "1234",
              app_version: 100,
              device_id: localStorage.getItem('user')
            })
            .success(function(data, status) {
              if (typeof data === 'string')
                var data = JSON.parse(data);
              console.log(data);
              // vm.flagPopUps(data.flag,data.is_error);
              if (data.is_error == 0) {
                  if (data.access_token) localStorage.setItem('portalToken', data.access_token);
                  if (data.user_address.length > 0) localStorage.setItem('userAddress', JSON.stringify(data.user_address))
                  else localStorage.setItem('userAddress',[]);
                  if (data.user_cards.length > 0) localStorage.setItem('userCards', JSON.stringify(data.user_cards))
                  else localStorage.setItem('userCards',[]);
                  if (data.user_profile) localStorage.setItem('userProfile', JSON.stringify(data.user_profile));
                  vm.user_name=JSON.parse(localStorage.getItem('userProfile')).user_name;
                  if (data.countries) {
                      localStorage.setItem('userCountries', JSON.stringify(data.countries));
                      vm.countries = data.countries;
                  }
                  // localStorage.setItem("categories",JSON.stringify(data.categories));
                  $rootScope.loggedIn = true;
                  localStorage.setItem('loggedIn',1);
                  if(localStorage.getItem('userAddress'))$rootScope.userAddress = JSON.parse(localStorage.getItem('userAddress'));
                  else $rootScope.userCards=[];
                  if(localStorage.getItem('userCards'))$rootScope.userCards = JSON.parse(localStorage.getItem('userCards'));
                  else $rootScope.userCards=[];
                  $rootScope.userProfile = JSON.parse(localStorage.getItem('userProfile'));

              }
            });
        // }
      };
      vm.dtOptions = {
        "scrollX": true
      };


      vm.logout = function() {
        cfpLoadingBar.start();
          $.post(api.url + "admin_logout", {
              access_token: localStorage.getItem('portalToken'),
              device_type: 0,
              device_id: localStorage.getItem('user')
          })
              .success(function (data, status) {
            if (typeof data === 'string')
              var data = JSON.parse(data);

            console.log(data);
            ngDialog.close();
            localStorage.removeItem('portalToken');
            toaster.pop('success', 'Logged Out Successfully', '');
            $state.go('home');
            cfpLoadingBar.complete();
          });
      };

      vm.dataURItoBlob = function(dataURI, id) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {
          type: 'image/jpeg'
        });
        console.log(blob);
        return blob;
      };


      vm.processfile = function(file) {
        console.log(file);
        if (!(/image/i).test(file.type)) {
          alert("File " + file.name + " is not an image.");
          return false;
        }
        var blob = '';
        // read the files
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function(event) {
          var blob = new Blob([event.target.result]);
          window.URL = window.URL || window.webkitURL;
          var blobURL = window.URL.createObjectURL(blob);
          var image = new Image();
          image.src = blobURL;
          image.onload = function() {
            var resized = vm.resizeMe(image);
            // console.log(resized);
            blob = vm.dataURItoBlob(resized);
            console.log(blob);
            vm.file = blob;
            console.log(vm.file);
          }
        };

      }

      vm.resizeMe = function(img) {

        var canvas = document.createElement('canvas');

        var width = img.width;
        var height = img.height;
        var max_width = 1024;
        var max_height = 720;
        if (width > height) {
          if (width > max_width) {
            height = Math.round(height *= max_width / width);
            width = max_width;
          }
        } else {
          if (height > max_height) {
            width = Math.round(width *= max_height / height);
            height = max_height;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg", 0.7);
      }



    }
  }
})();

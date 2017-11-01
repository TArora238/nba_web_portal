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
      $scope.mCtrl.checkDoctorToken();


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
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.maxSize = 5;
        vm.skip = 0;
        vm.pageChanged = function (currentPage) {
            vm.currentPage = currentPage;
            for (var i = 1; i <= vm.totalItems / 10 + 1; i++) {
                if (vm.currentPage == i) {
                    vm.skip = 10 * (i - 1);
                }
            }
            vm.customers = [];
            vm.initTable();
        };
      vm.initTable = function() {
        cfpLoadingBar.start();

        $.post(api.url + "user_list",{
            access_token: localStorage.getItem('adminToken'),
            limit: 10,
            offset: vm.skip
        })
          .success(function(data, status) {
                  cfpLoadingBar.complete();
            if (typeof data === 'string') data = JSON.parse(data);
            console.log(data);
            $scope.mCtrl.flagPopUps(data.flag, data.is_error);
            $timeout(function () {
                vm.customers = data.all_users;
                vm.totalItems = data.all_users.length;
                console.log(vm.customers)
            })
          });
      };
      vm.initTable();

        vm.blockConfirm = function (id, is_blocked) {
            vm.is_blocked = is_blocked;
            vm.id = id;
            if (is_blocked) {
                vm.blocked = "unblock";
            } else {
                vm.blocked = "block";
            }
            vm.ngDialogPop('block_user_modal','smallPop');
        };

        vm.block_user = function () {
            cfpLoadingBar.start();
            if (vm.is_blocked)
                vm.is_blocked = 0;
            else
                vm.is_blocked = 1;

            $.post(api.url + 'block_unblock_user', {
                access_token: localStorage.getItem('adminToken'),
                user_id: vm.id,
                block_unblock: vm.is_blocked
            }).success(function (data, status) {
                if (typeof data === 'string')
                    var data = JSON.parse(data);
                console.log(data);
                $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                if (data.is_error == 0) {
                    ngDialog.close();
                    $state.reload();
                }
            });

        }
    }
  }
})();

/**=========================================================
 * Module: Verified Artists List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.artists')
        .controller('VerifiedArtistsController', VerifiedArtistsController);

    VerifiedArtistsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function VerifiedArtistsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


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
            vm.currentPage = 1;
            vm.itemsPerPage = 10;
            vm.maxSize = 5;
            vm.skip = 0;
            vm.pageChanged = function (currentPage) {
                vm.currentPage = currentPage;
                for (var i = 1; i <= vm.totalItems / 10 + 1; i++) {
                    if (vm.currentPage == i) {
                        vm.skip = 10 * (i - 1);
                    }
                }
                vm.customers = [];
                vm.initTable();
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "artist_list",{
                    access_token: localStorage.getItem('adminToken'),
                    limit: 10,
                    offset: vm.skip
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.artists = data.all_artists;
                            vm.totalItems = data.all_artists.length;
                            console.log(vm.customers)
                        })
                    });
            };
            vm.initTable();

            vm.blockConfirm = function (id, is_blocked) {
                vm.is_blocked = is_blocked;
                vm.id = id;
                if (is_blocked) {
                    vm.blocked = "unblock";
                } else {
                    vm.blocked = "block";
                }
                vm.ngDialogPop('block_artist_modal','smallPop');
            };

            vm.block_artist = function () {
                cfpLoadingBar.start();
                if (vm.is_blocked)
                    vm.is_blocked = 0;
                else
                    vm.is_blocked = 1;

                $.post(api.url + 'block_unblock_artist', {
                    access_token: localStorage.getItem('adminToken'),
                    artist_id: vm.id,
                    block_unblock: vm.is_blocked
                }).success(function (data, status) {
                    if (typeof data === 'string')
                        var data = JSON.parse(data);
                    console.log(data);
                    $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                    if (data.is_error == 0) {
                        ngDialog.close();
                        $state.reload();
                    }
                });

            }
        }
    }
})();



/**=========================================================
 * Module: Unverified Artists List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.artists')
        .controller('UnverifiedArtistsController', UnverifiedArtistsController);

    UnverifiedArtistsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function UnverifiedArtistsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


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
            vm.currentPage = 1;
            vm.itemsPerPage = 10;
            vm.maxSize = 5;
            vm.skip = 0;
            vm.pageChanged = function (currentPage) {
                vm.currentPage = currentPage;
                for (var i = 1; i <= vm.totalItems / 10 + 1; i++) {
                    if (vm.currentPage == i) {
                        vm.skip = 10 * (i - 1);
                    }
                }
                vm.customers = [];
                vm.initTable();
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "unverified_artist_list",{
                    access_token: localStorage.getItem('adminToken'),
                    limit: 10,
                    offset: vm.skip
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.artists = data.all_artists;
                            vm.totalItems = data.all_artists.length;
                            console.log(vm.customers)
                        })
                    });
                $.get(api.url + "get_artist_lists")
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
                $.post(api.url + "serving_areas",{
                    access_token: localStorage.getItem('adminToken')
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.areaList = data.serving_areas;
                            console.log(vm.areaList);
                            vm.selectedArea = [];
                            vm.areaCheck = [];
                            for(var i=0;i<vm.areaList;i++){
                                vm.areaCheck[i]=false;
                            }
                        })
                    });
            };
            vm.initTable();
            vm.chooseArea = function(area, index) {
                console.log(area, index);
                console.log(vm.areaCheck[index]);

                if (vm.areaCheck[index]) {
                    if (vm.selectedArea.indexOf(area) == -1)
                        vm.selectedArea.push(area);

                } else {
                    vm.selectedArea.splice(vm.selectedArea.indexOf(area), 1)
                }


                console.log(vm.selectedArea);
                console.log(vm.areaCheck);
            };
            vm.verifyArtist = function (data) {
                vm.artist=data;
                vm.ngDialogPop('verify_artist_modal','bigPop');
            };
            vm.verifyFn = function () {
              if(vm.selectedArea.length==0){
                  toaster.pop("warning","Choose at least one area for the artist to serve in.","");
                  return false;
              }
              vm.areas='';
              for (var i=0;i<vm.selectedArea.length;i++){
                  vm.areas+=vm.selectedArea[i];
                  if(i!=vm.selectedArea.length-1)vm.areas+=',';
              }
                $.post(api.url + "verify_artist",{
                    access_token: localStorage.getItem('adminToken'),
                    artist_id: vm.artist.artist_id,
                    serving_areas:vm.areas
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            if (data.is_error == 0) {
                                ngDialog.close();
                                $state.reload();
                            }
                        })
                    });
            }
        }
    }
})();



/**=========================================================
 * Module: Areas List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.areas')
        .controller('AreasController', AreasController);

    AreasController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function AreasController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "serving_areas",{
                    access_token: localStorage.getItem('adminToken')
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.areaList = data.serving_areas;
                            console.log(vm.customers)
                        })
                    });
            };
            vm.initTable();

        }
    }
})();

/**=========================================================
 * Module: Cancelled List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bookings')
        .controller('CancelledBookingsController', CancelledBookingsController);

    CancelledBookingsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function CancelledBookingsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "cancelled_bookings",{
                    access_token: localStorage.getItem('adminToken'),
                    area_id: localStorage.getItem('area_id')||1
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.cancelledList = data.all_bookings;
                            vm.totalItems = data.all_bookings.length;
                            console.log(vm.cancelledList)
                        })
                    });
            };
            vm.initTable();

        }
    }
})();



/**=========================================================
 * Module: Finished List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bookings')
        .controller('FinishedBookingsController', FinishedBookingsController);

    FinishedBookingsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function FinishedBookingsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "finished_bookings",{
                    access_token: localStorage.getItem('adminToken'),
                    area_id: localStorage.getItem('area_id')||1
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.finishedList = data.all_bookings;
                            vm.totalItems = data.all_bookings.length;
                            console.log(vm.finishedList)
                        })
                    });
            };
            vm.initTable();

        }
    }
})();


/**=========================================================
 * Module: Ongoing List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bookings')
        .controller('OngoingBookingsController', OngoingBookingsController);

    OngoingBookingsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function OngoingBookingsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "ongoing_bookings",{
                    access_token: localStorage.getItem('adminToken'),
                    area_id: localStorage.getItem('area_id')||1
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.ongoingList = data.all_bookings;
                            vm.totalItems = data.all_bookings.length;
                            console.log(vm.ongoingList)
                        })
                    });
            };
            vm.initTable();

        }
    }
})();


/**=========================================================
 * Module: Paid List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bookings')
        .controller('PaidBookingsController', PaidBookingsController);

    PaidBookingsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function PaidBookingsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "paid_bookings",{
                    access_token: localStorage.getItem('adminToken'),
                    area_id: localStorage.getItem('area_id')||1
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.paidList = data.all_bookings;
                            vm.totalItems = data.all_bookings.length;
                            console.log(vm.paidList)
                        })
                    });
            };
            vm.initTable();

        }
    }
})();


/**=========================================================
 * Module: To Be Accepted List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bookings')
        .controller('TBABookingsController', TBABookingsController);

    TBABookingsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function TBABookingsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "tobeaccepted_bookings",{
                    access_token: localStorage.getItem('adminToken'),
                    area_id: localStorage.getItem('area_id')||1
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.tobeAcceptedList = data.all_bookings;
                            vm.totalItems = data.all_bookings.length;
                            console.log(vm.tobeAcceptedList)
                        })
                    });
            };
            vm.initTable();

        }
    }
})();


/**=========================================================
 * Module: Upcoming List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bookings')
        .controller('UpcomingBookingsController', UpcomingBookingsController);

    UpcomingBookingsController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function UpcomingBookingsController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "upcoming_bookings",{
                    access_token: localStorage.getItem('adminToken'),
                    area_id: localStorage.getItem('area_id')||1
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.upcomingList = data.all_bookings;
                            vm.totalItems = data.all_bookings.length;
                            console.log(vm.upcomingList)
                        })
                    });
            };
            vm.initTable();

        }
    }
})();


/**=========================================================
 * Module: Category List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.category')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function CategoryController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "categories_list",{
                    access_token: localStorage.getItem('adminToken'),
                    area_id: localStorage.getItem('area_id')||1
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.categories = data.categories;
                            vm.totalItems = vm.categories.length;
                            console.log(vm.categories);
                        })
                    });
            };
            vm.initTable();
            vm.viewServices = function (data) {
                localStorage.setItem("cat_id",data.category_id);
                $state.go("app.services");
            }
        }
    }
})();



/**=========================================================
 * Module: Category Service List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.category')
        .controller('CategoryServicesController', CategoryServicesController);

    CategoryServicesController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function CategoryServicesController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "services_list",{
                    access_token: localStorage.getItem('adminToken'),
                    category_id: localStorage.getItem('cat_id')
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.services = data.services;
                            vm.totalItems = vm.services.length;
                            console.log(vm.services);
                        })
                    });
            };
            vm.initTable();
            vm.viewAddServices = function (data) {
                localStorage.setItem("catServ_id",data.service_id);
                $state.go("app.additionalServices");
            }
        }
    }
})();


/**=========================================================
 * Module: Additional Service List
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.category')
        .controller('AdditionalServicesController', AdditionalServicesController);

    AdditionalServicesController.$inject = ['$http', '$state', '$rootScope', 'toaster', '$scope', 'cfpLoadingBar', 'api', '$timeout', 'ngDialog'];

    function AdditionalServicesController($http, $state, $rootScope, toaster, $scope, cfpLoadingBar, api, $timeout, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $scope.mCtrl.checkToken();
            $scope.mCtrl.checkDoctorToken();


            vm.dtOptions = {
                "scrollX": true
            };
            vm.initTable = function() {
                cfpLoadingBar.start();

                $.post(api.url + "as_list",{
                    access_token: localStorage.getItem('adminToken'),
                    service_id: localStorage.getItem('catServ_id')
                })
                    .success(function(data, status) {
                        cfpLoadingBar.complete();
                        if (typeof data === 'string') data = JSON.parse(data);
                        console.log(data);
                        $scope.mCtrl.flagPopUps(data.flag, data.is_error);
                        $timeout(function () {
                            vm.additionalServices = data.additional_services;
                            vm.totalItems = vm.additionalServices.length;
                            console.log(vm.additionalServices);
                        })
                    });
            };
            vm.initTable();
        }
    }
})();


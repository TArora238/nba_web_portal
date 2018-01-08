/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        // $locationProvider.html5Mode(false);
        $locationProvider.html5Mode(false).hashPrefix('');
        // defaults to dashboard
        $urlRouterProvider.otherwise('/home');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
          .state('main', {
                url: '',
                abstract: true,
                resolve: helper.resolveFor('modernizr', 'inputmask','icons','moment','ngDialog','toaster'),
                controller: 'mainController'
            })
          .state('home', {
              url: '/home',
              title: 'Home',
              resolve: helper.resolveFor('modernizr', 'icons','loaders.css','inputmask', 'ngDialog', 'spinkit','angular-carousel'),
              templateUrl: 'app/pages/home.html'
          })
          .state('faq', {
              url: '/faq',
              title: 'FAQ',
              resolve: helper.resolveFor('modernizr', 'icons','loaders.css','inputmask', 'ngDialog', 'spinkit'),
              templateUrl: 'app/pages/faq.html'
          })
          .state('terms', {
              url: '/terms',
              title: 'Terms',
              resolve: helper.resolveFor('modernizr', 'icons','loaders.css','inputmask', 'ngDialog', 'spinkit'),
              templateUrl: 'app/pages/terms.html'
          })
          .state('support', {
              url: '/support',
              title: 'Support',
              resolve: helper.resolveFor('modernizr', 'icons','loaders.css','inputmask', 'ngDialog', 'spinkit'),
              templateUrl: 'app/pages/support.html'
          })
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor( 'modernizr','inputmask', 'ngDialog', 'icons',  'animo',  'toaster', 'loaders.css', 'spinkit','easypiechart')
              // 'fastclick','screenfull','sparklines', 'slimscroll', 'easypiechart','whirl',
          })
            .state('app.location', {
                url: '/location',
                title: 'Location',
                templateUrl: 'app/views/location.html',
                resolve:helper.resolveFor('icons')
            })
            .state('app.categories', {
                url: '/categories',
                title: 'Categories',
                templateUrl: 'app/views/categoryList.html',
                resolve:helper.resolveFor('icons')
            })
            .state('app.subService', {
                url: '/subService',
                title: 'Sub Service',
                templateUrl: 'app/views/subService.html',
                resolve:helper.resolveFor('icons')
            })
            .state('app.bookingTime', {
                url: '/bookingTime',
                title: 'Booking Time',
                templateUrl: 'app/views/bookingTime.html',
                resolve:helper.resolveFor('modernizr', 'icons','ngDialog','inputmask','loaders.css', 'spinkit')
            })

            .state('app.details', {
                url: '/details',
                title: 'Details',
                templateUrl: 'app/views/details.html',
                resolve:helper.resolveFor('modernizr', 'icons','ngDialog','inputmask','loaders.css', 'spinkit')
            })

            .state('app.payment', {
                url: '/payment',
                title: 'Payment',
                templateUrl: 'app/views/payment.html',
                resolve:helper.resolveFor('modernizr', 'icons','ngDialog','inputmask','loaders.css', 'spinkit')
            })
            .state('app.thanks', {
                url: '/thanks',
                title: 'Thanks',
                templateUrl: 'app/views/thanks.html',
                resolve:helper.resolveFor('modernizr', 'icons','ngDialog','inputmask','loaders.css', 'spinkit')
            })


    }
})();

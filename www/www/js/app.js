// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


 

 var posttime;
 posttime = 0;
angular.module('starter', ['ionic','firebase', 'starter.controllers', 'starter.services', 'ngStorage', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // new added custom part  setup an abstract state for the tabs directive
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  .state('splash', {
      url: '/splashurl',
      templateUrl: 'templates/splash.html',
      controller: 'splashctrl'
  })
  
  .state('signinandsignupscreen', {
      url: '/signinandsignup',
      templateUrl: 'templates/signandsignup.html',
      controller: 'signinandsignup'
  })
  .state('signupscreen', {
      url: '/signupscreenurl',
      templateUrl: 'templates/signupscreen.html',
      controller: 'signupscreenctrl'
  })
  .state('mainboard',{
     url: '/mainboardurl',
      templateUrl: 'templates/mainboard.html',
      controller: 'mainboardctrl'
  })
  
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.mainboard', {
    url: '/mainboard',
    views: {
      'tab-dash': {
        templateUrl: 'templates/mainboard.html',
        controller: 'mainboardctrl'
      }
    }
  })
  .state('test-dash',{
      url:'/test',
      templateUrl:'templates/test-dash.html',
      controller:'testCtrl'               
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
.state('postview', {
  url: '/postviewurl',
    templateUrl: 'templates/postview.html',
    controller: 'postviewctrl'
  })
  
  .state('processview', {
  url: '/processviewurl',
    templateUrl: 'templates/processview.html',
    controller: 'processviewctrl'
  })
  .state('Leapview1',{
     url: '/Leapview1url',
      templateUrl: 'templates/Leapview1.html',
      controller: 'Leapview1ctrl'
  })
  .state('Bottomview',{
     url: '/Bottomviewurl',
      templateUrl: 'templates/Bottomview.html',
      controller: 'Bottomviewctrl'
  })
   .state('mainboardlistcellpostview',{
     url: '/mainboardlistcellpostviewurl',
      templateUrl: 'templates/mainboardlistcellpostview.html',
      controller: 'mainboardlistcellpostviewctrl'
  })
  .state('usercreateview', {
  url: '/usercreateurl',
    templateUrl: 'templates/usercreateview.html',
    controller: 'usercreatectrl'
  })
  
  .state('postdetailview', {
  url: '/postdetailviewurl',
    templateUrl: 'templates/postdetailview.html',
    controller: 'postdetailviewctrl'
  })
  
  
 // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/signinandsignup');
   $urlRouterProvider.otherwise('/splashurl');

});

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope,$state, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.goback = function(){
      console.log('backbuttonclick!!!');
      $state.go('tab.chats');
  }
})


// ********** loginview part **********
.controller('LoginCtrl',function($scope,$state, $ionicPopup, $location, $http, UserService, APIService)
{
    $scope.goBack = function(){
        console.log('login to sign and sign up');
        $state.go('signinandsignupscreen')
    }
    
    $scope.user = {
        username: '',
        password: ''
    }
    
    $scope.nextPage = function(){
            
        firebase.auth().signInWithEmailAndPassword(
            $scope.user.username,
            $scope.user.password
        ).then(function(authData){
            alert('login success');
            userID = authData.uid;
            userName = authData.username;
            userEmail = authData.email;

            console.log(userID);
            $state.go('tab.mainboard');
        },function(error) {
            alert('Please input correct userinfo');
        });      
        console.log($scope.user.username);
        console.log($scope.user.password); 
     }
})


//***************************
// signinandsignup view part
// **************************
.controller('signinandsignup',function($scope,$state)
{
    $scope.loginscreen = function(){
         $state.go('login')
    }
     $scope.signupscreen = function(){
         $state.go('signupscreen')
    }
})
//***************************
// signupscreen view part
// **************************
.controller('signupscreenctrl',function($scope,$state)
{
    $scope.user = {
        useremail:'',
        userpassword:'',
        firstname:'',
        lastname:''
    }
    
     var username_length = $scope.user.useremail.value;
     var userpsw_length = $scope.user.userpassword.value;
        
    $scope.User_create_btnevent = function(){
       // console.log('test1');
        console.log($scope.user.useremail);
         if(Object.keys($scope.user.useremail).length == 0 || Object.keys($scope.user.userpassword).length == 0 || Object.keys($scope.user.firstname).length == 0 || Object.keys($scope.user.lastname).length == 0){
             alert('please input each form');
            
         }
        else{
             firebase.auth().createUserWithEmailAndPassword
         ($scope.user.useremail, 
         $scope.user.userpassword)
            .then(function(authData){
            console.log(authData);
            
 
            var user_id = authData.uid;
            console.log(user_id); 
            
            firebase.database().ref('Users/' + user_id).set({
                username:$scope.user.firstname,
                email:$scope.user.useremail,
            }).then(function(){
                alert('Created your account successfully.Please login with that');
            });
              
              
         },function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('User create error!');
             });
          }
          
          //$state.go('signinandsignupscreen')
        }
      

        
        
        
        
    
    $scope.leftbuttonclick = function(){
        console.log('asdfasdgasdf');
        $state.go('signinandsignupscreen')
    }
})
// ****************** mainboard view part ********
.controller('mainboardctrl',function($scope,$state,$http, $rootScope, Mainboarddata)
{
     var titlebar_storytype_view =  document.getElementById("titlebar_storytype_view_id");
     titlebar_storytype_view.style.backgroundImage='url(img/story_progress_title.png)'; 

        
     $scope.leftbuttonclick = function(){
         titlebar_storytype_view.style.backgroundImage='url(img/story_progress_title.png)'; 
     }
     
     $scope.rightbuttonclick = function(){
         titlebar_storytype_view.style.backgroundImage='url(img/story_publish_title.png)'; 
     }
     
   $scope.$on('$ionicView.beforeEnter', function(){
          firebase.database().ref('/PostData/').once('value').then(function(snapshot){
               $scope.Postdata = snapshot.val();
                console.log($scope.Postdata);                
    });

   })
     
   
   
    
    
    $scope.mainboarddata = Mainboarddata.all();
    $scope.remove = function(data) {
    Mainboarddata.remove(data);
    };
})
.controller('mainboardlistcellpostviewctrl',function($scope,$state, $rootScope)
{
    $scope.$on('$ionicView.beforeEnter', function() {
        $scope.celldata = $rootScope.chat;
    });
    
    console.log($rootScope.chat);
    $scope.goBack = function(){
    $state.go('tab.mainboard');
    
    }
    $scope.increasecommitnumber = function() {
        console.log($scope.celldata.commentstxt);
        var numComment = parseInt($scope.celldata.commentstxt) + 1;
        $scope.celldata.commentstxt = numComment;
    }
})

.controller('ChatsCtrl',function($scope,$state, Chats, UserService)
 {
    $scope.chats = Chats.all();
    // $scope.gologout = function(){
        // $scope.userInfo = {};
        // UserService.setUser($scope.userInfo);
        // console.log(UserService.getUser());
        // $state.go('splash');
        
        
        
        
          console.log("lets go out!1!");
     
      $scope.goProfile = function(){
        console.log('chatgotoprofile button clicked!');
    }
    
     
    $scope.postbuttonclick = function(){
        console.log('chatpost1buttonclicked!!!');
        $state.go('postview');
    }
    
    $scope.Processbuttonclick = function(){
        console.log('chatProcessbuttonclicked!!!');
         $state.go('processview');
    }
    
    $scope.Leapbuttonclick = function(){
        console.log('chatLeapbuttonclicked!!!');
          $state.go('Leapview1');
    }
    
    $scope.Bottombuttonclick = function(){
        console.log('chatBottombuttonclicked!!!');
         $state.go('Bottomview');
        
    }
 })
 // profile view part=============
 .controller('AccountCtrl', function($scope,$state,$http, Chats, UserService,$rootScope, Mainboarddata) {
  
   var post_count = 0;
  $scope.settings = {
    enableFriends: true
  };

  $scope.user = {
      posttile_txt:'',
      postcontent_txt:''
  }
        $scope.postbutton_clicked = function(){
            console.log('post!!!');
            console.log($scope.user.postcontent_txt);

            
            var userId = firebase.auth().currentUser.uid;
            var userName;
            var userEmail;
           
            var post_title;
            firebase.database().ref('/Users/' + userId).once('value').then(function(snapshot){
                userName = snapshot.val().username;
                userEmail = snapshot.val().email;
                console.log(userName);
               

            firebase.database().ref('PostData').once('value').then(function(snapshot){
               $scope.Postdata = snapshot.val();
                console.log($scope.Postdata);
                post_count = Object.keys(snapshot.val()).length;
                console.log(post_count);  
                post_count++;
               console.log(post_count);  
               post_title = 'Post'+ post_count;
               console.log(post_title);


                firebase.database().ref('PostData/' + post_title).set({
                                        userid:userId,
                                        username:userName,
                                        email:userEmail,
                                        posttitle:$scope.user.posttile_txt,
                                        content:$scope.user.postcontent_txt,
                            }).then(function(){
                                alert('Your post success!!');
                                post_count = 0;
                            });
            
               });             
            });
        }
})
// **************postview part *************
.controller('postviewctrl',function($scope,$state, $ionicViewService)
{
    $scope.goBack = function(){
        console.log('back button!!!');
        $state.go('tab.mainboard');
        // $ionicViewService.getBackView().go();
    }
    $scope.cancelbuttonclick = function(){
        $state.go('tab.mainboard');
    }
    $scope.postbuttonclick = function(){
         console.log('postview postbutton click!!!');
        // $state.go('tab.mainboard');
    }
})
.controller('processviewctrl',function($scope,$state,$ionicViewService)
{
    $scope.goBack = function(){
        console.log('back button!!!');
        // $ionicViewService.getBackView().go();
        $state.go('tab.mainboard');
    }
    $scope.cancelbuttonclick = function(){
        $state.go('tab.mainboard');
    }
    $scope.postbuttonclick = function(){
        // $state.go('tab.mainboard');
        console.log('processview postbutton click!!!');
    }
})
.controller('Leapview1ctrl',function($scope,$state, $ionicViewService)
{
    $scope.goBack = function(){
        console.log('back button!!!');
        // $ionicViewService.getBackView().go();
        $state.go('tab.mainboard');
    }
    $scope.cancelclick = function(){
        // console.log('cancelbuttonclick!!!');
        $state.go('tab.mainboard');
    }
    $scope.postclick = function(){
        console.log('postbuttonclick!!!!');
    }
    
})

.controller('Bottomviewctrl',function($scope,$state, $ionicViewService)
{
    $scope.goBack = function(){
        console.log('back button!!!');
        // $ionicViewService.getBackView().go();
        $state.go('tab.mainboard');
    }
    $scope.cancelbuttonclick = function(){
        $state.go('tab.mainboard');
    }
    $scope.postbuttonclick = function(){
        console.log('postbuttonclick!!!!');
    }
})
.controller('NavCtrl', function ($scope, $ionicLoading, $location, $state, $ionicSideMenuDelegate, $rootScope, $ionicSlideBoxDelegate, $ionicPopup) {
    
    // Side menu init Method
    $scope.init = function() {

    }
    
    // Side menu toggleLeft method
    $rootScope.showMenu = function() {
        
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    // Side menu toggleRight method
    $scope.showRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
})

.controller('splashctrl', function ($scope, $timeout, $state, UserService) {
    
    $scope.$on('$ionicView.beforeEnter', function() {
        $timeout($scope.nextScreen, 1500)
    });
    $scope.init = function (){ 
        console.log("Timeer start");
        //  $timeout($scope.nextScreen, 5000)
    }
    $scope.nextScreen = function () {
        console.log("Timeer end");
        var isLogged = UserService.getUser();
        if (isLogged != null && UserService.getUser().isLogged) {
            $state.go('tab.mainboard')
        }else {
            $state.go('signinandsignupscreen');
        }
    }
})                 
// ****************************
// User Create view part
// ****************************
.controller('usercreatectrl',function($scope,$state)
{
    $scope.goBack = function(){
    console.log('back button!!!');
    $state.go('tab.account');
    }
})
// ******************************
// Postdetailview
// ******************************
.controller('postdetailviewctrl',function($scope,$state,$rootScope)
{
     $scope.$on('$ionicView.beforeEnter', function() {
         $rootScope.celldata = $rootScope.chat;
          console.log($rootScope.celldata);
     });
    
     $scope.goBack = function(){
    // console.log('back button!!!');
     $state.go('tab.mainboard');
     }
     $scope.likebuttonclick = function()
     {
         console.log('likeclick!');
         var numlike = parseInt($scope.celldata.likenumber) +1;
         $scope.celldata.likenumber = numlike;
     }
     $scope.commentbuttonclick = function()
     {
         console.log('commentbuttonclick!');
         var numcomment =  parseInt($scope.celldata.level) +1;
         $scope.celldata.level = numcomment;
     }
})
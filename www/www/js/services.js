angular.module('starter.services', [])

.constant('ApiEndpoint', {
        // url: 'http://localhost/backend_memoryLane/api'
        url: 'http://ambo2.serenit.com.au/database.php'
    })
.service('UserService', function() {
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var setUser = function(user_data) {
        window.localStorage.user_info = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.user_info || '{}');
    };
    
    return {
        getUser: getUser,
        setUser: setUser
    };
 })
.factory('Mainboarddata',function(){
    var mainboarddata = [{
        id:0,
        detailphoto:'img/ben.png',
        name:'jeremy bivaud',
        lasttext:'4 days ago',
        backimg:'img/logoblue.png',
        moretxt:'Responses',
        likesnumber:'12',
        likestxt:'like(s)',
        commentstxt:'7',
        onlineoninfor:'0',
        likeres:'1',
        loveres:'1',
        evilres:'1',
        namasteres:'1',
        postdetailtext:'Show a popup to offer to delete the post if you creatd it.Visible only if the element is created by you it opens the post creation screen with the fields with repopulation'
    },
    {
        id:1,
        detailphoto:'img/perry.png',
        name:'Peter Leslie',
        lasttext:'7 days ago',
        backimg:'img/logored.png',
        moretxt:'Responses',
        likesnumber:'2',
        likestxt:'like(s)',
        commentstxt:'2',
        onlineoninfor:'1',
         likeres:'1',
        loveres:'0',
        evilres:'0',
        namasteres:'1',
        postdetailtext:'Show a popup to offer to delete the post if you creatd it.Visible only if the element is created by you it opens the post creation screen with the fields with repopulation'
    },
    {
        id:2,
        detailphoto:'img/max.png',
        name:'Max Lynx',
        lasttext:'5 days ago',
        backimg:'img/logogreen.png',
        moretxt:'Responses',
        likesnumber:'4',
        likestxt:'like(s)',
        commentstxt:'6',
        onlineoninfor:'0',
         likeres:'0',
        loveres:'0',
        evilres:'1',
        namasteres:'1',
        postdetailtext:'Show a popup to offer to delete the post if you creatd it.Visible only if the element is created by you it opens the post creation screen with the fields with repopulation'
    },
    {
         id:3,
        detailphoto:'img/mike.png',
        name:'mike Harrington',
        lasttext:'15 days ago',
        backimg:'img/logoblue.png',
        moretxt:'Responses',
        likesnumber:'10',
        likestxt:'like(s)',
        commentstxt:'8',
        onlineoninfor:'1',
         likeres:'0',
        loveres:'1',
        evilres:'0',
        namasteres:'1',
        postdetailtext:'Show a popup to offer to delete the post if you creatd it.Visible only if the element is created by you it opens the post creation screen with the fields with repopulation'
    }
    ];
    return {
        all:function(){
            return mainboarddata;
        },
        remove:function(data){
          mainboarddata.splice(mainboarddata.indexOf(data),1);  
        },
        get:function(dataId){
            for(var i = 0;i < mainboarddata.length;i++){
                if (mainboarddata[i].id === parseInt(dataId)) {
                    return mainboarddata[i];
                }
            }
           return null;
        }
        
    };
})
.factory('APIService', function ($resource,ApiEndpoint) { // Using ngResource service ,good
        var data = $resource(
            ApiEndpoint.url,
            {},
            {
                login: {
                    url: ApiEndpoint.url,
                    method:'POST',
                    headers: { 
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    } 
                },              
               
                orderNow: {
                    url: ApiEndpoint.url + '/pages/orderNow',
                    method:'POST'
                }
            });
        return data;
    })
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

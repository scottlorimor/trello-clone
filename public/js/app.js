// Code here for your app.js to test the endpoint

// var app = angular.module('trello', ['ui.router'])

// app.config(function($stateProvider, $urlRouterProvider) {

// 	$urlRouterProvider.otherwise('/');

// 	$stateProvider
// 		.state('auth', {
// 			url: '/',
// 			templateUrl: '../views/authView.html',
// 			controller: 'authCtrl'
// 		})

// 		.state('list', {
// 			url: '/list',
// 			templateUrl: 'views/listView.html',
// 			controller: 'listCtrl'
// 		})
// });


// When you are done testing your own endpoint, comment out or erase your code, and use the code from below to test the trello app


var app = angular.module('trelloClone', ['ui.router']);

app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('auth', {
            url: '/',
            controller: 'AuthCtrl',
            templateUrl: '../views/authView.html'
        })
        .state('todo', {
            url: '/list',
            controller: 'MainCtrl',
            templateUrl: '../views/mainView.html',
            resolve: {
                lists: function (listService) {
                    return listService.getLists();
                }
            }
        })
})

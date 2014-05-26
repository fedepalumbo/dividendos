'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/accounts', {templateUrl: 'partials/accounts.html', controller: 'AccountsCtrl'});
  $routeProvider.when('/dividendo', {templateUrl: 'partials/dividendo.html', controller: 'DividendoCtrl'});
  $routeProvider.when('/accounts/add', {templateUrl: 'partials/detailsAccount.html', controller: 'DetailsAccountCtrl'});
  $routeProvider.when('/accounts/:accountId', {templateUrl: 'partials/detailsAccount.html', controller: 'DetailsAccountCtrl'});
  $routeProvider.when('/accounts/:accountId/expenses/add', {templateUrl: 'partials/detailsExpense.html', controller: 'ExpensesCtrl'});
  $routeProvider.otherwise({redirectTo: '/accounts'});
}]);

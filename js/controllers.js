'use strict';

/* Controllers */

var accountsList = [];
var expensesList = [];

angular.module('myApp.controllers', [])
  
  .controller('AccountsCtrl', ['$scope', function($scope) {
			$scope.accounts = accountsList;

  }])
  
  .controller('DividendoCtrl', ['$scope', function($scope) {
		if($scope.participants === undefined) $scope.participants = [];
		
		$scope.calculate = function(){
			$scope.total = _.reduce(_.pluck($scope.participants, 'favor'), function(memo, num){ return parseInt(memo) + parseInt(num); }, 0);
			var count = parseInt(_.size($scope.participants));
			var each = $scope.total / count;
			var i=0;
			for(i; i<count; i++)
				$scope.participants[i].receives = each - parseInt($scope.participants[i].favor);
		};
		
  		$scope.addParticipant = function(){
  			$scope.participants.push({name: $scope.name, favor:$scope.favor, receives: 0});
  			$scope.name = "";
    		$scope.favor = "";
  			this.calculate();
  		};	
  		
  		$scope.remove = function(participantName){
  			var i=0;
  			for(i; i<_.size($scope.participants); i++)
				if($scope.participants[i].name == participantName)
					$scope.participants.splice(i, 1);

   			this.calculate();
  		};	
  }])
  
  .controller('ExpensesCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
  		$scope.accountId = $routeParams.accountId;  	
		$scope.accountDescription = _.findWhere(accountsList, {id: $routeParams.accountId}).description;
		
			$scope.addExpense = function() {
			expensesList.push({id:_.uniqueId(), description:$scope.description, accountId:$scope.accountId});
			$location.path('/accounts/' + $scope.accountId);
		};
		
  }])
  
  .controller('DetailsAccountCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
		if($routeParams.accountId === undefined)
  		{
	  		$scope.create = true;
  			$scope.accountId = undefined;
  		}
  		else
  		{
	  		$scope.create = false;
  			$scope.accountId = $routeParams.accountId;  	
  			$scope.description = _.findWhere(accountsList, {id: $routeParams.accountId}).description;	//findWhere devuelve un objeto
  			$scope.expenses = _.where(expensesList, {accountId: $routeParams.accountId});					//where devuelve una collection
  			$scope.expensesCount = _.size($scope.expenses);
  		}
  	
  	$scope.addAccount = function() {
  			if( _.size(_.where(accountsList, {id: $scope.accountId})) == 0) 
				accountsList.push({id:_.uniqueId(), description:$scope.description});	//Create
			//else //TODO: Modificar account
			
			$location.path('/');
		};
		
  }]);

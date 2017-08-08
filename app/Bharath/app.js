var app = angular.module("myApp", ["ui.bootstrap"]);
		
		app.directive('numberMask', function() {
		    return {
		        restrict: 'A',
		        link: function(scope, element, attrs) {
		            $(element).numeric();
		        }
		    }
		});
		app.controller("myCtrl", function($scope, $modal, $log) {
		    $scope.columns = [], $scope.rows = [], $scope.selection=[],  $scope.selectionRow=[];
;	

		    $scope.addColumn = function(){
		    	var modalInstance = $modal.open({
			      templateUrl: 'myModalContent.html',
			      controller: 'ModalInstanceCtrl',
			      size: 'lg',
			      resolve: {
			        parentScope: function () {
			          return $scope;
			        }
			      }
			    });

			   
		    	//$scope.columns.push({"name":});
		    };
		    $scope.addRow = function(){

		    	var rowDetails = [];
		    	for(var i=0; i<$scope.columns.length;i++){
		    		rowDetails.push({"type": $scope.columns[i].type, "value": "", "isEditable" : $scope.columns[i].isEditable});
		    	}
		    	$scope.rows.push(rowDetails);
		    	console.log($scope.rows);
			   
		    	//$scope.columns.push({"name":});
		    };
		    $scope.removeColumn = function(){
		    	console.log($scope.selection);
		    	if($scope.selection.length>0){
		    		var temp = [];
		    		
		    		
		    			for(var i = 0; i<$scope.selection.length; i++){
		    					for(var k = 0; k<$scope.columns.length; k++){
			    				if($scope.selection[i] == $scope.columns[k].name){
			    					
			    					$scope.columns.splice(k, 1);
			    					$scope.selection.splice(i, 1);
			    					break;
			    				}
		    				}
		    			}
		    			console.log($scope.columns);
		    	}
		    };

		    $scope.toggleSelection = function(columnName, selection) {

			     var idx = (selection == 1) ? $scope.selection.indexOf(columnName) : $scope.selectionRow.indexOf(columnName);

			     // is currently selected

			     if (idx > -1) {

			       (selection == 1) ? $scope.selection.splice(idx, 1) : $scope.selectionRow.splice(idx, 1);

			     }
			     // is newly selected

			     else {

			       (selection == 1) ? $scope.selection.push(columnName) : $scope.selectionRow.push(columnName);

			     }
			     console.log($scope.selection);
		    	console.log($scope.selectionRow);

			};

			
			$scope.removeRow = function(){
					var count = $scope.selectionRow.length;
					var temp_selection = angular.copy($scope.selectionRow);

						for(var i = 0; i<count; i++){
		    					for(var k = 0; k<$scope.rows.length; k++){
		    						if(temp_selection[i] == k ){
				    					$scope.rows.splice(k, 1);
				    					$scope.selectionRow.splice(temp_selection[i], 1);
				    					
				    					break;
				    				}

		    					}
		    					console.log($scope.selectionRow);

		    					
		    			}
		    			
			}

		});

		// Please note that $modalInstance represents a modal window (instance) dependency.
		// It is not the same as the $modal service used above.

		angular.module("myApp").controller("ModalInstanceCtrl", function ($scope, $modalInstance, parentScope) {

		 

		  $scope.addColumn = function () {
		   	parentScope.columns.push({"name": $scope.CN,"type": $scope.CT,"isEditable": $scope.editable});
		  	$modalInstance.dismiss('cancel');
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
		});


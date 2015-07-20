
zaa.directive('zaaInjector', function($compile) {
	return {
		restrict : 'E',
		replace : true,
		transclude : false,
		scope : {
			"dir" : '=',
			"model" : '=',
			"options" : '=',
			"label" : "@label",
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name',
			'placeholder' : '@placeholder',
			'initvalue' : '@initvalue',
		},
		link : function($scope, $element, attr) {
			var elmn = $compile(angular.element('<' + $scope.dir + ' options="options" initvalue="{{initvalue}}" id="{{id}}" name="{{name}}" placeholder="{{placeholder}}" model="model" label="{{label}}" grid="{{grid}}" />'))($scope);
			$element.replaceWith(elmn);
		},
	}
});

zaa.directive('zaaWysiwyg', function() {
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		template : function() {
			return '<textarea ng-wig="model" name="{{name}}"></textarea>';
		}
	}
});

zaa.directive('zaaNumber', function() {
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name',
			'placeholder' : '@placeholder'
		}, link: function($scope) {
			$scope.$watch(function() { return $scope.model }, function(n, o) {
				if(angular.isNumber($scope.model)) {
					$scope.isValid = true;
				} else {
					$scope.isValid = false;
				}
			})
		}, template : function() {
			return '<div class="input-field col s{{grid}}"><input placeholder="{{placeholder}}"  name="{{name}}" ng-class="{\'invalid\' : !isValid }" type="number" ng-model="model" min="0" /><label>{{label}}</label></div>';
		}
	}
});

zaa.directive('zaaText', function(){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name',
			'placeholder' : '@placeholder'
		},
        link : function(scope) {
        	scope.random = Math.random().toString(36).substring(7);
        },
		template : function() {
			return '<div class="input-field col s{{grid}}"><input placeholder="{{placeholder}}" id="{{random}}" name="{{name}}" ng-model="model" type="text" /><label for="{{random}}">{{label}}</label></div>';
		}
	}
});

zaa.directive('zaaTextarea', function(){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name',
			'placeholder' : '@placeholder'
		},
		link : function(scope) {
        	scope.random = Math.random().toString(36).substring(7);
        },
		template : function() {
			return '<div class="input-field col s{{grid}}"><textarea placeholder="{{placeholder}}" id="{{random}}"  name="{{name}}" ng-model="model" class="materialize-textarea"></textarea><label for="{{random}}">{{label}}</label></div>';
		}
	}
});

zaa.directive('zaaPassword', function(){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		template : function() {
			return '<div class="input-field col s{{grid}}"><input type="password" name="{{name}}" ng-model="model" /><label>{{label}}</label></div>';
		}
	}
});



zaa.directive('zaaSelect', function($timeout){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name',
			'initvalue' : '@initvalue'
		},
		link : function(scope) {
			$timeout(function(){
				scope.$watch(function() { return scope.model }, function(n, o) {
					if (n === undefined && o === undefined) {
						if (jQuery.isNumeric(scope.initvalue)) {
							scope.initvalue = parseInt(scope.initvalue);
						}
						scope.model = scope.initvalue;
					}
				})
			});
		},
		template : function() {
			return '<div class="col s{{grid}}"><label>{{label}}</label><select name="{{name}}" class="browser-default" ng-options="item.value as item.label for item in options" ng-model="model"></select></div>';
		}
	}
});

/** 
 * options arg object:
 * 
 * options.items[] = { 'id' : 1, 'label' => 'Label for Value 1' }
 */
zaa.directive('zaaCheckbox', function(){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name',
			'label' : '@label'
		},
		controller : function($scope) {
			
			if ($scope.model == undefined) {
				$scope.model = [];
			}
			
			$scope.toggleSelection = function (value) {
				for (var i in $scope.model) {
					if ($scope.model[i]['id'] == value.id) {
						$scope.model.splice(i, 1);
						return;
					}
				}
				$scope.model.push(value);
			}
			
			$scope.isChecked = function(item) {
				for (var i in $scope.model) {
					if ($scope.model[i]['id'] == item.id) {
						return true;
					}
				}
				return false;
			}
		},
		link : function(scope) {
			scope.random = Math.random().toString(36).substring(7);
		},
		template : function() {
			return '<div class="input-field col s{{grid}}"><h5>{{label}}</h5><p ng-repeat="(k, item) in options.items"><input type="checkbox" ng-checked="isChecked(item)" id="{{random}}_{{k}}" ng-click="toggleSelection(item)" /><label for="{{random}}_{{k}}">{{item.label}}</label></p></div>';
		}
	}
});

zaa.directive('zaaDatetime', function() {
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'id' : '@id',
			'name' : '@name',
			'grid' : '@grid'
		},
		controller : function($scope) {
			$scope.reform = function() {
				var date = new Date($scope.year, ($scope.month-1), $scope.day, $scope.hour, $scope.min);
				var mil = date.getTime();
				$scope.model = (mil/1000);
			}
			
			$scope.$watch(function() { return $scope.model }, function(n, o) {
				if (n !== undefined && n != o) {
					var date = new Date(n*1000);
					$scope.day = date.getDate(),
					$scope.month = date.getMonth() + 1;
					$scope.year = date.getFullYear();
					$scope.min = date.getMinutes();
					$scope.hour = date.getHours();
				}
			})
		},
		template : function() {
			return '<div class="col s{{grid}} form__datetimepicker">' +
						'<label>{{label}}</label>' +
						'<input ng-blur="reform()" type="text" ng-model="day" placeholder="Tag" />.' +
						'<input ng-blur="reform()" type="text" ng-model="month" placeholder="Monat" />.' + 
						'<input ng-blur="reform()" type="text" ng-model="year" placeholder="Jahr" /> - ' + 
						'<input ng-blur="reform()" type="text" ng-model="hour" placeholder="Stunde" />:' +
						'<input ng-blur="reform()" type="text" ng-model="min" placeholder="Minute" />' +
					'</div>';
		}
	}
});

zaa.directive('zaaDate', function() {
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'id' : '@id',
			'name' : '@name',
			'grid' : '@grid'
		},
		controller : function($scope) {
			$scope.reform = function() {
				var date = new Date($scope.year, ($scope.month-1), $scope.day);
				var mil = date.getTime();
				$scope.model = (mil/1000);
			}
			
			$scope.$watch(function() { return $scope.model }, function(n, o) {
				if (n !== undefined && n != o) {
					var date = new Date(n*1000);
					$scope.day = date.getDate(),
					$scope.month = date.getMonth() + 1;
					$scope.year = date.getFullYear();
				}
			})
		},
		template : function() {
			return '<div class="col s{{grid}} form__datepicker">' +
						'<label>{{label}}</label>' +
						'<input ng-blur="reform()" type="text" ng-model="day" placeholder="Tag" />.' +
						'<input ng-blur="reform()" type="text" ng-model="month" placeholder="Monat" />.' +
						'<input ng-blur="reform()" type="text" ng-model="year" placeholder="Jahr" />' + 
					'</div>';
		}
	}
});

/*
zaa.directive('zaaDate', function() {
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid'
		},
		controller : function($scope) {
			$scope.month = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
			$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
			$scope.weekdaysFull = ['Sonntag', 'Monatg', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
			$scope.weekdaysLetter = ['S', 'M', 'D', 'M', 'D', 'F', 'S'];
			$scope.today = 'Heute';
			$scope.clear = 'Leeren';
			$scope.close = 'Schliessen';
		},
		template: function(){
			return '<div class="input-field col s{{grid}}"><label>{{label}}</label><input input-date months-full="{{ month }}" format="dd.mm.yyyy" date-format months-short="{{ monthShort }}" weekdays-full="{{ weekdaysFull }}" weekdays-short="{{ weekdaysShort }}" weekdays-letter="{{ weekdaysLetter }}" today="today"  clear="clear" close="close" type="text" class="datepicker" ng-model="model"></input></div>';
		}
	}
});
*/
zaa.directive('dateFormat', function() {
	return {
	    require: 'ngModel',
	    link: function(scope, element, attr, ngModelCtrl) {
			ngModelCtrl.$formatters.unshift(function(timestamp) {
				//console.log('unshift_date', timestamp);
				if (timestamp == undefined) {
					var tp = new Date();
				} else {
					var tp = new Date(timestamp*1000);
				}
				return tp.format('dd.mm.yyyy');
			});
			ngModelCtrl.$parsers.push(function(date) {
				//console.log('push_date', date);
				md = date.split(".");
				var eng = md[1] +"/" + md[0] + "/" + md[2];
				var mil = new Date(eng).getTime();
				return (mil/1000);
			});
	    }
	};
});

zaa.directive('zaaTable', function() {
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		controller : function($scope) {
			
			if ($scope.model == undefined) {
				$scope.model = [{}];
			}
			
			$scope.addColumn = function(name) {
				for(var i in $scope.model) {
					 $scope.model[i][name] = '';
				}
			}
			
			$scope.addRow = function() {
				var elmn = $scope.model[0];
				console.log(elmn);
				var ins = {};
				for (var i in elmn) {
					ins[i] = '';
				}
				
				$scope.model.push(ins);
			}
		},
		template : function() {
			return  '<div>' +
						'<table border="1" style="border:1px solid red;">'+
						'<thead><tr><td data-ng-repeat="(hk, hr) in model[0]"><strong>{{hk}}</strong></td><td><input type="text" ng-model="columnName" /><button ng-click="addColumn(columnName)" type="button">ADD</button></td></tr></thead>' +
						'<tr data-ng-repeat="(key, row) in model"><td style="border:1px solid black;" data-ng-repeat="(field,value) in row"><input type="text" ng-model="model[key][field]" /></td></tr>'+
						'</table><button ng-click="addRow()" type="button">Add Row</button>'+
					'</div>';
		}
	}
});

zaa.directive('zaaFileUpload', function($compile){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		template : function() {
			return '<div class="col s{{grid}}"><storage-file-upload ng-model="model"></storage-file-upload></div>';
		}
	}
});

zaa.directive('zaaImageUpload', function($compile){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		template : function() {
			return '<div class="col s{{grid}}"><storage-image-upload ng-model="model"></storage-image-upload></div>';
		}
	}
});

zaa.directive('zaaImageArrayUpload', function(){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		controller : function($scope) {
			
			if ($scope.model == undefined) {
				$scope.model = [];
			}
			
			$scope.add = function() {
				$scope.model.push({ imageId : 0, caption : '' });
			}
			
			$scope.remove = function(key) {
				$scope.model.splice(key, 1);
			}
			
			$scope.debug = function() {
				console.log($scope.model);
			}
			
		},
		template : function() {
			//return '<div class="col s12"><h5>{{label}}</h5><div ng-repeat="(key,image) in model" class="row card-panel"><div class="col s4"><input type="text" ng-model="image.caption" /></div><div class="col s6"><storage-image-upload ng-model="image.imageId"></storage-image-upload></div><div class="col s2"><button type="button" class="btn" ng-click="remove(key)">Entfernen</button></div></div><div class="row"><div class="col s12"><button ng-click="add()" type="button" class="btn">+ Element</button></div></div></div>';
            return '<div class="col s{{grid}} imagearray">' +
                        '<h5>Bilder</h5>' +
                        '<p class="list__no-entry" ng-hide="model.length > 0">Noch keine Einträge erfasst. Neue Einträge fügen Sie mit dem <span class="teal-text">+</span> links unten ein.</p>' +
                        '<div ng-repeat="(key,image) in model" class="row list__item">' +
                        
							'<div class="list__left row">' +
								'<div class="col s8">' +
                        			'<storage-image-upload ng-model="image.imageId"></storage-image-upload>' +
		                    	'</div>' +
		                        '<div class="input-field col s4">' +
                                    '<textarea ng-model="image.caption" class="materialize-textarea"></textarea>' +
                                    '<label>Beschreibung</label>' +
                                '</div>' +
		                    '</div>' +

		                    '<div class="list__right">' +
		                    	'<button class="btn-floating left list__delete-button [ red lighten-1 ][ waves-effect waves-circle waves-light ]" ng-click="remove(key)" tabindex="-1"><i class="mdi-content-remove"></i></button>' +
		                    '</div>' +

                        '</div>' +
                        '<button ng-click="add()" type="button" class="btn-floating left list__add-button [ teal ][ waves-effect waves-circle waves-light ]"><i class="mdi-content-add"></i></button>' +
                    '</div>';
		}
	}
});

zaa.directive('zaaFileArrayUpload', function(){
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		controller : function($scope, $element, $timeout) {
			
			if ($scope.model == undefined) {
				$scope.model = [];
			}

			$scope.add = function() {
				$scope.model.push({ fileId : 0, caption : '' });
			};
			
			$scope.remove = function(key) {
				$scope.model.splice(key, 1);
			};
			
			$scope.debug = function() {
				console.log($scope.model);
			}

		},
		template : function() {
			//return '<div class="col s12"><h5>{{label}}</h5><div ng-repeat="(key,file) in model" class="row card-panel"><div class="col s4"><input type="text" ng-model="file.caption" /></div><div class="col s6"><storage-file-upload ng-model="file.fileId"></storage-file-upload></div><div class="col s2"><button type="button" class="btn" ng-click="remove(key)">Entfernen</button></div></div><div class="row"><div class="col s12"><button ng-click="add()" type="button" class="btn">+ Element</button></div></div></div>';
            

			return '<div class="col s{{grid}} filearray">' +
		                '<h5>Dateien</h5>' +
	                	'<p class="list__no-entry" ng-hide="model.length > 0">Noch keine Einträge erfasst. Neue Einträge fügen Sie mit dem <span class="teal-text">+</span> links unten ein.</p>' +
		                '<div ng-repeat="(key,file) in model" class="row list__item">' +
		                    
		                    '<div class="list__left row">' +
		                    	'<div class="filearray__upload col s8">' +
		                        	'<storage-file-upload ng-model="file.fileId"></storage-file-upload>' +
		                    	'</div>' +
		                    	'<div class="input-field col s4">' +
		                            '<input type="text" ng-model="file.caption" class="filearray__description-input" />' +
		                            '<label>Beschreibung</label>' +
		                        '</div>' +
		                    '</div>' +

		                    '<div class="list__right">' +
		                    	'<button class="btn-floating left list__delete-button [ red lighten-1 ][ waves-effect waves-circle waves-light ]" ng-click="remove(key)" tabindex="-1"><i class="mdi-content-remove"></i></button>' +
		                    '</div>' +
	                    '</div>' +
		                '<button ng-click="add()" type="button" class="btn-floating left list__add-button [ teal ][ waves-effect waves-circle waves-light ]"><i class="mdi-content-add"></i></button>' +
		            '</div>';

            /*return '<div class="col s{{grid}} filearray">' +
                        '<h5>Dateien</h5>' +
                        '<div ng-repeat="(key,file) in model" class="row card-panel filearray__item">' +
                            '<button class="filearray__delete btn-floating [ red lighten-3 ][ waves-effect waves-circle waves-light ]" ng-click="remove(key)"><i class="mdi-action-delete"></i></button>' +
                            '<div class="col s6">' +
                                '<div class="input-field">' +
                                    '<input type="text" ng-model="file.caption" />' +
                                    '<label>Beschreibung</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col s6 filearray__upload">' +
                                '<storage-file-upload ng-model="file.fileId"></storage-file-upload>' +
                            '</div>' +
                        '</div><br />' +
                        '<button ng-click="add()" type="button" class="btn-floating right [ teal lighten-2 ][ waves-effect waves-circle waves-light ]"><i class="mdi-content-add"></i></button>' +
                    '</div>';*/
		}
	}
});

zaa.directive("zaaListArray", function() {
	return {
		restrict : 'E',
		scope : {
			'model' : '=',
			'options' : '=',
			'label' : '@label',
			'grid' : '@grid',
			'id' : '@id',
			'name' : '@name'
		},
		controller : function($scope, $element, $timeout) {

			if ($scope.model == undefined) {
				$scope.model = [];
			}
			
			$scope.add = function() {
				$scope.model.push({ value : '' });
                $scope.setFocus();
			};
			
			$scope.remove = function(key) {
				$scope.model.splice(key, 1);
			};
			
			$scope.refactor = function(key, row) {
				if (key !== ($scope.model.length -1)) {
					if (row['value'] == "") {
						$scope.remove(key);
					}
				}
			};

            $scope.setFocus = function() {
                $timeout(function() {
                    var input = $element.children('.list').children('.list__item:last-of-type').children('.list__left').children('input');

                    if(input.length == 1) {
                        input[0].focus();
                    }
                }, 50);
            }

		},
		template : function() {
			//return '<div class="col s12"><h5>{{label}}</h5><div ng-repeat="(key,row) in model" class="row"><div class="col input-field s10"><input type="text" ng-model="row.value" /></div><div class="col input-field s2"><button type="button" class="btn" ng-click="remove(key)">Entfernen</button></div></div><div class="row"><div class="col s12 field-input"><button ng-click="add()" class="btn" type="button">+ Hinzufügen</button></div></div></div>';
			return '<div class="col s12 list">' +
                        '<h5>Auflistung</h5>' +
                        '<p class="list__no-entry" ng-hide="model.length > 0">Noch keine Einträge erfasst. Neue Einträge fügen Sie mit dem <span class="teal-text">+</span> links unten ein.</p>' +
                        '<div ng-repeat="(key,row) in model" class="list__item">' +
                            '<div class="list__left">' +
                                '<input class="list__input" type="text" ng-model="row.value" />' +
                            '</div>' +
                            '<div class="list__right">' +
                                '<button class="btn-floating left list__delete-button [ red lighten-1 ][ waves-effect waves-circle waves-light ]" ng-click="remove(key)" tabindex="-1"><i class="mdi-content-remove"></i></button>' +
                            '</div>' +
                        '</div>' +
                        '<button ng-click="add()" type="button" class="btn-floating left list__add-button [ teal ][ waves-effect waves-circle waves-light ]"><i class="mdi-content-add"></i></button>' +
                    '</div>';
		}
	}
});
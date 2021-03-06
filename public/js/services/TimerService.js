app.factory('TimerService', ['$timeout',function($timeout) {
	var $scope;
	var running = false;

	var stages = [
	];

	var actualStage;

	var timerService = {
		registerScope: function(scope) {
			$scope = scope;
		},

		okTitle: 'Parabéns!!!!',
		okMessage: 'Você concluiu todas as fases com sucesso :)',

		stages: function() {
			return stages;
		},

		nextStage: function() {
			var index = stages.indexOf(actualStage) + 1;
			
			if(stages.length > index) {
				actualStage = stages[index];
				this.restoreTimer();
			}else {
				actualStage = null;
				swal(timerService.okTitle, timerService.okMessage, "success");
				this.restoreTimer(true);
			}
		},

		removeStage: function(stage) {
			var index = stages.indexOf(stage);

			if(index > -1) stages.splice(index,1);
		},

		startStage: function(stage) {
			actualStage = stage;
			this.restoreTimer();
		},

		isCompleted: function(stage) {
			var index = stages.indexOf(stage);
			var actualIndex = stages.indexOf(actualStage);

			return actualIndex > index;
		},

		isActual: function(stage) {
			return stage === actualStage;
		},

		startTimer: function() {
			$scope.$broadcast('timer-start');
			running = true;
		},

		stopTimer: function() {
			$scope.$broadcast('timer-clear');
			running = false;
		},

		restoreTimer: function(forceStop) {
			$scope.$broadcast('timer-set-countdown-seconds', timerService.actualStage().stageTime);
			
			if(actualStage.autoStart && !forceStop) {
				this.startTimer();
			}else {
				this.stopTimer();
			}
		},

		finished: function() {
			$timeout(function() {
				running = false;
				timerService.nextStage();
			}, 1000);
		},

		isRunning: function() {
			return running;
		},

		actualStage: function() {
			if(!actualStage) {
				actualStage = stages[0];
			}

			return actualStage;
		},

		setActualStage: function(newStage) {
			actualStage = newStage;
		}
	};

	return timerService;
}]);
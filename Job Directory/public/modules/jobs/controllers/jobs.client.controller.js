'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs',
	function($scope, $stateParams, $location, Authentication, Jobs) {
		$scope.authentication = Authentication;

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs({
				title: this.title,
				company: this.company,
				description: this.description,
				hourly_wage: this.hourly_wage,
				requirements: this.requirements,
				state: this.state,
				contact_email: this.contact_email
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.company = '';
				$scope.description = '';
				$scope.requirements = '';
				$scope.hourly_wage = '';
				$scope.state = '';
				$scope.contact_email = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Job
		$scope.remove = function(job) {
			if (job) {
				job.$remove();

				for (var i in $scope.job) {
					if ($scope.job[i] === job) {
						$scope.job.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Job
		$scope.find = function() {
			$scope.jobs = Jobs.query();
		};

		// Find existing Job
		$scope.findOne = function() {
			$scope.job = Jobs.get({
				jobId: $stateParams.jobId
			});
		};
	}
	]);
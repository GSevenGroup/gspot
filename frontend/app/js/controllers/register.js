app.controller('RegisterCtrl', ['$scope', '$translate', '$http', '$location', function($scope, $translate, $http, $location) {

	//register

	$scope.isRegErrorFromBE = false;

	$scope.registerModel = schemes.register;
	$scope.registerErrors = {
		'email':{
			act: false,
			text: 'EMAIL'
		},
		'name':{
			act: false,
			text: 'NAME'
		},
		'phone':{
			act: false,
			text: 'PHONE'
		},
		'address':{
			act: false,
			text: 'ADDRESS'
		},
		'city':{
			act: false,
			text: 'CITY'
		},
		'password':{
			act: false,
			text: 'PWD'
		},
		'country':{
			act: false,
			text: 'COUNTRY'
		}
	};
	// 'name', 'email', 'password','email','level','landing_page','user_group','country','city','address','phone'

	if($location.search().code){
		$scope.registerModel.code = $location.search().code;
	} else{
		$location.url('/');
	}

	if($location.search().error){
		$scope.isRegErrorFromBE = true;
	}

	/**
	 * @description registers the user
	 */
	$scope.reg = function(){
		$http({
			url: requests.register.route,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'charset': 'charset=UTF-8'
			},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: $scope.registerModel,
			method: 'POST'
		})
			.success(function(data){
				console.log("User registered successfully!");
				$location.url('/');
			})
			.error(function(data){
				show_error(data);
				$location.url('/register?error&code=' + $scope.registerModel.code);
			});
	};

	/**
	 * @description validates the form
	 * @param type
	 */
	$scope.validate = function(type){
		switch(type){
			case 'email':
				var cond = (!$scope.registerModel.email || $scope.registerModel.email.length < 4 || !_.contains($scope.registerModel.email, '@') || !_.contains($scope.registerModel.email, '.'));
				if(cond){
					$scope.registerErrors.email.act = true;
				} else {
					$scope.registerErrors.email.act = false;
				}
					break;
			case 'password':
				var cond = (!$scope.registerModel.password || $scope.registerModel.password.length < 8);
				if(cond){
					$scope.registerErrors.password.act = true;
				} else {
					$scope.registerErrors.password.act = false;
				}
				break;
			case 'name':
				var cond = (!$scope.registerModel.name || $scope.registerModel.name.length < 4);
				if(cond){
					$scope.registerErrors.name.act = true;
				} else {
					$scope.registerErrors.name.act = false;
				}
				break;
			case 'phone':
				var cond = (!$scope.registerModel.phone || $scope.registerModel.phone.length < 11 || $scope.registerModel.phone[0] != '+');
				if(cond){
					$scope.registerErrors.phone.act = true;
				} else {
					$scope.registerErrors.phone.act = false;
				}
				break;
			case 'city':
				var cond = (!$scope.registerModel.city || $scope.registerModel.city.length < 4);
				if(cond){
					$scope.registerErrors.city.act = true;
				} else {
					$scope.registerErrors.city.act = false;
				}
				break;
			case 'address':
				var cond = (!$scope.registerModel.address || $scope.registerModel.address.length < 4);
				if(cond){
					$scope.registerErrors.address.act = true;
				} else {
					$scope.registerErrors.address.act = false;
				}
				break;
			case 'country':
				var cond = (!$scope.registerModel.country || $scope.registerModel.country.length < 4);
				if(cond){
					$scope.registerErrors.country.act = true;
				} else {
					$scope.registerErrors.country.act = false;
				}
				break;
			default:
				break;
		}
	};

	/**
	 * @description returns the reg errors object
	 * @returns {{email: {act: boolean, text: string}, name: {act: boolean, text: string}, phone: {act: boolean, text: string}, address: {act: boolean, text: string}, city: {act: boolean, text: string}, password: {act: boolean, text: string}, country: {act: boolean, text: string}}|*}
	 */
	$scope.getRegError = function(){
		return $scope.registerErrors;
	};

	/**
	 * @description returns if there's an error to show
	 * @returns {boolean}
	 */
	$scope.isRegError = function(){
		return (
			$scope.registerErrors.email.act ||
			$scope.registerErrors.name.act ||
			$scope.registerErrors.phone.act ||
			$scope.registerErrors.city.act ||
			$scope.registerErrors.country.act ||
			$scope.registerErrors.address.act ||
			$scope.registerErrors.password.act
		)
	};

}]);
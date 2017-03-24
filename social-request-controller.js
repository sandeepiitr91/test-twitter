var sm = angular.module('socialModule', []);

sm.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

SocialRequestController.$inject = ["$scope", "$http"];
sm.controller("SocialRequestController", SocialRequestController);


function SocialRequestController($scope, $http) {
    this.$scope = $scope;
    var _this = self = this;
    //the access token is required to make any endpoint calls, http://instagram.com/developer/endpoints/
    _this.loginWithInstagram = loginWithInstagram;

    function loginWithInstagram() {
        authenticateInstagram(
                '63317de0e3ae4f3ba3308e551349ee13', //instagram client ID
                window.location.origin, //instagram redirect URI
                getUserInfo //optional - a callback function
        );
    }

    function getUserInfo(accessToken) {
        var url = "https://api.instagram.com/v1/users/self/?access_token=" + accessToken + "&callback=JSON_CALLBACK";
        _this.instagramProfileConnected = false;
        $http.jsonp(url).then(function (response) {
            _this.instagramUserInfo = response.data.data;
            _this.instagramProfileConnected = true;
        })

    }

    function authenticateInstagram(instagramClientId, instagramRedirectUri, callback) {
        //the pop-up window size, change if you want
        var popupWidth = 500,
                popupHeight = 500,
                popupLeft = (window.screen.width - popupWidth) / 2,
                popupTop = (window.screen.height - popupHeight) / 2;

        var popup = window.open(window.location.origin, '', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + popupLeft + ',top=' + popupTop + '');
        popup.onload = function () {
            //open authorize url in pop-up
            popup.open('https://instagram.com/oauth/authorize/?client_id=' + instagramClientId + '&redirect_uri=' + instagramRedirectUri + '&response_type=token', '_self');

            //an interval runs to get the access token from the pop-up
            var interval = setInterval(function () {
                try {
                    //check if hash exists
                    if (popup.location.hash.length) {
                        //hash found, that includes the access token
                        clearInterval(interval);
                        var accessToken = popup.location.hash.slice(14); //slice #access_token= from string
                        popup.close();
                        if (callback != undefined && typeof callback == 'function') callback(accessToken);
                    }
                }
                catch (evt) {
                    //permission denied
                    console.log("error");
                }
            }, 100);
        }
    };


  /*  $scope.twitterAuthenticate = function () {
            var nonceObj = new jsSHA(Math.round((new Date()).getTime() / 1000.0), "TEXT");
         $scope.oauth_consumer_secret = "vlv4rGektIJYW8cPnzVCSDAY18lgJrbqtoeuGLDA0kFbZhRUOF";
         $scope.endpoint = "https://api.twitter.com/oauth/request_token";
         $scope.requiredParameters = {};
         $scope.requiredParameters['oauth_consumer_key'] = "7e7u2AdYFdyJlwBBRKUWtaG0z";
         $scope.requiredParameters['oauth_nonce'] = Math.floor(Math.random() * chars.length);
         $scope.requiredParameters['oauth_signature_method'] = "HMAC-SHA1";
         $scope.requiredParameters['oauth_timestamp'] = Math.round((new Date()).getTime() / 1000.0);
         $scope.requiredParameters['oauth_version'] = "1.0";
         $scope.base_signature_string = "POST&" + encodeURIComponent($scope.endpoint) + "&";

         var requiredParameterKeys = Object.keys($scope.requiredParameters);
         for (var i = 0; i < requiredParameterKeys.length; i++) {
         if (i == requiredParameterKeys.length - 1) {
         $scope.base_signature_string += encodeURIComponent(requiredParameterKeys[i] + "=" + $scope.requiredParameters[requiredParameterKeys[i]]);
         } else {
         $scope.base_signature_string += encodeURIComponent(requiredParameterKeys[i] + "=" + $scope.requiredParameters[requiredParameterKeys[i]] + "&");
         }
         }
         if (typeof $scope.base_signature_string !== "undefined" && $scope.base_signature_string.length > 0) {
         if (typeof $scope.oauth_consumer_secret !== "undefined" && $scope.oauth_consumer_secret.length > 0) {
         var shaObj = new jsSHA($scope.base_signature_string, "TEXT");
         $scope.hmac_sha1 = encodeURIComponent(shaObj.getHMAC($scope.oauth_consumer_secret + "&", "TEXT", "SHA-1", "B64"));
         }
         }
         var _authHeader = ['OAuth oauth_callback="' + encodeURIComponent('https://sandeepiitr91.github.io/test-twitter/') + '"',
         'oauth_consumer_key="' + $scope.requiredParameters.oauth_consumer_key + '"',
         'oauth_nonce="' + $scope.requiredParameters.oauth_nonce + '"',
         'oauth_signature_method="HMAC-SHA1"',
         'oauth_timestamp="' + $scope.requiredParameters.oauth_timestamp + '"',
         'oauth_signature="' + $scope.hmac_sha1 + '"',
         'oauth_version="1.0"'].join(',');


        $http({
            method: 'POST',
            url: 'https://api.twitter.com/oauth/request_token',
            headers: {
                'Authorization': _authHeader,
            }

        }).then(function (response) {
            this.responseToken = response;
        });

    }*/

  $scope.twitterAuthenticate = function () {
      OAuth.initialize('Fyz29IKDeOZMK-nsuzSf4DlksWM');
      var provider = 'twitter'
      OAuth.popup(provider)
              .done(function (result) {
                  result.get('/me')
                          .done(function (response) {
                              //this will display "John Doe" in the console
                              console.log(response.name);
                          })
                          .fail(function (err) {
                              console.log(err);
                              //handle error with err
                          });
              })
              .fail(function (err) {
                   console.log(err);
                  //handle error with err
              });
  }


// Twitter Login using Firebase
    $scope.twitterLogin = function () {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
}

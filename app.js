

angular.module('myApp', [
    'oauth1Client','socialModule'
])

.config(function(oauth1ClientProvider) {
    oauth1ClientProvider.config({
        consumerKey: '7e7u2AdYFdyJlwBBRKUWtaG0z',
        consumerSecret: 'vlv4rGektIJYW8cPnzVCSDAY18lgJrbqtoeuGLDA0kFbZhRUOF',
        requestEndpoint: 'http://localhost/wordpress/oauth1/request',
        authorizeEndpoint: 'http://localhostwordpress/oauth1/authorize',
        accessEndpoint: 'http://localhost/wordpress/oauth1/access',
        oauthCallback: 'http://www.google.com'
    });
})


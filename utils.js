/**
 * Created by Sandeep Kumar on 3/31/2017.
 */


function pinterestInit(){
	// Initialize pinteresr sdk only once
	if (typeof (PDK) != 'undefined')
		return;
	window.pAsyncInit = function() {
        PDK.init({
            appId: "4892465759042680581", // Change this
            cookie: true
        });
    };

    (function(d, s, id){
        var js, pjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//assets.pinterest.com/sdk/sdk.js";
        pjs.parentNode.insertBefore(js, pjs);
    }(document, 'script', 'pinterest-jssdk'));
}

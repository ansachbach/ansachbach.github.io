/// <reference path="../vendor/DefinitelyTyped/fbsdk/fbsdk.d.ts" />
/// <reference path="../vendor/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="helpers.ts" />
$signinWithFb.click(function () {
    FB.login(statusChangeCallback);
    console.log("login");
});
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    switch (response.status) {
        case "connected":
            // Logged into your app and Facebook.
            $orderFormButton.show();
            $signinWithFb.hide();
            testAPI();
            break;
        case "not_authorized":
            // The person is logged into Facebook, but not your app.
            $orderFormButton.hide();
            $signinWithFb.show();
            break;
        default:
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            $orderFormButton.hide();
            $signinWithFb.show();
            break;
    }
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    FB.api('/me', "GET", function (response) {
        fbUser = response;
        $('#order-firstname').val(fbUser.first_name);
        $('#order-lastname').val(fbUser.last_name);
        $('#order-email').val(fbUser.email);
    });
}
window.fbAsyncInit = function () {
    FB.init({
        appId: '1417526121888571',
        cookie: true,
        // the session
        xfbml: true,
        version: 'v2.3' // use version 2.2
    });
    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};
// Load the SDK asynchronously
(function (d, s, id) {
    if (d.getElementById(id))
        return;
    var fjs = d.getElementsByTagName(s)[0];
    var js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

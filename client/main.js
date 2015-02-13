Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/reviewsList',                   // mandatory - path to redirect to after sign-out
    dashboardRoute: '/reviewsList',      // mandatory - path to redirect to after successful sign-in
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
    showOtherLoginServices: true,      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
    extraSignUpFields: []
  });
});
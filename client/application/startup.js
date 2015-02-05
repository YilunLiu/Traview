Meteor.startup(function () {
    _.extend(Notifications.defaultOptions, {
        timeout: 2000
    });
});
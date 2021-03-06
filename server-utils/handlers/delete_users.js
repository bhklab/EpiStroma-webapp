var authenticationUtils = require(APP_BASE_DIRECTORY + 'server-utils/authentication_utils');
var userCreationUtils = require(APP_BASE_DIRECTORY + 'server-utils/user_creation_utils');
var async = require('async');

function handler(req, res) {
    var user = authenticationUtils.getUserFromToken(req.body.token);

    if (user.accessLevel != 'admin') {
        res.send({ error: "Not authorized to delete users" });
        return;
    }

    async.series([function(callback) {
        userCreationUtils.deleteUsers(req.body.users, callback);
    }], function(err, results) {
        authenticationUtils.loadUsers(authenticationUtils.EXISTING_USERS_FILE);

        if (err) {
            console.log(err);
            res.send({ error: err });
            return;
        }

        if (results[0] != null) {
            res.send({ result: results[0] });
            return;
        }
    });
}

module.exports = {
    handler: handler
};
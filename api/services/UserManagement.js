module.exports = {
    /**
     * Create an user
     * @param {Function} creator - record creation function
     * @param {Object} userData - user data (name, email, etc.)
     * @param {Function} callback
     */
    create: function(creator, userData, callback) {
        if (userData.password !== userData.confirmPassword) {
            return callback('passwords-mismatch');
        }

        delete userData.confirmPassword;
        creator('user', userData, function(err, user) {
            if (err) return callback(err);

            if (user) {
                return callback(null, user);
            }
        });
    },

    /**
     * Update a user's last connection date
     * @param {Function} updater - record update function
     * @param {String} userId - user id
     */
    updateLastConnection: function(updater, userId) {
        updater('user', { id: userId }, { lastConnection: new Date() }, function(err) {
            if (err) return sails.log.error(err);
        });
    },

    /**
     * Confirms an user account by updating the database record corresponding to the passed token
     * @param {Function} updater - record update function
     * @param {String} confirmationToken - confirmation token
     * @param {Function} callback
     */
    confirm: function(updater, confirmationToken, callback) {
        updater('user', { confirmationToken: confirmationToken }, { confirmedAccount: true }, function(err) {
            return callback(err);
        });
    }
};

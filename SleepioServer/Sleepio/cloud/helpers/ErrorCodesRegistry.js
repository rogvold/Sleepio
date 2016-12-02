/**
 * Created by sabir on 22.06.16.
 */

var ErrorCodesRegistry = {

    ACCESS_DENIED: {
        code: 700
    },

    INCORRECT_INPUT_DATA: {
        code: 701
    },

    DISPLAY_CODE_IS_NOT_FOUND: {
        code: 702
    },

    DISPLAY_CODE_IS_ALREADY_IN_USE: {
        code: 703
    },

    DISPLAY_CODE_IS_NOT_ACTIVATED: {
        code: 704
    },

    UNKNOWN_ERROR: {
        code: 705
    },

    NOT_FOUND: {
        code: 404
    },

    USER_WITH_SPECIFIED_EMAIL_ALREADY_EXISTS: {
        code: 706
    },

    USER_WITH_SPECIFIED_ID_IS_NOT_FOUND: {
        code: 707
    },

    INCORRECT_LOGIN_CREDENTIALS: {
        code: 781
    },

    INCORRECT_SIGNUP_CREDENTIALS: {
        code: 782
    }

};

module.exports = ErrorCodesRegistry;
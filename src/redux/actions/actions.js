import {ERROR_GENERATED, LOADING_STATUS_CHANGED} from "./eleveActions";

export const onError = (error) => dispatch => {
    return dispatch({type: ERROR_GENERATED, payload: error});
}

export const onFetch = (loading) => dispatch => {
    return dispatch({type: LOADING_STATUS_CHANGED, payload: loading});
}


export function login(email, password) {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO VALIDATE THE AUTHENTICATION
      WE FAKE THIS AND ASSUME A SUCCESSFUL RESPONSE FROM THE SERVER
      YOU WILL NEED TO HANDLE THE CASES FOR FAIL AS WELL AS ERRORS
    */
    return {type: "LOGIN/SUCCESS", data: {token: "token", email: email}};
}

export function logout() {
    /*
      HERE WE LOG OUT BY DESTROYING OUR LOCAL REFERENCE TO THE TOKEN. YOU MAY ALSO WANT TO
      INVALIDATE THE TOKEN ON YOUR SERVER FOR ADDED SECURITY.
    */
    return {type: "LOGOUT/SUCCESS"};
}

export function sendResetEmail(email) {
    /*
        HERE YOU NEED TO MAKE A CALL TO YOUR API TO SEND AN EMAIL WITH PASSWORD
        RESET INSTRUCTIONS. WE FAKE THIS AND NAVIGATE DIRECTLY TO THE PAGE THAT
        ALLOWS THE USER TO SET A NEW PASSWORD. YOU WILL NEED TO HANDLE THIS DIFFERENTLY
        IN YOUR CODE BY DEEP LINKING TO A PAGE LIKE THIS FROM THE RESET EMAIL.
      */
    return {type: "SEND_RESET/SUCCESS"};
}

export function sendVerificationEmail(email) {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO SEND AN EMAIL WITH A VERIFICATION CODE.
      WE FAKE THIS AND ASSUME SUCCESS..
    */
    return {type: "SEND_VERIFICATION/SUCCESS"};
}

export function sendVerificationPhone(phone) {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO SEND AN EMAIL WITH A VERIFICATION CODE.
      WE FAKE THIS AND ASSUME SUCCESS..
    */
    return {type: "SEND_VERIFICATION/SUCCESS"};
}

export function verifyEmailAddress(code) {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO MARK THE USER'S EMAIL ADDRESS AS VERIFIED.
      WE FAKE THIS AND ASSUME SUCCESS..
    */
    return {type: "VERIFY_EMAIL/SUCCESS"};
}

export function changePassword(email, password) {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO CHANGE THE PASSWORD
      WE FAKE THIS AND ASSUME A SUCCESSFUL RESPONSE FROM THE SERVER
      YOU WILL NEED TO HANDLE THE CASES FOR FAIL AS WELL AS ERRORS
    */
    return {type: "CHANGE_PASSWORD/SUCCESS"};
}

export function createAccount(userObject) {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO REGISTER THE USER
      WE FAKE THIS AND ASSUME A SUCCESSFUL RESPONSE FROM THE SERVER
      YOU WILL NEED TO HANDLE THE CASES FOR FAIL AS WELL AS ERRORS
    */
    return {type: "CREATE_ACCOUNT/SUCCESS"};
}

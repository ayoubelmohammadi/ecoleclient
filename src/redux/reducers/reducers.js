
export const authReducer = (state = [], action) => {
    switch (action.type) {
        case "LOGIN/SUCCESS":
            /* HERE WE SET THE TOKEN BASED ON THE DATA RECEIVED FROM THE LOGIN
            REQUEST. YOU WILL NEED TO ADJUST THIS BASED ON THE ACTUAL DATA COMING
            FROM YOUR API */
            return {...state, token: action.data.token, email: action.data.email};
        case "LOGOUT/SUCCESS":
            return {...state, token: null, email: null};
        case "REGISTER":
            return {
                ...state,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                email: action.data.email,
                role: action.data.role,
                phone: action.data.phone,
                password: action.data.password
            };
        default:
            return state;
    }
};




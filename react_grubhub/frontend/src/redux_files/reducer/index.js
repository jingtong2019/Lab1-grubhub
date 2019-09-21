export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    };
}

export function setLoginSuccess(isLoginSuccess) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess
    };
}

export function setLoginError(isLoginError) {
    return {
        type: LOGIN_ERROR,
        isLoginError
    };
}

// export function loginFunc(email, password) {
//     return dispatch => {
//         dispatch(setLoginPending(true));
//         dispatch(setLoginSuccess(false));
//         dispatch(setLoginError(null));

//         sendLoginRequest(email, password)
//             .then(success => {
//                 dispatch(setLoginPending(false));
//                 dispatch(setLoginSuccess(true));
//             })
//             .catch(err => {
//                 dispatch(setLoginPending(false));
//                 dispatch(setLoginError(err));
//             });
//     };
// }

export default function reducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: null
}, action) {
    switch (action.type) {
        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isLoginError: action.isLoginError
            };
        default: return state;
    }
}

// function sendLoginRequest(email, password) {
//     return new Promise((resolve, reject) => {
//         if (email === "admin@gmail.com" && password === "admin") {
//             return resolve(true);
//         }
//         else {
//             return reject(new Error('Invalid email or password'));
//         }
//     });
// }
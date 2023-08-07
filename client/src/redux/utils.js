import axios from 'axios';

export const showAlertFromErr = (err, dispatch, setAlert) => {
    if (err.response) {
        const errors = err.response.data.errors;
        const error = err.response.data.msg;

        if (errors && errors.length > 1) {
            for (const error of errors) {
              dispatch(setAlert(error.msg, 'error'));
            }
        } else if (error) {
            dispatch(setAlert(error, 'error'));
        }
    }
}

export const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
};

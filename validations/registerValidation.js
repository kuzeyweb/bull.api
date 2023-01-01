export const registerValidation = (data) => {
    const checkEmail = (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    };
    
    const checkPassword = (password) => {
        const regexp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return regexp.test(password);
    }
    
    const isEmailValid = checkEmail(data.email);
    const isPasswordValid = checkPassword(data.password);
    if(!isEmailValid){
        return {message : "Invalid Email", error : true};
    }else if(!isPasswordValid){
        return {message : "Invalid Password", error : true};
    }else {
        return {message : "Validated", error : false};
    }
};
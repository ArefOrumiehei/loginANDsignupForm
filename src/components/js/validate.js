export const validate = (data , type) => {
    const errors = {}

    if(!data.email){
        errors.email = 'Email is required!'
    }else if (!/\S+@gmail.com/.test(data.email)){
        errors.email = 'Email is invalid!'
    }else{
        delete errors.email
    }

    if(!data.password){
        errors.password = 'Passsword is required!'
    }else if(data.password.length < 6){
        errors.password = 'Password must be 6 chracter or more!'
    }else{
        delete errors.password
    }


    if(type === 'signup'){
        if(!data.name.trim()){
            errors.name = 'Username is required!'
        }else{
            delete errors.name
        }

        if(!data.confirmPassword){
            errors.confirmPassword = 'Please confirm ypur password!'
        }else if (data.confirmPassword !== data.password){
            errors.confirmPassword = 'Password is not match!'
        }else{
            delete errors.confirmPassword
        }
    
        if (data.isAccepted) {
            delete errors.isAccepted
        }else {
        errors.isAccepted = 'You must accept the Privacy Policy to continue.'
        }
    }
    
    return errors
}
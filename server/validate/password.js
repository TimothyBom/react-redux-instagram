import validator from 'validator'
import { isEmpty } from 'lodash'

export const isValidate = data => {
    let errors = {}
    
    if (validator.isEmpty(data.oldpassword)) {
        errors.oldpassword = 'This field is required.'
    } else if (validator.equals(data.oldpassword, data.newpassword)) {
        errors.newpassword = 'Old Password same new password.'
    }
    if (validator.isEmpty(data.newpassword)) {
        errors.newpassword = 'This field is required.'
    } else if (validator.isLength(data.newpassword, { max: 7 })) {
        errors.newpassword = 'Password must have at least 8 characters.'
    }
    if (validator.isEmpty(data.confirmpassword)) {
        errors.confirmpassword = 'This field is required.'
    } else if (!validator.equals(data.newpassword, data.confirmpassword)) {
        errors.confirmpassword = 'Password not match.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
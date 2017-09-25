import validator from 'validator'
import { isEmpty } from 'lodash'

export const validate = data => {
    let errors = {}
    
    if (validator.isEmpty(data.email)) {
        errors.email = 'This field is required.'
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.'
    }
    if (validator.isEmpty(data.fullname)) {
        errors.fullname = 'This field is required.'
    }
    if (validator.isEmpty(data.username)) {
        errors.username = 'This field is required.'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'This field is required.'
    } else if (validator.isLength(data.password, { max: 7 })) {
        errors.password = 'Password must have at least 8 characters.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
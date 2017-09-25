import validator from 'validator'
import { isEmpty } from 'lodash'

export const validate = data => {
    let errors = {}
    
    if (validator.isEmpty(data.identifier)) {
        errors.identifier = 'This field is required.'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'This field is required.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
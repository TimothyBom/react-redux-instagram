import React from 'react'
import { withRouter } from 'react-router-dom'
import validator from 'validator'
import { isEmpty } from 'lodash'
import TextFieldGroup from '../../components/TextFieldGroup'

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                email: '',
                fullname: '',
                username: '',
                password: ''
            },
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkUserExist = this.checkUserExist.bind(this)
    }

    isValidate(data) {
        let errors = {}

        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required.'
        } else if (!validator.isEmail(data.email)) {
            errors.email = 'Enter a valid email address.'
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
            errors.password = 'Enter a password at least 8 characters long.'
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const { errors, isValid } = this.isValidate(this.state.data)

        if (!isValid) {
            this.setState({ errors })
        }

        return isValid
    }

    checkUserExist(e) {
        const field = e.target.name
        const value = e.target.value
        if (value != '') {
            this.props.checkUserExist(value).then(res => {
                let errors = this.state.errors
                if (!isEmpty(res.data.user)) {
                    errors[field] = field + ' is already exist.'
                } else {
                    errors[field] = ''
                }
                this.setState({ errors })
            })
        }
    }

    onChange(e) {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors)
            delete errors[e.target.name]
            this.setState({
                data: { ...this.state.data, [e.target.name]: e.target.value },
                errors
            })
        } else {
            this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
        }
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({ errors: {} })
            this.props.getUserSignup(this.state.data).then(() => {
                this.props.history.push('/login')
            })
        }
    }

    render() {
        const { data, errors } = this.state
        return (
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    label="Email"
                    type="email"
                    field="email"
                    value={data.email}
                    onChange={this.onChange}
                    onBlur={this.checkUserExist}
                    error={errors.email}
                />

                <TextFieldGroup
                    label="Full Name"
                    type="text"
                    field="fullname"
                    value={data.fullname}
                    onChange={this.onChange}
                    error={errors.fullname}
                />

                <TextFieldGroup
                    label="Username"
                    type="text"
                    field="username"
                    value={data.username}
                    onChange={this.onChange}
                    onBlur={this.checkUserExist}
                    error={errors.username}
                />

                <TextFieldGroup
                    label="Password"
                    type="password"
                    field="password"
                    value={data.password}
                    onChange={this.onChange}
                    error={errors.password}
                />

                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                    Signup
                    </button>
                </div>
                <span>Have an account? <a className="_b93kq" href="/login">Log in</a></span>
            </form>
        )
    }
}

export default withRouter(SignupForm)
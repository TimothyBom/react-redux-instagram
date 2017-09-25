import React from 'react'
import { withRouter } from 'react-router-dom'
import validator from 'validator'
import { isEmpty } from 'lodash'
import TextFieldGroup from '../../components/TextFieldGroup'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                identifier: '',
                password: ''
            },
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    isValidate(data) {
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

    isValid() {
        const { errors, isValid } = this.isValidate(this.state.data)

        if (!isValid) {
            this.setState({ errors })
        }

        return isValid
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
            this.props.getUserLogin(this.state.data).then(
                () => this.props.history.push('/'),
                (err) => this.setState({ errors: err.response.data.errors })
            )
        }
    }

    render() {
        const { data, errors } = this.state
        return (
            <form onSubmit={this.onSubmit}>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <TextFieldGroup
                    label="Username / Email"
                    type="text"
                    field="identifier"
                    value={data.identifier}
                    onChange={this.onChange}
                    error={errors.identifier}
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
                    Login
                    </button>
                </div>
                <span>Don't have an account? <a className="_b93kq" href="/signup">Sign up</a></span>
            </form>
        )
    }
}

export default withRouter(LoginForm)
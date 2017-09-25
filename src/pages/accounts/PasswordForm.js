import React from 'react'
import validator from 'validator'
import classnames from 'classnames'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'
import config from '../../utils/config'

class PasswordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                oldpassword: '',
                newpassword: '',
                confirmpassword: ''
            },
            success: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
    }

    isValidate(data) {
        let errors = {}

        if (validator.isEmpty(data.oldpassword)) {
            errors.oldpassword = 'This field is required.'
        } else if (validator.equals(data.oldpassword, data.newpassword)) {
            errors.newpassword = "New password can't same old password."
        }
        if (validator.isEmpty(data.newpassword)) {
            errors.newpassword = 'This field is required.'
        } else if (validator.isLength(data.newpassword, { max: 7 })) {
            errors.newpassword = 'Enter a password at least 8 characters long.'
        }
        if (validator.isEmpty(data.confirmpassword)) {
            errors.confirmpassword = 'This field is required.'
        } else if (!validator.equals(data.newpassword, data.confirmpassword)) {
            errors.confirmpassword = "Password didn't match."
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

    checkPassword() {
        if (this.state.data.oldpassword !== '') {
            const token = jwt.sign({ token: this.state.data.oldpassword }, config.secret)
            this.props.checkPassword(this.props.currentUser.user._id, token).then(res => {
                this.setState({
                    success: res.data.success,
                    error: res.data.errors
                })
            })
        }
    }

    onChange(e) {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({ errors: {} })
            this.props.updateUserPassword(this.props.currentUser.user._id, this.state.data).then(res => {
                this.setState({
                    message: res.data.message,
                    data: {
                        oldpassword: '',
                        newpassword: '',
                        confirmpassword: ''
                    }
                })
            })
        }
    }

    render() {
        const { data, errors, success } = this.state
        return (
            <form className="_gzffa" onSubmit={this.onSubmit}>
                { this.state.message &&
                    <div className="_61tuv">
                        <div className="alert alert-success">{this.state.message}</div>
                    </div> }
                <div className="form-inline _e1x">
                    <div className="form-group _e1xi">
                        <label>Old Password</label>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input 
                                type="password"
                                className={classnames('form-control', { 'is-valid': success === true }, { 'is-invalid': errors.oldpassword || success === false })}
                                name="oldpassword"
                                value={data.oldpassword}
                                onChange={this.onChange}
                                onBlur={this.checkPassword}
                            />
                            { errors.oldpassword && <div className="invalid-feedback">{errors.oldpassword}</div>}
                            { success === false && <div className="invalid-feedback">{this.state.error.form}</div>}
                        </div>
                    </div>
                </div>
                <div className="form-inline _e1x">
                    <div className="form-group _e2xi">
                        <label>New Password</label>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input 
                                type="password"
                                className={classnames('form-control', { 'is-invalid': errors.newpassword })}
                                name="newpassword"
                                value={data.newpassword}
                                onChange={this.onChange}
                            />
                            { errors.newpassword && <div className="invalid-feedback">{errors.newpassword}</div>}
                        </div>
                    </div>
                </div>
                <div className="form-inline _e1x">
                    <div className="form-group _e3xi">
                        <label>Confirm Password</label>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input 
                                type="password"
                                className={classnames('form-control', { 'is-invalid': errors.confirmpassword })}
                                name="confirmpassword"
                                value={data.confirmpassword}
                                onChange={this.onChange}
                            />
                            { errors.confirmpassword && <div className="invalid-feedback">{errors.confirmpassword}</div>}
                        </div>
                    </div>
                </div>
                <div className="form-group row _ov9ai">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default PasswordForm
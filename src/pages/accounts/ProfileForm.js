import React from 'react'
import request from 'superagent'

class ProfileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            avatar: '',
            fullname: '',
            username: '',
            email: '',
            bio: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            _id: nextProps.userInfo ? nextProps.userInfo._id : '',
            avatar: nextProps.userInfo.avatar ? nextProps.userInfo.avatar : '',
            fullname: nextProps.userInfo ? nextProps.userInfo.fullname : '',
            username: nextProps.userInfo ? nextProps.userInfo.username : '',
            email: nextProps.userInfo ? nextProps.userInfo.email : '',
            bio: nextProps.userInfo.bio ? nextProps.userInfo.bio : ''
        })
    }

    uploadImage(e) {
        const image = e.target.files[0]
        const url = 'https://api.cloudinary.com/v1_1/timothybom/image/upload'
        const params = {
            api_key: '414499466558622',
            api_secret: 'QJZgMEwp3lJt5_KlG4EIaV-zsYc',
            upload_preset: 'hktsyikf'
        }

        const uploadRequest = request.post(url)
        uploadRequest.attach('file', image)
        Object.keys(params).forEach(key => {
            uploadRequest.field(key, params[key])
        })
        uploadRequest.end((err, res) => {
            if (err) {
                console.log(err)
            }
            this.setState({
                avatar: res.body.secure_url
            })
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.setEditUser(this.props.currentUser.user.username, this.state).then(res => {
            this.props.getUpdateToken(this.props.currentUser.user._id).then(() => {
                this.setState({
                    avatar: res.data.user.avatar,
                    fullname: res.data.user.fullname,
                    username: res.data.user.username,
                    email: res.data.user.email,
                    bio: res.data.user.bio,
                    message: res.data.message
                })
            })
        })
    }

    render() {
        const { fullname, username, email, bio } = this.state
        return (
            <form className="_gzffa" onSubmit={this.onSubmit}>
                { this.state.message &&
                    <div className="_61tuv">
                        <div className="alert alert-success">{this.state.message}</div>
                    </div> }
                <div className="form-group row _e1xik">
                    <label className="col-sm-2 col-form-label">Avatar</label>
                    <div className="col-sm-8">
                        <input
                            type="file"
                            className="form-control-file"
                            accept="image/*"
                            onChange={this.uploadImage}
                        />
                    </div>
                </div>
                <div className="form-group row _e1xik">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-8">
                        <input 
                            type="text"
                            className="form-control"
                            name="fullname"
                            value={fullname}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group row _e1xik">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-8">
                        <input 
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group row _e1xik">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-8">
                        <input 
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group row _e1xik">
                    <label className="col-sm-2 col-form-label">Bio</label>
                    <div className="col-sm-8">
                        <textarea
                            className="form-control"
                            name="bio"
                            value={bio}
                            onChange={this.onChange}
                        >
                        </textarea>
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

export default ProfileForm
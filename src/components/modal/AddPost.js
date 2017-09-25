import React from 'react'
import request from 'superagent'

class AddPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            public_id: '',
            image_url: '',
            caption: '',
            token: localStorage.jwtToken ? localStorage.jwtToken : ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
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
                public_id: res.body.public_id,
                image_url: res.body.secure_url
            })
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.addNewPost(this.state)
        this.setState({
            public_id: '',
            image_url: '',
            caption: ''
        })
    }

    render() {
        const { image_url, caption } = this.state
        return (
            <div className="modal fade" id="AddPost">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Post</h5>
                            <button className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label">Caption</label>
                                    <div className="col-sm-9">
                                        <input 
                                            type="text"
                                            name="caption"
                                            className="form-control"
                                            placeholder="Write a caption…"
                                            value={caption}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label">Image</label>
                                    <div className="col-sm-9">
                                        <input 
                                            type="file"
                                            className="form-control-file"
                                            accept="image/*"
                                            onChange={this.uploadImage}
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="row justify-content-center">
                                { image_url && <img src={image_url} alt="" width="293px" height="293px" /> }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={caption === '' || image_url === ''}
                                onClick={this.onSubmit}
                                data-dismiss="modal"
                            >
                            Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPost
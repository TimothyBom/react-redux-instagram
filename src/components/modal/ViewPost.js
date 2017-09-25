import React from 'react'
import CommentPage from '../comment/CommentPage'

class ViewPost extends React.Component {
    render() {
        const { post, user, currentUser } = this.props

        const noAvatar = (
            <img className="_a4egj" src="https://res.cloudinary.com/timothybom/image/upload/v1505211426/avatar_mf1yiz.jpg" alt="" /> 
        )

        return (
            <div className="modal fade" id={post._id}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content no-border">
                        <div className="modal-body row p-0">
                            <div className="col-md-7 p-0">
                                <div className="_sxolz">
                                    <img className="_2di5p" src={post.image_url} alt="" />
                                </div>
                            </div>
                            <div className="col-md-5 p-0 mw">
                                <header className="row _7b8eu _9dpug">
                                    <a className="_pg23k _i2o1o" href="">
                                        {user.avatar ? <img className="_rewi8" src={user.avatar} alt="" /> : noAvatar}
                                    </a>
                                    <div className="_j56ec">
                                        <a className="_2g7d5" href={user.username}>{user.username}</a>
                                    </div>
                                </header>
                                <CommentPage post={post} user={user} currentUser={currentUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewPost
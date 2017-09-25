import React from 'react'
import { isEmpty, map } from 'lodash'
import ViewPost from '../../components/modal/ViewPost'

class PostList extends React.Component {
    render() {
        const { post, user, currentUser } = this.props

        let comments = []
        let votes = []

        map(this.props.votes, vote => {
            if (vote.post_id[0] === post._id) {
                if (!isEmpty(vote)) {
                    votes.push(vote)
                }
            }
        })

        map(this.props.comments, comment => {
            if (comment.post_id[0] === post._id) {
                if (!isEmpty(comment)) {
                    comments.push(comment)
                }
            }
        })

        return (
            <div className="col-6 col-md-4 _70iju">
                <a data-toggle="modal" data-target={`#${post._id}`}>
                    <div className="hover-bg">
                        <img src={post.image_url} alt="" />
                        <div className="overlay">
                            <div className="text">
                                <ul className="_h9luf">
                                    <li className="_bnq48">
                                        <span><i className="fa fa-heart fa-lg"></i><span className="_fd86">{votes.length}</span></span>
                                    </li>
                                    <li className="_bnq48">
                                        <span><i className="fa fa-heart fa-lg"></i><span className="_fd86">{comments.length}</span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </a>
                <ViewPost post={post} user={user} currentUser={currentUser} />
            </div>
        )
    }
}

export default PostList
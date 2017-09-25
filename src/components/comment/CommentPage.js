import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, map, find } from 'lodash'
import moment from 'moment'
import { getDeletePost, getDeleteImage } from '../../actions/post'
import { addNewComment, getCommentByPost, getDeleteComment } from '../../actions/comment'
import { addNewVote, getAllVote, getDeleteVote } from '../../actions/vote'
import CommentForm from './CommentForm'

class CommentPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vote: false
        }
        this.addVote = this.addVote.bind(this)
        this.deleteVote = this.deleteVote.bind(this)
        this.deletePost = this.deletePost.bind(this)
    }

    componentWillMount() {
        this.props.getCommentByPost()
        this.props.getAllVote()
    }

    deletePost(e) {
        e.preventDefault()
        this.props.getDeletePost(this.props.currentUser.user._id, this.props.post._id).then(() => {
            this.props.getDeleteImage(this.props.post.public_id)
        })
    }

    deleteComment(e) {
        this.props.getDeleteComment(this.props.currentUser.user._id, e)
    }

    addVote(e) {
        e.preventDefault()
        this.props.addNewVote(this.props.currentUser.user._id, this.props.post._id).then(() => {
            this.setState({ vote: true })
        })
    }

    deleteVote(e) {
        e.preventDefault()
        this.props.getDeleteVote(this.props.currentUser.user._id, this.props.post._id).then(() => {
            this.setState({ vote: false })
        })
    }

    checkVote(data) {
        let voted = find(data, vote => {
            return vote.user_id[0] === this.props.currentUser.user._id && vote.post_id[0] === this.props.post._id
        })
        return {
            voted: !isEmpty(voted)
        }
    }

    render() {
        const { post, user, currentUser, comments, addNewComment } = this.props

        let { voted } = this.checkVote(this.props.votes)

        let votes = []

        map(this.props.votes, (vote) => {
            if (vote.post_id[0] === post._id) {
                if (!isEmpty(vote)) {
                    votes.push(vote)
                }
            }
        })

        const commentList = (
            // eslint-disable-next-line
            comments.map(comment => {
                if (comment.post_id[0] === post._id) {
                    return (
                        <li key={comment._id} className="_ezgzd">
                            <a className="_2g7d5 _95hvo" href={comment.user_id[0].username}>{comment.user_id[0].username}</a>
                            <span>{comment.comment}</span>
                            {currentUser.user._id === comment.user_id[0]._id
                                ? <a
                                    className="ml-2 text-danger"
                                    title="Delete"
                                    onClick={this.deleteComment.bind(this, comment._id)}
                                >
                                    <i className="fa fa-times"></i>
                                </a>
                                : ''}
                        </li>
                    )
                }
            })
        )

        const deleteButton = (
            <div className="_5mwg7">
                <a
                    className="_tauyc"
                    title="Delete Post"
                >
                    <i className="fa fa-trash-o fa-lg"></i>
                </a>
            </div>
        )

        const time = moment(post.created_at).fromNow()

        const isLogin = (
            <div>
                <section className="row _8oo9w">
                    {voted === this.state.vote
                        ? <a className="_l9yih" onClick={this.addVote}>
                            <i className="fa fa-heart-o fa-lg"></i>
                        </a>
                        : <a className="_l9yih" onClick={this.deleteVote}>
                            <i className="fa fa-heart fa-lg text-danger"></i>
                        </a>}
                    <span className="_nzn1h">{votes.length} {votes.length > 1 ? 'likes' : 'like'}</span>
                </section>
                <div className="_6d44r">
                    <time className="_p29ma">{time}</time>
                </div>
                <section className="_km7ip _ti7l3">
                    <CommentForm post={post} currentUser={currentUser} addNewComment={addNewComment} />
                </section>
                {currentUser.user._id === user._id ? deleteButton : ''}
            </div>
        )

        const isNotLogin = (
            <div>
                <section className="row _8oo9w">
                    <a className="_l9yih">
                        <i className="fa fa-heart-o fa-lg sr-only"></i>
                    </a>
                    <span className="_nzn1h">{votes.length} {votes.length > 1 ? 'likes' : 'like'}</span>
                </section>
                <div className="_6d44r">
                    <time className="_p29ma">{time}</time>
                </div>
            </div>
        )

        return (
            <div className="_ebcx9">
                <div className="_277v9">
                    <ul className="list-unstyled">
                        <li className="_ezgzd">
                            <a className="_2g7d5 _95hvo" href={user.username}>{user.username}</a>
                            <span>{post.caption}</span>
                        </li>
                        {commentList}
                    </ul>
                </div>
                {currentUser.isAuthenticated === true ? isLogin : isNotLogin}
            </div>
        )
    }
}

const mapStateToProps = state => {
    let comments = Object.assign([], state.comments)
    let votes = Object.assign([], state.votes)
    return {
        comments: comments,
        votes: votes
    }
}

export default connect(mapStateToProps, {
    addNewComment,
    getCommentByPost,
    getDeletePost,
    getDeleteImage,
    getDeleteComment,
    addNewVote,
    getAllVote,
    getDeleteVote })(CommentPage)
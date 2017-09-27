import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isEmpty, map, find } from 'lodash'
import { addNewComment, getCommentByPost, getDeleteComment } from '../../actions/comment'
import { addNewVote, getVoteByPost, getDeleteVote } from '../../actions/vote'
import CommentForm from '../../components/comment/CommentForm'

class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vote: false
        }
        this.addVote = this.addVote.bind(this)
        this.deleteVote = this.deleteVote.bind(this)
    }

    componentWillMount() {
        this.props.getCommentByPost()
        this.props.getVoteByPost()
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
            return vote.user_id[0]._id === this.props.currentUser.user._id && vote.post_id[0] === this.props.post._id
        })
        return {
            voted: !isEmpty(voted)
        }
    }

    render() {
        const { post, currentUser, comments, addNewComment } = this.props
        const postUser = post.user_id[0]

        let { voted } = this.checkVote(this.props.votes)

        let votes = []

        map(this.props.votes, vote => {
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

        const existAvatar = (
            <Link className="_pg23k _i2o1o" to={postUser.username}>
                <img className="_rewi8" src={post.user_id[0].avatar} alt="" />
            </Link>
        )

        const noAvatar = (
            <Link className="_pg23k _i2o1o" to={postUser.username}>
                <img className="_rewi8" src="https://res.cloudinary.com/timothybom/image/upload/v1505211426/avatar_mf1yiz.jpg" alt="" />
            </Link>
        )

        const time = moment(post.created_at).fromNow()

        return (
            <article className="_s5vjd">
                <header className="_7b8e">
                    {post.user_id[0].avatar ? existAvatar : noAvatar}
                    <div className="_j56ec">
                        <Link className="_2g7d5" to={postUser.username}>{postUser.username}</Link>
                    </div>
                </header>
                <div className="_e3il2">
                    <img className="_2di5" src={post.image_url} alt="" />
                </div>
                <div className="_ebcx">
                    <section className="_8oo9">
                        {voted === this.state.vote
                            ? <a className="_eszk _l9yih" onClick={this.addVote}>
                                <i className="fa fa-heart-o fa-lg"></i>
                            </a>
                            : <a className="_eszk _l9yih" onClick={this.deleteVote}>
                                <i className="fa fa-heart fa-lg text-danger"></i>
                            </a>}
                        <span className="_nzn1h">{votes.length} {votes.length > 1 ? 'likes' : 'like'}</span>
                    </section>
                    <div className="_4a48i">
                        <ul className="_b0tqa">
                            <li className="_ezgzd">
                                <Link className="_2g7d5 _95hvo" to={postUser.username}>{postUser.username}</Link>
                                <span>{post.caption}</span>
                            </li>
                            {commentList}
                        </ul>
                    </div>
                    <div className="_ha6c6">
                        <time className="_p29ma">{time}</time>
                    </div>
                    <section className="_km7ip _ti7l3">
                        <CommentForm post={post} currentUser={currentUser} addNewComment={addNewComment} />
                    </section>
                </div>
            </article>
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
    getDeleteComment,
    addNewVote,
    getVoteByPost,
    getDeleteVote })(PostList)
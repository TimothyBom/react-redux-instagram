import React from 'react'
import { connect } from 'react-redux'
import { includes } from 'lodash'
import { getUserPage } from '../../actions/user'
import { addNewPost, getPostUser } from '../../actions/post'
import { getFollowUser, setFollowerUser, getAllFollowUser, getUnFollowUser, getunFollowerUser } from '../../actions/relationship'
import NavbarLayout from '../../components/layout/NavbarLayout'
import AddPost from '../../components/modal/AddPost'
import PostList from './PostList'

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            fullname: '',
            username: '',
            avatar: '',
            bio: '',
            posts: []
        }
        this.followUser = this.followUser.bind(this)
        this.unFollowUser = this.unFollowUser.bind(this)
    }

    componentWillMount() {
        this.props.getUserPage(this.props.match.params.username)
        this.props.getPostUser(this.props.match.params.username)
        this.props.getAllFollowUser(this.props.match.params.username)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            _id: nextProps.userPage.user ? nextProps.userPage.user._id : '',
            fullname: nextProps.userPage.user ? nextProps.userPage.user.fullname : '',
            username: nextProps.userPage.user ? nextProps.userPage.user.username : '',
            avatar: nextProps.userPage.user ? nextProps.userPage.user.avatar : '',
            bio: nextProps.userPage.user ? nextProps.userPage.user.bio : '',
            posts: nextProps.posts ? nextProps.posts : []
        })
    }

    followUser(e) {
        e.preventDefault()
        this.props.getFollowUser(this.props.currentUser.user._id, this.state._id).then(() => {
            this.props.setFollowerUser(this.props.currentUser.user._id, this.state._id)
        })
    }

    unFollowUser(e) {
        e.preventDefault()
        this.props.getUnFollowUser(this.props.currentUser.user._id, this.state._id).then(() => {
            this.props.getunFollowerUser(this.props.currentUser.user._id, this.state._id)
        })
    }

    render() {
        const { addNewPost, userPage, currentUser, comments, votes } = this.props
        const { _id, fullname, avatar, bio, posts } = this.state
        
        const isMe = (
            <div className="_ienqf row">
                <h1 className="_rf3jb">{fullname}</h1>
                <span className="_ncrqg">
                    {posts.length === 0 ? '' : <button className="_qv64e _r9b8 _njrw0" data-toggle="modal" data-target="#AddPost"><i className="fa fa-camera fa-lg"></i></button>}
                </span>
            </div>
        )

        const isLogin = (
            <div className="_ienqf row">
                <h1 className="_rf3jb">{fullname}</h1>
                <span className="_ncrqg">
                    {includes(this.props.follower.follower_id, currentUser.user._id)
                        ? <button className="_qv64e _r9b8f _njrw0 _lyv4q" onClick={this.unFollowUser}>Following</button>
                        : <button className="_qv64e _r9b8f _njrw0 _lyv4q" onClick={this.followUser}>Follow</button>}
                </span>
            </div>
        )

        const isNotLogin = (
            <div className="_ienqf row">
                <h1 className="_rf3jb">{fullname}</h1>
            </div>
        )

        let checkUser = null
        if (currentUser.isAuthenticated === true) {
            if (currentUser.user._id === _id) {
                checkUser = isMe
            } else {
                checkUser = isLogin
            }
        } else if (currentUser.isAuthenticated === false) {
            checkUser = isNotLogin
        }

        const existAvatar = (
            <div className="_l8yre _qdmzb">
                <img className="_fya1f" src={avatar} alt="" />
            </div>
        )

        const noAvatar = (
            <div className="_l8yre _qdmzb">
                <img className="_fya1f" src="https://res.cloudinary.com/timothybom/image/upload/v1505211426/avatar_mf1yiz.jpg" alt="" />
            </div>
        )

        const postList = (
            posts.reverse().map(post => <PostList
                key={post._id}
                post={post}
                user={userPage.user}
                currentUser={currentUser}
                comments={comments}
                votes={votes}
            />)
        )

        const noPost = (
            <div className="_mb4ve">
                <div className="_52tai">
                    {currentUser.user._id === _id
                        ? <a data-toggle="modal" data-target="#AddPost"><i className="fa fa-camera fa-2x"></i></a>
                        : <i className="fa fa-camera fa-2x"></i>}
                </div>
                <h2 className="_1czfy">Share Photos</h2>
                <h3 className="_phurx">When you share photos, they will appear on your profile.</h3>
                <div className="_guea9">Share your first photo</div>
            </div>
        )

        let follower = Object.assign([], this.props.follower.follower_id)
        let following = Object.assign([], this.props.follower.following_id)

        return (
            <NavbarLayout>
                <article className="_mesn5 mt-10">
                    <header className="_mainc row">
                        <div className="_b0acm">
                            {avatar ? existAvatar : noAvatar}
                        </div>
                        <div className="_o6mpc">
                            {checkUser}
                            <ul className="_h9luf">
                                <li className="_bnq48">
                                    <span><span className="_fd86t">{posts.length}</span> {posts.length > 1 ? 'posts' : 'post'}</span>
                                </li>
                                <li className="_bnq48">
                                    <span><span className="_fd86t">{follower.length}</span> {follower.length > 1 ? 'followers' : 'follower'}</span>
                                </li>
                                <li className="_bnq48">
                                    <span><span className="_fd86t">{following.length}</span> following</span>
                                </li>
                            </ul>
                            { bio && <div className="_tb97a">
                                <span>{bio}</span>
                            </div>}
                        </div>
                    </header>
                    {posts.length === 0 ? noPost : <div className="row">{postList}</div>}
                    <AddPost addNewPost={addNewPost} />
                </article>
            </NavbarLayout>
        )
    }
}

const mapStateToProps = state => {
    let posts = Object.assign([], state.posts)
    let follower = Object.assign([], state.followers)
    let comments = Object.assign([], state.comments)
    let votes = Object.assign([], state.votes)
    return {
        currentUser: state.currentUser,
        userPage: state.user,
        posts: posts,
        follower: follower,
        comments: comments,
        votes: votes
    }
}

export default connect(mapStateToProps, {
    getUserPage,
    addNewPost,
    getPostUser,
    getFollowUser,
    setFollowerUser,
    getAllFollowUser,
    getUnFollowUser,
    getunFollowerUser })(UserPage)
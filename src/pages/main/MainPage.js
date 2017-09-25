import React from 'react'
import { connect } from 'react-redux'
import { getPostByFollow } from '../../actions/post'
import NavbarLayout from '../../components/layout/NavbarLayout'
import PostList from './PostList'

class MainPage extends React.Component {
    componentWillMount() {
        this.props.getPostByFollow(this.props.currentUser.user._id)
    }

    render() {
        const { posts, currentUser } = this.props

        const feedList = (
            posts.map(post => <PostList key={post._id} post={post} currentUser={currentUser} />)
        )

        return (
            <NavbarLayout>
                <section className="_owark mt-10">
                    {feedList}
                </section>
            </NavbarLayout>
        )
    }
}

const mapStateToProps = state => {
    let posts = Object.assign([], state.posts)
    return {
        currentUser: state.currentUser,
        posts: posts
    }
}

export default connect(mapStateToProps, { getPostByFollow })(MainPage)
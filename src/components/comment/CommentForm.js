import React from 'react'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            post_id: props.post._id,
            user_id: props.currentUser.user._id
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.addNewComment(this.state)
        this.setState({ comment: '' })
    }

    render() {
        const { comment } = this.state
        return (
            <form className="_b6i0l" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="_bilrf"
                    name="comment"
                    placeholder="Add Comment"
                    value={comment}
                    onChange={this.onChange}
                />
            </form>
        )
    }
}

export default CommentForm
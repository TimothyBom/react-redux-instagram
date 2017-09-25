import React from 'react'
import { isEmpty } from 'lodash'

class Search extends React.Component {
    onChange(e) {
        this.props.getSearchUser(e.target.value)
    }

    render() {
        const { search } = this.props

        const noAvatar = (
            <img className="_a4egj" src="https://res.cloudinary.com/timothybom/image/upload/v1505211426/avatar_mf1yiz.jpg" alt="" /> 
        )

        const userList = (
            search.map(user => (
                <a key={user._id} className="_gimca" href={`/${user.username}`}>
                    <div className="_t3f9x">
                        {user.avatar ? <img className="_a4egj" src={user.avatar} alt="" />  : noAvatar}
                        <div className="_cuwjc">
                            <div className="_ajwor">
                                <span className="_sgi9z">{user.username}</span>
                            </div>
                            <span className="_sayjy">{user.fullname}</span>
                        </div>
                    </div>
                </a>
            ))
        )

        return (
            <div>
                <form className="form-inline">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                        onChange={this.onChange.bind(this)}
                    />
                </form>
                {!isEmpty(search)
                    ? <div className="_dv59m">{userList}</div>
                    : ''}
            </div>
        )
    }
}

export default Search
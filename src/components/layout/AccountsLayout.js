import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLayout from './NavbarLayout'

const AccountsLayout = ({ children }) => (
    <NavbarLayout>
        <div className="row _28rsa mt-10">
            <ul className="col-md-3 _mleeu">
                <li>
                    <Link className="_fvhml" to="edit">Edit Profile</Link>
                </li>
                <li>
                    <Link className="_fvhml" to="password">Change Password</Link>
                </li>
            </ul>
            <article className="col-md-8">
                {children}
            </article>
        </div>
    </NavbarLayout>
)

export default AccountsLayout
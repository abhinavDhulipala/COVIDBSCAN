import React, { Component } from 'react'

class UserWelcome extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
            <h1> Welcome </h1>
            <h2> Disclaimer (must agree to continue) </h2>
            <body>
                The purpose of the Coronavirus Self-Checker is to help you make decisions
                about seeking appropriate medical care. This system is not intended for the
                diagnosis or treatment of disease, including COVID-19.
            </body>
        </div>

/*        return this.state.isLoggedIn ? (
            <div>Welcome, User</div>
        ) : (
            <div>Welcome, Guest</div>
        )*/

/*        let message
        if (this.state.isLoggedIn) {
            message = <div>Welcome, User</div>
        } else {
            message = <div>Welcome, Guest</div>
        }

        return <div>{message}</div>*/

/*        if (this.state.isLoggedIn) {
            return (
                <div>
                    Welcome, User
                </div>
            )
        } else {
            return (
                <div> Welcome, Guest </div>
            )
        }*/
    }
}

export default UserWelcome
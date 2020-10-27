import React, { Component } from 'react'

class UserWelcome extends Component {
    constructor(props) {
        super(props);

        this.toggleAgree = this.toggleAgree.bind(this);
        this.toggleDisagree = this.toggleDisagree.bind(this);
        this.toggleRefresh = this.toggleRefresh.bind(this);
        this.onClickAgree = this.onClickAgree.bind(this);
        this.onClickDisagree = this.onClickDisagree.bind(this);
    }

    toggleAgree = () => {
        this.props.toggleAgree();
    }

    toggleDisagree = () => {
        this.props.toggleDisagree();
    }

    toggleRefresh = () => {
        this.props.toggleRefresh();
    }

    onClickAgree = () => {
        this.toggleAgree();
        this.toggleRefresh();
    }

    onClickDisagree = () => {
        this.toggleDisagree();
        this.toggleRefresh();
    }

    render() {
        return <div>
            <h1> Welcome </h1>
            <h2> Disclaimer (must agree to continue) </h2>
            <body>
                <p> The purpose of the Coronavirus Self-Checker is to help you make decisions
                about seeking appropriate medical care. This system is not intended for the
                diagnosis or treatment of disease, including COVID-19. </p>

                <p> The original self-checker project was made possible through a partnership with the CDC
                Foundation and is enabled by Microsoft's Azure platform. CDC's collaboration with a
                non-federal organization does not imply an endorsement of any one particular service, product,
                    or enterprise. </p>

                <p> Call 911 if you have any extreme or life threatening symptoms including constant chest pains
                or pressure, extreme difficulty breathing or severe shortness of breath, severe constant
                dizziness or lightheadedness, slurred speech, or difficulty waking up. </p>

                <p> <strong>Note for International Users: </strong>
                    <br/>
                    Please check with your Ministry of Health, local health department, or medical provider
                    for additional information and guidelines about COVID-19 in your location.
                </p>

                <p> Select "I agree" to proceed with the Coronavirus Self-Checker. </p>
            </body>

            <div>
                <button onClick={this.onClickAgree}> I agree </button>
                <button onClick={this.onClickDisagree}> I don't agree </button>
            </div>
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
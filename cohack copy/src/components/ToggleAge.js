import React, { Component } from 'react';
import UserWelcome from "./UserWelcome";

class ToggleAge extends Component {
    constructor(props) {
        super(props);

    }

    toggleAge = () => {
        this.props.toggleAge();
    }

    render() {
        return (
            <div>
                <button onClick={this.props.toggleAge}> Yes </button>
                {
                    this.props.isOfAge ? <h1>Welcome</h1> : null
                }
            </div>
        )
    }
}

export default ToggleAge
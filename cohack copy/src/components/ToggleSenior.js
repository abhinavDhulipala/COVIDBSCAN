import React, { Component } from 'react';

class ToggleSenior extends Component {
    constructor(props) {
        super(props);

        this.toggleSenior = this.toggleSenior.bind(this);
    }

    toggleSenior = () => {
        this.props.toggleSenior();
    }

    toggleNotSenior = () => {
        this.props.toggleNotSenior();
    }

    render() {
        return (
            <div>
                <h3> Are you 65 years of age or older? </h3>
                <button onClick={this.toggleSenior}> Yes </button>
                <button onClick={this.toggleNotSenior}> No </button>
            </div>
        )
    }
}

export default ToggleSenior
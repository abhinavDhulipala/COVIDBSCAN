import React, { Component } from 'react';

class ToggleAge extends Component {
    constructor(props) {
        super(props);

        this.toggleAge = this.toggleAge.bind(this);
        this.toggleMinor = this.toggleMinor.bind(this);
    }

    toggleAge = () => {
        this.props.toggleAge();
    }

    toggleMinor = () => {
        this.props.toggleMinor();
    }

    render() {
        return (
            <div>
                <h3> Are you 18 years of age or older? </h3>
                <button onClick={this.toggleAge}> Yes </button>
                <button onClick={this.toggleMinor}> No </button>
            </div>
        )
    }
}

export default ToggleAge
import React, { Component } from 'react';

class Disagree extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h3>
                    Please provide your consent in order to use the Coronavirus Self-Checker.
                </h3>
                <p> Refresh the page to start over. </p>
            </div>
        )
    }
}

export default Disagree
import React, { Component } from 'react';

class Minor extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h2>
                    This is intended only for people who are 18 years or older.
                </h2>
                <p> Ask a parent or guardian to assist you and consult your pediatrician. </p>
            </div>
        )
    }
}

export default Minor
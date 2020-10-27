import React, { Component } from 'react';

class Minor extends Component {
    render() {
        return (
            <div>
                <h2>
                    This is intended only for people who are 18 years or older.
                </h2>
                <p> Ask a parent or guardian to assist you and consult your pediatrician. </p>
                <a href="https://www.cdc.gov/">
                    Visit the Centers for Disease Control and Prevention website for more information.
                </a>
            </div>
        )
    }
}

export default Minor
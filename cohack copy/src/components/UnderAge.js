import React, { Component } from 'react';

class UnderAge extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h2> This is intended only for people who are >= 18 years </h2>
                <a href="https://www.cdc.gov/"> Visit the Centers for Disease Control and Prevention website for more information. </a>
            </div>
        )
    }
}

export default UnderAge
import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";
import notExposedAPI from "../symptomatic/notexposed";

class NotExposed extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="title"> Symptomatic Without Exposure </div>
            </div>
        )
    }
}

export default NotExposed
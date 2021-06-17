import React, {Component}  from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from "react-bootstrap"
import {Amplify} from 'aws-amplify'
import {withAuthenticator} from '@aws-amplify/ui-react'
import awsConfig from '../aws-exports'

Amplify.configure(awsConfig)

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
        return <>
            <header>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bold">
                            Welcome
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Disclaimer (must agree to continue)
                        </Card.Subtitle>
                        <Card.Text>
                            The purpose of the Coronavirus Self-Checker is to help you make decisions
                            about seeking appropriate medical care. This system is not intended for the
                            diagnosis or treatment of disease, including COVID-19.
                        </Card.Text>
                        <Card.Text>
                            The original self-checker project was made possible through a partnership with the CDC
                            Foundation and is enabled by Microsoft's Azure platform. CDC's collaboration with a
                            non-federal organization does not imply an endorsement of any one particular service, product,
                            or enterprise.
                        </Card.Text>
                        <Card.Text>
                            Call 911 if you have any extreme or life threatening symptoms including constant chest pains
                            or pressure, extreme difficulty breathing or severe shortness of breath, severe constant
                            dizziness or lightheadedness, slurred speech, or difficulty waking up.
                        </Card.Text>
                        <Card.Text className="font-weight-bolder">
                            Select "I agree" to proceed with the Coronavirus Self-Screening.
                        </Card.Text>
                        <Button className="mr-3" onClick={this.onClickAgree}> I agree </Button>
                        <Button className="ml-3" onClick={this.onClickDisagree}> I don't agree </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            Note for International Users
                        </Card.Title>
                        <Card.Text>
                            Please check with your Ministry of Health, local health department, or medical provider
                            for additional information and guidelines about COVID-19 in your location.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </header>
        </>
    }
}

export default withAuthenticator(UserWelcome)

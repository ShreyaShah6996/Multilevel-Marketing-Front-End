import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as marketingAction from '../../action/marketing';

class Marketing extends Component {
    state = {
        Name: "",
        comission: "",
        parentId: 0
    }

    componentDidMount() {
        this.props.action.marketing.getMarketingData();
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onAdd(e) {
        e.preventDefault();
        let data = {
            Name: this.state.Name,
            comission: parseInt(this.state.comission),
            parentId: parseInt(this.state.parentId)
        }
        this.props.action.marketing.addMarketingData(data);
        this.setState({ Name: "", comission: "", parentId: 0 });
    }

    render() {
        let marketingData = [];
        if (this.props.getMarketingData && this.props.getMarketingData.length !== 0) {
            marketingData = this.props.getMarketingData.map(data => {
                return (<option key={data.id} value={data.id}>
                    {data.Name}
                </option>)
            })
        }
        return (
            <Container style={{ marginTop: "40px", width: "500px" }}>
                <Form>
                    <h1>Salesman</h1>
                    <FormGroup>
                        <Label for="exampleSelect">Select Manager</Label>
                        <Input type="select" name="parentId" onChange={this.onChangeHandler.bind(this)} value={this.state.parentId}>
                            <option style={{ display: "none" }}>Select Manager</option>
                            {marketingData}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Name">Name</Label>
                        <Input type="text" name="Name" placeholder="Name" onChange={this.onChangeHandler.bind(this)} value={this.state.Name} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="comission">Comission</Label>
                        <Input type="text" name="comission" placeholder="comission" onChange={this.onChangeHandler.bind(this)} value={this.state.comission} />
                    </FormGroup>
                    <Button onClick={this.onAdd.bind(this)}>Add</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        marketingData: state.marketing.marketingData,
        getMarketingData: state.marketing.getMarketingData
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        marketing: bindActionCreators(marketingAction, dispatch)
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Marketing);
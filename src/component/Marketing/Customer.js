import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Table } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as marketingAction from '../../action/marketing';
import * as customerAction from '../../action/customer';

let ComissionData = [];

class Customer extends Component {
    state = {
        Amount: 0,
        parentId: 0,
    }

    componentDidMount() {
        this.props.action.marketing.getMarketingData();
    }

    onChangeHandler(e) {
        this.setState({ Amount: e.target.value })
    }

    onSelectChangeHandler(e) {
        this.props.action.getMarketingDataById.getMarketingById(e.target.value);
    }

    CalculateComission(id, amount) {
        let rootComission = "";
        let Amount = amount;
        this.props.getMarketingData.map(data => {
            if (data.id === id) {
                rootComission = Amount * parseInt(data.comission) / 100;
                Amount = Amount - rootComission;
                ComissionData.push({ "Name": data.Name, "Comission": Math.floor(rootComission * 100) / 100 })
                if (data.parentId !== 0) {
                    this.CalculateComission(data.parentId, Amount)
                }
            }
            return null;
        })
    }

    onAdd(e) {
        ComissionData = [];
        let rootComission = "";
        let Amount = this.state.Amount;
        e.preventDefault();
        if (this.props.getMarketingDataById) {
            this.props.getMarketingDataById.map(Iddata => {
                rootComission = Amount * parseInt(Iddata.comission) / 100;
                Amount = Amount - rootComission;
                ComissionData.push({ "Name": Iddata.Name, "Comission": Math.floor(rootComission * 100) / 100 })
                if (Iddata.parentId !== 0) {
                    this.CalculateComission(Iddata.parentId, Amount)
                }
                return null;
            })
        }
        this.setState({
            Amount: 0,
            parentId: 0
        })
        document.getElementById('parentId').value = 0;
    }

    render() {
        let marketingData = [];
        let display = "";
        if (this.props.getMarketingData && this.props.getMarketingData.length !== 0) {
            marketingData = this.props.getMarketingData.map(data => {
                return (<option key={data.id} value={data.id}>
                    {data.Name}
                </option>)
            })
        }

        display = ComissionData.map(displaydata => {
            return (
                <tr>
                    <td>{displaydata.Name}</td>
                    <td>{displaydata.Comission} Rs</td>
                </tr>
            )
        })
        return (
            <Container style={{ marginTop: "40px", width: "500px" }}>
                <Form>
                    <h1>Customer</h1>
                    <FormGroup>
                        <Label for="exampleSelect">Select Manager</Label>
                        <Input type="select" id="parentId" name="parentId" onChange={this.onSelectChangeHandler.bind(this)}>
                            <option style={{ display: "none" }} value="0">Select Manager</option>
                            {marketingData}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="comission">Amount</Label>
                        <Input type="text" name="Amount" placeholder="Amount" onChange={this.onChangeHandler.bind(this)} value={this.state.Amount} />
                    </FormGroup>
                    <Button onClick={this.onAdd.bind(this)}>Show</Button>
                </Form>
                <br />
                <h3>Display</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Comission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display.length !== 0 ? display : <tr><td>No data</td></tr>}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        getMarketingData: state.marketing.getMarketingData,
        getMarketingDataById: state.customer.getMarketingDataById
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        marketing: bindActionCreators(marketingAction, dispatch),
        getMarketingDataById: bindActionCreators(customerAction, dispatch)
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Customer);
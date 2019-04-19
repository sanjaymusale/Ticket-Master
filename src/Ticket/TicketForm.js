import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
// controller component - the value of form's field's are maintained in the state
class TicketForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            message: '',
            department: '',
            priority: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
    }

    // regular function - dont forget to bind the function in the constructor
    handleNameChange(e) {
        const name = e.target.value
        this.setState(() => ({
            name
        }))
    }

    // es6 arrow functions 
    handleMessageChange = (e) => {
        const message = e.target.value
        this.setState(() => ({
            message
        }))
    }

    // es6 arrow functions 
    handleDeptChange = (e) => {
        const department = e.target.value
        this.setState(() => ({
            department
        }))
    }

    // es6 arrow functions 
    handlePriorityChange = (priority) => {
        this.setState(() => ({
            priority
        }))
    }

    // es6 arrow functions 
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            department: this.state.department,
            message: this.state.message,
            priority: this.state.priority
        }

        axios.post('http://dct-api-data.herokuapp.com/tickets?api_key=10b27c45195a4294', formData)
            .then(response => {
                // console.log(response.data)
                if (!response.data.hasOwnProperty('errors')) {
                    const ticket = response.data
                    this.props.handleSubmit(ticket)
                    this.setState(() => ({
                        name: '',
                        department: '',
                        message: '',
                        priority: ''
                    }))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (


            <Form >
                <FormGroup>
                    <Label>
                        Name
                        <Input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Department
                        <Input type='select' value={this.state.department} onChange={this.handleDeptChange}>
                            <option value=""> select </option>
                            <option value="Technical"> Technical </option>
                            <option value="Sales"> Sales </option>
                            <option value="Hr"> Human Resources </option>
                        </Input>
                    </Label>
                </FormGroup>
                <FormGroup tag='fieldset'>
                    <legend>Priority</legend>

                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="priority" value={this.state.priority} onChange={() => {
                                this.handlePriorityChange('High')
                            }} /> High
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="priority" value={this.state.priority} onChange={() => {
                                this.handlePriorityChange('Medium')
                            }} /> Medium
                    </Label>
                    </FormGroup>
                    <FormGroup check >
                        <Label check>
                            <Input type="radio" name="priority" value={this.state.priority} onChange={() => {
                                this.handlePriorityChange('Low')
                            }} /> Low
                    </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Message
                        <Input typt='textarea' value={this.state.message} onChange={this.handleMessageChange}> </Input>
                    </Label>
                </FormGroup>

                <Button onClick={this.handleSubmit}> Submit</Button>
            </Form>

        )
    }
}

export default TicketForm
import React from 'react'


import { Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Button } from 'reactstrap'

export default
    class ViewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            code: this.props.ticket.ticket_code,
            name: this.props.ticket.name,
            department: this.props.ticket.department,
            message: this.props.ticket.message,
            priority: this.props.ticket.priority,
            status: this.props.ticket.status
        };

        this.toggle = this.toggle.bind(this);
    }



    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {

        return (
            <div>
                <Button color="link" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>TICKET</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <ListGroup>
                                <ListGroupItem>Code :{this.state.code}</ListGroupItem>
                                <ListGroupItem>Name :{this.state.name}</ListGroupItem>
                                <ListGroupItem>Department :{this.state.department}</ListGroupItem>
                                <ListGroupItem>Message :{this.state.message}</ListGroupItem>
                                <ListGroupItem>Priority :{this.state.priority}</ListGroupItem>
                                <ListGroupItem>Status :{this.state.status}</ListGroupItem>
                            </ListGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>

                        <Button color="primary" onClick={this.toggle}>Done</Button>
                    </ModalFooter>

                </Modal>
            </div>
        );
    }
}
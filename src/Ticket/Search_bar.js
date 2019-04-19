import React from 'react'
import { InputGroup, InputGroupText, InputGroupAddon, Input, Container, Row, Col, } from 'reactstrap';


class SearchBar extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <Container>
                        <Row>
                            <Col xs="6" sm="4"></Col>
                            <Col xs="4" sm="2"></Col>
                            <Col sm="6">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Search</InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={this.props.searchFilter} placeholder='Search by Name' />
                                </InputGroup>
                                <br />
                            </Col>

                        </Row>

                    </Container>

                </div>

            </div>
        )
    }
}

export default SearchBar
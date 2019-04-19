import React, { Component } from 'react';
import axios from 'axios'

import { BrowserRouter } from "react-router-dom";
import { Spinner, Container, Row, Col, Alert } from 'reactstrap'
import SearchBar from './Ticket/Search_bar'
import TicketTable from './Ticket/TicketTable'
import TicketForm from './Ticket/TicketForm';
import ProgressBar from './Ticket/Progress'
import Header from './Header'
import ChartDiagram from './Ticket/Chart'
import TablePagination from './Ticket/pagination'


class App extends Component {
  constructor() {
    super()
    this.state = {
      tickets: [],
      isLoaded: false,
      filteredData: [],
      currentPage: 0,
      pageSize: 5
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=10b27c45195a4294')
      .then((response) => {
        const tickets = response.data
        this.setState(() => ({
          tickets,
          isLoaded: true,
          visible: false,
          filteredData: tickets
        }))
      })
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }
  handleSubmit = (ticket) => {
    this.setState((prevState) => ({
      tickets: prevState.tickets.concat(ticket),
      visible: true,
      filteredData: prevState.tickets.concat(ticket)
    }))
  }
  progressUpdate = (updatedTicket) => {
    const tickets = this.state.tickets.map(ticket => {
      if (ticket.id === updatedTicket.id) {
        return {
          ...ticket, ...updatedTicket
        }
      } else {
        return ticket
      }
    })
    this.setState(() => ({
      tickets
    }))
  }

  filterByValue = (array, key) => {
    return array.filter(item => item.name.toLowerCase().includes(key.toLowerCase()))


  }
  searchFilter = (e) => {
    const keyword = e.target.value
    const tickets = this.state.tickets
    const filteredData = this.filterByValue(tickets, keyword)
    this.setState(() => ({ filteredData }))
  }
  // tablePagination = (data) => {
  //   const { currentPage, pageSize, tickets } = data
  //   const newTickets = tickets.slice(
  //       currentPage * pageSize,
  //       (currentPage + 1) * pageSize
  //   )
  //   this.setState(() => ({
  //     filteredData: tickets
  //   }))
  // }

  render() {

    return (
      <BrowserRouter>
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <Header />
              </div>

            </div>

          </div>
          <div className='container'>
            <div className='row'>

              <div className='col-md-8'>
                <h3>TICKET MASTER</h3>
                <div className='row'>
                  <div className='col-md-12'>
                    {/* {console.log('App js progrees', this.state.tickets)} */}
                    {this.state.isLoaded && <ProgressBar tickets={this.state.tickets} />}
                  </div>
                </div>
                <br />
              </div>
              <div className='col-md-4'>
                <h3>ADD TICKET</h3>
                <br />
              </div>
            </div>
            <SearchBar searchFilter={this.searchFilter} />
            <div className='row'>
              <div className='col-md-8'>
                {this.state.visible &&
                  <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                    SuccessFully Added
                </Alert>}
                {this.state.tickets.length !== 0 ?
                  <div>
                    <TicketTable tickets={this.state.filteredData} progressUpdate={this.progressUpdate} />
                    {/* <TablePagination tickets={this.state.filteredData} tablePagination={this.tablePagination} /> */}
                  </div>
                  :
                  <Container>

                    <Row>
                      <Col sm="12" md={{ size: 6, offset: 3 }}><Spinner style={{ width: '3rem', height: '3rem' }} /></Col>
                    </Row>

                  </Container>
                }

              </div>
              <div className='col-md-4'>
                <TicketForm handleSubmit={this.handleSubmit} />
              </div>

            </div>

            <div class="container">
              <ChartDiagram />
            </div>


          </div>
        </div>
      </BrowserRouter >
    )
  }
}

export default App;
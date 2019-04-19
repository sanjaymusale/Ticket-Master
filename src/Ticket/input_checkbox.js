import React from "react";
import axios from 'axios'
import { Spinner } from 'reactstrap'

export default
    class InputCheckbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: this.props.status,
            ticket_code: this.props.ticket_code,
            loader: true
        }
    }
    statusChange = (e) => {
        const check = e.target.checked
        console.log(check)
        if (check) {
            const formData = {
                status: 'completed',
                ticket_code: this.state.ticket_code
            }
            this.setState(() => ({
                loader: false
            }), () => {
                axios.put(`http://dct-api-data.herokuapp.com/tickets/${this.state.ticket_code}?api_key=10b27c45195a4294`, formData)
                    .then(response => {
                        console.log(response.data)
                        const updatedTicket = response.data
                        this.props.progressUpdate(updatedTicket)
                        this.setState(() => ({
                            status: 'completed'
                        }))

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

        }
    }
    render() {
        return (
            <div>
                {this.state.status === 'open' && this.state.loader ?
                    <div><input type="checkbox" value={this.state.status} onChange={this.statusChange} />Close</div>
                    :
                    <div>

                        {this.state.status !== 'completed' ? <Spinner size="sm" color="primary" /> : 'Completed'}
                    </div>
                }
            </div>
        )
    }
}
import React from 'react'
import { Progress } from 'reactstrap';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: this.props.tickets,
            completedPercent: '100'
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ tickets: nextProps.tickets }, () => {
            this.calculation()
        });
        console.log('willprop', this.state)
        console.log('nextprops', nextProps)
    }
    calculation = () => {
        const tickets = this.state.tickets
        console.log('component will receive tickets', tickets)
        const completed = tickets.filter(ticket => ticket.status === 'completed')
        console.log('component will recieve tcompleted', completed)
        const completedPercent = parseFloat((completed.length * 100) / tickets.length).toPrecision(4)
        this.setState(() => ({ completedPercent }))
    }
    componentDidMount() {
        this.calculation()
    }
    render() {
        return (
            <div>
                <h4>Completed Tasks</h4>
                <Progress value={this.state.completedPercent}>{this.state.completedPercent}%</Progress>
            </div>
        )
    }
}

export default ProgressBar
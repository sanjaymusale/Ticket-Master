import React from 'react'
import ViewModal from './View_modal'
import InputCheckbox from './input_checkbox'

const TicketRow = (props) => {
    return (
        <tr>
            <td><ViewModal ticket={props} buttonLabel={props.ticket_code} /></td>
            <td> {props.name} </td>
            <td> {props.department} </td>
            <td> {props.message} </td>
            <td> {props.priority} </td>
            <td> <InputCheckbox ticket_code={props.ticket_code} status={props.status} progressUpdate={props.progressUpdate} /></td>
        </tr>
    )
}

export default TicketRow
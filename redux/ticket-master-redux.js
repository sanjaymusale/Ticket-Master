
import { createStore, combineReducers } from 'redux'
import axios from 'axios'

const getTickets = (() => {
    axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=10b27c45195a4294')
        .then((response) => {
            const tickets = response.data
            store.dispatch(loadTicket(tickets))

        })
        .catch((err) => {
            console.log(err)
        })
})();

const ticketReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TICKET':
            return [].concat(state).concat(action.tickets)
        default:
            return [...state]
    }
}
const store = createStore(combineReducers({
    ticket: ticketReducer
}))

loadTicket = (tickets) => {
    return {
        type: 'LOAD_TICKET',
        tickets
    }
}

console.log(store.getState())
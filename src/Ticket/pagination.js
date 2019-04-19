import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default
    class TablePagination extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            tickets: this.props.tickets,
            currentPage: 0,
            pageSize: 5
        };

    }

    handleClick(e, index) {

        e.preventDefault();
        this.setState({
            currentPage: index
        }, () => {
            const { currentPage, pageSize } = this.state
            console.log(e, index)
            const data = {
                currentPage,
                pageSize,

            }


            this.props.tablePagination(data)
        });



    }

    render() {
        const { currentPage, pageSize, tickets } = this.state
        this.pagesCount = Math.ceil(tickets.length / pageSize);

        return (

            <React.Fragment>

                <div >

                    <Pagination aria-label="Page navigation example">

                        <PaginationItem disabled={currentPage <= 0}>

                            <PaginationLink
                                onClick={e => this.handleClick(e, currentPage - 1)}
                                previous
                                href="#"
                            />

                        </PaginationItem>

                        {[...Array(this.pagesCount)].map((page, i) =>
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem disabled={currentPage >= this.pagesCount - 1}>

                            <PaginationLink
                                onClick={e => this.handleClick(e, currentPage + 1)}
                                next
                                href="#"
                            />

                        </PaginationItem>

                    </Pagination>

                </div>



            </React.Fragment>

        );

    }

}
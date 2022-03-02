import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ReactPaginate from "react-paginate";
import { usePaginateStyles } from "./styles";
const Paginate = ({
    pageCount,
    pageRangeDisplayed,
    onPageChange,
    className,
    ...rest
}) => {
    const classes = usePaginateStyles();

    return (
        <ReactPaginate
            activeClassName={classes.active}
            activeLinkClassName={classes.activeLink}
            breakClassName={classes.break}
            breakLabel="..."
            breakLinkClassName={classes.breakLink}
            containerClassName={clsx(classes.root, className)}
            disabledClassName={classes.disabled}
            marginPagesDisplayed={2} 
            pageLinkClassName={classes.pageLink}
            pageRangeDisplayed={pageRangeDisplayed}
            previousClassName={classes.previous}
            previousLabel="previous"
            nextClassName={classes.next}
            nextLabel="next"
            nextLinkClassName={classes.nextLink}
            onPageChange={onPageChange}
            pageClassName={classes.page}
            pageCount={pageCount}
            previousLinkClassName={classes.previousLink}
            subContainerClassName="pages pagination"
            {...rest}
        />
    );
};

Paginate.propTypes = {
    className: PropTypes.string,
    onPageChange: PropTypes.func,
    pageCount: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
};

Paginate.defaultProps = {
    onPageChange: () => {},
    pageCount: 3,
    pageRangeDisplayed: 5,
};

export default Paginate;

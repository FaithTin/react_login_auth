import React, { useState } from "react";
import {Card,CardActions,Table,TableRow,TableCell,TableHead,TableBody,Checkbox,
    TablePagination,Button} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import TableEditBar from "./TableEditBar.jsx";
import { useReusableTableStyles } from "./styles";
import Paginate from "../Paginate";

const ReusableTable = ({ data, onDelete, customActions }) => {
    const classes = useReusableTableStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedData, setSelectedData] = useState([]); 
    const isSelected = (id) => selectedData.indexOf(id) !== -1;
    const isIndeterminate = () =>
        selectedData.length > 0 && selectedData.length < data.length;

    const renderHeader = () =>
        Object.keys(data[0]).map((key, index) => (
            <TableCell key={index}>{key.toUpperCase()}</TableCell>
        ));

    const renderCellValue = (item) =>
        Object.keys(data[0]).map((key) => (
            <TableCell key={uuid()}>{item[key]}</TableCell>
        ));

    const handleChangePage = (evt, page) => setPage(page);
    const handleChangeRowsPerPage = (evt) => setRowsPerPage(evt.target.value);

    const handleSelectAll = (evt) =>
        setSelectedData(evt.target.checked ? data.map(({ id }) => id) : []);

    const handleSelectOne = (evt, id) => {
        const selectedIndex = selectedData.indexOf(id);
        let newSelectedData = [];
        if (selectedIndex === -1) {
            newSelectedData = newSelectedData.concat(selectedData, id);
        } else if (selectedIndex === 0) {
            newSelectedData = newSelectedData.concat(selectedData.slice(1));
        } else if (selectedIndex === selectedData.length - 1) {
            newSelectedData = newSelectedData.concat(selectedData.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedData = newSelectedData.concat(
                selectedData.slice(0, selectedIndex),
                selectedData.slice(selectedIndex + 1)
            );
        }
        setSelectedData(newSelectedData);
    };

    const paginatedData = () =>
        data.slice(
            page * rowsPerPage,
            rowsPerPage + page * rowsPerPage < data.length
                ? rowsPerPage + page * rowsPerPage
                : data.length
        );
    const handlePageJump = (event) => {
        setPage(event.selected);
    };
    const renderCustomActions = () => {
        let tableEditProps = {
            selected: selectedData,
            onDelete: () => {
                onDelete(selectedData);
                setSelectedData([]);
            },
        };
        if (customActions) {
            tableEditProps = {
                ...tableEditProps,
                customActions: customActions.map((prop) => (
                    <Button
                        {..._.omit(prop, ["label", "onClick"])}
                        onClick={() => prop.onClick(selectedData)}
                    >
                        {prop.label}
                    </Button>
                )),
            };
        }
        return <TableEditBar {...tableEditProps} />;
    };

    return (
        <Card className={classes.root}>
            <PerfectScrollbar>
                <div className={classes.inner}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={
                                            data.length === selectedData.length
                                        }
                                        color="primary"
                                        indeterminate={isIndeterminate()}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                {renderHeader()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData().map((item) => (
                                <TableRow
                                    key={uuid()}
                                    hover
                                    selected={isSelected(item.id)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected(item.id)}
                                            color="primary"
                                            onChange={(evt) =>
                                                handleSelectOne(evt, item.id)
                                            }
                                            value={isSelected(item.id)}
                                        />
                                    </TableCell>
                                    {renderCellValue(item)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </PerfectScrollbar>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={data.length}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 1000]}
                />
                <Paginate
                    pageCount={Math.ceil(data.length / rowsPerPage)}
                    onPageChange={handlePageJump}
                />
            </CardActions>
            {renderCustomActions()}
        </Card>
    );
};

ReusableTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func,
    customActions: PropTypes.arrayOf(
        PropTypes.shape({
            variant: PropTypes.oneOf(["outlined", "contained"]),
            color: PropTypes.oneOf(["primary", "secondary"]),
            startIcon: PropTypes.element,
            onClick: PropTypes.func,
            label: PropTypes.string,
            key: PropTypes.string,
        })
    ),
};

export default ReusableTable;

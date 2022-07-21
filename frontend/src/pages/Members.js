import React from "react";
import API from '../api/API';
import Container from "@mui/material/Container";
import { EnhancedTableHead } from "../components/MembersList";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

import { EditPersonForm } from "../components/dialogs";
import PersonBO from "../api/PersonBO";
import LoadingProgress from "../components/helpers/LoadingProgress";

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      filteredPersons: [],
      personFilter: '',
      isLoading: false,
      rows: [],
      order: 'asc',
      orderBy: 'firstname',
      selected: [],
      page: 0,
      rowsPerPage: 25,
      person: null,
      editDialogOpen: false,
      personsToDelete: [],
    };
  }

  // This method gets called whenever the component gets mounted
  componentDidMount() {
    this.getPersons();
  }

  // This method is the first method that gets called, after the component is mounted.
  // It fetches all persons from the database and sets the state of the component.
  getPersons = () => {
    API.getAPI().getPersons()
      .then(personBOs =>
        this.setState({
          persons: personBOs,
          rows: personBOs,
          filteredPersons: [...personBOs],
          isLoading: false,
        }))
      .catch(error =>
        this.setState({
          persons: [],
          isLoading: false,
        })
      );
    this.setState({
      isLoading: true
    });
  };

  // sets the editDialogOpen to 'true'
  handleEditPersonButtonClicked = () => {
    this.setState({
      editDialogOpen: true,
    });
  }

  // Sends the changes of the selected Person to the Backend via the API
  onUpdateValues = (values) => {
    let updatedPerson = new PersonBO(this.state.person.getGoogleID(), values.firstname, values.lastname, this.state.person.getEmail(), values.username);
    updatedPerson.setId(this.state.person.getId());
    API.getAPI().updatePerson(updatedPerson).then(() => { this.getPersons() }).then(() => { this.forceUpdate(); });
  }

  /** Handles the onClick event of the delete member button */
  handledeletepersonButtonClicked = () => {
    this.state.personsToDelete.map(deletedPerson => {
      return this.deletePersonHandler(deletedPerson);
    })
  }

  // send the API Request to delete the selected Person in the Backend
  deletePersonHandler = (deletedPerson) => {
    const id = deletedPerson.getId();
    API.getAPI().deletePerson(id).then(() => { this.getPersons() }).then(() => { this.forceUpdate(); });
  }

  // Changes the sequence of the Table
  filterFieldValueChange = event => {
    event.preventDefault();
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredPersons: this.state.persons.filter(person => {
        let firstNameContainsValue = person.getFirstName().toLowerCase().includes(value);
        let lastNameContainsValue = person.getLastName().toLowerCase().includes(value);
        return firstNameContainsValue || lastNameContainsValue;
      }),
      personFilter: value
    });
  }

  // clears the Filter so that no person is selcted anymore
  clearFilterFieldButtonClicked = (event) => {
    event.preventDefault();
    // Reset the filter
    this.setState({
      filteredPersons: [...this.state.persons],
      personFilter: ''
    });
  }

  // sets the order in the State
  setOrder = (order) => {
    this.setState({ order: order });
  };

  // sets the orderby in the State
  setOrderBy = (orderBy) => {
    this.setState({ orderBy: orderBy });
  };

  // sets the selected in the State
  setSelected = (selected) => {
    this.setState({ selected: selected });
  };

  // sets the current Page in the State
  setPage = (page) => {
    this.setState({ page: page });
  };

  // handles whether the user wants to sort the table ascending or descending
  handleRequestSort = (event, property) => {
    event.preventDefault();
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setOrder(isAsc ? 'desc' : 'asc');
    this.setOrderBy(property);
  };

  // selects all persons in the table
  handleSelectAllClick = (event) => {
    event.preventDefault();
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.id);
      this.setSelected(newSelecteds);
      return;
    }
    this.setSelected([]);
  };

  // sets the selected Person in the State
  handleClick = (event, id, selectedPerson) => {
    event.preventDefault();
    const selectedIndex = this.state.selected.indexOf(id);
    let newSelected = [];
    let newPersonsToDelete = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, id);
      newPersonsToDelete.push(selectedPerson);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
      newPersonsToDelete = [];
    } else if (selectedIndex === this.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
      newPersonsToDelete.push(selectedPerson);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
      newPersonsToDelete.push(selectedPerson);
    }
    this.setState({ person: selectedPerson, personsToDelete: newPersonsToDelete });
    this.setSelected(newSelected);
  };

  // sets the current page to the new page
  handleChangePage = (event, newPage) => {
    event.preventDefault();
    this.setPage(newPage);
  };

  // changes the amount of rows per page
  handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    this.setRowsPerPage(parseInt(event.target.value, 10));
    this.setPage(0);
  };


  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {

    const { isLoading, order, orderBy, selected, rowsPerPage, page, rows, editDialogOpen, person } = this.state;
    const emptyRows = this.state.page > 0 ? Math.max(0, (1 + this.page) * this.state.rowsPerPage - this.state.rows.length) : 0;

    return (
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} maxWidth='xl'>
        {
          isLoading ? (
            <LoadingProgress show={isLoading} />
          ) : (
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    display: 'flex',
                    justifyContent: 'space-between',

                    ...(selected.length > 0 && {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                  }}
                >
                  {selected.length > 0 ? (
                    <Tooltip title="Delete">
                      <IconButton onClick={this.handledeletepersonButtonClicked}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <IconButton />
                  )}
                  {selected.length === 1 ? (
                    <Tooltip title="Edit">
                      <IconButton onClick={this.handleEditPersonButtonClicked}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <IconButton disabled={true}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Toolbar>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                      {this.stableSort(rows, this.getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const selectedPerson = row;
                          const rowID = row.getId();
                          const isItemSelected = this.isSelected(rowID);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => this.handleClick(event, rowID, selectedPerson)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={rowID}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  id={labelId}

                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"

                              >
                                {row.getFirstName()}
                              </TableCell>
                              <TableCell align="left" padding="none" id={labelId}>{row.getLastName()}</TableCell>
                              <TableCell align="left" padding="none" id={labelId} >{row.getUserName()} </TableCell>
                              <TableCell align="left" padding="none" id={labelId} >{row.getEmail()} </TableCell>
                              <TableCell align="left" padding="none" id={labelId} >{row.getRole()} </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={this.handleChangePage}
                  onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
                <EditPersonForm open={editDialogOpen} onClose={() => this.setState({ editDialogOpen: false })} person={person}
                  onSaveValues={(updatedValues) => this.onUpdateValues(updatedValues, this.rowID)} />
              </Paper>
            </Box>)
        }
      </Container>
    );
  }
}

export default Members;
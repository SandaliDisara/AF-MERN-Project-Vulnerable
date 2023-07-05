import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Box, Paper, styled } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert'; 
import Axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import "../AnimalProduction/AnimalProduction.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Link } from 'react-router-dom';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const BackButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(15),
  // textAlign: 'center',
}));

export default function CustomPaginationActionsTable() {
  const [vegi, setVegitable] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vegi.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };





  useEffect(() => {
    Axios.get('http://localhost:8070/vegitableProduction/getVegitableProduction')
      .then((getVegi) => {
        setVegitable(getVegi.data);
      })
  })
  
  const setID = (_id, District, Division, VegiType, Season, CLArea, Harvest, SurplusDeficit, Year) => { // for update
  
  
        localStorage.setItem('District', District);
        localStorage.setItem('Division', Division);
        localStorage.setItem('VegiType', VegiType);
        localStorage.setItem('Season', Season);
        localStorage.setItem('CLArea', CLArea);
        localStorage.setItem('Harvest', Harvest);
        localStorage.setItem('SurplusDeficit', SurplusDeficit);
        localStorage.setItem('Year', Year);
        localStorage.setItem('ID', _id);
  }
  
  // const onDelete = (_id) => {
  //   Axios.delete("http://localhost:8070/vegitableProduction/deleteVegitableProduction/" + _id)
  //     .then(() => {
  //       window.location.reload();
  //     })
  // }
  
  // const submit = (_id) => {
  
  //   confirmAlert({
  //     title: 'Confirm to Delete',
  //     message: 'Are you sure to do this?',
  //     buttons: [
  //     {
  //       label: 'Yes',
  //       onClick: () => onDelete(_id)
  //     },
  //     {
  //       label: 'No',
  //     }
  //     ]
  //   });
  // }


  return (
    <div>
      
      <TableContainer component={Paper} sx={{ mt: 15, mb: 10, mx: 'auto', maxWidth: 1400 }}>
        <h1 className="h1" style={{ textAlign: 'center' }}>View Vegitable Details</h1>
        <BackButtonContainer>
          {/* <Link to="/addvegi">
          <Button variant="contained" color="success">Add Vegitable</Button>
          </Link> */}
        </BackButtonContainer>
        <Table sx={{ maxWidth: 1400 }} aria-label="custom pagination table">
          <TableBody>
          <TableRow>
            <TableCell style={{ width: 100, fontWeight: 'bold', fontSize: '1.2rem' }} align="center">District</TableCell>
            <TableCell style={{ width: 100, fontWeight: 'bold', fontSize: '1.2rem' }} align="center">Division</TableCell>
            <TableCell style={{ width: 100, fontWeight: 'bold', fontSize: '1.2rem' }} align="center">Vegitable</TableCell>
            <TableCell style={{ width: 20, fontWeight: 'bold', fontSize: '1.2rem' }} align="center">Action</TableCell>
          </TableRow>
            {(rowsPerPage > 0
              ? vegi.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : vegi
            ).map((data) => (
              <TableRow key={data._id}>
                <TableCell style={{ width: 100 }} align="center">
                  {data.District}
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  {data.Division}
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  {data.VegiType}
                </TableCell>
                <TableCell style={{ width: 20 }} align="center">

                <Link to="/clientsvegi">
                  <Button variant="contained" color="success" sx={{mr:2}}
                    onClick={() => 
                          setID(data._id, data.District, data.Division, data.VegiType, data.Season, data.CLArea, data.Harvest, data.SurplusDeficit, data.Year)
                        }
                  >View</Button>
                </Link>
                  {/* <Link to="/upvegi">
                    <Button variant="contained" color="success" 
                      onClick={() => 
                          setID(data._id, data.District, data.Division, data.VegiType, data.Season, data.CLArea, data.Harvest, data.SurplusDeficit, data.Year)
                      }
                    >Update</Button>
                  </Link>

                  <Button variant="outlined" color="error" sx={{ml:2}} 
                    onClick={() => submit(data._id)}>
                    Delete
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={vegi.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
      </Table>
    </TableContainer>

    </div>
  );
}




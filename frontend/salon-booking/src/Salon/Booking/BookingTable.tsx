import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Cancel, Title } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import store from "../../Redux/store";
import { getAllBookingsBySalon } from "../../Redux/reducers/bookingReducer";
import { useSelector } from "react-redux";
import { bookingSelector } from "../../Redux/reducers/bookingReducer";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BookingTables() {
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    if (localStorage.getItem("jwt"))
      dispatch(
        getAllBookingsBySalon({ jwtToken: localStorage.getItem("jwt")! })
      );
  }, []);
  const { bookings } = useSelector(bookingSelector);

  return (
    <>
      <TableContainer component={Paper}>
        <h1 className="text-xl font-bold pb-5">Booking Tables</h1>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Services</StyledTableCell>
              <StyledTableCell align="right">Time & Date</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Customer</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Cancel</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <StyledTableRow key={booking.id}>
                <StyledTableCell component="th" scope="row">
                  {booking.serviceDtos.map((service) => (
                    <li
                      key={service.id}
                    >{`${service.name} -- ${service.duration} min`}</li>
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {booking.startTime}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {booking.totalPrice}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {booking.userDto.fullName}
                  <br />
                  {booking.userDto.email}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {booking.bookingStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button color="error">Cancel</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

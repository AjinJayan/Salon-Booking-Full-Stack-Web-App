import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import {
  categorySelector,
  getAllCategoriesBySalon,
} from "../../Redux/reducers/categoryReducer";
import {
  getSalonByOwnerId,
  salonSelector,
} from "../../Redux/reducers/salonReducer";
import { useEffect } from "react";
import {
  getAllServiceOfferingsBySalonId,
  serviceOfferingSelector,
} from "../../Redux/reducers/serviceOfferingReducer";
import IconButton from "@mui/material/IconButton";
import { Edit } from "@mui/icons-material";

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

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function ServiceTables() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { salon } = useSelector(salonSelector);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     dispatch(getSalonByOwnerId({ jwtToken: localStorage.getItem("jwt")! }));
  //   }
  // }, []);

  useEffect(() => {
    if (salon && localStorage.getItem("jwt"))
      dispatch(
        getAllServiceOfferingsBySalonId({
          jwtToken: localStorage.getItem("jwt")!,
          salonId: salon?.id,
        })
      );
  }, [salon]);
  const { serviceOfferings } = useSelector(serviceOfferingSelector);
  return (
    <>
      <TableContainer component={Paper}>
        <h1 className="text-xl font-bold pb-5">Service Tables</h1>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceOfferings.map((serviceOffering) => (
              <StyledTableRow key={serviceOffering.name}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-1 flex-wrap">
                    <img
                      className="w-20 object-contain rounded-md"
                      src={serviceOffering.image}
                      alt=""
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {serviceOffering.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {serviceOffering.price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

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

export default function CategoryTables() {
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
        getAllCategoriesBySalon({
          jwtToken: localStorage.getItem("jwt")!,
          salonId: salon?.id,
        })
      );
  }, [salon]);
  const { categories } = useSelector(categorySelector);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-1 flex-wrap">
                    <img
                      className="w-20 object-contain rounded-md"
                      src={category.image}
                      alt=""
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{category.name}</StyledTableCell>
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

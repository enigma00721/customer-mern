import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Chip,
  IconButton,
} from "@material-ui/core";
import { useState } from "react";
// utils
import fetcher from "../../../utils/fetcher";
// library
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { useSnackbar } from "notistack";

// icons
import { Delete, Edit } from "@material-ui/icons";
// styles
import StyledTableCell from "../Partials/StyledTableCell";
import ConfirmDelete from "../Partials/ConfirmDelete";
import ReactForm from "./ReactForm";
import { ContractType } from "./types";
import Moment from "react-moment";

const Contract = () => {
  // styles config
  const { enqueueSnackbar } = useSnackbar();

  // swr config
  const { mutate } = useSWRConfig();
  const CLIENT_API = "api/client/name";
  const CONTRACT_API = "api/contract/";

  // state
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [toEditData, setToEditData] = useState<ContractType>(undefined);

  // FETCH DATA
  const { data: clients, error: clientError } = useSWR(CLIENT_API, fetcher);
  const { data: contracts, error: contractError } = useSWR(
    CONTRACT_API,
    fetcher
  );

  if (clientError) return <div>failed to load</div>;
  if (!clients) return <div>loading...</div>;
  if (contractError) return <div>failed to load</div>;
  if (!contracts) return <div>loading...</div>;

  const handleDelete = () => {
    axios
      .delete(CONTRACT_API + updateId)
      .then(({ data }) => {
        console.log(data);
        mutate(CONTRACT_API);
        setOpenDeleteDialog(false);
        enqueueSnackbar(data.success_msg, { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddContract = () => {
    console.log("add");
    setIsEditMode(false);
    setOpenDialog(true);
    setToEditData(undefined);
  };

  return (
    <Box m={5}>
      <Button color="primary" variant="outlined" onClick={handleAddContract}>
        Add Contract
      </Button>

      <ReactForm
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        clients={clients}
        toEditData={toEditData}
        setToEditData={setToEditData}
        updateId={updateId}
      />

      {/* table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Company Name</StyledTableCell>
              <StyledTableCell align="left">Payment Status</StyledTableCell>
              <StyledTableCell align="left">Contract Sign Date</StyledTableCell>
              <StyledTableCell align="left">Contract End Date</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts &&
              contracts?.map((row) => (
                <TableRow key={row._id} hover={true}>
                  <StyledTableCell align="left">
                    {row?.client_id?.company_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.payment_status === "paid" ? (
                      <Chip
                        size="medium"
                        label={row.payment_status}
                        color="primary"
                      />
                    ) : (
                      <Chip
                        size="medium"
                        label={row.payment_status}
                        color="secondary"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Moment format="MMMM Do YYYY">
                      {row.contract_sign_date}
                    </Moment>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Moment fromNow>{row.contract_end_date}</Moment>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      onClick={() => {
                        setUpdateId(row._id);
                        setToEditData(row);
                        setIsEditMode(true);
                        setOpenDialog(true);
                      }}
                    >
                      <Edit fontSize="medium" />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setUpdateId(row._id);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      <Delete fontSize="medium" />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* table */}

      <ConfirmDelete
        handleDelete={handleDelete}
        setOpenDeleteDialog={setOpenDeleteDialog}
        openDeleteDialog={openDeleteDialog}
      />
    </Box>
  );
};

export default Contract;

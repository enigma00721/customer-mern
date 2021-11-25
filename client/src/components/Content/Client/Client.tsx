import {
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from "@material-ui/core";
import { useEffect, useState } from "react";
// library
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
// icons
import { Delete, Edit } from "@material-ui/icons";
// styles
import useStyles from "./ClientStyles";
import StyledTableCell from "../Partials/StyledTableCell";
// alert confirm dialog component
import ConfirmDelete from "../Partials/ConfirmDelete";

interface FormData {
  _id?: string;
  company_name: string;
  company_address: string;
  client_name: string;
  email: string;
  phone: number;
}

const Client = () => {
  // state
  const [open, setOpen] = useState<boolean>(false); // add update client dialog
  const [rows, setRows] = useState<FormData[]>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // delete confirm dialog state
  const [deleteId, setDeleteId] = useState<string>(null);

  // react-form-hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // notification snackbar
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllData();
  }, []);

  // fetch all client data
  const getAllData = () => {
    axios
      .get("api/client")
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle add client dialog config
  const handleAddClientDialog = () => {
    reset({});
    setIsEdit(false);
    setOpen(true);
  };
  // handle edit dialog config
  const handleEdit = (row: FormData): void => {
    setIsEdit(true);
    reset(row);
    setOpen(true);
  };

  // save new client or update client
  const handleClient = (data: FormData) => {
    if (!isEdit)
      axios
        .post("api/client", data)
        .then((response) => {
          setRows((prevState) => [...prevState, response.data]);
          enqueueSnackbar(response.data.success_msg, { variant: "success" });
        })
        .then(() => {
          setOpen(!open);
          reset();
          getAllData();
        })
        .catch((error) => {
          console.log(error);
        });
    else
      axios
        .patch("/api/client/" + data._id, data)
        .then((response) => {
          getAllData();
          setOpen(false);
          enqueueSnackbar(response.data.success_msg, { variant: "success" });
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(error.message, { variant: "error" });
        });
  };

  // delete client
  const handleDelete = (): void => {
    axios
      .delete("api/client/" + deleteId)
      .then((response) => {
        console.log(response);
        enqueueSnackbar(response.data.success_msg, { variant: "success" });
      })
      .then(() => {
        setOpenDeleteDialog(false);
        getAllData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const classes = useStyles();

  console.log(errors);

  return (
    <Box m={5}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={handleAddClientDialog}
      >
        Add Client
      </Button>

      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle id="form-dialog-title">
          {" "}
          {isEdit ? "Edit Client" : "Add New Client"}
        </DialogTitle>

        <form onSubmit={handleSubmit(handleClient)}>
          <DialogContent dividers={true}>
            <TextField
              margin="normal"
              size="medium"
              variant="outlined"
              autoFocus
              label="Company Name"
              type="text"
              fullWidth
              {...register("company_name", {
                required: "Company Name is required!",
              })}
              error={!!errors.company_name}
              helperText={
                errors && errors.company_name && errors.company_name.message
              }
            />
            <TextField
              margin="normal"
              size="medium"
              variant="outlined"
              label="Client Name"
              type="text"
              fullWidth
              {...register("client_name", {
                required: "Cliet Name is required!",
              })}
              error={!!errors.client_name}
              helperText={
                errors && errors.client_name && errors.client_name.message
              }
            />
            <TextField
              margin="normal"
              size="medium"
              variant="outlined"
              label="Company Address"
              type="text"
              fullWidth
              {...register("company_address", {
                required: "Company Address is required!",
              })}
              error={!!errors.company_address}
              helperText={
                errors &&
                errors.company_address &&
                errors.company_address.message
              }
            />
            <TextField
              margin="normal"
              size="medium"
              variant="outlined"
              label="Company Email"
              type="email"
              fullWidth
              {...register("email", { required: "Company Email is required!" })}
              error={!!errors.email}
              helperText={errors && errors.email && errors.email.message}
            />
            <TextField
              margin="normal"
              size="medium"
              variant="outlined"
              label="Company Phone"
              type="number"
              fullWidth
              {...register("phone", { required: "Phone is required!" })}
              error={!!errors.phone}
              helperText={errors && errors.phone && errors.phone.message}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              {isEdit ? "Update" : "Save"}
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setOpen(false);
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Company Name</StyledTableCell>
              <StyledTableCell align="left">Company Address</StyledTableCell>
              <StyledTableCell align="left">Client Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row._id} hover={true}>
                <StyledTableCell align="left">
                  {row.company_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.company_address}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.client_name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.phone}</StyledTableCell>

                <StyledTableCell align="left">
                  <IconButton>
                    <Edit fontSize="medium" onClick={() => handleEdit(row)} />
                  </IconButton>
                  <IconButton>
                    <Delete
                      fontSize="medium"
                      onClick={() => {
                        setOpenDeleteDialog(true);
                        setDeleteId(row._id);
                      }}
                    />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDelete
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default Client;

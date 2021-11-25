import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
// library
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
// utils
import fetcher from "../../../utils/fetcher";
// icon
import { Delete, Edit } from "@material-ui/icons";
// styles
import StyledTableCell from "../Partials/StyledTableCell";
import ConfirmDelete from "../Partials/ConfirmDelete";
import { ClientType, BranchType, ContactPersonType } from "./types";

const ContactPerson = () => {
  // initial config
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  // api constants
  const CLIENT_API = "api/client/name";
  const CONTACT_API = "api/person/";

  // state
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [hasBranch, setHasBranch] = useState<boolean>(false);
  const [branch, setBranch] = useState<BranchType[]>(null);
  const [selectClient, setSelectClient] = useState<string>(null);
  const [selectBranch, setSelectBranch] = useState<string>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>(null);
  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPersonType>({
    shouldUnregister: true,
  });

  // swr api fetch
  const { data: clients, error: clientsError } = useSWR(CLIENT_API, fetcher);
  const { data: contacts, error: contactsError } = useSWR(CONTACT_API, fetcher);
  if (clientsError) return <div>failed to load</div>;
  if (!clients) return <div>loading...</div>;
  if (contactsError) return <div>failed to load</div>;
  if (!contacts) return <div>loading...</div>;

  const onSubmit = (data) => {
    // console.log(data);
    setSelectBranch(null);
    if (!isEditMode)
      axios
        .post(CONTACT_API, data)
        .then((response) => {
          console.log(response);
          setOpenDialog(false);
          mutate(CONTACT_API);
        })
        .catch((error) => console.log(error));
    else {
      console.log(data);
      axios
        .patch(CONTACT_API + updateId, data)
        .then(({ data }) => {
          mutate(CONTACT_API);
          setOpenDialog(false);
          enqueueSnackbar(data.success_msg, { variant: "success" });
        })
        .catch((error) =>
          enqueueSnackbar(error.message, { variant: "warning" })
        );
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSelectChange = (event: any) => {
    const id = event.target.value;
    getBranchOfClient(id);
  };

  // fetch branch associated with a particular client
  const getBranchOfClient = (id: string) => {
    axios
      .get("/api/branch/client/" + id)
      .then(({ data }) => {
        console.log(data);
        if (data.length) {
          setHasBranch(true);
          setBranch(data);
        } else {
          setHasBranch(false);
          setBranch(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // FIXME: fix it after making better single form page
  // const handleEdit = (row: EditContactPersonType) => {
  const handleEdit = (row: ContactPersonType<ClientType, BranchType>) => {
    setHasBranch(false);
    setIsEditMode(true);
    setSelectClient(row.client_id._id);
    if (row.branch_id) {
      getBranchOfClient(row.client_id._id);
      setSelectBranch(row.branch_id._id);
    }
    reset(row);
    setOpenDialog(true);
  };

  const handleAddContact = () => {
    reset({});
    setOpenDialog(true);
    setIsEditMode(false);
    setSelectClient(null);
    setSelectBranch(null);
  };

  const handleDelete = () => {
    console.log("delete");
    axios
      .delete("api/person/" + updateId)
      .then(({ data }) => {
        setOpenDeleteDialog(false);
        mutate(CONTACT_API);
        enqueueSnackbar(data.success_msg, { variant: "success" });
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "warning" }));
  };
  console.log(errors);
  return (
    <Box m={5}>
      <Button variant="outlined" color="primary" onClick={handleAddContact}>
        Add Contact Person
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEditMode ? "Update" : "Add"} Contact Person
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              select
              {...register("client_id", { required: "Client is required!" })}
              onChange={handleSelectChange}
              label="Client"
              fullWidth
              defaultValue={selectClient}
              variant="outlined"
              error={!!errors.client_id}
            >
              {clients.map((client: ClientType) => (
                <MenuItem key={client._id} value={client._id}>
                  {client.company_name}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
              {errors && errors.client_id && errors.client_id.message}
            </FormHelperText>

            {hasBranch && (
              <TextField
                select
                {...register("branch_id", { required: "Branch is required!" })}
                label="Branch"
                fullWidth
                variant="outlined"
                style={{ marginTop: "20px" }}
                defaultValue={selectBranch}
                error={!!errors.branch_id}
              >
                {branch?.map((row) => (
                  <MenuItem key={row._id} value={row._id}>
                    {row.address}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <FormHelperText className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
              {errors && errors.branch_id && errors.branch_id.message}
            </FormHelperText>

            <TextField
              variant="outlined"
              margin="normal"
              {...register("name", { required: "Name is required!" })}
              label="Name"
              type="text"
              fullWidth
              error={!!errors.name}
              helperText={errors && errors.name && errors.name.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              {...register("email", { required: "Email Field is required!" })}
              label="Email Address"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors && errors.email && errors.email.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              {...register("address", {
                required: "Address Field is required!",
              })}
              label="Address"
              type="text"
              fullWidth
              error={!!errors.address}
              helperText={errors && errors.address && errors.address.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              {...register("phone", {
                required: "Phone Number is required!",
                min: {
                  value: 10,
                  message: "Please enter a valid phone number",
                },
              })}
              label="Phone Number"
              type="number"
              fullWidth
              error={!!errors.phone}
              helperText={errors && errors.phone && errors.phone.message}
            />
          </DialogContent>

          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              {isEditMode ? "Update" : "Save"}
            </Button>
            <Button onClick={handleClose} color="secondary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Company Name</StyledTableCell>
              <StyledTableCell align="left">Branch Address</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts?.map((row) => (
              <TableRow key={row._id} hover={true}>
                <StyledTableCell align="left">
                  {row.client_id.company_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.branch_id?.address ? (
                    row.branch_id.address
                  ) : (
                    <Chip
                      label="No Branch"
                      variant="outlined"
                      color="secondary"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                <StyledTableCell align="left">{row.address}</StyledTableCell>

                <StyledTableCell align="left">
                  <IconButton
                    onClick={() => {
                      setUpdateId(row._id);
                      handleEdit(row);
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

      <ConfirmDelete
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default ContactPerson;

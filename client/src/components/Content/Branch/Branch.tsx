import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
// styles
import StyledTableCell from "../Partials/StyledTableCell";
// icons
import { Delete, Edit } from "@material-ui/icons";
// swr
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../../../utils/fetcher";
import ConfirmDelete from "../Partials/ConfirmDelete";
// import ReactHookFormSelect from "./ReactHookFormSelect";

interface ClientType {
  _id: string;
  company_name: string;
}
interface BranchType<G = string> {
  _id: string;
  address: string;
  client_id: G;
}

const Branch = () => {
  // api const
  const CLIENT_API = "api/client/name";
  const BRANCH_API = "api/branch";

  // notification snackbar
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  // state
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // default form hook data
  const formData = {
    id: "",
    address: "",
    client_id: "",
  };

  // form hook
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  // swr config
  const { data: clients, error: clientError } = useSWR(CLIENT_API, fetcher);
  const { data: branches, error: branchError } = useSWR(BRANCH_API, fetcher);

  if (clientError) return <div>failed to load client data</div>;
  if (!clients) return <div>loading...</div>;
  if (branchError) return <div>failed to load branch data</div>;
  if (!branches) return <div>loading...</div>;

  // save new branch and also update
  const onSubmit = (data: BranchType) => {
    console.log("on submit");
    console.log(data);
    console.log(updateId);
    if (!isEditMode)
      axios
        .post("api/branch", data)
        .then(({ data }) => {
          setOpen(false);
          mutate(BRANCH_API);
          enqueueSnackbar(data.success_msg, { variant: "success" });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      axios
        .patch("api/branch/" + data._id, data)
        .then(({ data }) => {
          mutate(BRANCH_API);
          enqueueSnackbar(data.success_msg, { variant: "success" });
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  // edit config
  const handleEdit = (row: BranchType<ClientType>) => {
    console.log("update id", updateId);
    console.log("edit", row);
    setIsEditMode(true);
    setOpen(true);
    reset({ ...row, client_id: row.client_id._id });
    console.log(formData);
  };

  const handleDelete = () => {
    axios
      .delete("api/branch/" + updateId)
      .then(({ data }) => {
        mutate(BRANCH_API);
        setOpenDeleteDialog(false);
        enqueueSnackbar(data.success_msg, { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box m={5}>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          setIsEditMode(false);
          reset({});
          setOpen(true);
        }}
      >
        Add Branch
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEditMode ? "Edit Branch" : "Add New Branch"}
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="client_id"
              control={control}
              rules={{ required: "Client is required!" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Client"
                  id="select"
                  fullWidth
                  variant="outlined"
                  error={!!errors.client_id}
                >
                  <MenuItem value=""></MenuItem>
                  {clients &&
                    clients?.map((client) => (
                      <MenuItem key={client._id} value={client._id}>
                        {client.company_name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
            <span className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
              {errors && errors.client_id && errors.client_id.message}
            </span>

            <TextField
              {...register("address", { required: "Address is requied!" })}
              variant="outlined"
              margin="normal"
              id="address"
              label="Address"
              type="text"
              fullWidth
              error={!!errors.address}
              helperText={errors && errors?.address?.message}
            />
          </DialogContent>

          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              {isEditMode ? "Update" : "Save"}
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                reset({});
              }}
              color="secondary"
              variant="contained"
            >
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
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches &&
              branches?.map((row) => (
                <TableRow key={row._id} hover={true}>
                  <StyledTableCell align="left">
                    {row?.client_id?.company_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.address}</StyledTableCell>

                  <StyledTableCell align="left">
                    <IconButton onClick={() => handleEdit(row)}>
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

export default Branch;

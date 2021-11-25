import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  MenuItem,
  TextField,
} from "@material-ui/core";

import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { ContractType } from "./types";
import { useEffect } from "react";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useSnackbar } from "notistack";
// dev tool for hook form
import { DevTool } from "@hookform/devtools";

const ReactForm = ({
  openDialog,
  setOpenDialog,
  isEditMode,
  setIsEditMode,
  clients,
  toEditData,
  setToEditData,
  updateId,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  // swr config
  const { mutate } = useSWRConfig();
  const CONTRACT_API = "api/contract/";

  // date today and one year after
  const signDate: string = moment().format("yyyy-MM-DD").toString();
  const endDate: string = moment().add(1, "y").format("yyyy-MM-DD").toString();

  // hook form default date values
  const defaultValues = {
    contract_sign_date: signDate,
    contract_end_date: endDate,
    client_id: toEditData?.client_id._id || undefined,
    payment_status: toEditData?.payment_status || undefined,
  };

  // hook form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContractType>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (isEditMode) reset({ ...defaultValues });
  }, [isEditMode, reset]);

  const handleClose = () => {
    setIsEditMode(false);
    setOpenDialog(false);
    setToEditData(null);
    reset();
  };

  const onSubmit = (data: ContractType) => {
    console.log("ob submit");
    console.log(data);
    if (!isEditMode)
      axios
        .post(CONTRACT_API, data)
        .then(({ data }) => {
          mutate(CONTRACT_API);
          setOpenDialog(false);
          reset();
          enqueueSnackbar(data.success_msg, { variant: "success" });
        })
        .catch((err) => {
          console.log(err);
        });
    else {
      console.log(data);
      axios
        .patch(CONTRACT_API + updateId, data)
        .then(({ data }) => {
          mutate(CONTRACT_API);
          setOpenDialog(false);
          setIsEditMode(false);
          reset();
          enqueueSnackbar(data.success_msg, { variant: "success" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {isEditMode ? "Update Contract" : "Add Contract"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="client_id"
            control={control}
            rules={{ required: "Client is required!" }}
            // defaultValue={defaultValues?.client_id}
            render={({ field }) => (
              <TextField
                select
                {...field}
                style={{ marginBottom: "10px" }}
                label="Client"
                fullWidth
                variant="outlined"
                error={!!errors.client_id}
              >
                {clients &&
                  clients.map((client) => (
                    <MenuItem key={client._id} value={client._id}>
                      {client.company_name}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
          <FormHelperText className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
            {errors && errors.client_id && errors.client_id.message}
          </FormHelperText>

          <Controller
            name="payment_status"
            rules={{ required: "Payment Status is required!" }}
            control={control}
            // defaultValue={defaultValues.payment_status}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Payment Status"
                fullWidth
                variant="outlined"
                error={!!errors.payment_status}
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="notpaid">Not Paid</MenuItem>
              </TextField>
            )}
          />
          <FormHelperText className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
            {errors && errors.payment_status && errors.payment_status.message}
          </FormHelperText>

          <TextField
            {...register("contract_sign_date", {
              required: "Contract Sign Date is required!",
            })}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Contract Sign Date"
            type="date"
            error={!!errors.contract_sign_date}
            helperText={
              errors &&
              errors.contract_sign_date &&
              errors.contract_sign_date.message
            }
          />
          <TextField
            {...register("contract_end_date", {
              required: "Contract End Date is required!",
            })}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Contract End Date"
            type="date"
            error={!!errors.contract_end_date}
            helperText={
              errors &&
              errors.contract_end_date &&
              errors.contract_end_date.message
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {}}
            color="primary"
            variant="contained"
            type="submit"
          >
            {isEditMode ? "Update" : "Save"}
          </Button>
          <Button
            onClick={handleClose}
            // onClick={() => {
            //   setOpenDialog(false);
            //   reset({});
            // }}
            color="secondary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Dialog>
  );
};

export default ReactForm;

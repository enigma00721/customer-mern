import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core"

const ConfirmDelete = ({openDeleteDialog,setOpenDeleteDialog,handleDelete}) => {

    return (
        <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleDelete}>
                    Yes
                </Button>
                <Button onClick={() => setOpenDeleteDialog(false)} color="primary" autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDelete

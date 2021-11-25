import { makeStyles} from '@material-ui/core'

export default makeStyles((theme) => ({
    button: {
        textAlign: "center",
    },
    icon: {
        color: theme.palette.text.secondary,
        display:'flex',
        alignItems: "center",
        "&:hover": {
            cursor: 'pointer',
        }
    }
}));


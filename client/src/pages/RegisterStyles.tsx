import {makeStyles} from '@material-ui/core'

export default makeStyles((theme) => ({
    box: {
        textAlign: 'center',
        marginTop: '-140px',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: '10px',
        border: '5px solid #fafafa',
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
    },
    title: {
        marginBottom: '20px'
    },
    input: {
        marginBottom: '10px',
    },
    error: {
        textAlign: 'left',
        color: 'red',
        marginBottom: '10px',
    },
}));
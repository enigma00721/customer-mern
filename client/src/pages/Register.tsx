import { Box, TextField, Button, Typography, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import useStyles from './RegisterStyles';
import axios from 'axios';

interface IForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Login = () => {
    
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    const history = useHistory();

    // react form hook
    const { register, handleSubmit ,setError, formState: { errors } } = useForm();

    const onSubmit = async(data:IForm) => {
        console.log(data);

        if(data.password !== password){
            setError("confirmPassword", {
                type: "manual",
                message: "Confirm password didn't match!",
            });
        }else{
            const newData = await axios.post('auth/register',data);
            console.log(newData);  // gives token and other many datas
            history.goBack();
            // history.push('/login');
        }
    }
   
    // toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // set confirm password to react state
    const checkPassword = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    }

    return (
            // <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.box} p={5} width="25%" component="form" onSubmit={handleSubmit(onSubmit)}>

                <Typography className={classes.title} variant="h4">Register</Typography>

                <TextField error={errors.name && true} 
                   label="Full Name" variant="outlined" className={classes.input} 
                    {...register("name", { required: true, maxLength:40,minLength:5})}
                />

                <Typography component="span" variant="caption" className={classes.error}>
                    {errors.name?.type === 'required' && "Full name is required"}
                    {errors.name?.type === 'minLength' && "Full name should not be less than 5 characters"}
                </Typography>


                <TextField error={!!errors.email} {...register("email",{required:true, maxLength:30})} label="Email" variant="outlined" className={classes.input} />

                <Typography component="span" variant="caption" className={classes.error}>
                    {errors.email?.type === 'required' && "Email is required"}
                    {errors.email?.type === 'minLength' && "Email shouldnot be greater than 30"}
                </Typography>


                <TextField error={!!errors.password}
                    {...register("password", {required:true, minLength: { value: 5, message: 'Password should be longer than 5' }, maxLength: { value: 20,message:'Password Too Big' } })} 
                       label="Password" variant="outlined" className={classes.input}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment:(
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    aria-label="toggle password visibility"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />

                <Typography component="span" variant="caption" className={classes.error}>
                    {errors.password?.type === 'required' && "Password is required"}
                    {errors.password?.type === 'minLength' && errors.password.message }
                    {errors.password?.type === 'maxLength' && errors.password.message }
                </Typography>


                {/* confirm password input field */}
                <TextField error={!!errors.confirmPassword}
                    {...register("confirmPassword", { required: true, maxLength: 30, minLength: 5 })} label="Confirm Password"  variant="outlined" className={classes.input}
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => checkPassword(e)}
                    InputProps={{ 
                        endAdornment:(
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Typography component="span" variant="caption" className={classes.error}>
                    {errors.confirmPassword?.type === 'required' && "Confirm Password is required"}
                    {errors.confirmPassword?.type === 'minLength' && "Confirm password should be greater than 5"}
                    {errors.confirmPassword?.type === 'maxLength' && "Confirm password shouldnot exceed length 20"}
                    {errors.confirmPassword?.type === 'manual' && errors.confirmPassword.message}
                </Typography>


                <Button type="submit" className={classes.title} size="large" variant="contained" color="primary" style={{ marginTop: '20px' }}>Submit</Button>

                <Typography variant="body2">Already Registered <Link to="/">Login</Link></Typography>

        </Box>
    )
}

export default Login

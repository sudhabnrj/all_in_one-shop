import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { setLoading } from '../utils/loaderSlice';
import { addCurrentUser, setLoggedInUser, setIsDropdown } from '../utils/userSlice';

const Login = () => {
    const loading = useSelector((state) => state.loader.loading);
    const allUsers = useSelector((store)=> store.user.allUsers) || [];
    const loggedInUser = useSelector((store)=> store.user.loggedInUser) || [];
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);

    useEffect(()=> {
        dispatch(setLoading(true));
        setTimeout(()=> {
            dispatch(setLoading(false));
        }, 1000);
    }, []);

    if(loggedInUser.loggedIn){
        navigate('/my-account');
    }

    const handleLogin = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        if(!emailValue || !passwordValue){
            setErrors({message: "Email and Password are required"});
            return;
        }

        const user = allUsers.find((user) => user.user?.email === emailValue && user.user?.password === passwordValue);
        
        
        if(user){
            dispatch(addCurrentUser(user));
            dispatch(setLoggedInUser({
                userid: user.user?.userid,
                firstName: user.address?.firstName,
                lastName: user.address?.lastName,
                email: user.user?.email,
                loggedIn: true,
            }));
            navigate('/');
            // console.log('Login data---', user)
        }else{
            alert('Invalid credentials');
        }
        
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // console.log('Login - New Register data :', userLoggedIn);

    return (
        <div className="loginPage py-8">
            {loading && <Loader />}
            <div className=" container mx-auto px-3 xl:px-0">
                <h1 className="mb-4 font-bold md:mb-6 __variable_12adec text-2xl md:text-3xl lg:text-4xl">Customer Login</h1>
                <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:gap-10">
                    <div className="w-full lg:w-1/2">
                        <h5 className="mb-4 border-b font-medium __variable_12adec text-xl pb-2">Registered Customers</h5>
                        <form onSubmit={(e)=> e.preventDefault()}>
                            <div className="inputBox">
                                <label>Email <sup>*</sup></label>
                                <input ref={email} className="border border-light-dark text-md px-4 py-2 w-full rounded-md focus:border-secondary" type="email" name="email" />
                            </div>
                            <div className="inputBox">
                                <label>Password <sup>*</sup></label>
                                <input ref={password} className="border border-light-dark text-md px-4 py-2 w-full rounded-md focus:border-secondary"  type={showPassword ? 'text' : 'password'} name="password" />
                                <div className="text-secondary"></div>
                            </div>
                            {errors.message && <div className="text-primary">{errors.message}</div>}
                            <div className="inputBox flex items-center gap-2 my-2">
                                <input id="showpassword" type="checkbox" onClick={handleShowPassword} />
                                <label htmlFor="showpassword">Show Password</label>
                            </div>
                            <div className="flex items-center justify-start">
                                <button onClick={handleLogin} className="hover:bg-gr inline-block rounded border-2 border-secondary bg-secondary px-3 py-2 text-center leading-normal text-white shadow transition-all hover:bg-white hover:text-secondary md:px-4" type="submit">Submit</button>
                                <Link className="ml-2 text-secondary md:pl-2" to="/forgotpassword">Forgot Your Password?</Link>
                            </div>
                        </form>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h5 className="mb-4 border-b font-medium __variable_12adec text-xl pb-2">New Customers</h5>
                        <p className=" mb-4">Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</p>
                        <Link to='/signup' className="hover:bg-gr inline-block rounded border-2 border-secondary bg-secondary px-3 py-2 text-center leading-normal text-white shadow transition-all hover:bg-white hover:text-secondary md:px-4">Create an Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

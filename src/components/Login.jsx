import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTitle from './hooks/useTitle';

import { validate } from './js/validate';
import { notify } from './js/notify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/Login.module.css'

const Login = () => {

    useTitle("Login Page")

    const [data , setData] = useState({
        email : '',
        password : '',
    })

    const [errors , setErrors] = useState({})
    const [touched , setTouched] = useState({})

    useEffect(() => {
        setErrors(validate(data , 'login'))
    }, [data , touched])

    const inputHandler = (e) => {
        setData({...data , [e.target.name] : e.target.value})
    }

    const touchHandler = (e) => {
        setTouched({...touched , [e.target.name] : true})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!Object.keys(errors).length) {
            notify("success" , "Congratulations! You have successfully logged in.")
        } else {
            notify("error" , "It seems like your login attempt failed. Please check your informations and try again.")
            setTouched({
                email : true ,
                password : true ,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label>Email</label>
                    <input 
                        className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput} 
                        type='text' 
                        name='email' 
                        value={data.email} 
                        onChange={inputHandler} 
                        onFocus={touchHandler}/>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input 
                        className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput} 
                        type='password' 
                        name='password' 
                        value={data.password} 
                        onChange={inputHandler} 
                        onFocus={touchHandler}/>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <p>Dont have an account? <Link to='/signup'>SignUp here</Link>.</p>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Login;
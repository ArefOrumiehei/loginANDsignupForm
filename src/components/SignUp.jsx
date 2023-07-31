import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';


import { validate } from './js/validate';
import { notify } from './js/notify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/SignUp.module.css'
import useTitle from './hooks/useTitle';

const SignUp = () => {

    useTitle("SignUp Page")

    const [data , setData] = useState({
        name : '',
        email : '',
        password : '',
        confirmPassword : '',
        isAccepted : false
    })

    const [errors , setErrors] = useState({})
    const [touched , setTouched] = useState({})

    useEffect(() => {
        setErrors(validate(data , 'signup'))
    }, [data , touched])

    const inputHandler = (e) => {
        if(e.target.name === "isAccepted"){
            setData({...data , [e.target.name] : e.target.checked})
        }else {
            setData({...data , [e.target.name] : e.target.value})
        }
    }

    const touchHandler = (e) => {
        setTouched({...touched , [e.target.name] : true})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!Object.keys(errors).length) {
            notify("success" , "Congratulations! You have successfully signed up.")
        } else {
            notify("error" , "It seems like your login attempt failed. Please check your informations and try again.")
            setTouched({
                name : true , 
                email : true ,
                password : true ,
                confirmPassword : true ,
                isAccepted : true
            })
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2 className={styles.header}>SignUp</h2>
                <div className={styles.formField}>
                    <label>Username</label>
                    <input 
                        className={(errors.name && touched.name) ? styles.uncompleted : styles.formInput} 
                        type='text' 
                        name='name' 
                        value={data.name} 
                        onChange={inputHandler} 
                        onFocus={touchHandler}/>
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
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
                <div className={styles.formField}>
                    <label>Confirm password</label>
                    <input 
                        className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput} 
                        type='password' 
                        name='confirmPassword' 
                        value={data.confirmPassword} 
                        onChange={inputHandler} 
                        onFocus={touchHandler}/>
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkboxContainer}>
                        <label>Please read and accept our<br/> privacy policy before proceeding.</label>
                        <input 
                            type='checkbox' 
                            name='isAccepted' 
                            value={data.isAccepted} 
                            onChange={inputHandler} 
                            onFocus={touchHandler}/>
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <p>Already have an account? <Link to='/login'>Login here</Link>.</p>
                    <button type='submit'>SignUp</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default SignUp;
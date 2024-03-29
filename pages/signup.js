import React, { useContext, useState, useEffect } from 'react'
import Footer from './footer'
import styles from '@/styles/Signup.module.css'
import Link from 'next/link'
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from './context/themeContext';
import { TbFingerprint, TbFingerprintOff } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import { SiNamebase } from "react-icons/si";
import router from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import ClipLoader from "react-spinners/ClipLoader";

const Signup = () => {

    const [textType, setTextType] = useState("password");

    const [visible, setVisible] = useState(true);

    const { theme, handleOnClick } = useContext(ThemeContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    //google signin
    async function handleGoogleSignin() {
        signIn("google", { callbackUrl: "http://localhost:3000" })

    }

    //github signin
    async function handleGithubSignin() {
        signIn("github", { callbackUrl: "http://localhost:3000" })
    }

    const handleTextType = () => {
        setVisible(!visible)
        if (visible) {
            setTextType('text')
        }
        else {
            setTextType('password')
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
        } else if (password.search(/[a-z]/) < 0) {
            setError('Password must contain at least one lowercase letter');
        } else if (password.search(/[A-Z]/) < 0) {
            setError('Password must contain at least one uppercase letter');
        } else if (password.search(/[0-9]/) < 0) {
            setError('Password must contain at least one digit');
        } else if ((password.search(/[!@#$%^&*]/) < 0)) {
            setError('Password must contain at least one special character');
        } else {
            setError('');
            const data = { name, email, password };

            try {
                let res = await fetch('http://localhost:3000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                setIsLoading(false)
                let response = await res.json();
                console.log(response);
                setEmail('');
                setName('');
                setPassword('');

                if (response.error) {
                    setIsLoading(false)
                    toast.error(response.error, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (response.success) {
                    setIsLoading(false)
                    toast.success(response.success, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        router.push('http://localhost:3000/login');
                    }, 3000);
                } else {
                    setIsLoading(false)
                    toast.error("Unexpected response from server", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } catch (error) {
                setIsLoading(false)
                console.error('An error occurred:', error);
                toast.error("An error occurred while processing your request", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };


    return (
        <>
            <div className={`${styles.main}`}>
                <form className={`${styles.form} container `} onSubmit={handleSubmit} method='POST' >
                    <h3 className={`text-center text-white`}>Signup</h3>
                    <div className="form-group">
                        <label htmlFor="name" className={`text-white mx-1 `}>Name</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange} type="text" className={`${styles.input}   m-1`} name='name' id="name" value={name} aria-describedby="emailHelp" placeholder="" required />
                            <i className={`${styles.eye}`}>
                                <SiNamebase />
                            </i>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className={`text-white  mx-1`}>Email address</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange} value={email} type="email" className={`${styles.input}  m-1`} name='email' id="email" aria-describedby="emailHelp" placeholder="" required />
                            <i className={`${styles.eye}`}>
                                <MdAlternateEmail />
                            </i>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className={`text-white mx-1`}>Password</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange} value={password} type={textType} className={`${styles.input} m-1`} name='password' id="password" placeholder="" required />
                            <i onClick={handleTextType} className={`${styles.eye}`}>
                                {visible ? <TbFingerprint /> : <TbFingerprintOff />}
                            </i>
                        </div>
                        {error && (<div class="alert alert-danger" role="alert">
                            {error}
                        </div>)}
                    </div>
                    {/* <div className="form-group form-check m-1">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className={`text-whiteform-check-label`} htmlFor="Check">Check me out</label>
                    </div> */}
                    <span>
                        {isLoading ? (<button type="submit" className={`${styles.button} btn m-2`}><span>
                            <ClipLoader
                                color='#ffffff'
                                loading={isLoading}
                                size={15}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </span></button>) : (<button type="submit" className={`${styles.button} btn m-2`}>Signup</button>)}
                        <Link href={'/forgotpassword'} style={{ float: 'right' }} className={`${styles.button1} btn m-2`}>Forgot Password</Link></span>
                    <div className='text-center'>
                        <div className={`${styles.loginusing}`}>
                            <div className={`${styles.signusing}`}></div><b >Or Login using</b><div className={`${styles.signusing}`}></div>
                        </div>
                        <span onClick={handleGoogleSignin} ><GoogleLoginButton className={`${styles.google} m-2`} /></span>
                        <span onClick={handleGithubSignin}><GithubLoginButton className={`${styles.google} m-2`} /></span>
                    </div>
                    <div className={`${styles.already}`}>
                        <p className={`text-white text-center`}>Already have an account <Link href={'/login'} className={`${styles.button} btn m-1`}>Login</Link></p>
                    </div>
                </form>
            </div>
            <Footer />
        </>

    )
}

export default Signup
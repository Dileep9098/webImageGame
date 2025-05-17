

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from '../firebase'
import { showErrorMgs, showSuccessMgs } from '../utils/ShowMessages'
import Loader from '../utils/Loader'

const auth = getAuth(app)

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(true)

    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()

    const togglePassword = () => setShow(!show)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                showSuccessMgs("Login Successful ")
                navigate("/game-page")
                setLoading(false)
            })
            .catch((error) => {
                showErrorMgs(error.message)
                setLoading(false)

            })
    }

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <div className="background p-2">

            <div className="menu px-3 py-2">
                <div className="d-flex align-items-center justify-content-between">

                    <div className="flex-grow-1 text-center">
                        <h2 style={{ fontWeight: "bold", fontSize: "2rem", letterSpacing: "1px", }} > CATCH THE FAKE  </h2>
                    </div>

                    <div className="ms-auto position-absolute end-0 me-3">
                        <span className="material-symbols-outlined text-light">menu</span>
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="main">
                        <div className="center1">
                            <div className="text-center mb-4">
                                <h2>Log In</h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email ID</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <div className="d-flex">

                                        <input type={`${show ? "password" : "text"}`} className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
                                        <span className="material-symbols-outlined visibility" onClick={togglePassword} >{show ? "visibility" : "visibility_off"}</span>
                                    </div>

                                </div>

                                <div className=" mb-3">
                                    <Link to="#" className="text-decoration-none text-light">Forgot your password?</Link>
                                </div>

                                <div className="text-center mt-3">
                                    <button type="submit" className="btnS">Login</button>
                                </div>

                                <p className="text-center mt-2">
                                    Don't have an account? <Link to="/sign-up">Register here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

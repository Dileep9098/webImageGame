
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { app } from '../firebase'
import { showErrorMgs, showSuccessMgs } from '../utils/ShowMessages'
import Loader from '../utils/Loader'

const auth = getAuth(app)
const db = getFirestore(app)

export default function RegisterUser() {
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [cpassword, setCPassword] = useState()
    const [show, setShow] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()


    const pshow = () => setShow(!show)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== cpassword) {
            showErrorMgs("Passwords do not match!")
            return
        }

        setLoading(true)


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await updateProfile(user, {
                displayName: name
            })

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                phone: phone,
                createdAt: new Date()
            })

            setLoading(false)


            showSuccessMgs("Registration Successful")
            navigate('/login')

        } catch (error) {
            console.error("Registration Error:", error.message)
            showErrorMgs(error.message)
        }
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
                                <h2>Register Yourself</h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="mb-3 col-lg-6">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} required />
                                    </div>

                                    <div className="mb-3 col-lg-6">
                                        <label className="form-label">Phone No.</label>
                                        <input type="text" className="form-control" placeholder='Enter Your Phone No.' onChange={(e) => setPhone(e.target.value)} required value={phone} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email ID</label>
                                    <input type="email" className="form-control" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className="row">
                                    <div className="mb-3 col-lg-6">
                                        <label className="form-label">Password</label>
                                        <div className="d-flex">
                                            <input
                                                type={show ? "password" : "text"}
                                                className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                            />
                                            <span className="material-symbols-outlined visibility" onClick={pshow}>
                                                {show ? "visibility" : "visibility_off"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-3 col-lg-6">
                                        <label className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={(e) => setCPassword(e.target.value)}
                                            value={cpassword}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='text-center mt-3'>
                                    <button type="submit" className="btnS">Continue</button>
                                </div>

                                <p className="text-center mt-2">Already have an account? <Link to="/login" id='rlink'>Login here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

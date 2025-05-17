import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
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
                            <div className="center mt-4">
                                <h1>Catch the fake</h1>
                                <p>Beware of Fraud Messages! <br />Spot the fraud and collect point.</p>

                                <div className="loginBtn ">
                                    <Link to="/login" className='btnS text-decoration-none'>Log in</Link>
                                </div>

                                <p>Don't have log in ? <Link to="/sign-up" id='rlink'>Register yourself</Link></p>


                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

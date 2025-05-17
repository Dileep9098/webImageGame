import React from 'react'
import { Link } from 'react-router-dom'

export default function GamePage() {
    return (
        <>
            <div className="background p-2">
                <div className="menu px-3 py-2">
                    <div className="d-flex align-items-center justify-content-between">

                        <div className="flex-grow-1 text-center">
                            <h2 className="m-0">Game Page</h2>
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
                                    <h2>Game Rules</h2>
                                </div>
                                <ul className="text-start mx-auto" >
                                    <li>Swipe Up to mark an image as <b className='text-danger '>Fraud</b></li>
                                    <li>Swipe Down to mark an image as <b className='text-success '>Safe</b></li>
                                    <li>There will be 10 images in total</li>
                                    <li>Your score will be shown at the end</li>
                                </ul>
                                <div className="text-center mt-5 playStart">
                                    <Link to="/start-game" className="btnS text-decoration-none d-inline-flex align-items-center gap-2">
                                        <span className="material-symbols-outlined">play_arrow</span>
                                        <span>Start Game</span>
                                    </Link>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

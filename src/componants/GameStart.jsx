import React, { useEffect, useState } from 'react';
import { getGameImages } from '../utils/getImagesFormFirebase';
import ImageCard from './ImageCard';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContextApi';
import { FaStar } from 'react-icons/fa';

export default function GameStart() {
    const [images, setImages] = useState([]);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const { score, setScore, currentIndex, setCurrentIndex, resetGame } = useGame();

    useEffect(() => {
        resetGame();
        async function loadImages() {
            const data = await getGameImages();
            setImages(data);
        }
        loadImages();
    }, []);

    const handleSwipe = (userChoice) => {
        const correct = images[currentIndex]?.label;


         if (userChoice === correct) {
            setScore(prev => prev + 1);
            setAlert({
                type: "success", title: "Correct", message: `This message was ${images[currentIndex]?.label}.`
            });
        } else {
            setAlert({
                type: "danger", title: "Wrong", message: `This message was ${images[currentIndex]?.label}.`
            });
        }
        setTimeout(() => {
            setAlert(null);

        }, 2000);

        if (currentIndex + 1 === images.length) {
            navigate("/game-over");
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    return (
        <>



            <div className=" background p-2" style={{height:"100vh"}} >
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
                <div className="text-center">

                    <div style={{ display: "inline-flex", alignItems: "center", padding: "10px 30px", borderRadius: "40px", border: "2px solid rgb(67, 87, 239)", boxShadow: "0 0 10px rgba(127, 180, 253, 0.6)", marginBottom: "10px", gap: "10px", }}>
                        <FaStar color="#ffd700" size={20} />
                        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{score}</span>
                    </div>

                    <div style={{ color: "#ccc" }}>
                        Image {currentIndex + 1} / {images.length}
                    </div>
                </div>

                <div className="mt-3 d-flex justify-content-center align-items-center" style={{ minHeight: "350px" }} >
                    {images.length > 0 && (
                        <ImageCard
                            image={images[currentIndex]}
                            onSwipe={handleSwipe}
                            totalImages={images.length}
                        />
                    )}
                </div>
                {alert && (
                    <div className="mt-1 d-flex justify-content-center" style={{ width: "100%" }}>
                        <div
                            className={`alert rounded shadow-sm position-relative`}
                            style={{
                                paddingRight: "40px",
                                width: "90%",
                                maxWidth: "400px",
                                margin: "auto",
                            }}
                        >
                            <button
                                type="button"
                                className="btn-close position-absolute top-0 end-0 m-2"
                                aria-label="Close"
                                onClick={() => setAlert(null)}
                            ></button>

                            <div className="d-flex align-items-center justify-content-center mb-2">
                                {alert.type === "success" && (
                                    <div
                                        className="me-2 d-flex justify-content-center align-items-center"
                                        style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: "50%",
                                            backgroundColor: "#198754",
                                            color: "white",
                                            boxShadow: "0 0 10px rgba(127, 250, 121, 0.8)"

                                        }}
                                    >
                                        <span className="material-symbols-outlined">check</span>
                                    </div>
                                )}
                                {alert.type === "danger" && (
                                    <div
                                        className="me-2 d-flex justify-content-center align-items-center"
                                        style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: "50%",
                                            backgroundColor: "#dc3545",
                                            color: "white",
                                            boxShadow: "0 0 10px rgba(250, 149, 121, 0.8)"

                                        }}
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </div>
                                )}
                                <h5 className="mb-0">{alert.title}</h5>
                            </div>

                            <p
                                className="mb-0 text-center"
                                style={{
                                    backgroundColor: `${alert.type === "success" ? "rgba(68, 255, 0, 0.1)" : "rgba(245, 131, 106, 0.1)"}`,
                                    padding: "10px 20px",
                                    borderRadius: "25px",
                                    width: "fit-content",
                                    margin: "auto",
                                    border: `1px solid ${alert.type === "success" ? "#00ff99" : "red"}`,
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    color: "white"
                                }}
                            >
                                {alert.message}
                            </p>
                        </div>
                    </div>
                )}



                <div className="instruction-box text-center mt-4"
                    style={{
                        backgroundColor: "#003d29", padding: "15px 30px", borderRadius: "10px", width: "fit-content", margin: "auto", border: "1px solid #00ff99", fontWeight: 500, fontSize: "16px",
                    }} >
                    <span className="material-symbols-outlined">swipe_vertical </span> Drag <b>“Up”</b> the fraud message &nbsp;|&nbsp; Drag <b>“Down”</b> the Safe message
                </div>
            </div>


        </>
    );
}

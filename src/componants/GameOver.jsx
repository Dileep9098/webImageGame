
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useGame } from "../context/GameContextApi";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

export default function GameOver() {
    const { score, resetGame } = useGame();
    const { currentUser } = useAuth();

    useEffect(() => {
        async function saveScore() {
            if (!currentUser) return;

            try {
                const userRef = doc(db, "leaderboard", currentUser.uid);

                await setDoc(userRef, {
                    name: currentUser.displayName || currentUser.email,
                    score,
                    updatedAt: new Date(),
                });

            } catch (err) {
                console.error(" Score save error:", err);
            }
        }

        saveScore();
    }, []);

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
                            <div className="center1">
                                <div className="text-center mb-4">
                                    <h2>Game Over</h2>
                                </div>
                                <p className="text-center">You have scored</p>

                                <div className="text-center">

                                    <div style={{ display: "inline-flex", alignItems: "center", padding: "10px 30px", borderRadius: "40px", border: "2px solid rgb(67, 87, 239)", boxShadow: "0 0 10px rgba(127, 180, 253, 0.6)", marginBottom: "10px", gap: "10px", }}>
                                        <FaStar color="#ffd700" size={20} />
                                        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}> <strong style={{ fontSize: "30px" }}>{score}</strong> <sub>Points</sub> </span>
                                    </div>


                                </div>

                                <div className="text-center mt-5 playStart">
                                    <Link to="/leaderboard" className="btnS text-decoration-none d-inline-flex align-items-center gap-2">
                                        Continue
                                    </Link>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

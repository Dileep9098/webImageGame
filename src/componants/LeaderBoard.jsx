import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        async function fetchScores() {
            const q = query(
                collection(db, "leaderboard"),
                orderBy("score", "desc"),
                limit(10)
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => doc.data());
            setLeaders(data);
        }
        fetchScores();
    }, []);

    return (

        <>

            <div className="background p-2 ">

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
                            <div className="center1" >
                                <div className="text-center mb-4">
                                    <h2 style={{ textTransform: "uppercase" }}>Leaderboard</h2>
                                </div>
                                <div className="container mt-5 text-center scrollable-table" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                    {leaders.map((user, index) => (
                                        <div key={index} className="leader-card d-flex align-items-center justify-content-between mb-3 p-2 rounded" style={{
                                            backgroundColor: index % 2 === 0 ? "#1e1e2f" : "#2e2e4f", color: "white",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                                        }}>
                                            <div style={{ width: "30px", fontWeight: "bold" }}>{index + 1}</div>

                                            <div
                                                style={{
                                                    width: "35px", height: "35px", borderRadius: "50%", backgroundColor: "#00bfff", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem", userSelect: "none", textTransform: "uppercase"
                                                }}  >
                                                {user.name ? user.name.charAt(0) : "?"}
                                            </div>

                                            <div style={{ flex: 1, paddingLeft: "20px", textAlign: "left", fontWeight: "600" }}>
                                                {user.name}
                                            </div>

                                            <div style={{ width: "100px", fontWeight: "bold", color: "#00ff99" }}>
                                                {user.score} points
                                            </div>
                                        </div>
                                    ))}
                                    

                                </div>
                            </div>

                            <div className="shareAndPlay d-flex justify-content-center gap-4 flex-wrap">
                                <Link to="#" className="btnS text-decoration-none d-inline-flex align-items-center gap-2">
                                    Share
                                </Link>
                                <Link to="/start-game" className="btnS text-decoration-none d-inline-flex align-items-center gap-2">
                                    Play Again
                                </Link>
                            </div>



                        </div>
                    </div>
                </div>
            </div>


        </>

    );
}

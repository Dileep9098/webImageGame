import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterUser from './componants/RegisterUser';
import Login from './componants/Login';
import Home from './componants/Home';
import GamePage from './componants/GamePage';
import { GameProvider } from './context/GameContextApi';
import GameStart from './componants/GameStart';
import GameOver from './componants/GameOver';
import { AuthProvider } from './context/AuthContext';
import Leaderboard from './componants/LeaderBoard';
import { Toaster } from 'sonner';
import PrivateRoute from './utils/ProtectedRoute';

function App() {
  return (

    <>
    
   
<AuthProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<RegisterUser />} />
            <Route path="/game-page" element={
              <PrivateRoute>
                <GamePage />
              </PrivateRoute>
            } />

            <Route path="/start-game" element={
              <PrivateRoute>
                <GameStart />
              </PrivateRoute>
            } />
            <Route path="/game-over" element={<GameOver />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
</AuthProvider>

<Toaster position='top-center' richColors />

 </>
  );
}

export default App;

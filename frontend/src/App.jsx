import React from 'react';
import { Route, Routes } from "react-router";

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';


const App = () => {
  return (
    <div className="relative h-full w-full">
   <div className="absolute inset-0 -z-10 min-h-screen w-full">
  {/* Dark Horizon Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_90%,#000000_40%,#0d1a36_100%)]" />
</div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />

      </Routes>
    </div>
  );
};

export default App;

// <div data-theme="dim">

// // {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/> */}
//     <div class="relative h-full w-full bg-slate-950"><div class="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div class="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>
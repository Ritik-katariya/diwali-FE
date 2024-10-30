import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiwaliCelebration from './Component/DiwaliCelebration';
import SinglePageWebsite from './Component/UploadForm';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SinglePageWebsite />} /> {/* Use element prop */}
        <Route path='/Card/:id' element={<DiwaliCelebration />} /> {/* Use element prop */}
      </Routes>
    </Router>
  );
}

export default App;

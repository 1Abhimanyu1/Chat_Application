import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Routes> {/* Add the Routes wrapper */}
            <Route path='/' exact element={<Join />} />
            <Route path='/chat' element={<Chat />} />
        </Routes> {/* Close the Routes wrapper */}
    </Router>
);

export default App;
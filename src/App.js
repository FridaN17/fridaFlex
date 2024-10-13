import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Data from './Data';
import List from './List';
const App = () => {
    return (
        <Routes>
            <Route path='/' element={<List/>}           />
            <Route path='/dashboard/:jobsite' element={<Dashboard Data={Data}/>}/>
        </Routes>
    );
};

export default App;

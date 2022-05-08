import React from 'react';
import Questions from '.././ui/Questions';
import QuestionDetails from '.././ui/QuestionDetails';
import {Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <main>
            <Routes>
                <Route path="/" exact element={<Questions/>} />
                <Route path="/add-question" element={<QuestionDetails/>} />
                <Route path="edit-question/:index" element={<QuestionDetails/>} />
            </Routes>
        </main>
    );
}

export default App;

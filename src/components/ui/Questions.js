import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Question from './Question';


const Questions = () => {
    let questions = [];
    let localStorageQuestions = localStorage.getItem("questions");

    let questionsInMem = localStorageQuestions ? JSON.parse(localStorageQuestions) : [];

    if(questionsInMem) {
        questionsInMem.forEach(qn => {
            questions.push(qn);
        });
    }
    const [displayQuestions, setDisplayQuestions] = useState(questions);

    const deleteQuestion = (index) => {
        let filteredQuestions;
        if(questions.length > 1) {
            filteredQuestions = questions.splice(index, 1)
        } else {
            filteredQuestions = [];
        }
        setDisplayQuestions(filteredQuestions);

        filteredQuestions = JSON.stringify(filteredQuestions);

        localStorage.setItem("questions", filteredQuestions);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3>Questions</h3>
                    <Link to="/add-question">
                        <button className="btn btn-primary">
                            <i className="glyphicon glyphicon-plus" style={{"marginRight": "8px"}}></i>
                            Add Question
                        </button>
                    </Link>
                </div>
                {
                    displayQuestions.length ?
                        <ul className="list-group list-group-flush questions">
                            {displayQuestions.map((item,index) => (
                                <Question 
                                    key={index} 
                                    title={item.title}
                                    index={index}
                                    deleteQuestion={() => deleteQuestion(index)}
                                />
                            ))}
                        </ul>
                    : 
                    <div className="empty-state d-flex flex-column align-items-center">
                        <span style={{'margin':'12px'}}>There are no questions yet, you can add some.</span>
                        <Link to="/add-question">
                            <button className="btn btn-primary">
                                <i className="glyphicon glyphicon-plus" style={{"marginRight": "8px"}}></i>
                                Add Question
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}
export default Questions;

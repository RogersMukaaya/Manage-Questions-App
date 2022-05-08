import React, {useState} from 'react';
import QuestionOption from './QuestionOption';
import {Link, useNavigate, useParams} from "react-router-dom";

const QuestionDetails = () => {
    const { index } = useParams();
    const navigate = useNavigate();
    const [addedQuestion, setAddedQuestion] = useState(() => {
        if(index) {
            let questionsInMemory = localStorage.getItem("questions");
            return JSON.parse(questionsInMemory)[index];
        } else {
            return {
                title: '',
                options: ['']
            }
        }
    });

    const [errorMessage, setErrorMessage] = useState('');
    const handleInputChange = (e, index, title) => {
        e.preventDefault();
        let value = e.target.value;
        setAddedQuestion((addedQuestion) => {
            let options = addedQuestion.options;
            let modifiedQuestion;
            if (index !== -1 && !title) {
                options[index] = value;
                modifiedQuestion = {
                    title: addedQuestion.title,
                    options
                }
            } else {
                modifiedQuestion = {
                    title: value,
                    options
                } 
            }
            return modifiedQuestion;
        });
    }

    const addOption = (e) => {
        e.preventDefault();
        addedQuestion.options.push('');
        setAddedQuestion({
            title: addedQuestion.title,
            options: addedQuestion.options
        });
    }

    const deleteQuestionOption = (e, index) => {
        e.preventDefault();
        addedQuestion.options.splice(index, 1);
        setAddedQuestion({
            title: addedQuestion.title,
            options: addedQuestion.options
        });
    }
    
    const saveQuestion = (e) => {
        e.preventDefault();
        let filteredOptions = addedQuestion.options.filter(option => option !== '');
        if(addedQuestion.title === '' || addedQuestion.length < 1) {
            setErrorMessage('You have to add a question title and some options in order to save!');
        } else if(addedQuestion.title.length > 55) {
            setErrorMessage("Title shouldn't exceed 55 characters");
        } else {
            setErrorMessage('');
            let questions = [];
            let questionsInMemory2 = localStorage.getItem("questions");

            if(questionsInMemory2) {
                let questionsInMemoryConverted2 = JSON.parse(questionsInMemory2);
                questionsInMemoryConverted2.forEach(qn => {
                    if(qn.title === addedQuestion.title && !index) {
                        setErrorMessage('Question title already exists');
                        return;
                    } else {
                        questions.push(qn);
                    }
                });

                setAddedQuestion({
                    title: addedQuestion.title,
                    options: filteredOptions
                })

                if(index) {
                    questions.splice(index, 1, addedQuestion);
                } else {
                    questions.push(addedQuestion);
                }
                questions = JSON.stringify(questions);
            } else {
                questions = JSON.stringify([addedQuestion]);
            }

            localStorage.setItem("questions", questions);
            navigate('/');
        }
    }

    return (
        <div className="container">
            {
                errorMessage ?
                    <div className="alert alert-warning" role="alert">
                        {errorMessage}
                    </div>
                : ''
            }
            <div className="card">
                <div className="card-header d-inline-flex flex-row justify-content-between align-items-center">
                    <h4>
                        {
                            index ? 'Edit' : 'Add' 
                        }
                        Question
                    </h4>
                    <div className="d-flex flex-row">
                        <Link to="/" exact="true">
                            <button className="btn btn-sm btn-light">
                                Cancel
                            </button>
                        </Link>
                        <Link to="/" exact="true">
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={saveQuestion}  
                            >
                                Save
                            </button>
                        </Link>
                    </div>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Question Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Question 1"
                            value={addedQuestion.title}
                            onChange={(e) => handleInputChange(e, '', 'title')}
                        />
                        <small id="emailHelp" className="form-text text-muted question-title">Required (max 55 characters)</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Options</label>
                        <ul className="list-group list-group-flush">
                            {addedQuestion.options.map((option, index) => (
                                <QuestionOption 
                                    key={index}
                                    value={option}
                                    handleChange={(e) => handleInputChange(e, index, '')}
                                    deleteOption={(e) => deleteQuestionOption(e, index)}
                                />
                            ))}
                        </ul>
                        <div className="d-flex flex-column align-items-center">
                            <button 
                                onClick={addOption} 
                                className="btn btn-primary" 
                                style={{"marginTop": "24px"}}
                                disabled={addedQuestion.options.length >= 6}
                            >
                                <i className="glyphicon glyphicon-plus" style={{"marginRight": "8px"}}></i>
                                Add option
                            </button>
                            <small id="emailHelp" className="form-text text-muted">(max 6 options allowed)</small>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default QuestionDetails;

import React from 'react';

const QuestionOption = (props) => {
    // const [change, setChange] = useState(true);
    return (
        <li 
            className="d-flex justify-content-between align-items-center"
            style={{"marginTop": "8px"}}
        >
           <input 
                type="text" 
                className="form-control" 
                placeholder="Enter option"
                style={{"marginRight": "8px"}}
                value={props.value}
                onChange={props.handleChange}
            />
            <button 
                className="btn btn-sm btn-danger"
                onClick={props.deleteOption}
            >
                <i className="glyphicon glyphicon-trash" style={{"marginRight": "12px"}}></i>
                Delete
            </button>
        </li>
    );
}
export default QuestionOption;

import React from 'react';
import {Link} from "react-router-dom";

const Question = (props) => {
    // const [change, setChange] = useState(true);
    return (
        <li 
            className="d-flex justify-content-between align-items-center list-item"
        >
            <p>
                {props.title}
            </p>
            <div className="d-flex flex-row">
                <Link to={`/edit-question/${props.index}`}>
                    <button className="btn btn-sm btn-light">
                        Edit
                    </button>
                </Link>
                <button 
                    className="btn btn-sm btn-danger"
                    onClick={props.deleteQuestion}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
export default Question;

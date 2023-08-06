import React, { useState, useEffect } from 'react';
import './css/General.css'
import AllPapers from './AllPapersPage';
/**
* Authors page component
* 
* This page returns information aobut the authors and passes it onto the papers components 
* 
* @author Martyn Clow W20045942
*/

function AuthorsPage(props) {

    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/author?paper_id=" + props.paper_id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setAuthors(json.data)
                    setLoading(false)
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const listOfAuthors = authors.map((value, key) => (
        <div key={key} className="author-info">
            <p className="name">
                Name: {value.first_name} {value.middle_initial} {value.last_name}
            </p>
            <p>
                Country: {value.country} {value.state} {value.city}
            </p>
            <p className="institution">
                Institution: {value.institution} {value.department}
            </p>
        </div>
    ));

    return (
        <div>
            {loading && <p>Loading.. </p>}
            <ul>{listOfAuthors}</ul>
        </div>
    );
}

export default AuthorsPage;








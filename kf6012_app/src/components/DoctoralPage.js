import React, { useState, useEffect } from 'react';
import AuthorsPage from './AuthorsPage';
/**
* doctoral page component
* 
* This is the page for the doctoral track, this returns information about doctoral papers
*  
* @author Martyn Clow W20045942
*/

function DoctoralPage() {
    
    const [doctoralPapers, setDoctoralPapers] = useState([]);
    const [selectPaper, setSelectPaper] = useState('all');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect( () => {
        fetch("http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/paper?track=doctoral")
        .then(
            (response) => response.json()
        )
        .then(
            (json) => {setDoctoralPapers(json.data)
            setLoading(false)}
        )
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    const searchPapers = (value) => {

        const paperSearch = value.title + " " + value.abstract;
        return paperSearch.toLowerCase().includes(searchTerm.toLowerCase());

    }

    const selectPapers = (value) => {
        return(value.award === selectPaper)
        || (selectPaper === "all")
    };

const listOfDoctoralPapers = (
    <section className='papers'>
        {doctoralPapers.filter(searchPapers).filter(selectPapers).map(
            (value, key) => (
                <div key={key} className='paper-item'>
                    <div className='title'>{value.title}</div>
                    <p>Abstract:</p> {value.abstract}
                    <p className='award'>Award: {value.award} </p>
                    <AuthorsPage paper_id={value.paper_id} />
                </div>
            )
        )}
    </section>
);

    const onChange = (event) => setSearchTerm(event.target.value);
    const onSelect = (event) => setSelectPaper(event.target.value);
    
    return (
        <div>
            <h1>Doctoral Papers</h1>
            <div>
                <select value={selectPaper} onChange={onSelect}>
                    <option value='all'>All Papers</option>
                    <option value='true'>Award Winning Papers</option>
                    <option value='false'>Non-Award Winning Papers</option>
                 </select>
            </div>
                <input className="search-input" value={searchTerm} onChange={onChange} /> 
                {loading && <p>Hold on one moment.. </p>}
                {listOfDoctoralPapers}
        </div>
    );
}
export default DoctoralPage;
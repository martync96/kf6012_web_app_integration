import React, { useState, useEffect } from 'react';
import AuthorsPage from './AuthorsPage';
import './css/General.css'
import App from '../App';
/**
* All Papers page component
*
* This page simply returns all of the papers in the database
*
* @author Martyn Clow W20045942
*/

function AllPapers(props) {


    const [selectPaper, setSelectPaper] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const searchPapers = (value) => {

        const paperSearch = value.title + " " + value.abstract;
        return paperSearch.toLowerCase().includes(searchTerm.toLowerCase());

    }

    const selectPapers = (value) => {
        return (value.award === selectPaper)
            || (selectPaper === "all")
    };

    const listOfPapers = (
        <section className='papers'>
            {props.papers.filter(searchPapers).filter(selectPapers).map(
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
            <h1>All Papers</h1>
            <div>
                <select value={selectPaper} onChange={onSelect}>
                    <option value='all'>All Papers</option>
                    <option value='true'>Award Winning Papers</option>
                    <option value='false'>Non-Award Winning Papers</option>
                </select>
            </div>
            <input className="search-input" value={searchTerm} onChange={onChange}/>
            {props.loading && <p>Hold on one moment.. </p>}
            {listOfPapers}
        </div>
    );
}

export default AllPapers;
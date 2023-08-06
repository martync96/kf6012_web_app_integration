import './App.css';
import './components/css/General.css';
import HomePage from './components/HomePage';
import LinksMenu from './components/LinksMenu';
import InteractivityPage from './components/InteractivityPage';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import WipPage from './components/WipPage';
import CompetitionPage from './components/CompetitionPage';
import DoctoralPage from './components/DoctoralPage';
import RapidPage from './components/RapidPage';
import AllPapers from './components/AllPapersPage';
import FullPapersPage from './components/FullPapersPage';
import AdminPage from './components/AdminPage';
import AuthorsPage from './components/AuthorsPage';
import Footer from './components/Footer';
import Documentation from './components/Documentation';
import Button from 'react-bootstrap/Button';

function App() {

    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdated] = useState(0);
    const handleUpdate = () => { setUpdated(update + 1) }

    // const [darkMode, setDarkMode] = useState(false);
    // const setMode = () => { setDarkMode(!darkMode) }

    // const mode = (darkMode)
    //         ? { 
    //             "className" : "darkMode", 
    //             "button" : <Button variant="light" onClick={(setMode)}>Light Mode</Button>
    //         }
    //         : { 
    //             "className" : "lightMode", 
    //             "button" : <Button variant="dark" onClick={(setMode)}>Dark Mode</Button>
    //         };

    useEffect(() => {
        fetch("http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/paper")
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setPapers(json.data)
                    setLoading(false)
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const [authenticated, setAuthenticated] = useState(false);
    const handleAuthenticated = (isAuthenticated) => { setAuthenticated(isAuthenticated) }

    const handleLogout = () => {

        handleAuthenticated(false)
        localStorage.removeItem('token')

    }

    useEffect(() => {
        fetch("http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/paper")
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setPapers(json.data)
                    setLoading(false)
                    console.log(json.data)
                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
    }, [update]);

    return (
        <div className="App">
            <LinksMenu authenticated={authenticated} handleAuthenticated={setAuthenticated} handleLogout={handleLogout}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="allpapers" element={<AllPapers papers={papers} loading={loading} />} />
                <Route path="interactivity" element={<InteractivityPage />} />
                <Route path="fullPapers" element={<FullPapersPage />} />
                <Route path="wip" element={<WipPage />} />
                <Route path="competition" element={<CompetitionPage />} />
                <Route path="doctoral" element={<DoctoralPage />} />
                <Route path="rapid" element={<RapidPage />} />
                <Route path="authors" element={<AuthorsPage />} />
                <Route path="admin" element={<AdminPage papers={papers} authenticated={authenticated} handleAuthenticated={setAuthenticated} handleUpdate={handleUpdate} />} />
                <Route path="documentation" element={<Documentation />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

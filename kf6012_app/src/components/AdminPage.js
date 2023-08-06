import React, {useState, useEffect} from 'react';
import UpdateAward from './UpdateAward';
import {  Buffer } from "buffer";
/**
* Admin page component
* 
* This page allows the user to update information about the papers after receiving authentication
*  
* @author Martyn Clow W20045942
*/


function AdminPage(props) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleClick = () => {
        
        const encodedString = Buffer.from(
            username + ":" + password
          ).toString('base64'); 

        fetch("http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/auth",
        {
            method : 'POST',
            headers: new Headers( { "Authorization": "Basic " +encodedString })
        })
        .then(
            (response) => {   
                return response.json()
            }
        )
        .then(
            (json) => {
                if (json.message === "success") {
                    props.handleAuthenticated(true)
                    localStorage.setItem('token', json.data.token);
            }
        })
        .catch(
            (e) => {
                console.log(e.message)
            }
        )
    }

    const allPapers = props.papers.map(
        (value, key) => <section key={key}>
        <UpdateAward papers={value} handleUpdate={props.handleUpdate}/>
    </section>
)

    const handleSignOut = () => {
        props.handleAuthenticated(false)
        localStorage.removeItem('token')
      }

      useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.handleAuthenticated(true)
            }
        }
    ,[])

    return (
      <div>
        {props.authenticated && <h2>Update Award</h2>}
        {!props.authenticated && <div>
            <h2>Sign in</h2>
                <input type="text" placeholder="username" value={username} onChange={handleUsername}/>
                <input type="password" placeholder="password" value={password} onChange={handlePassword}/>
                <input type="button" value="submit" onClick={handleClick}/>
            </div>
            }
        {props.authenticated && <div>
        <h2>Admin Page</h2>
        {allPapers}
  </div>
}
      </div>
    )
   
}

export default AdminPage;

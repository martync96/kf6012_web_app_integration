import React from "react";
import './css/General.css';
/**
* Documentation page component
* 
* This is the page for the API documentation
*  
* @author Martyn Clow W20045942
*/

function Documentation() {
   return (
      <div className="apidoc-container">
         <div className="endpoint">
            <h2>Base Endpoint</h2>
            <p>/api/</p>

            <h3>URL</h3>
            <p>/api/</p>

            <h3>Description</h3>
            <p>Returns an array of information consisting of the authors first and last name, author's student ID, a link to the documentation page & the name of the conference </p>

            <h3>Methods Supported</h3>
            <p>POST, GET</p>

            <h3>Authentication Required</h3>
            <p>False</p>

            <h3>Parameters Supported</h3>
            <p>N/A</p>

            <h3>Likely Response Codes</h3>
            <ul>
               <p>200 ok (All information returned correctly)</p>
               <p>405 Method Not Allowed (An invalid request method has been used to try and retrieve data)</p>
            </ul>

            <h3>Response Keys</h3>
            <ul>
               <p>length</p>
               <p>message</p>
               <p>data:</p>
               <p>name:</p>
               <p className="sub">first_name</p>
               <p>last_name</p>
               <p>id:</p>
               <p className="sub">id</p>
               <p>link to documentation:</p>
               <p className="sub">link</p>
               <p>conference:</p>
               <p className="sub">conference_name</p>
            </ul>

            <h3>Example Request</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/</p>

            <h3>Example Response (200)</h3>
            <p></p>
         </div>
         <div classNane="endpoint">
            <h2>Papers Endpoint</h2>
            <p>/api/paper</p>

            <h3>URL</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/paper</p>

            <h3>Description</h3>
            <p>Returns an array of paper information</p>

            <h3>Methods Supported</h3>
            <p>POST, GET</p>

            <h3>Authentication Required</h3>
            <p>False</p>

            <h3>Parameters Supported</h3>
            <p>id (int, optional): Returns the paper associated with the ID entered.</p>
            <p>track (string, optional): Returns the papers associated with the track entered,
               these being interactivity, fullpapers, wip, competition, doctoral, rapid, admin </p>

            <h3>Likely Response Codes</h3>
            <p>200 OK (All information returned correctly) <br />
               404 Not found (An invalid URL has been provided) <br />
               405 Method Not Allowed (An invalid request method has been used to try and retrieve data) <br />
               500 Internal Server Error
            </p>

            <h3>Response Keys</h3>
            <ul>
               <p>length</p>
               <p>message</p>
               <p>data:</p>
               <p>paper_id</p>
               <p>title</p>
               <p>award</p>
               <p>abstract</p>
               <p>track_name</p>
               <p>short_name</p>
            </ul>

            <h3>Example Request</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/paper?track=wip</p>

            <h3>Example Response (200)</h3>
            <ul className="response">
               <p>length : 45</p>
               <p>message: "Success",</p>
               <p>data:</p>
               <p>paper_id: 64774</p>
               <p>title: "A Study on Pokémon GO: Exploring the Potential of Location-based MobileExergames in Connecting Players with Nature"</p>
               <p>award: "false"</p>
               <p>abstract: "Exergaming incorporates exercising into video games, with the purpose of physically.. We also provide design considerations for location-based mobile exergames to engage players in nature while becoming physically active.",</p>
               <p>track_name: "CHI PLAY 2021 Work-In-Progress",</p>
               <p>short_name: "wip"</p>
            </ul>
         </div>

         <div className="endpoint">
            <h2>Authors Endpoint</h2>
            <p>/api/author</p>

            <h3>URL</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/author</p>

            <h3>Description</h3>
            <p>Returns an array of information associated with the authors.</p>

            <h3>Methods Supported</h3>
            <p>POST, GET</p>

            <h3>Authentication Required</h3>
            <p>False</p>

            <h3>Parameters Supported</h3>
            <p>id, paper_id</p>

            <h3>Likely Response Codes</h3>
            <p>200 OK (All information returned correctly) <br />
               404 Not found (An invalid URL has been provided) <br />
               405 Method Not Allowed (An invalid request method has been used to try and retrieve data) <br />
               500 Internal Server Error</p>

            <h3>Response Keys</h3>
            <ul>
               <p>length</p>
               <p>message</p>
               <p>data:</p>
               <p>paper_id</p>
               <p>first_name</p>
               <p>middle_name</p>
               <p>country</p>
               <p>state</p>
               <p>city</p>
               <p>institution</p>
               <p>department</p>
            </ul>

            <h3>Example Request</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/author?paper_id=64455</p>

            <h3>Example Response (200)</h3>
            <ul className="response">
               <p>length : 1</p>
               <p>message: "Success",</p>
               <p>data:</p>
               <p>author_id: "Aditya"</p>
               <p>first_name: ""</p>
               <p>middle_name: "Unapam"</p>
               <p>last_name: 64289</p>
               <p>country: "United States"</p>
               <p>city: "Atlanta"</p>
               <p>institution: "Georgia Institute of Technology"</p>
               <p>department: "Digital Media"</p>
            </ul>
         </div>

         <div className="endpoint">
            <h2>Authentication Endpoint</h2>
            <p>/api/auth</p>

            <h3>URL</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/auth</p>
            <h3>Description</h3>
            <p>The authorisation endpoint is used to accept parameters
               from a user to check if their entered data matches that in the database</p>

            <h3>Methods Supported</h3>
            <p>POST</p>

            <h3>Authentication Required</h3>
            <p>True</p>

            <h3>Parameters Supported</h3>
            <p>Username <br />
               Password</p>

            <h3>Likely Response Codes</h3>
            <p>200 OK (All information returned correctly) <br />
               404 Not found (An invalid URL has been provided) <br />
               405 Method Not Allowed (An invalid request method has been used to try and retrieve data) <br /></p>

            <h3>Response Keys</h3>
            <ul>
               <p>length</p>
               <p>message</p>
               <p>data</p>
            </ul>

            <h3>Example Request</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/auth <br />
               Note: Information cannot be passed by the URL and must be done through the admin page</p>

            <h3>Example Response (200)</h3>
            <ul className="response">
               <p>length: 0,</p>
               <p>length: "success",</p>
               <p>data:</p>
               <p>"token": "[actual data removed for security purposes]"</p>
            </ul>
         </div>

         <div className="endpoint">
            <h2>Authentication Endpoint</h2>
            <p>/api/auth</p>

            <h3>URL</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/auth</p>
            <h3>Description</h3>
            <p>The authorisation endpoint is used to accept parameters
               from a user to check if their entered data matches that in the database</p>

            <h3>Methods Supported</h3>
            <p>POST</p>

            <h3>Authentication Required</h3>
            <p>True</p>

            <h3>Parameters Supported</h3>
            <p>Username <br />
               Password</p>

            <h3>Likely Response Codes</h3>
            <p>200 OK (All information returned correctly) <br />
               404 Not found (An invalid URL has been provided) <br />
               405 Method Not Allowed (An invalid request method has been used to try and retrieve data) <br /></p>

            <h3>Response Keys</h3>
            <ul>
               <p>length</p>
               <p>message</p>
               <p>data</p>
            </ul>

            <h3>Example Request</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/auth <br />
               Note: Information cannot be passed by the URL and must be done through the admin page</p>

            <h3>Example Response (200)</h3>
            <ul className="response">
               <p>length: 0,</p>
               <p>length: "success",</p>
               <p>data:</p>
               <p>"token": "[actual data removed for security purposes]"</p>
            </ul>
         </div>

         <div className="endpoint">
            <h2>Update Endpoint</h2>
            <p>/api/update</p>

            <h3>URL</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/update</p>

            <h3>Description</h3>
            <p>This endpoint allows a verified user to update the award status of papers</p>

            <h3>Methods Supported</h3>
            <p>POST</p>

            <h3>Authentication Required</h3>
            <p>True</p>


            <h3>Parameters Supported</h3>
            <p>paper_id</p>
            <p>award</p>

            <h3>Likely Response Codes</h3>
            <p>200 OK (All information returned correctly) <br />
               404 Not found (An invalid URL has been provided) <br />
               405 Method Not Allowed (An invalid request method has been used to try and retrieve data) <br /></p>

            <h3>Response Keys</h3>


            <h3>Example Request</h3>
            <p>http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/update</p>

            <h3>Example Response (200)</h3>
            <ul className="response">
               <p>length: 0,</p>
               <p>message: "success",</p>
               <p>data: null,</p>
            </ul>
         </div>
      </div>
   )
}

export default Documentation;




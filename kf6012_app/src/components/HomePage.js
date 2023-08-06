import React, { useState, useEffect } from 'react';
import conference from './image/event-venue-1597531.jpg'
/**
* Home page component
* 
* This is the main landing page for the application
* 
* @author Martyn Clow W20045942
*/

function HomePage() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page! <br />
               On this website you will find information about the CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play conference. <br />
               Including information on all of the papers, with options to view them by their track as well if they have won any awards. <br />
               Additionally, you will find information pertaining the API</p>
            <img src={conference} alt="a top down view of a number of individuals sitting in red chairs at a conference"/>
            <p>Image by <a href="https://pixabay.com/users/crystal710-3108616/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1597531">정훈 김</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1597531">Pixabay</a></p>
        </div>
    );
}

export default HomePage;
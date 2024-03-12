WTWR (What to Wear?)
Overview
About the project
Features
Figma Design
Links
Plans for Improvement
About the project
The concept of the WTWR application is pretty simple - it makes a call to an external API (OpenWeather), which then responds with the daily weather forecast for a specific city. The WTWR application then collects this weather data, processes it, and then based on the forecast, recommends suitable clothing to wear to the user.

Features
Calls to external weather API when a user visits the site
Responses are parsed and current temperature and city will be saved as a React state
Set of clothing cards generated from hard-coded array of data
Current location set in header
Current temperature(F) set in the weather card
Set temperature used to filter cards shown to user
New garment modal can be opened and closed
Image modal will appear when a card is clicked
Figma Design
The Figma design was supplied by TripleTen and used to map out the UI design for this single page application. If you click on the link below, you will see that this design includes detailed views of each component used within the react application. The images and logos used were included in the Figma design. The second link includes detailed information for building the different screen-size applications.

Figma Design
Figma Design for different screen-sizes
Links
The project can be seen live using this [https://wtwr.switchestudio.com]
The project's backend can be found by using this [https://github.com/ednatrejo/se_project_express.git]
The API (OpenWeather) used in this application can be found by clicking on this [https://openweathermap.org/]
Plans for Improvement
Add media queries for different screen resolutions
Create Input component that can be used for any form in the project (this will result in cleaner code)
Continue improvements on mobile burger menu

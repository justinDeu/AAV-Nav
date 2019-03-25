# AAV Navigation Tool

## Overview

This is the tool that Virginia Tech's Autonomous Aeriel Vehicles (AAV) Design Team will use at the AUVSI SUAS competition. It uses Google Maps API to display a location through a webservice. This is developed through an express.

The tool allows for the user to import a properly formatted `.waypoints` file (following the standard used by mavProxy) to create the initial points that __cannot__ be modified. This points are drawn in orange. A `.obs` file can also be uploaded to visualize the obstacles on the course. This is a custom file format that is described further down. The tool then provides the functionality to add additional waypoints to the course (displayed in green) to avoid collisions with obstacles. The tool can generate a new `.waypoints` file that contains these modifications.

## Installation - NOT FINISHED 
1. Install Docker
2. Request access to Google API's if you don't already have access.
3. Clone the Repository

6. Open a terminal at the repsitory's root folder and run: `docker-compose up`
7. In a browser, go to `localhost:3000`

## TO-DO
In no order as of yet:

* Add listeners to alert of a mouse click on the map
* Decide on how the user will go about adding a point
* Research Linked List implementation in a database
* Connect the app to a database
* Convert Waypoint parser to javascript
* Convert Waypoint writer to javascript
* Create a standard `.obs` format
* Write a `.obs` parser
* Formalize `README.MD`: add images, add links, write more!
* Display database on page
* Implement partials into the website design
* Draft final layout of website
* Connect Buttons to backend

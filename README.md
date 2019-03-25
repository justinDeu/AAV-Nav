# AAV Navigation Tool

## Overview

This is the tool that Virginia Tech's Autonomous Aeriel Vehicles (AAV) Design Team will use at the AUVSI SUAS competition. It uses Google Maps API to display a location through a webservice. This is developed through an express.

The tool allows for the user to import a properly formatted `.waypoints` file (following the standard used by mavProxy) to create the initial points that __cannot__ be modified. This points are drawn in orange. A `.obs` file can also be uploaded to visualize the obstacles on the course. This is a custom file format that is described further down. The tool then provides the functionality to add additional waypoints to the course (displayed in green) to avoid collisions with obstacles. The tool can generate a new `.waypoints` file that contains these modifications.

## Installation 
1. Install Docker Desktop:
   * [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/ "DD for Windows link")
   * [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/ "DD for Mac link")
2. Request access to Google API's if you don't already have access.
   * [Google API Sign-Up](https://developers.google.com/maps/documentation/javascript/get-api-key "API Key Link")
3. Clone the Repository:
   * `git clone https://github.com/justinDeu/AAV-Nav.git`
4. Open a terminal at the repsitory's root folder and run: `docker-compose up`
5. In a browser, go to [localhost:3000](http://localhost:3000) to see the homepage

## Using the Tools
1. Start the application by navigating to the root directory of the project and running `docker-compose up`
2. Once everything is started, and you are told you can now view the ui in the browser, go to [localhost:3000](http://localhost:3000)

The rest of this section has not been created yet.

## TO-DO
In no order as of yet:

* Add listeners to alert of a mouse click on the map
* Decide on how the user will go about adding a point
* Convert Waypoint parser to javascript
* Convert Waypoint writer to javascript
* Create a standard `.obs` format
* Write a `.obs` parser
* Formalize `README.MD`: add images, add links, write more!
* Display database on page
* Draft final layout of website
* Create react frontend for website
* Connect Buttons to backend

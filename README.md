# Daytripper

## Introduction

Daytripper is a tool inspired by a love of traveling, designed for fun and exploration. Use it to plot out potential itineraries, save & remember noteworthy locales and past adventures, or just to daydream!

As a user, you can add and remove map markers with a mouse-click, name & save itineraries, recall & edit your saved trips, and add details. The plan is to continue expanding the functionality to include text search, further detailing of locations (such as attractions, travel & accommodation price estimates between locations) and improved UI elements.

On loading the application, the user sees a map of the world.
![alt text](./public/images/DT_OnPageLoad.png "Blue map showing the whole world")

From here, they can add and remove markers and save sets of markers as itineraries.
![alt text](./public/images/DT_CreateItinerary.png "Blue map zoomed in on Spain with 4 markers, and a sidebar showing an editable list of the markers with corresponding place names")

Once saved, the user can view or edit their itineraries.
![alt text](./public/images/DT_SavedItinerary.png "Blue map zoomed in on Spain and France with 4 markers, and a read-only sidebar showing a list of the markers with corresponding place names")

## Implementation

### React + MapboxGL

This project is built using Node, React, and [MapboxGL](https://docs.mapbox.com/mapbox-gl-js/api/), with plans to incorporate PostgreSQL for the database.

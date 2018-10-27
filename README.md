# Overwatch Strategy Planner


<p align="center">
<img src="https://i.imgur.com/HKVrNMb.jpg" width="75%" height="75%" align="middle" />
</p>

Inspired by coaching boards that sports team coaches use to demonstrate game strategies to their team, this web app built using node/express helps players share and create strategies for the team-based multiplayer game <a href="https://playoverwatch.com/en-us/">Overwatch</a>.

<p align="center">
<img src="https://i.imgur.com/4RP9YWB.jpg" width="75%" height="75%" align="middle" />
</p>


## Getting Started

Clone the repo, create env file based off of .env.example for postgresql DB configuration.

Install dependencies within the server, run knex migration, and seed DB

```
npm install
npm run knex migrate:latest
npm run knex seed:run
```

## Features

### Create and share different game plans

Create and share different plans to users. 

Each plan tracks:
* Owner
* Created/Update date/times
* View Count

<img src="https://i.imgur.com/ZwUmsOA.gif" width="75%" height="75%" align="middle" />

### Adding Markers with Image and youtube video embedding

Markers can be added to the map to convey information like player placement, danger zones, and other game related elements. Each marker is held as a Google Maps geotag marker. 

Each geotag marker contains additional information provided by the plan creator within a Google Maps Infowindow.

The plan creator can also upload images which will appear within the info window.

<img src="https://i.imgur.com/vjrau8W.jpg" width="75%" height="75%" align="middle" />

Along with images, a user creating a plan can also embed a youtube video within the info window.

<img src="https://i.imgur.com/9PiQFX2.gif" width="75%" height="75%" align="middle" />


### Multi-step plans

Plans contain multiple steps that can a user can flip through. Each step contains a small description that can be added along with it's own polylines and markers.

<img src="https://i.imgur.com/x5YZYwi.gif" width="40%" height="40%" align="middle" />


## Contributors

* <a href="https://github.com/kevin-rph-lee">Kevin Lee</a>

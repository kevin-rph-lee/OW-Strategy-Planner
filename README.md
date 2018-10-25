# Overwatch Strategy Planner


<p align="center">
<img src="https://i.imgur.com/HKVrNMb.jpg" width="75%" height="75%" align="middle" />
</p>

Inspired by coaching boards that sports team coaches use to demonstrate game strategies to their team, this web app built using node/express helps players share and create strategies for the team-based multiplayer game <a href="https://playoverwatch.com/en-us/">Overwatch</a>.

<p align="center">
<img src="https://i.imgur.com/4RP9YWB.jpg" width="75%" height="75%" align="middle" />
</p>


## Getting Started

Create env file based off of .env.example for postgresql DB configuration.

Install dependencies within the server, run knex migration, and seed DB

```
npm install
npm run knex migrate:latest
npm run knex seed:run
```

## Features

### Multi-step plans

Plans contain multiple steps that can a user can flip through. Each step contains a small description that can be added along with it's own polylines and markers.

<img src="https://i.imgur.com/VXbRu6t.gif" width="40%" height="40%" align="middle" />

### Kitchen Tracking

Kitchen staff will have new orders directly pushed to their screen real-time using the websocket server. They can track orders from here and mark orders as complete.

When an order is marked complete by the kitchen staff, the customer is notified via their order information screen.

### Showing estimated time until order if finished

Both customers and kitchen staff see how long left until their order is ready (or expected to be ready). As the time gets closer to the expected finish time, it changes colour to yellow, and finally red if the order is late (it is expected by the kitchen staff that no orders go red). Once an order is marked finished by kitchen staff, the colour coding turns green.

<img src="https://i.imgur.com/zs07F2e.jpg" width="40%" height="40%" align="middle" />

<img src="https://i.imgur.com/5R1TOQf.jpg" width="40%" height="40%" align="middle" />

<img src="https://i.imgur.com/u7yy6vQ.jpg" width="40%" height="40%" align="middle" />



### Menu Managment

The system has the ability to edit/add menu items if logged in as the owner. The restaurant owner has the ability to mark items "sold out" which is updated real-time on the restaurant menu for customers.

<img src="https://i.imgur.com/0tgCGKD.jpg" width="40%" height="40%" align="middle" />

### Business Intelligence

Revenue and sales tracking broken down by menu item type (Mains, Sides, Drink)

<img src="https://imgur.com/hvvh6aZ.jpg" width="40%" height="40%" align="middle" />

## Contributors

* <a href="https://github.com/kevin-rph-lee">Kevin Lee</a>

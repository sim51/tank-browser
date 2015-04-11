# tank-browser

A cypher browser based on sigmajs, and much more !

![Screenshot](http://www.bsimard.com/image?name=/Application/tank/screenshot.png)

## What can I do with tank-browser

The main purpose of this project is to simplify the creation of a graph visualisation for neo4j. To do that, I have develop a modular library based on SigmaJS, that is plug & play. 

It's just a sigmaJs plugin collection with a good integration and a neo4j interaction.
  
On the top of this library, I have made a browser for neo4j. I have almost the same functionality of the native neo4j browser. 

## How to use it 

 * Download the following archive : http://registry.npmjs.org/tank-browser/-/tank-browser-{VERSION}.tgz (change the version)
 * Open the file *index.html* into your browser
 * Configure your database (location, user & password) on the configuration panel  

## How to build

 * You should have npm & gulp installed on your computer
 * Clone the repository https://github.com/sim51/tank-browser
 * Make : ```npm install```
 * Make : ```gulp```
 * Open your browser to the following url  : ```http://localhost:8001/```
 
NB: you must have a neo4j server running. You can configure the location of your server on the config panel.

## TODO 

 * discover module : choice of edge direction ?
 * saving data into local storage ?
 * export the generate graph as an embedded object ?
 * adding documentation on how to setting it up
 * adding example

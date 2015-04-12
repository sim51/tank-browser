# tank-browser

A cypher browser based on sigmajs, and much more !

![Screenshot](http://www.bsimard.com/image?name=/Application/tank/screenshot.png)

## What can I do with tank-browser

The main purpose of this project is to simplify the creation of a graph visualisation for [neo4j](http://www.neo4j.org). To do that, I have develop a modular library based on SigmaJS, that is plug & play. 

It's just a [sigmaJS](http://www.sigmajs.org) plugin collection with a good integration and a neo4j interaction.
  
On the top of this library, I have made a browser for neo4j. I have almost the same functionality of the native neo4j browser. 

## How to use it 

### To immediate browse your neo4j database

 * Download the following archive : http://registry.npmjs.org/tank-browser/-/tank-browser-{VERSION}.tgz (change the version)
 * Open the file *./dist/index.html* into your browser
 * Configure your database (location, user & password) on the configuration panel
 
### To generate a custom graph of your database

 * take a look at examples

### To make a custom neo4j browser

 * take a look at the example directory with the ```configure-browser.html``` example
 
### Code code code

 * Just add into your code the ```tank-browser.min.js```
 * Initiate a ```tank``` instance like this :
```
var myTank = new tank( {
    query: {
        query: 'MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 50'
    },
    neo4j : {
        url : 'http://localhost:7474',
        user: 'neo4j',
        password: 'admin'
    },
    plugins: ['data', 'sigma_dragnode'] 
});
```

@see the [configuration file](https://github.com/sim51/tank-browser/blob/master/app/js/tank.settings.js) to know how how to configure it ! 

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
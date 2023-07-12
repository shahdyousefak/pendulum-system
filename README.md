# vention-project

In node.js, implement a "simple pendulum" in 1 dimension. A REST interface will allow to set up an initial
angular offset, a mass, a string length (or other settings of your choice). 
pendulumProcess.js: responsible for simulating and updating pendulum data. It handles the creation of pendulum instances, updating their data based on physics calculations, and serving the updated data over HTTP.
api.js: defines the API routes related to the pendulum process using express. It includes an endpoint to start multiple pendulum instances on 5 tcp ports done in pendulumProcess.js based on the provided data params from the user.
server.js: sets up the main server using express. serves frontend files and defines the route for the API endpoints and starts the UI process on a specified port. Additionally, it includes error-handling middleware to handle any server errors.


It will also allow you to read the last coordinates, such as to be able to represent the pendulum in a UI, in an external process. The rate of
simulation may be higher than the rate of visualization. Let's run 5 instances of the simple pendulum
node.js process, each on its own tcp port.
You can navigate to localhost:3001 -> localhost:3005 to retrieve the positions of the pendulums. Moreover, this is displayed in the console.

Let's have one UI process, displaying in the web browser the five pendulums: configured. check server.js.

It would allow the user to configure them (starting angle, mass, length, or anything else you have chosen) in an intuitive way, conveying an easy-to-use user experience. The UI should be done using pure javascript and some CSS: index.html & styles.css contains the static elements & styling that build this application. certain aspects of this front-end is handled in script.js such as the error messages and dynamic styling of the buttons.

Finally, all the resulting parameters of that "configuration" would be transferred in JSON format to the
REST API: along with the real-time data of the pendulum.

The UI would also expose some simulation controls (start, pause, stop): start -> pause/resume, stop.
and would poll periodically the 5 pendulum instances (using a HTTP client) to display them. A refresh rate of a few frames per second is fine: fetchPendulumPositions() takes care of that. it logs the positions and updates the UI with the received pendulum positions.


Document briefly the resulting REST interface: done!
We hope you enjoy the challenge! I certainly did! :)
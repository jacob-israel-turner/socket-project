#Socket.io with Angular
Implementing Socket.io in a messaging app

##Step 1
####Install socket.io

include the socket.io script in your index.html (BEFORE your angular app files)
`https://cdn.socket.io/socket.io-1.2.0.js`

NPM install socket.io


##Step 2
####Set up your Express server

You have to set up your Express server slightly differently than normal in order to incorporate socket.io.  For your convenience, I have already set up the server correctly. The server will run exactly the same, but has to be set up this way to access certain attributes of something or another.  If you actually want to know why, go [here](http://goo.gl/9Mkuss).

##Step 3
####Set up your emit

Socket.io is basically a real-time message system between your front-end and back-end.  You can send messages and data back and forth real time.  The system is event-based.  When X happens on the backend , send this message (which can then trigger other events.

Go to the documentation and [read the short section](http://socket.io/docs/) on io.emit (scroll down to 'sending and recieving events').


Now using what you've learned, set up an emit to be fired off every time the user creates a new message (`App.post('/api/message')`). Include a short string (which you will recieve on the front-end) and the new message itself as the data.

Cool.  Now every time a user sends a new message to the server, it sends off a (real-time) message through the whole app saying 'Hey!  New message!', along with the message.  So let's head back to the front-end and set things up there.

##Step 4
####Set up your listener

Head back over to [the docs](http://socket.io/docs/) and check out the documentation on 'on'.


I'll make the first line easy.  Copy and paste this to the top of your controller:

`var socket = io.connect('http://localhost')`

Now set up a listener (`socket.on`) to listen for the emit that you just set up on the server.  Make sure that you add the message to your scope each time a message is sent.  You can do that by pushing the message to the messages array on the scope, or by retrieving the entire messages array from the database again.

That's it!  Pretty easy, eh?  Socket.io is super cool because it's so simple and easy to incorporate into a SPA.  There are a few things to keep in mind and plan for when using a setup with socket.io.  For example, it might be wise to simply append a new message to the messages array on the scope to avoid unnecessary lag from HTTP requests.  However, that makes you prone to become unscyronized with the messages in the database (if the client loses internet connection for 30 seconds, they won't recieve any of the emits that happened during that time, and will be totally out of the loop with whatever conversation happened.  Not cool!).  So, it would be wise to set up periodic synchronization with the database.

##Black Diamond


-Set up a way to stay synchronized with the database during downtimes (I used $timeout, but there might be other more resource-efficient ways).

-Send a new message and emit every time a user connects to the server.


If you get stuck or want to see how I did things, check out the solution branch in this repo.

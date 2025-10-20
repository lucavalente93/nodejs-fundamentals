# HTTP Streams Example

### This project demonstrates how to use Node.js streams to send and process data over HTTP.

fake-upload-to-http-stream.js simulates a client that sends a stream of numbers (1–100) to an HTTP server.

stream-http-server.js receives the streamed data and transforms it using a Transform stream (inverting the numbers before sending them back).

## How to run

Start the server:
  ````bash
  node stream-http-server.js
  ````

In another terminal, run the client:
  ````bash
  node fake-upload-to-http-stream.js
 ````
You’ll see the server log each transformed (inverted) number in the console.

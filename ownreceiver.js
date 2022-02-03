const net = require("net");
const fs = require("fs");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

class NetServer {
  constructor(port, outputDirectory) {
    this.port = port;
    this.outputDirectory = outputDirectory;
    this.netServer = net.createServer();
    this.sockets = [];
  }

  // server will be open waiting for incoming connections
  // connections will open, transfer file, and then close
  startServer() {
    this.netServer.listen(this.port, () => {
      console.log("net server started: port " + this.netServer.address().port);
      console.log(`output directory set to: ${this.outputDirectory}`);
    });

    this.netServer.on("connection", (socket) => {
      var finalData; // stream chunks +=
      let fileSize = 0;
      let fileName = "";

      this.sockets.push(socket);
      var clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
      console.log(`new client connected: ${clientAddress}`);
      //console.log(`current connected sockets list: ${JSON.stringify(this.sockets)}`);

      // data is buffer type, might contain object for filename or stream chunk
      socket.on("data", (data) => {
        // check if data chunk contains a json object at start
        let str = data.toString("utf8");
        str = str.substring(0, str.indexOf("}") + 1);

        let obj = {};

        if (isJson(str)) { // contains filname object, start stream write
          obj = JSON.parse(str); //convert to object
          fileName = obj.fileName;
          finalData = fs.createWriteStream(
            this.outputDirectory.concat(fileName)
          );
        } else { // after first package filename, write data
          finalData.write(data);
          fileSize += data.length;
        }

        obj = {};
      });

      socket.on("error", (err) => {
        console.log("socket err: " + err);
        throw err;
      });

      socket.on("close", () => {
        finalData.end()
        console.log("file size: bytes " + fileSize);
        console.log("filename: " + fileName);
        console.log("server log: file transfer complete");

        // delete socket from sockets[]
        let index = this.sockets.findIndex((o) => {
          return (
            o.remoteAddress === socket.remoteAddress &&
            o.remotePort === socket.remotePort
          );
        });
        if (index !== -1) this.sockets.splice(index, 1);

        socket.destroy();
        console.log(
          `server log: connection closed: ${clientAddress} socket disconnected \n-----`
        );

        // Emit event to server for audio conversion
        eventEmitter.emit("file-transfer-complete", fileName);
      });
    });

    this.netServer.on("error", (err) => {
      console.log(err);
      throw err;
    });

    this.netServer.on("close", () => {
      console.log("server closed");
    });
  }
};

// defines if parameter item is JSON object
function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

module.exports = { NetServer, eventEmitter }
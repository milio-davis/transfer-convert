const { AudioConverter } = require("./audio_converter");
const { NetServer, eventEmitter } = require("./ownreceiver");
const fs = require("fs");
const userInput = require("./user_input");


// set constants from user input
const { port, outputDirectory, ffmpegExeDirectory } = gatherConstants();

// start server, wait for incoming connections
// if a connection is made, .wav file is transferred
let netServer = new NetServer(port, outputDirectory);
netServer.startServer();

// start audio converter class
let audioConverter = new AudioConverter();
audioConverter.setFfmpegExeDirectory(ffmpegExeDirectory);

// receive emitted event: convert file -> delete old .wav file
eventEmitter.on("file-transfer-complete", (fileName) => {
  let newFileName = changeExtensionWavToMp3(fileName);

  audioConverter.convertWavToMp3(
    outputDirectory.concat(fileName),
    outputDirectory.concat(newFileName)
  );
});

eventEmitter.on("file-conversion-complete", (fileName) => {
  deleteFile(fileName);
});

function changeExtensionWavToMp3(file) {
  let pos = file.lastIndexOf(".");
  file = file.substr(0, pos < 0 ? file.length : pos) + ".mp3";
  return file;
}

function deleteFile(path) {
  try {
    fs.unlinkSync(path);
    console.log(path + " file removed");
  } catch (err) {
    console.error(err);
  }
}

function gatherConstants() {
  let port = userInput.question("specify port ['default' = 8000]: ");
  if (port === "default") port = 8000;

  let outputDirectory = userInput.question("specify output directory: ");

  let ffmpegExeDirectory = userInput.question(
    "specify ffmpeg.exe directory ['default' = 'C:/ffmpeg/bin/ffmpeg.exe']: "
  );
  if (ffmpegExeDirectory === "default") {
    ffmpegExeDirectory = "C:/ffmpeg/bin/ffmpeg.exe";
  }

  console.log("input closed \n -----------");
  return { port, outputDirectory, ffmpegExeDirectory };
}
var ffmpeg = require("fluent-ffmpeg");
const {eventEmitter} = require("./ownreceiver");

module.exports.AudioConverter = class AudioConverter {

  setFfmpegExeDirectory (ffmpegExeDirectory) {
    ffmpeg.setFfmpegPath(ffmpegExeDirectory);  
    console.log(`ffmpeg.exe directory set to: ${ffmpegExeDirectory}`)
  }

  convertWavToMp3 (input, outputFilePath) {
    try {
      ffmpeg()
      .input(input)
      .format("mp3")
      .audioFrequency(44100)
      .audioBitrate("128k")
      .on("start", function (commandLine) {
        console.log("Spawned Ffmpeg with command: " + commandLine);
      })
      .on("progress", function (progress) {
        console.log(
          "Processing: " + Number(progress.percent).toFixed(2) + "% done"
        );
      })
      .on("error", function (err, stdout, stderr) {
        console.log("Cannot process audio: " + err.message);
        // try again
        eventEmitter.emit("file-transfer-complete", input);
      })
      .on("end", function () {
        console.log("Finished converting audio");
        // Emit event to server for audio conversion
        eventEmitter.emit("file-conversion-complete", input);
      })
      .save(outputFilePath);
    } catch (err) {
      console.log('catched ffmpeg error, exiting program')
    }
  }
}
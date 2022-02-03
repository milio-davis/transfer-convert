const prompt = require("prompt-sync")({ sigint: true });

module.exports.question = function(question) {
    return prompt(question);
}
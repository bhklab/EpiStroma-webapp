var authenticationUtils = require(APP_BASE_DIRECTORY + 'server-utils/authenticationUtils');
var matrixFileUtils = require(APP_BASE_DIRECTORY + '/server-utils/matrixFileUtils');
var geneUtils = require(APP_BASE_DIRECTORY + '/server-utils/geneUtils');
var exec = require('child_process').exec;

function handler(req, res) {
    var args = { fileName: null };
    var argsString = "";
    var file;
    var user = authenticationUtils.getUserFromToken(req.body.token);
    //console.log(req.body);

    file = matrixFileUtils.getRequestedFile(req.body.selectedFile, user);

    if (file == null || file.path == null || file.name == null) {
        res.send({ error: "Please specify a file name" });
        return;
    }

    var geneList = [];

    args.fileName = matrixFileUtils.getCorrespondingDegreesFileName(file);
    args.path = file.path;

    argsString = JSON.stringify(args);
    argsString = argsString.replace(/"/g, '\\"');

    callRScript(argsString, res);
}

function callRScript(argsString, res) {
    exec("Rscript R_Scripts/getGeneList.R --args \"" + argsString + "\"", {
            maxBuffer: 1024 *
                50000
        },
        function(error, stdout, stderr) {
            if (stderr != null && stderr != "") {
                console.log('stderr: ' + stderr);
            }

            if (error != null) {
                console.log('error: ' + error);
            }

            var parsedValue = JSON.parse(stdout);
            var message = parsedValue.message;

            if (message) {
                res.json({ error: message });
                return;
            }

            var allGenes = [];

            var epiDegrees = parsedValue.epiDegrees;
            var stromaDegrees = parsedValue.stromaDegrees;

            var epiGeneNames = parsedValue.epiGeneNames;
            var stromaGeneNames = parsedValue.stromaGeneNames;

            var maxDegree = parsedValue.maxDegree;

            allGenes = allGenes.concat(geneUtils.createGeneList(epiGeneNames, epiDegrees));
            allGenes = allGenes.concat(geneUtils.createGeneList(stromaGeneNames, stromaDegrees));

            res.send({ geneList: allGenes, maxDegree: maxDegree });
        });
}

module.exports = {
    handler: handler
};
const ApiError = require('../model/ApiError');
const assert = require('assert');
const {spawn} = require('child_process');

module.exports = {
    predictEnoughSleep(request, response, next) {
        try {
            assert(typeof (request.body) === 'object', 'Request body must be of type object');

            const python = spawn('python', ['predict.py',
                request.body.hours,
                request.body.phoneReach,
                request.body.phoneUsed,
                request.body.tired,
                ]);
            let dataToSend;

            // collect data from script
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                dataToSend = data.toString();
            });
            // in close event we are sure that stream from child process is closed
            python.on('close', (code) => {
                console.log(`child process close all stdio with code ${code}`);
                // send data to browser
                response.send(dataToSend)
            });
            python.on('error', (error) => {
                console.log(error);
            })
        } catch (error) {
            next(new ApiError(error.message, 412));
        }
    }
}

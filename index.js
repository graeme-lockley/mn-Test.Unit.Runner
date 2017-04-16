const FS = require("fs");
const Path = require("path");


function run(base) {
    return options => {
        options.filter = options.filter ? options.filter : filename => true;

        function runTestsInDir(directory) {
            FS.readdirSync(directory).forEach(file => {
                const fileName = directory + Path.sep + file;

                FS.stat(fileName, (err, stat) => {
                    if (stat.isFile()) {
                        if (options.filter && options.filter(fileName)) {
                            require(fileName);
                        }
                    } else if (stat.isDirectory()) {
                        runTestsInDir(fileName);
                    }
                });
            });
        }

        runTestsInDir(base);
    };
}


module.exports = run;

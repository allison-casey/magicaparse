const fs = require("fs");

fs.readFile("./test/vox/3x3x3.vox", (err, data) => {
  console.log(err, data);
});

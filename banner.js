const fs = require("fs");
const script = fs.readFileSync("assets/js/main.min.js");
const banner = fs.readFileSync("_includes/copyright.js");

if (script.slice(0, 3) != "/*!") {
  fs.writeFileSync(filename, banner + script);
}

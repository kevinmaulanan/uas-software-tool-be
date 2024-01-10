const moment = require("moment");

let startDate = "2024-01-01";
let range = moment("2024-06-01").diff(startDate, "months");

for (let i = 0; i <= range; i++) {
  console.log(moment(startDate).add(i, "months"));
}

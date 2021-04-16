const bcrypt = require("bcrypt");

const compare = (passwordIN, passwordDB) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(passwordIN, salt, function (err, hash) {
      bcrypt.compare(passwordDB, hash, function (err, result) {
        console.log(result);
        if (err) {
          console.log(err);
        }
        if (result) {
          return result;
        }
      });
    });
  });
};

//compare("root", "root");

module.exports = compare;

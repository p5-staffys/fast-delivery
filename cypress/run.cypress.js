const cypress = require("cypress");
const server = require("../fd-frontend/.next/server/");

// start your server
return server.start().then(() => {
  // kick off a cypress run
  return cypress.run().then((results) => {
    // stop your server when it's complete
    console.log(results);
    return server.stop();
  });
});

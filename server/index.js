const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "08e3da8ac09ed46691a93d6ff47e56f056be14d645b7deb528f02870ed1eb6fb";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  try {
    const body = req.body;
    console.log("Received request:", body);
    const {proofStringify, name} = body;
    const proof = JSON.parse(proofStringify);
    console.log(proof);

    // TODO: prove that a name is in the list
    const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
    console.log(isInTheList);
    if (isInTheList) {
      res.send("You got a toy robot!");
    } else {
      res.send("You are not on the list :(");
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

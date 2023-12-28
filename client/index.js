const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  try {
    const merkle = new MerkleTree(niceList);
    const randomIndex = Math.floor(Math.random() * niceList.length);
    const name = niceList[randomIndex];
    const proof = await merkle.getProof(randomIndex);
    const proofStringify = JSON.stringify(proof);

    const {data: gift} = await axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      proofStringify,
      name,
    });

    console.log({gift});
  } catch (error) {
    alert(error);
  }
}

main();

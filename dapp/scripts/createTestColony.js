// Import the prerequisites
const { providers, Wallet } = require("ethers");
const { default: EthersAdapter } = require("@colony/colony-js-adapter-ethers");
const { TrufflepigLoader } = require("@colony/colony-js-contract-loader-http");

// Import the ColonyNetworkClient
const { default: ColonyNetworkClient } = require("@colony/colony-js-client");

// Create an instance of the Trufflepig contract loader
const loader = new TrufflepigLoader();

// Create a provider for local TestRPC (Ganache)
const provider = new providers.JsonRpcProvider("http://localhost:8545/");

// The following methods use Promises
const example = async () => {
  // Get the private key from the first account from the ganache-accounts
  // through trufflepig
  const { privateKey } = await loader.getAccount(0);

  // Create a wallet with the private key (so we have a balance we can use)
  const wallet = new Wallet(privateKey, provider);

  // Create an adapter (powered by ethers)
  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet
  });

  // Connect to ColonyNetwork with the adapter!
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();

  // Let's deploy a new ERC20 token for our Colony.
  // You could also skip this step and use a pre-existing/deployed contract.
  const tokenAddress = await networkClient.createToken({
    name: "Cool Colony Token",
    symbol: "COLNY"
  });
  console.log("Token address: " + tokenAddress);

  // Create a cool Colony!
  const {
    eventData: { colonyId, colonyAddress }
  } = await networkClient.createColony.send({ tokenAddress });

  // Congrats, you've created a Colony!
  console.log("Colony ID: " + colonyId);
  console.log("Colony address: " + colonyAddress);

  colonyClient = await networkClient.getColonyClientByAddress(colonyAddress);

  // need a parent skill for this: https://docs.colony.io/colonyjs/api-colonyclient/#addglobalskillsend-parentskillid--options
  //const addDomainResponds = await colonyClient.addDomain.send({ parentSkillId: 0 })
  //console.log(addDomainResponds)
  
  await colonyClient.createTask.send({ specificationHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG", domainId: 1 });
  await colonyClient.createTask.send({ specificationHash: "QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx", domainId: 1 });
  await colonyClient.createTask.send({ specificationHash: "QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5", domainId: 1 });
  await colonyClient.createTask.send({ specificationHash: "QmdXzZ25cyzSF99csCQmmPZ1NTbWTe8qtKFaZKpZQPdTFB", domainId: 1 });

  const taskCount = (await colonyClient.getTaskCount.call()).count


  console.log("task count: " + taskCount)

  // You can also get the Meta Colony:
  const metaColonyClient = await networkClient.getMetaColonyClient();
  console.log("Meta Colony address: " + metaColonyClient.contract.address);
};

example();

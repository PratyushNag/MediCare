const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    try {
        const Medicare = await ethers.getContractFactory("Medicare");
        const medicare = await Medicare.deploy("Medicare", "MC");
        await medicare.deployed();
        console.log("Medicare Contract Address:", medicare.address);

        console.log("Sleeping.....");
        await sleep(40000);

        await hre.run("verify:verify", {
            address: medicare.address,
            constructorArguments: ["Medicare", "MC"],
        });

    } catch (error) {
        console.error(error);
    }

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
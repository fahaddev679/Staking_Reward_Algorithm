import {ethers, Contract} from "ethers";
import stakingContractAbi from "../ABI/stakingContract.json";
import stakingTokenAbi from "../ABI/stakingToken.json";


export const connectWallet = async()=>{
    try{
        //all these values are assigned below one by one
        let [signer, provider, stakingContract, stakingToken, chainId] = [null, null, null, null, null];
        // check if metamask is present
        if(window.ethereum === null){
            throw new Error("Please install metamask");
        }
        //fetching metamask accounts
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

       
        //assiging chainId
        let chainIdHex = await window.ethereum.request({method: "eth_chainId"});
        chainId = parseInt(chainIdHex, 16);

        //determining the selected account
        let selectedAccount = accounts[0];
        if(!selectedAccount){
            throw new Error("No account found");
        }
        //assigning value of proivder
        provider = new ethers.BrowserProvider(window.ethereum);
        //assigning value of signer
        signer = await provider.getSigner();

        const stakingContractAddress = "0x42B1831B291800a18AAa195bca2Cce0cb40a658a";
        const stakingTokenAddress = "0x634784FC811911f2De0Fe66A92a5C91823243a19";
        //assiging stakingContract
        stakingContract = new Contract(stakingContractAddress, stakingContractAbi, signer);
        //assiging StakingToken
        stakingToken = new Contract(stakingTokenAddress, stakingTokenAbi, signer);

        //returning these values to use in the file that import it
        return ({provider, selectedAccount, stakingContract, stakingToken, chainId});


    }catch(error){
        console.error(error);
        throw new Error(error);
    }

}
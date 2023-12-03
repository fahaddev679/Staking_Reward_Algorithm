import {useState, useEffect} from "react";
import { connectWallet } from "../../utils/Connect";
import Web3Context from "../../context/web3Context";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";


const Wallet = ({children})=>{
    const [state, setState] = useState({
        provider: null,
        account: null,
        stakingContract: null,
        stakingToken: null,
        chainId: null
    })

    const [isLoading,setIsLoading]=useState(false);
 

    useEffect(()=>{
        window.ethereum.on("accountsChanged",()=> handleAccountChange(setState));
        window.ethereum.on("chainChanged", ()=>handleChainChange(setState));

        return()=>{
            window.ethereum.removeListener("accountsChanged",()=> handleAccountChange(setState));
            window.ethereum.removeListener("chainChanged", ()=>handleChainChange(setState));
        }
    }, []);
  

    const handleWallet = async()=>{
        try{
            setIsLoading(true);
            const {provider, selectedAccount, stakingContract, stakingToken, chainId} = await connectWallet();
            //console.log(provider, selectedAccount, stakingContract, stakingToken, chainId);
            setState({provider, selectedAccount, stakingContract, stakingToken, chainId});
        }catch(error){
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }
    return ( 
        <div>
             <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
            {isLoading && <p>Loading...</p>}
        <button onClick={handleWallet}> Connect</button>
        </div>
    )
}

export default Wallet;
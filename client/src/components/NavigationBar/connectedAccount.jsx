import { useContext } from "react";
import Web3Context from "../../context/web3Context";

const ConnectedAccount = ()=>{
    const {selectedAccount} = useContext(Web3Context);
    
return(
    <>
     {selectedAccount ? selectedAccount : "Connect Account"}
     </>
)
}

export default ConnectedAccount;
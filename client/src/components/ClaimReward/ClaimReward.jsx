import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/web3Context";


const ClaimReward = () =>{
    const {stakingContract} = useContext(Web3Context);
    const [transactionStatus, setTransactionStaus] = useState("");

    const claimReward = async(e)=>{
        e.preventDefault();
        
        try{
            const transaction = await stakingContract.getReward();
            setTransactionStaus("Transaction is pending, Please Wait..");
            const reciept = await transaction.wait();
            if(reciept.status === 1){
                setTransactionStaus("Transaction Successfull.");
                setTimeout(()=>{
                    setTransactionStaus("");
                }, 5000);
            }else{
                setTransactionStaus("Transaction Failed.");
                setTimeout(()=>{
                    setTransactionStaus("");
                }, 5000);
            }

        }catch(error){
            console.error(error);
        }
    }
    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <form onSubmit={claimReward}>
                <label>Claim Reward Token: </label>
                <button onClick={claimReward}  type="submit"> Claim </button>
            </form>
        </div>
    )
}

export default ClaimReward;


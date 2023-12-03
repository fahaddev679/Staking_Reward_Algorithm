import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/web3Context";

const TokenApproval = ()=>{
    const approvedTokenRef = useRef();
    const {stakingContract, stakingToken} = useContext(Web3Context);
    const [transactionStatus, setTransactionStaus] = useState("");

    const approveToken = async(e) =>{
        e.preventDefault();
        const amount = approvedTokenRef.current.value.trim();
        if(isNaN(amount) || amount <= 0 ){
            console.log("Please Enter valid Amount");
            return;
        }
        const amountToSend = ethers.parseUnits(amount, 18).toString();
        try{
            const transaction = await stakingToken.approve(stakingContract.target, amountToSend);
            setTransactionStaus("Transaction is pending, Please Wait..");
            const reciept = await transaction.wait();
            if(reciept.status === 1){
                setTransactionStaus("Transaction Successfull.");
                setTimeout(()=>{
                    setTransactionStaus("");
                }, 5000);
                approvedTokenRef.current.value = "";
            }else{
                setTransactionStaus("Transaction Failed.");
                setTimeout(()=>{
                    setTransactionStaus("");
                }, 5000);
            }
        }catch(error){
            console.error("Token Approval Failed", error.message);
        }
    }
    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <form onSubmit={approveToken}>
                <label>Token Approval: </label>
                <input type="text" ref ={approvedTokenRef}/>
                <button onClick={approveToken}  type="submit"> Approve </button>
            </form>
        </div>
    )

}

export default TokenApproval;
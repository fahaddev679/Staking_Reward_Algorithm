import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/web3Context";


const WithdrawAmount = () =>{
    const {stakingContract} = useContext(Web3Context);
    const [transactionStatus, setTransactionStaus] = useState("");
    const withdrawTokenRef = useRef();

    const withdrawToken = async(e)=>{
        e.preventDefault();
        const amount = withdrawTokenRef.current.value.trim();
        if(isNaN(amount) || amount <= 0 ){
            console.log("Please Enter valid Amount");
            return;
        }

        const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
        try{
            const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw);
            setTransactionStaus("Transaction is pending, Please Wait..");
            const reciept = await transaction.wait();
            if(reciept.status === 1){
                setTransactionStaus("Transaction Successfull.");
                setTimeout(()=>{
                    setTransactionStaus("");
                }, 5000);
                withdrawTokenRef.current.value = "";
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
            <form onSubmit={withdrawToken}>
                <label>Withdraw Token: </label>
                <input type="text" ref ={withdrawTokenRef}/>
                <button onClick={withdrawToken}  type="submit"> Withdraw </button>
            </form>
        </div>
    )
}

export default WithdrawAmount;


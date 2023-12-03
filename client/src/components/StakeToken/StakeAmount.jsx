import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/web3Context";


const StakeAmount = () =>{
    const {stakingContract} = useContext(Web3Context);
    const [transactionStatus, setTransactionStaus] = useState("");
    const stakedTokenRef = useRef();

    const stakeToken = async(e)=>{
        e.preventDefault();
        const amount = stakedTokenRef.current.value.trim();
        if(isNaN(amount) || amount <= 0 ){
            console.log("Please Enter valid Amount");
            return;
        }

        const amountToStake = ethers.parseUnits(amount, 18).toString();
        try{
            const transaction = await stakingContract.stake(amountToStake);
            setTransactionStaus("Transaction is pending, Please Wait..");
            const reciept = await transaction.wait();
            if(reciept.status === 1){
                setTransactionStaus("Transaction Successfull.");
                setTimeout(()=>{
                    setTransactionStaus("");
                }, 5000);
                stakedTokenRef.current.value = "";
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
            <form onSubmit={stakeToken}>
                <label>Stake Token: </label>
                <input type="text" ref ={stakedTokenRef}/>
                <button onClick={stakeToken}  type="submit"> Stake </button>
            </form>
        </div>
    )
}

export default StakeAmount;


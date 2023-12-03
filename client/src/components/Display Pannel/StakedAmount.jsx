import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/web3Context";
import {ethers} from "ethers";

const StakedAmount = ()=>{
    const {selectedAccount, stakingContract} = useContext(Web3Context);
    const [stakedAmount, setStakedAmount] = useState("0");

    useEffect(()=>{
        const fetchStakedBalance = async()=>{
        try{
            const stakedBalanceWei = await stakingContract.stakedBalance(selectedAccount);
            const stakedBalanceEth = ethers.formatUnits(stakedBalanceWei.toString(), 18);
            setStakedAmount(stakedBalanceEth);
            //console.log(stakedBalanceEth)
        }catch(error){
            console.error(error.message);
        }
    }
    stakingContract && fetchStakedBalance();
    }, [stakingContract, selectedAccount])
    return(
        <p>Staked Amount: {stakedAmount}</p>
    )
}

export default StakedAmount;
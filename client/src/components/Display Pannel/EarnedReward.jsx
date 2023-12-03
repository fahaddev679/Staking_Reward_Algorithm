import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/web3Context";
import {ethers} from "ethers";

const EarnedReward = ()=>{
    const {selectedAccount, stakingContract} = useContext(Web3Context);
    const [earned, setEarned] = useState("0");

    useEffect(()=>{
        const fetchEarnedReward = async()=>{
        try{
            const rewardEarnedWei = await stakingContract.earned(selectedAccount);
            const rewardEarnedEth = ethers.formatUnits(rewardEarnedWei, 18).toString();
            const roundReward = parseFloat(rewardEarnedEth).toFixed(2);
            setEarned(roundReward);
            //console.log(roundReward)
        }catch(error){
            console.error(error.message);
        }
    }
    stakingContract && fetchEarnedReward();
    }, [stakingContract, selectedAccount])
    return(
        <p>Earned Reward: {earned}</p>
    )
}

export default EarnedReward;
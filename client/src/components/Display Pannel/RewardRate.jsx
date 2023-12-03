import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/web3Context";
import {ethers} from "ethers";

const RewardRate = ()=>{
    const {selectedAccount, stakingContract} = useContext(Web3Context);
    const [rewardRate, setRewardRate] = useState("0");

    useEffect(()=>{
        const fetchRewardRate = async()=>{
        try{
            const rewardRateWei = await stakingContract.REWARD_RATE();
            const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18);
            setRewardRate(rewardRateEth);
            //console.log(rewardRateEth)
        }catch(error){
            console.error(error.message);
        }
    }
    stakingContract && fetchRewardRate();
    }, [stakingContract, selectedAccount])
    return(
        <p>Reward Rate: {rewardRate} tokens/sec</p>
    )
    
}

export default RewardRate;
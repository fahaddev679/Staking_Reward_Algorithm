import EarnedReward from "./EarnedReward";
import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";

const DisplayPannel = ()=>{
    return(
        <div>
        <EarnedReward />
        <StakedAmount />
        <RewardRate />
        </div>
    )
}

export default DisplayPannel;
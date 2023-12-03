import ClaimReward from "./components/ClaimReward/ClaimReward"
import DisplayPannel from "./components/Display Pannel/DisplayPannel"
import Navigation from "./components/NavigationBar/Navigation"
import StakeAmount from "./components/StakeToken/StakeAmount"
import TokenApproval from "./components/StakeToken/TokenApproval"
import Wallet from "./components/Wallet/Wallet"
import WithdrawAmount from "./components/Withdraw/Withdraw"


function App() {
  

  return (
    <>
      <Wallet>
        <Navigation/>
        <DisplayPannel/>
        <StakeAmount />
        <TokenApproval/>
        <WithdrawAmount />
        <ClaimReward />
      </Wallet> 
    </>
  )
}

export default App

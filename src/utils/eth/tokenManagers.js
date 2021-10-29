import ERC20_ABI from "./erc20abi";
import { ethers } from "ethers";

function TokenManagers(
  stakingTokenAddress,
  rewardsTokenAddress,
  signerOrProvider
) {
  return {
    stakingToken: new ethers.Contract(
      stakingTokenAddress,
      ERC20_ABI,
      signerOrProvider
    ),
    rewardsToken: new ethers.Contract(
      rewardsTokenAddress,
      ERC20_ABI,
      signerOrProvider
    )
  };
}

export { TokenManagers };

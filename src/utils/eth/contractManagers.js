import contractConfig from "./config";
import ERC20_ABI from "./erc20Abi";
import STAKING_REWARDS_ABI from "./stakingRewardsAbi";
import BANK_NODE_LENDING_REWARDS from "./abi/bankNodeLendingRewardsAbi";
import BANK_NODE_MANAGER from "./abi/bankNodeManager";
import BNPL_BANK_NODE from "./abi/bnplBankNode";
import BNPL_STAKING_POOL from "./abi/bnplStakingPool";
import BNPL_PROTOCOL_CONFIG from "./abi/bnplProtocolConfig";
import { ethers } from "ethers";

function ContractManagers(signerOrProvider) {
  const stakingToken = new ethers.Contract(
    contractConfig.STAKING_TOKEN_ADDRESS,
    ERC20_ABI,
    signerOrProvider
  );
  const rewardsToken = new ethers.Contract(
    contractConfig.REWARDS_TOKEN_ADDRESS,
    ERC20_ABI,
    signerOrProvider
  );
  const stakingRewards = new ethers.Contract(
    contractConfig.STAKING_REWARDS_CONTRACT,
    STAKING_REWARDS_ABI,
    signerOrProvider
  );

  const bankNodeLendingRewards = new ethers.Contract(
    contractConfig.BANK_NODE_LENDING_REWARDS,
    BANK_NODE_LENDING_REWARDS,
    signerOrProvider
  );

  const bankNodeManager = new ethers.Contract(
    contractConfig.BANK_NODE_MANAGER,
    BANK_NODE_MANAGER,
    signerOrProvider
  );

  const bnplBankNode = new ethers.Contract(
    contractConfig.BNPL_BANK_NODE,
    BNPL_BANK_NODE,
    signerOrProvider
  );

  const bnplStakingPool = new ethers.Contract(
    contractConfig.BNPL_STAKING_POOL,
    BNPL_STAKING_POOL,
    signerOrProvider
  );

  const bnplProtocolConfig = new ethers.Contract(
    contractConfig.BNPL_PROTOCOL_CONFIG,
    BNPL_PROTOCOL_CONFIG,
    signerOrProvider
  )

//   console.log(bankNodeLendingRewards, bankNodeManager, bnplBankNode, bnplStakingPool)


  async function getUserInfo(address) {
    const stakingTokenBalance = await stakingToken.balanceOf(address);
    const rewardsTokenBalance = await rewardsToken.balanceOf(address);
    const unclaimedEarnedRewards = await stakingRewards.earned(address);
    const stakedTokenAmount = await stakingRewards.balanceOf(address);
    const lendingTokenAmount = await bankNodeLendingRewards.bankNodeManager();
    const balanceOf = await bankNodeLendingRewards.balanceOf(address, lendingTokenAmount);
    
    const addressBnpl = await bnplProtocolConfig.bnplToken()
    const bankNodeManagerValue = await bnplProtocolConfig.bankNodeManager()
    const networkId = await bnplProtocolConfig.networkId()
    const networkName = await bnplProtocolConfig.networkName()
    const upBeaconBankNode = await bnplProtocolConfig.upBeaconBankNode()
    const upBeaconBankNodeLendingPoolToken = await bnplProtocolConfig.upBeaconBankNodeLendingPoolToken()
    const upBeaconBankNodeLendingRewards = await bnplProtocolConfig.upBeaconBankNodeLendingRewards()
    const upBeaconBankNodeManager = await bnplProtocolConfig.upBeaconBankNodeManager()
    const upBeaconBankNodeStakingPool = await bnplProtocolConfig.upBeaconBankNodeStakingPool()
    const upBeaconBankNodeStakingPoolToken = await bnplProtocolConfig.upBeaconBankNodeStakingPoolToken()

    console.log(addressBnpl)
    const tx0 = await rewardsToken.approve(addressBnpl, "5000000")
    console.log(tx0)
    const r0 = await tx0.wait();
    console.log(r0)

    const tx = await bankNodeManager.createBondedBankNode(address, "5000000", "0x110a13fc3efe6a245b50102d2d79b3e76125ae83", "test", "https://www.baidu.com")

    console.log(tx)


    
    console.log({
      bnplToken: addressBnpl,
      bankNodeManager: bankNodeManagerValue,
      networkId: networkId.toNumber(),
      networkName,
      upBeaconBankNode,
      upBeaconBankNodeLendingPoolToken,
      upBeaconBankNodeLendingRewards,
      upBeaconBankNodeManager,
      upBeaconBankNodeStakingPool,
      upBeaconBankNodeStakingPoolToken
    })
    return {
      address,
    //   lendingTokenAmount,
      stakingTokenBalance,
      rewardsTokenBalance,
      unclaimedEarnedRewards,
      stakedTokenAmount,
    };
  }

  async function exitPool() {
    const tx0 = await stakingRewards.exit();

    const r0 = await tx0.wait();
    return tx0;
  }
  async function approveAndStakeToRewardsPool(amount) {
    const tx0 = await stakingToken.approve(stakingRewards.address, amount);
    const r0 = await tx0.wait();

    const tx1 = await stakingRewards.stake(amount);
    const r1 = await tx1.wait();

    return [tx0, tx1];
  }
  async function unstakeFromRewardsPool(amount) {
    const tx0 = stakingRewards.withdraw(amount);
    await tx0.wait();
    return tx0;
  }
  async function claimRewards() {
    const tx0 = stakingRewards.getReward();
    await tx0.wait();
    return tx0;
  }
  async function unstakeFromRewardsPoolAndClaimRewards(amount) {
    const tx0 = await unstakeFromRewardsPool();
    const r0 = await tx0.wait();
    const tx1 = await claimRewards();
    const r1 = await tx1.wait();

    return [tx0, tx1];
  }
  async function debugMintFauct(address, amount) {
    const tx0 = stakingToken.mint(address, amount);
    const r0 = await tx0.wait();
    return tx0;
  }

  return {
    stakingToken,
    stakingRewards,
    rewardsToken,
    getUserInfo,
    debugMintFauct,
    exitPool,
    approveAndStakeToRewardsPool,
    unstakeFromRewardsPoolAndClaimRewards,
    unstakeFromRewardsPool,
    claimRewards,
  };
}

export { ContractManagers };

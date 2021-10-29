import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getBoundWalletManager, logout } from "./utils/eth/walletManager";
const RenderStakerUI = ({ address, contractManager }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [txs, setTxs] = useState([]);
  const [loadingState, setLoadingState] = useState(0);
  const [amount, setAmount] = useState("");

  function convInputAmount(inputAmount) {
    return ethers.utils.parseUnits(inputAmount, "ether");
  }

  const runStakeTokens = (amount) => {
    if (loadingState) {
      return;
    }
    setTxs([]);
    setLoadingState(2);
    contractManager
      .approveAndStakeToRewardsPool(amount)
      .then((txs) => {
        setTxs(txs);
        setLoadingState(1);
        return contractManager.getUserInfo(address).then((uInfo) => {
          setUserInfo(uInfo);
          setLoadingState(0);
        });
      })
      .catch((err) => {
        console.error("ERROR getting user info: ", err);
        setErrorMessage(err + "");
        setLoadingState(0);
      });
  };
  const runUnStakeClaimRewardsTokens = (amount) => {
    if (loadingState) {
      return;
    }
    setTxs([]);
    setLoadingState(2);
    contractManager
      .unstakeFromRewardsPoolAndClaimRewards(amount)
      .then((txs) => {
        setTxs(txs);
        setLoadingState(1);
        return contractManager.getUserInfo(address).then((uInfo) => {
          setUserInfo(uInfo);
          setLoadingState(0);
        });
      })
      .catch((err) => {
        console.error("ERROR getting user info: ", err);
        setErrorMessage(err + "");
        setLoadingState(0);
      });
  };
  const runExitPool = () => {
    if (loadingState) {
      return;
    }
    setTxs([]);
    setLoadingState(2);
    contractManager
      .exitPool()
      .then((tx) => {
        setTxs([tx]);
        setLoadingState(1);
        return contractManager.getUserInfo(address).then((uInfo) => {
          setUserInfo(uInfo);
          setLoadingState(0);
        });
      })
      .catch((err) => {
        console.error("ERROR getting user info: ", err);
        setErrorMessage(err + "");
        setLoadingState(0);
      });
  };
  const runDebugMintFauct = (amount) => {
    if (loadingState) {
      return;
    }
    setTxs([]);
    setLoadingState(2);
    contractManager
      .debugMintFauct(amount)
      .then((tx) => {
        setTxs([tx]);
        setLoadingState(1);
        return contractManager.getUserInfo(address).then((uInfo) => {
          setUserInfo(uInfo);
          setLoadingState(0);
        });
      })
      .catch((err) => {
        console.error("ERROR minting tokens: ", err);
        setErrorMessage(err + "");
        setLoadingState(0);
      });
  };
  const refreshUserData = () => {
    if (!loadingState) {
      setLoadingState(1);
      contractManager
        .getUserInfo(address)
        .then((uInfo) => {
          setUserInfo(uInfo);
          setLoadingState(0);
        })
        .catch((err) => {
          console.error("ERROR getting user info: ", err);
          setErrorMessage(err + "");
          setLoadingState(0);
        });
    }
  };
  useEffect(() => {
    if (!userInfo && !loadingState && refreshUserData) {
      console.log(refreshUserData);

      if (!loadingState) {
        setLoadingState(1);
        contractManager
          .getUserInfo(address)
          .then((uInfo) => {
            setUserInfo(uInfo);
            setLoadingState(0);
          })
          .catch((err) => {
            console.error("ERROR getting user info: ", err);
            setErrorMessage(err + "");
            setLoadingState(0);
          });
      }
    }
  }, [userInfo, setUserInfo, contractManager, loadingState, refreshUserData]);
  if (loadingState === 1 || !userInfo) {
    return <div>Loading User Info...</div>;
  }
  if (loadingState === 2) {
    return (
      <div>
        Loading Transaction, please comply with the popups in metamask...
      </div>
    );
  }
  function fmtValue(v) {
    return typeof v === "object" && v && v._isBigNumber
      ? ethers.utils.formatEther(v + "")
      : v;
  }
  return (
    <div className="runDapp">
      {errorMessage ? (
        <div className="errorMessage">ERROR: {errorMessage}</div>
      ) : null}
      <div>
        <pre className="userInfo">
          {Object.keys(userInfo)
            .map((k) => `${k}: ${fmtValue(userInfo[k]) + ""}`)
            .join("\n")}
        </pre>
      </div>
      <div>
        <input
          type="text"
          placeholder="Amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => runStakeTokens(convInputAmount(amount))}>
          Stake Tokens
        </button>
        <button
          onClick={() => runUnStakeClaimRewardsTokens(convInputAmount(amount))}
        >
          Unstake Tokens
        </button>
        <button onClick={runExitPool}>Exit Pool</button>
        <button onClick={refreshUserData}>Refresh User Data</button>
        <div>
          <button
            onClick={() => runDebugMintFauct(address, convInputAmount(amount))}
          >
            DEV ENV ONLY: Mint Staking Tokens
          </button>
        </div>
      </div>
      {txs.length ? (
        <div>
          <h3>Transactions:</h3>
          <pre className="txDump">{txs.map((x) => x + "").join("\n")}</pre>
        </div>
      ) : null}
    </div>
  );
};
export default function App() {
  const [boundWalletManager, setBoundWalletManager] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingState, setLoadingState] = useState(0);

  const runLogin = () => {
    if (loadingState) {
      return;
    }
    setLoadingState(1);
    setErrorMessage("");
    setBoundWalletManager(null);
    getBoundWalletManager()
      .then((boundWalletManager) => {
        
        setBoundWalletManager(boundWalletManager);
        setLoadingState(0);
      })
      .catch((err) => {
        console.error("LOGIN ERROR: ", err);
        setErrorMessage(err + "");
        setLoadingState(0);
      });
  };
  const runLogout = () => {
    if (loadingState) {
      return;
    }
    setLoadingState(1);
    setErrorMessage("");
    setBoundWalletManager(null);
    logout()
      .then(() => {
        setLoadingState(0);
      })
      .catch((err) => {
        console.error("LOGOUT: ", err);
        setLoadingState(0);
      });
  };

  if (!boundWalletManager) {
    return (
      <div className="loginPage">
        {" "}
        {errorMessage ? (
          <div className="errorMessage">ERROR: {errorMessage}</div>
        ) : null}
        <div className="loginCon">
          <button disabled={loadingState !== 0} onClick={runLogin}>
            Login with MetaMask
          </button>
        </div>
      </div>
    );
  }
  if (loadingState) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      {errorMessage ? (
        <div className="errorMessage">ERROR: {errorMessage}</div>
      ) : null}

      <RenderStakerUI
        contractManager={boundWalletManager.contractManager}
        address={boundWalletManager.address}
      />
    </div>
  );
}

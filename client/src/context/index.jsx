import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x1b3Ced577f1D008b79d4F6C59e98e2e6581798bd"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target.toString(),
          new Date(form.deadline).getTime(),
          0,
          form.image,
        ]});
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async() => {
    const campaigns = await contract.call('getCampaigns');
    const parsedCampaigns = campaigns.map((campaign) => ({
      owner : campaign.owner,
      title : campaign.title,
      description : campaign.description,
      target : ethers.utils.formatEther(campaign.target.toString()),
      deadline : campaign.deadline.toNumber(),
      amountCollected : ethers.utils.formatEther(campaign.amountCollected.toString()),
      image : campaign.image,
      pId : campaign.i 
    }))
    // console.log(parsedCampaigns);
    return parsedCampaigns;
  }
 
  return (
    <StateContext.Provider
      value={{ 
        address, 
        contract, 
        connect,
        createCampaign: publishCampaign,
        getCampaigns
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);

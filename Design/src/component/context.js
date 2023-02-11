import {createContext,useState} from 'react'

export const Web3Context=createContext();

const ContextProvider=(props)=>{
    const [web3States,setWeb3State]=useState({web3:null,contract:null,account:null,Time:null,Staker:null})

    return (
        <Web3Context.Provider value={{web3States,setWeb3State}}>
            {props.children}
        </Web3Context.Provider>
    )
}

export default ContextProvider
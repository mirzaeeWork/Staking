import { Button, Col, Toast, ToastContainer } from "react-bootstrap"
import { useState, useContext, useEffect } from 'react';
import Web3 from "web3";
import { Abi } from "../Abi";
import { Web3Context } from "../context";

const Connect = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [account, setAccount] = useState();

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    window.ethereum.on('accountsChanged', (accounts) => {
        connectToWallet()
    });

    window.ethereum.on('chainChanged', (chainId) => {
        setAccount()
    });
    const connectToWallet = async () => {
        let web3, contract;
        if (typeof window.ethereum !== "undefined") {

            let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(Web3.givenProvider);
            web3.eth.getChainId().then(res => {
                if (res == "5") {

                    setAccount(accounts[0])
                    contract = new web3.eth.Contract(Abi, "0xBD6052D664d4fd06EEeF801A2F93c38F1D679739")
                    setWeb3State({ web3: web3, contract: contract, account: accounts[0] })
                } else {
                    setMessage("testnet Goerli شبکه تستی مد نظر می باشد")
                    setShow(true)
                }
            })
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            setMessage("متامسک را نصب کنید")
            setShow(true)
        }
    }


    useEffect(() => {
        let web3, contract;
        web3 = new Web3('https://goerli.infura.io/v3/102317ab22a14a99b64cd6111c622b6d');
        contract = new web3.eth.Contract(Abi, "0xBD6052D664d4fd06EEeF801A2F93c38F1D679739")
        if(contract){
            contract.methods.timeLeft().call().then(res => {
                setWeb3State({ web3: web3, contract: contract, account: null,Time:res})
                console.log(res)        
            })
        }
    }
        , [])

    return (
        <>
            <Col xs={6}>
                <ToastContainer className="p-3" position="top-center">
                    <Toast onClose={() => setShow(false)}
                        show={show} delay={5000} autohide>
                        <Toast.Header className="text-white bg-danger">
                            <strong className="ms-auto">خطا</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-light">{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
            <Button onClick={connectToWallet} value="success">
                {account ? (account.substring(0, 4) + '...' + account.slice(-4)) : 'اتصال به کیف پول'}
            </Button>
        </>
    );
}

export default Connect
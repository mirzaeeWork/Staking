import './home.css'
import { Col, Alert, Container, Button, Row, ToastContainer, Toast } from "react-bootstrap"
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from "../context";
import NavbarComponent from '../Navbar/navbar';


const Home = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [show, setShow] = useState(false);
    const [myShowToast, setMyShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState()
    const [balance,setBalance]=useState()
    const [myBalance,setMyBalance]=useState()


    function sendAmount() {
        if (web3States.account) {
            web3States.contract.methods.stake().send({
                from: web3States.account
                , value: web3States.web3.utils.toWei(amount.toString(), 'ether')
            }).then(res => {
                setShow(true)
                setMyShowToast(true)
                setAmount("")
                setMessage(`مقدار ${amount} اتر با موفقیت ارسال شد`)
                getBalancStaker();
                // document.getElementById("Amount").value = ""
            }).catch((error) => {
                setShow(true)
                setMessage("مقدار ارسالی بایستی حداقل 0.05 اتر یا مضربی از آن باشد")
            })
        } else {
            setMessage("ابتدا به کیف پول خود وصل شوید")
            setShow(true)
        }
    }

    function getBalancStaker(){
        if (web3States.contract) {
            web3States.contract.methods.getBalanceStaker().call({ from: web3States.account }).then(res => {
                setBalance( web3States.web3.utils.fromWei(res, 'ether') )
            })
        }

    }

    function execute(){
        if (web3States.account) {
            web3States.contract.methods.execute().send({
                from: web3States.account
            }).then(res => {
                setShow(true)
                setMyShowToast(true)
                setMessage(`مقدار ${balance} اتر با موفقیت به قرارداد هوشمند دیگر ارسال شد`)
                getBalancStaker();
            }).catch((error) => {
                setShow(true)
                setMessage("زمان به پایان نرسیده یا حداقل 3 اتر لازم می باشد")
            })
        } else {
            setMessage("ابتدا به کیف پول خود وصل شوید")
            setShow(true)
        }
    }

    function withdraw(){
        if (web3States.account) {
            web3States.contract.methods.getBalance().call({
                from: web3States.account
            }).then(res => {
                setMyBalance(web3States.web3.utils.fromWei(res, 'ether'))
            })
            web3States.contract.methods.withdraw().send({
                from: web3States.account
            }).then(res => {
                setShow(true)
                setMyShowToast(true)
                setMessage(`مقدار ${myBalance} اتر با موفقیت به کیف پول ارسال شد`)
                getBalancStaker();
            }).catch((error) => {
                setShow(true)
                setMessage(" زمان به پایان نرسیده یا موجودی قرارداد هوشمند بیش از 3 اتر می باشد یا موجودی قرارداد هوشمند کافی نمی باشد") 
            })
        } else {
            setMessage("ابتدا به کیف پول خود وصل شوید")
            setShow(true)
        }
    }





    return (
        <>
            <Col xs={6}>
                <ToastContainer className="p-3" position="top-center">
                    <Toast onClose={() => setShow(false)}
                        show={show} delay={5000} autohide>
                        <Toast.Header className={myShowToast ? "bg-success" : "bg-danger"}  >
                            <strong className="text-white me-auto">پیام</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-light">{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>

            <NavbarComponent sendBalance={balance}/>
            <Container dir='rtl'>
                <Row >
                    <Col xs={12} md={6} className='d-flex mx-auto mt-5' style={{backgroundColor:"rgb(176 198 231)"}}>
                        <input id='Amount' className='form-control ms-4' name='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='اتر(حداقل 0.5 اتر یا مضربی از  0.05 باشد )' />

                        <Button onClick={sendAmount} value="success">
                            ارسال اتر به قرارداد هوشمند
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} className='d-flex mx-auto mt-5' style={{backgroundColor:"rgb(176 198 231)"}}>

                        <Button onClick={execute} value="success" className='mx-auto'>
                            ارسال کل موجودی قرارداد هوشمند به قرارداد هوشمند دیگر
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} className='d-flex mx-auto mt-5' style={{backgroundColor:"rgb(176 198 231)"}}>

                        <Button onClick={withdraw} value="success" className='mx-auto'>
                            برگرداندن اتر از قراردادهوشمند به کیف پول
                        </Button>
                    </Col>
                </Row>


            </Container>
        </>
    )
}

export default Home;
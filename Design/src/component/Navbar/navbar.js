
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap"
import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Connect from "../connect/connect";
import './navbar.css';
import { Web3Context } from "../context";
import { propTypes } from "react-bootstrap/esm/Image";


const NavbarComponent = (props) => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [time, setTime] = useState()
    const [secondtime, setSecondTime] = useState()
    const [balanceStaker,setBalanceStaker]=useState()

    let startTime;

    function LowTime() {
        if (web3States.contract) {
            web3States.contract.methods.timeLeft().call({ from: web3States.account }).then(res => {
                setTime(res)
            })
        }
    }

    function displayCount() {
            // Calculate current hours, minutes, and seconds
            let day=Math.floor(startTime / 86400);
            let hours = Math.floor((startTime % 86400)/3600);
            let minutes = Math.floor((startTime % 3600) / 60);
            let seconds = Math.floor(startTime % 60)
            // Display a leading zero if the values are less than ten
            let displayDay=(day<100?'0'+day:day);
            let displayHours = (hours < 10) ? '0' + hours : hours;
            let displayMinutes = (minutes < 10) ? '0' + minutes : minutes;
            let displaySeconds = (seconds < 10) ? '0' + seconds : seconds;
            // Write the current stopwatch display time into the display paragraph
            setSecondTime(displayDay+" dd , "+ displayHours + ':' + displayMinutes + ':' + displaySeconds);
            // Increment the second counter by one
    }

    function getBalancStaker(){
        if (web3States.contract) {
            web3States.contract.methods.getBalanceStaker().call({ from: web3States.account }).then(res => {
                setBalanceStaker(web3States.web3.utils.fromWei(res, 'ether'))
            })
        }

    }

    useEffect(() => {
        time > 0 && setTimeout(() => setTime(time - 1), 1000);
        startTime=time
        displayCount()
    }, [time]);

    useEffect(() => {
        LowTime()
        getBalancStaker()
    }, [web3States.Time])




    return (
        <>
            <Navbar className='class-div fs-6 '>
                <Container>

                    <Nav>
                        <Nav.Link>
                            <Connect />
                        </Nav.Link>
                    </Nav>
                    <Nav.Link>
                        <Button value="success">
                        موجودی قرارداد هوشمند     {props.sendBalance ? props.sendBalance  : balanceStaker}      اتر می باشد                
                        </Button>
                    </Nav.Link>

                    <Nav.Link>
                        <Button value="success">
                            {secondtime}
                        </Button>
                    </Nav.Link>


                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent
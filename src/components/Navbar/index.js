import React from 'react'
import Blockies from 'react-blockies'
import { IconContext } from 'react-icons'
import { FaDog } from 'react-icons/fa'
import AppBar from '@mui/material/AppBar';
import { Container, Toolbar } from '@mui/material';
import MainButton from '../MainButton';
import { useAppContext } from '../../context/appContext'

const Navbar = () => {
    const { account, setAccount } = useAppContext()

    const handleLogoClick = () => {
        console.log('Yendo hasta arriba de todo')
    }

    const handleConnectButton = async () => {
        if (!account) {
            if (window.ethereum) {
                const [_firstAccount] = await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                setAccount(_firstAccount)
            }
        } else {//Si ya esta conectado y hacemos click en el boton, nos desconectamos
            setAccount(null)
        }
    }

    return (
        <AppBar position='fixed' style={{ background: 'none', boxShadow: 'none' }}>
            <Toolbar>
                <IconContext.Provider value={{ style: { fontSize: "2rem", color: "#e1306c" } }}>
                    <FaDog onClick={handleLogoClick} />
                </IconContext.Provider>

                <Container id='connect-container' style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <MainButton onClick={handleConnectButton}>{!account ? "Connect Wallet" : `Log out: ${account.slice(0, 10)}...`}</MainButton>

                    {account ? <Blockies seed={account} /> : <img src="metamask.svg" alt="mtmk-log" style={{ height: '32px', width: '32px' }} />}
                </Container>
            </Toolbar>
        </AppBar >

    )
}

export default Navbar
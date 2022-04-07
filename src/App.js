import Navbar from './components/Navbar';
import { Container, Typography } from '@mui/material';
import MainButton from './components/MainButton';
import { useState, useEffect } from 'react';
import { useAppContext } from './context/appContext';

function App() {
  const [nfts, setNfts] = useState([])
  const { appDisabled, account, contract, setLoading, loading, provider } = useAppContext()


  const handleMintClick = () => {
    console.log("Minting!")
  }

  useEffect(() => {
    const getNfts = async () => {
      try {


      } catch (error) {
        console.log("Error: ", { error })
      }
    }

    setLoading(true)
    getNfts()
    setLoading(false)

  }, [])

  if (appDisabled) {
    return (
      <>
        <Container style={{ display: 'flex', alignItems: 'center', marginTop: '5rem', flexDirection: 'column' }}>
          <Typography style={{ borderBottom: '1px solid var(--primary-color)', marginTop: '1rem' }} variant='h2'>
            Select Rinkeby or Kovan network.
          </Typography>
        </Container>
      </>
    )
  }
  return (
    <>
      <Navbar />
      {/** aca iria el grid con las cartas de los nft */}
      <Container style={{ display: 'flex', alignItems: 'center', marginTop: '5rem', flexDirection: 'column' }}>
        <MainButton onClick={handleMintClick}>Mint!</MainButton>
        {!(nfts.length > 0) &&
          <Typography style={{ borderBottom: '1px solid var(--primary-color)', marginTop: '1rem' }} variant='h2'>
            No nfts yet
          </Typography>}
      </Container>
      {nfts.length > 0 &&
        <>
          <h1>Sdas</h1>
        </>}

    </>
  );
}

export default App;

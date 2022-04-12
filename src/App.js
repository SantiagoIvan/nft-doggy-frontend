import Navbar from './components/Navbar';
import { Container, Typography } from '@mui/material';
import MainButton from './components/MainButton';
import React, { useState, useEffect } from 'react';
import { useAppContext } from './context/appContext';
import { create } from 'ipfs-http-client'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FadeModal from './components/Modal'

import NftCard from './components/NftCard';




function App() {
  const [nfts, setNfts] = useState([])
  const { appDisabled, account, contract, setLoading, loading, provider } = useAppContext()
  const [nftCreatedModalOpen, setNftCreatedModalOpen] = useState(false)
  const [ipfs, setIpfs] = useState(null)

  const handleModalClose = () => {
    setNftCreatedModalOpen(false)
  }


  const handleMintClick = async () => {
    try {
      setLoading(true)
      // me guardo el path en la blockchain junto con la descripcion
      const signer = await provider.getSigner()
      const tx = await contract.populateTransaction.createCollectible()
      const execTx = await signer.sendTransaction({ ...tx })
      await provider.waitForTransaction(execTx.hash)
      setLoading(false)
      setNftCreatedModalOpen(true)
    } catch (error) {
      console.log("Error: ", { error })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getNfts = async () => {
      try {
        setLoading(true)
        // obtengo todos mis tokenURI si es que tengo
        const arr_of_tokens = await contract.getNftsFromUser(account)
        // hago el call a IPFS para obtener toda la data
        const aux = []
        for (let i = 0; i < arr_of_tokens.length; i++) {
          const token = parseInt(arr_of_tokens[i].toString())
          const nft_uri = await contract.getTokenURI(token, account)
          fetch(nft_uri)
            .then(res => res.json())
            .then(nft_metadata => { nft_metadata && aux.push(nft_metadata) })
            .catch(error => console.log(error))
        }
        setNfts(aux)
      } catch (error) {
        console.log("Error: ", { error })
      } finally {
        setLoading(false)
      }
    }

    if (!contract || !account) {
      setNfts([])
      return
    }
    getNfts()
  }, [contract, setLoading, account])

  useEffect(() => {
    if (!ipfs){
      setIpfs(create({ 
        host: process.env.REACT_APP_IPFS_CREATE_HOST,
        apiPath: process.env.REACT_APP_IPFS_CREATE_PATH,
        port: process.env.REACT_APP_IPFS_CREATE_PORT,
        protocol: process.env.REACT_APP_IPFS_CREATE_PROTOCOL
      }))
    }
  }, [ipfs])

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
  if (loading) {
    return (
      <Container style={{ display: 'flex', alignItems: 'center', marginTop: '5rem', flexDirection: 'column' }}>
        <Typography style={{ borderBottom: '1px solid var(--primary-color)', marginTop: '1rem' }} variant='h2'>
          Loading...
        </Typography>
      </Container>
    )
  }
  return (
    <>
      <Navbar />
     <FadeModal open={nftCreatedModalOpen} onClose={handleModalClose}/>


      <Container style={{ display: 'flex', alignItems: 'center', marginTop: '5rem', marginBottom: '2rem', flexDirection: 'column' }}>
        {account && <MainButton disabled={!account} onClick={handleMintClick}>Mint!</MainButton>}
        {!(nfts.length > 0) &&
          <Typography style={{ borderBottom: '1px solid var(--primary-color)', marginTop: '1rem' }} variant='h2'>
            No nfts yet
          </Typography>}
      </Container>

      {nfts.length > 0 &&
        <Box sx={{ flexGrow: 1, margin: '0rem 2rem' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {nfts.map((nft, index) => (
              <NftCard key={index} nft={nft} />
            ))}
          </Grid>
        </Box>
      }

    </>
  );
}

export default App;

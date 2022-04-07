import React from 'react'
import Button from '@mui/material/Button';

const MainButton = (props) => {
    return (
        <Button style={{ color: 'whitesmoke', background: 'var(--primary-color)' }} variant='contained' {...props} />
    )
}

export default MainButton
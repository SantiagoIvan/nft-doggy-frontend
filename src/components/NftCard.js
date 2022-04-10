import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton sx={{ color: 'white' }} {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const NftCard = ({ nft }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345, border: '2px solid var(--primary-color)', background: 'none', color: 'var(--primary-color)' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150px"
                        image={nft.image}
                        alt="nft image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {nft.name}
                        </Typography>
                        <Typography variant="body2" color="white">
                            {nft.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {nft.attributes.map((attr, index) =>
                            <Container key={index}>
                                <Typography variant='h4'>
                                    {attr.trait_type}
                                </Typography>
                                <Typography paragraph color='white'>{attr.value}</Typography>
                            </Container>

                        )}
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

export default NftCard
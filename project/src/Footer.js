import React from 'react';
import { Box, Typography, Grid, IconButton, Divider } from '@mui/material';
import { Google, Twitter, Instagram, LinkedIn, Email, Phone} from '@mui/icons-material';
import { styled } from '@mui/system';

const BgContainer = styled(Box)({
  backgroundColor: '#19232d',
  padding: '8px',
  color: '#959ead',
  marginTop:'250px'
});

const IconBackground = styled(Box)({
  backgroundColor: '#202b36',
  borderRadius: '40px',
  padding: '6px',
  margin: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const FollowAddress = styled(Typography)({
  fontWeight: 500,
  fontSize: '13px',
  fontFamily: 'Roboto, sans-serif',
  color: '#5a7184',
});

const SubHeading = styled(Typography)({
  color: '#5a7184',
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: 'Roboto, sans-serif',
});

const BottomSection = styled(Typography)({
  fontWeight: 500,
  fontSize: '26px',
  fontFamily: 'Roboto, sans-serif',
  color: '#959ead',
  textAlign: 'center',
  marginTop: '10px',
});

function Footer() {
  return (
    <BgContainer>
      <Grid container>
        {/* Left Section: Logo and Social Media */}
        <Grid item xs={12} md={4} container justifyContent="center">
        <Grid item xs={4} md={4}>
          <Box textAlign={{ xs: 'center', md: 'left' }}>
            <img
              src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/vr-logo-img.png"
              alt="Logo"
              style={{ height: '40px' }}
            />
            <Box display="flex" justifyContent={{ xs: 'center', md: 'left' }} mt={2}>
              <IconBackground>
                <IconButton color="inherit">
                  <Google style={{ color: '#5a7184' }} />
                </IconButton>
              </IconBackground>
              <IconBackground>
                <IconButton color="inherit">
                  <Twitter style={{ color: '#5a7184' }} />
                </IconButton>
              </IconBackground>
              <IconBackground>
                <IconButton color="inherit">
                  <Instagram style={{ color: '#5a7184' }} />
                </IconButton>
              </IconBackground>
              <IconBackground>
                <IconButton color="inherit">
                  <LinkedIn style={{ color: '#5a7184' }} />
                </IconButton>
              </IconBackground>
            </Box>
            <FollowAddress mt={3}>13-103, Kothapeta, Konaseema, AP, India.</FollowAddress>
          </Box>
          </Grid>
       

        {/* Middle Section: Contact Info */}
        <Grid item xs={4} md={4}>
          <Box mt={5}>
            <SubHeading>Contact us</SubHeading>
            <FollowAddress mt={4}>
              <Email style={{ fontSize: '21px', marginRight: '10px' }} />
              user2004@gmail.com
            </FollowAddress>
            <FollowAddress mt={4}>
              <Phone style={{ fontSize: '21px', marginRight: '10px' }} />
              93XXXXXX35
            </FollowAddress>
            <FollowAddress mt={2}>
            
            </FollowAddress>
          </Box>
          
        </Grid>

        {/* Right Section: Help Links */}
        <Grid item xs={4} md={4}>
          <Box mt={5}>
            <SubHeading>Let Us Help You</SubHeading>
            <FollowAddress mt={2}>100% Purchase Protection</FollowAddress>
            <FollowAddress mt={2}>Your Account</FollowAddress>
            <FollowAddress mt={2}>Return Center</FollowAddress>
            <FollowAddress mt={2}>Help</FollowAddress>
          </Box>
        </Grid>
        </Grid>
      </Grid>

      {/* Divider and Copyright Section */}
      <Divider style={{ borderColor: '#5a7184', margin: '20px 0' }} />
      <BottomSection>
        &copy;2024.
      </BottomSection>
    </BgContainer>
  );
}

export default Footer;

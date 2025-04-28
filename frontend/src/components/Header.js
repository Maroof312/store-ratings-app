import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ user, logout }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Store Ratings
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'mobile-menu',
              }}
            >
              {user ? (
                [
                  <MenuItem 
                    key="stores" 
                    onClick={() => {
                      handleMenuClose();
                      navigate('/stores');
                    }}
                  >
                    Stores
                  </MenuItem>,
                  <MenuItem 
                    key="dashboard" 
                    onClick={() => {
                      handleMenuClose();
                      navigate('/dashboard');
                    }}
                  >
                    Dashboard
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                ]
              ) : (
                [
                  <MenuItem 
                    key="login" 
                    onClick={() => {
                      handleMenuClose();
                      navigate('/login');
                    }}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem 
                    key="register" 
                    onClick={() => {
                      handleMenuClose();
                      navigate('/register');
                    }}
                  >
                    Register
                  </MenuItem>
                ]
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/stores')}
                >
                  Stores
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
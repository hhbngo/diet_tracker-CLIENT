import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Drawer, Toolbar, Typography, Button, IconButton, Menu, MenuItem, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logout } from '../store/actions/auth';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawerList: {
        width: 250
    },
    appBar: {
        backgroundColor: 'white',
        color: 'black'
    }
}));

const ABar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth);

    const [ opened, setOpened ] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
    }

    const handleDrawerClick = (path) => {
        history.push(path);
        setOpened(false);
    }

    return (
        <>
        <Drawer anchor='left' open={opened} onClose={() => setOpened(false)}>
            <div className={classes.drawerList}>
                <List component='nav'>
                    <ListItem button onClick={() => handleDrawerClick('/')}>
                        <ListItemText primary='Home'/>
                    </ListItem>
                    {!auth &&
                        [
                        <ListItem button key={1} onClick={() => handleDrawerClick('/login')}>
                            <ListItemText primary='Login'/>
                        </ListItem>,
                        <ListItem button key={2} onClick={() => handleDrawerClick('/register')}>
                            <ListItemText primary='Register'/>
                        </ListItem>
                        ]
                    }

                </List>
            </div>
        </Drawer>
        <AppBar position='static' className={classes.appBar}>
            <Toolbar>
                <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' onClick={() => setOpened(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' className={classes.title}>
                    Diet Tracker
                </Typography>
                {auth ? 
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </div>
                    :
                    [
                        <Button key='home' color='inherit' onClick={() => history.push('/')}>Home</Button>,
                        <Button key='login' color='inherit' onClick={() => history.push('/login')}>Login</Button>
                    ]
                }
            </Toolbar>
        </AppBar>
        </>
    )
}

export default ABar;
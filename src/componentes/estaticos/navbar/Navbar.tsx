import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import logo3 from "./logo3.png";
import "./Navbar.css";
import SideCart from '../../sideCart/SideCart';
import useLocalStorage from "react-use-localstorage";
import { toast } from 'react-toastify';
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";


function Navbar() {
  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  function goLogout() {
    setToken('')
    toast.info('Usuário deslogado', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
  });
    navigate('/home')
}

  return (
    <>
      <AppBar position="fixed" className="opa">
        <Toolbar className="fundo3" variant="dense">
          {token === "" ? (
            <Grid item xs={6} mx={1} className="caixa1">
              <Link to="/home" className="text-decorator-none">
                <Box marginX={3} className="texto2">
                  <Typography variant="h6" className="cursor">
                    Home
                  </Typography>
                </Box>
              </Link>
              <Link to="/sobre" className="text-decorator-none">
                <Box marginX={3}>
                  <Typography variant="h6" className="cursor">
                    Sobre
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ) : (
            <Grid item xs={6} mx={1} className="caixa1">
              <Link to="/dashboard" className="text-decorator-none">
                <Box marginX={3} className="texto2">
                  <Typography variant="h6" className="cursor">
                    Home
                  </Typography>
                </Box>
              </Link>
              <Link to="/sobre" className="text-decorator-none">
                <Box marginX={3}>
                  <Typography variant="h6" className="cursor">
                    Sobre
                  </Typography>
                </Box>
              </Link>
            </Grid>
          )}

          <Grid item xs={1}>
            <Link to="/home" className="text-decorator-none">
              <Box className="caixa2">
                <img src={logo3} className="center" alt="logo" />
              </Box>
            </Link>
          </Grid>

          {token === "" ? (
            <Grid item xs={6} className="caixa1">
              <Link to="/cadastrousuario" className="text-decorator-none">
                <Box marginX={3}>
                  <Typography variant="h6" className="cursor">
                    Cadastre-se
                  </Typography>
                </Box>
              </Link>
              <SideCart />
              <Link to="/login" className="text-decorator-none">
                <Box marginX={3} marginTop={1}>
                  <Typography variant="h6" className="cursor">
                  <LoginIcon/>
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ) : (
            <Grid item xs={6} className="caixa1">
              <Link to="/minhaconta" className="text-decorator-none">
                <Box marginX={3}>
                  <Typography variant="h6" className="cursor">
                    Minha Conta
                  </Typography>
                </Box>
              </Link>
              <Link to="SideCart" className="text-decorator-none">
                <Box>
                  <SideCart />
                </Box>
              </Link>
              <Box marginX={3} marginTop={1}>
                <Typography variant="h6" className="cursor" onClick={goLogout}>
                <LogoutIcon/>
                </Typography>
              </Box>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;

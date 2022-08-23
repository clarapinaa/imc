import './App.css'

import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Textfield from '@mui/material/Texfield';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/button'
import InoutAdornment from '@mui/material/InoutAdorment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

class Imc extends React.Component {

  constructor(props) {
    super(props);
    this.setPeso = this.setPeso.bind(this);
    this.setAltura = this.setAltura.bind(this);
    this.setMasculino = this.setMasculino.bind(this);
    this.setMaior = this.setMaior.bind(this);
    this.Resultado = this.Resultado.bind (this)
    this.enviar = this.enviar.bind (this);
    this.state = {
      peso: null,
      altura: null
      Masculino: null
      setMaior: null 
    };
  }

  setPeso(event) {
    this.setState({ peso: event.target.value });
  }

  setAltura(event) {
    this.setState({ altura: event.target.value });
  }

  setMasculino(event) {
    this.setState({ altura: event.target.checked });
  }

  setMaior(event) {
    this.setState({ altura: event.target.checked });
  }

  calcular() {
    let peso = this.state.peso;
    let altura = this.state.altura;
    if (peso && altura) {
      return peso / Math.pow(altura, 2);
    }
  }

   tipo (imc,a,b,c,d,e) {
   if (imc < a) {
  return "abaixo do peso";
  } else if (imc < b) {
  return "peso normal";
} else if (imc < c) {
  return "acima do peso (sobrepeso)";
  } else if (imc < d) {
  return "obesidade I";
  } else if (imc < e) {
  return "obesidade II" ;
  } else {
  return "obesidade III";
}
 }

resultado() {
    let resultado = new String();
    let imc = this.calcular();
    if (imc) {
      resultado += imc.toFixed(2) + " - ";
      let Masculino = this.state.masculino;
      let maior = this.state.maior;
      if (maior){
         resultado += this.tipo (imc, 18.5,24.9,29.9, 34.9, 39.9)
      } else if (masculino {
      resultado += this.tipo (imc, 17.8, 26.4, 30.6, 34.9, 39.9);
      } else {
        resultado += this.tipo (imc, 16.9,25.9, 30.7, 34.9, 39.9);
     }
    }      
    return resultado;    
   }   

    enviar() {
    let date = new Date().toISOString();
    date = date.replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
    let imc = this.calcular();
    if (imc) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
          method: "post",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify([[date,imc]])
      };
      fetch("<<link>>?tabId=Dados", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }
  }

        render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Calculadora de IMC
            </Typography>
            <TextField
              <FormControlLabel
                control={<Switch onChange={this.setMasculino} />}
label="Masculino"
/>
<FormControlLabel
control= {<Switch onChange= {this.setMaior} />}
label= "Maior de idade"
/>
           </FormGroup> 
           <TextField
            onChange={this.setPeso}
              margin="normal"
              required
              fullWidth
              id="peso"
              label="Peso"
              name="peso"
              type="number"
              InputProps={{
                startAdornment:
                  <InputAdornment position="start">kg</InputAdornment>,
              }}
            />
            <TextField
              onChange={this.setAltura}
              margin="normal"
              required
              fullWidth
              id="altura"
              label="Altura"
              name="altura"
              type="number"
              InputProps={{
                startAdornment:
                  <InputAdornment position="start">m</InputAdornment>,
              }}
            />
            <Typography component="h1" variant="h6">
              {this.resultado()}
            </Typography>
          </Box> 
          <Box
            sx = {{
             display: 'inline',
             alignItems: 'center',
           }}
          >
            <Button
              onClick={this.enviar}
              variantt='cointained'>
              Enviar
            </Button>
            <Button
              variant="contained">
              Relatório
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default function App() {
  return (
    <Imc />
  );
}

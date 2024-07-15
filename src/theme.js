import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { red, teal, deepOrange, cyan, orange } from '@mui/material/colors'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252'
        }
      }
    },
    dark: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    }
  },
  palette: {
    mode: 'light',
    primary: cyan,
    secondary: orange,
    error: {
      main: red.A400
    },
    text: {
      primary: '#333',
      secondary: 'red'
    }
  }
})

export default theme
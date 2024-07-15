import { Button, useColorScheme, useMediaQuery } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
// import useMediaQuery from '@mui/material/useMediaQuery'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const slectMode =event.target.value
    setMode(slectMode)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          onChange={handleChange}
          autoWidth
          label="Mode"
        >
          <MenuItem value="light">
            <div style={{ display: 'flex', alignItems: 'center', gap:'8px' }}>
              <LightModeIcon fontSize='small' /> Light
            </div>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
              <DarkModeIcon fontSize='small' /> Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
              <SettingsBrightnessIcon fontSize='small' /> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  // const preferDarkMode = useMediaQuery('(perfers-color-scheme: dark)')
  // const preferLightMode = useMediaQuery('(perfers-color-scheme: light)')

  return (
    <Button
      onClick={() => setMode(mode === 'light'? 'dark' : 'light')} > { mode === 'light' ? 'Turn dark' : 'Turn light' }
    </Button>
  )
}

function App() {

  return (
    <>
      <ModeSelect/>
      <hr/>
      <ModeToggle />
      <div>Let start</div>
      <Typography variant='body2' color="text.secondary">Hello world</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <AccessAlarmIcon />
      <ThreeDRotation />
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App

import { useColorScheme } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const slectMode =event.target.value
    setMode(slectMode)
  }

  return (
    <div>
      <FormControl size='small'>
        <InputLabel
          id="label-select-dark-light-mode"
          sx={{
            color: 'white',
            '&.Mui-focused': { borderColor: 'white' }
          }}
        >
          Mode
        </InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          onChange={handleChange}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '.MuiSvgIcon-root': {
              color: 'white'
            }
          }}
          autoWidth
          label="Mode"
        >
          <MenuItem value="light">
            <Box style={{ display: 'flex', alignItems: 'center', gap:'8px' }}>
              <LightModeIcon fontSize='small' /> Light
            </Box>
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

export default ModeSelect

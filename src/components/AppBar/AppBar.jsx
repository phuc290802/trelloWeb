import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpace from './Menus/WorkSpace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Template from './Menus/Template'
import { Button, TextField, Badge, InputAdornment } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        paddingX: 2,
        justifyContent: 'space-between',
        gap: 2,
        overflow: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap : 2 }}>
        <AppsIcon sx={{ color: 'white' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap : 0.5 }}>
          <SvgIcon component={TrelloIcon} fontSize="small" inheritViewBox sx={{ color: 'white' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }} >Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap :1 }}>
          <WorkSpace />
          <Recent />
          <Starred />
          <Template />
          <Button
            variant='outlined'
            startIcon={<AddToPhotosIcon/>}
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap : 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  fontSize='small'
                  sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
        />
        <ModeSelect />
        <Tooltip title='Notifications'>
          <Badge color="warning" variant='dot' sx={{ cursor: 'pointer', color: 'white' }}>
            <NotificationsIcon />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <Badge color="warning" variant='dot' sx={{ cursor: 'pointer', color: 'white' }}>
            <HelpOutlineIcon />
          </Badge>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar


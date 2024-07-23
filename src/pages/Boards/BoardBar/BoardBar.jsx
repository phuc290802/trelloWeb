import { Avatar, AvatarGroup, Button, Chip, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  }
}

function BoardBar({ board }) {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        height: theme.trello.boardBarHeight,
        display: 'flex',
        paddingX: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflow: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      })}
    >
      <Box>
        <Tooltip title={board?.description}>
          <Chip
            sx = {
              MENU_STYLES
            }
            icon={<DashboardIcon />}
            label={ board?.title }
            clickable
          />
        </Tooltip>
        <Chip
          sx = {
            MENU_STYLES
          }
          icon={<VpnLockIcon />}
          label= { capitalizeFirstLetter(board?.type) }
          clickable
        />
        <Chip
          sx = { MENU_STYLES }
          icon={ <AddToDriveIcon /> }
          label="Add to google drive"
          clickable
        />
        <Chip
          sx = { MENU_STYLES }
          icon={ <BoltIcon /> }
          label="Automation"
          clickable
        />
        <Chip
          sx = { MENU_STYLES }
          icon={ <FilterListIcon /> }
          label="Filters  "
          clickable
        />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2
      }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite</Button>
        <AvatarGroup
          max={6}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&.first-of-type': { bgcolor: '#a4b0be' }

            }
          }}
        >
          <Tooltip title="Mern stack">
            <Avatar alt="Remy Sharp" src="https://i.pinimg.com/736x/9e/a7/b5/9ea7b548bb35114bdd527eefbe40166e.jpg" />
          </Tooltip>
          <Tooltip title="Mern stack">
            <Avatar alt="Remy Sharp" src="https://i.pinimg.com/736x/6a/cf/02/6acf02953d3a39fb6f595675f9a4040c.jpg" />
          </Tooltip>
          <Tooltip title="Mern stack">
            <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvR3D7ZYuO86DXwCbuavpyW9McveEUVpio0w&s" />
          </Tooltip>
          <Tooltip title="Mern stack">
            <Avatar alt="Remy Sharp" src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

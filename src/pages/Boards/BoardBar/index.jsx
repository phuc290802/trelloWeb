import { Avatar, AvatarGroup, Button, Chip, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
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

function BoardBar() {
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
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        borderBottom: '1px solid white'
      })}
    >
      <Box>
        <Chip
          sx = {
            MENU_STYLES
          }
          icon={<DashboardIcon />}
          label="Mern stack"
          clickable
        />
        <Chip
          sx = {
            MENU_STYLES
          }
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
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
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Mern stack">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Mern stack">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Mern stack">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

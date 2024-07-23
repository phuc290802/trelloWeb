import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { mapOrder } from '~/utils/sorts'
function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })
  const dndKitCardStyle = {
    touchAction : 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '2.2px solid rgb(100,136,233)' : undefined
  }
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const orderedCards = mapOrder(card?.cards, card?.cardOrderIds, '_id')
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} /> }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography> { card?.title } </Typography>
      </CardContent>
      {shouldShowCardActions() &&
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.memberIds?.length}</Button>}
        {!!card?.comments?.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.comments?.length}</Button>}
        {!!card?.attachments?.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.attachments?.length}</Button>}
      </CardActions>
      }
    </MuiCard>
  )
}

export default Card
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  useSensor,
  useSensors,
  // MouseSensor,
  // TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'
import { useState, useEffect, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
import { generatePlaceholderCard } from '~/utils/formatters'
import Colum from './ListColumns/Colum/Colum'
import Card from './ListColumns/Colum/ListCards/Card/Card'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent( { 
  board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  deleteColumnDetails
} ) {
  // const pointerSensor = useSensor( PointerSensor, { activationConstraint: { distance: 10 } })
  // Ask the mouse to move 10 pixels to call event
  const mouseSensor = useSensor( MouseSensor, { activationConstraint: { distance: 10 } })
  //hold 250ms when using phone
  const touchSensor = useSensor( TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const sensors = useSensors( mouseSensor, touchSensor )

  const [orderedCloumns, setOrderCloumn] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDragging, setOldColumnWhenDragging] = useState(null)
  const lastOverID =useRef(null)


  useEffect(() => {
    setOrderCloumn(board.columns)
  }, [board])
  //Find columns by cardid
  const findColumnByCardId = (cardId) => {
    return orderedCloumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  // Function handle update state when move columns
  const moveCardBetweenDiffirentColumns = (
    activeColumn,
    overColumn,
    activeDraggingCardData,
    activeDraggingCardId,
    overCardId,
    active,
    over,
    triggerFrom
  ) => {
    setOrderCloumn(prevColumns => {
      //Finding overcard location
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length +1
      ///clone old OrderedColumnState
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        //
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //If column empty
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      if (nextOverColumn) {
        //
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // update cloumnId when drag end
        const rebuild_activeDraggingCardData ={
          ...activeDraggingCardData,
          columId: nextOverColumn._id
        }

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        //Delete PlaceholderCard
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      if (triggerFrom === 'handleDragEnd') {
        moveCardToDifferentColumn(activeDragItemId, oldColumnWhenDragging._id, nextOverColumn._id, nextColumns)
      }

      return nextColumns
    })
  }
  // Trigger when drag one item
  const handleDragStart = ( event ) => {
    setActiveDragItemId(event?.active.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    //If drag card action set value oldCloumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragging(findColumnByCardId(event?.active?.id))
    }
  }
  // Trigger while drag one item
  const handleDragOver = ( event ) => {
    // if drag column ,dont need do anything
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // Check active and over
    const { active, over } = event
    if ( !active || !over) return

    //assign activeDraggingCardData value as Card While Dragging
    const { id: activeDraggingCardId, data:{ current: activeDraggingCardData } } =active

    //overCardId is a card above and below the new card location
    const { id: overCardId } = over

    //Find two columns by cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    //if activeColumn is overColumn, dont need do anything
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDiffirentColumns( activeColumn,
        overColumn,
        activeDraggingCardData,
        activeDraggingCardId,
        overCardId,
        active,
        over,
        'handleDragOver'
      )
    }
  }
  // Trigger when end drag one item
  const handleDragEnd =( event ) => {
    // console.log('Drag end', event)
    const { active, over } = event

    if ( !over ) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data:{ current: activeDraggingCardData} } =active

      //overCardId is a card above and below the new card location
      const { id: overCardId } = over

      //Find two columns by cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      //if activeColumn is overColumn, dont need do anything
      if (!activeColumn || !overColumn) return
      //distinguish dragging column inside boardContent or ouside boardContent
      if (oldColumnWhenDragging._id !== overColumn._id) {
        moveCardBetweenDiffirentColumns( activeColumn,
          overColumn,
          activeDraggingCardData,
          activeDraggingCardId,
          overCardId,
          active,
          over,
          'handleDragEnd'
        )
      }
      else {
        const oldCardIndex = oldColumnWhenDragging?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex( c => c._id === overCardId )
        const dndOrderedCards = arrayMove( oldColumnWhenDragging?.cards, oldCardIndex, newCardIndex )
        const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

        setOrderCloumn(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDragging._id)
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      const oldColumnIndex = orderedCloumns.findIndex( c => c._id === activeDragItemId )
      const newColumnIndex = orderedCloumns.findIndex( c => c._id === over.id )
      //Using arrayMove by dnd-kit to sort
      const dndOrderedColumns = arrayMove( orderedCloumns, oldColumnIndex, newColumnIndex )
      setOrderCloumn(dndOrderedColumns)
      moveColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDragging(null)
  }
  const customDropAnimation ={
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  // Collision detection strategy (fix bug ảo ma)
  const collisionDetectionStrategy = useCallback(( args) => {

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerInterSections = pointerWithin(args)
    if (!pointerInterSections?.length) return
    // const interSections = !!pointerInterSections?.length
    //   ? pointerInterSections
    //   : rectIntersection(args)

    let overId = getFirstCollision(pointerInterSections, 'id')
    if (overId) {
      const checkColumn = orderedCloumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id))
        })[0]?.id
      }
      lastOverID.current = overId
      return [{ id: overId }]
    }
    return lastOverID.current ? [{ id: lastOverID.current }] : []
  }, [activeDragItemType])
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      //Collision detection algorithm
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns
          columns={orderedCloumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          { !activeDragItemType && null }
          { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Colum column={activeDragItemData} /> }
          { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} /> }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

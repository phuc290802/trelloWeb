import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { Box, CircularProgress } from '@mui/material'
// import { mockData } from '~/apis/mock-data'

function Board() {
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const boardId = '669e3085b81c8392800a247d'
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        //sort before value go to component child (fix bug when dragging card in column)
        board.columns = mapOrder( board.columns, board.columnOrderIds, '_id')
        board.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
          else {
          //sort before value go to component child (fix bug when dragging card in column)
            column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })
        setBoard(board)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Box sx={{
        height: '100vh',
        width: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const createNewColumn =async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    ///Create a [] card to fix (error drag)
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard ={ ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard =async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard ={ ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }
  //Call Api when dragged done
  const moveColumns = (dndOrderedColumns) => {
    // Update
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    // Gọi API update Board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    // updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })

  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {board ? (
        <>
          <BoardBar board={board} />
          <BoardContent
            board={board}
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
            moveColumns={moveColumns}
            moveCardInTheSameColumn={moveCardInTheSameColumn}
          />
        </>
      ) : (
        <p>No board data available</p>
      )}
    </Container>
  )
}

export default Board

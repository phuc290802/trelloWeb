import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return request.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return request.data
}
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return request.data
}


export const createNewColumnAPI = async (newColumnData) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return request.data
}

export const updateColumnDetailsAPI = async (coulmnId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${coulmnId}`, updateData)
  return request.data
}
export const deleteColumnDetailsAPI = async (coulmnId) => {
  const request = await axios.delete(`${API_ROOT}/v1/columns/${coulmnId}`)
  return request.data
}


export const createNewCardAPI = async (newCardData) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return request.data
}
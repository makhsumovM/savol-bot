export const getMyBest = async () => {
  try {
    const response = await api.get<IScore>('/marathon/my-best')
    return response.data || []
  } catch (error) {
    throw error || []
  }
}

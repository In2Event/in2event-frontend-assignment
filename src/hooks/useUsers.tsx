import { User } from '@/schemas/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const fetchUsers = async (limit = 10): Promise<Array<User>> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?perPage=${limit}`)
  const data = await response.json()
  return data
}

const useUsers = (limit: number) => {
  return useQuery({
    queryKey: ['users', limit],
    queryFn: () => fetchUsers(limit),
  })
}

const addNewUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  return response.json()
}

const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: Omit<User, 'id'> ) => addNewUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users']})

    },
  })
}
export { useUsers, useAddUser}
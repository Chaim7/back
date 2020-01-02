import Axios from 'axios'

export const signUp = (data) => {
   return Axios.post('/sign-up',data)
}

export const signIn = (data) => {
    return Axios.post('/sign-in',data)
}
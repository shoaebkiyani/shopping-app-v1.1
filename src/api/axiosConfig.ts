import axios from 'axios'
import { getTokenFromStorage } from '../token/token';

const token = getTokenFromStorage();
export const authHeader = {    
    headers: { Authorization: token ? `Bearer ${token}` : '' }
}
export default axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})
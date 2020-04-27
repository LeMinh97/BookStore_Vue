import axios from 'axios';
import { authHeader } from '../_helpers';

const baseURL="http://localhost:4000";
export default axios.create({
    baseURL,
    headers: authHeader()
})
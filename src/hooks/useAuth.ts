import { useContext } from 'react';
import { AuthContext} from '../contexts/Auth.Context'

export function useAuth () {
    const value = useContext(AuthContext)

    return value;
}
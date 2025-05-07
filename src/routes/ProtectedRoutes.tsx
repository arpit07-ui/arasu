
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}:any) => {
    const {token}= useSelector((state:any) => state.auth);
    if(!token){
        return <Navigate to="/" />;
    }
  return (
    <>
    {children};
    </>
  )
}

export default ProtectedRoutes

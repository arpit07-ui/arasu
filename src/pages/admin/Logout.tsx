
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
  return (
    <div onClick={()=>{
        navigate("/");
        dispatch(logout());
        
    }} className="p-4">
      <h1 className="text-xl font-bold">Logging Out...</h1>
    </div>
  )
}

export default Logout

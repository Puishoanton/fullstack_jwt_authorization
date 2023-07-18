import { useEffect, useState } from 'react'
import FormContainer from './components/FormContainer'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import {
  checkAuthAction,
  getUsersAction,
  loginAction,
  logoutAction,
  registerAction,
} from './store/reducers/ActionCreators'

function App() {
  const dispatch = useAppDispatch()
  const { user, isAuth } = useAppSelector(store => store.authSlice)
  const { users } = useAppSelector(store => store.usersSlice)

  const [email, setEmail] = useState('')
  const [password, setPaswword] = useState('')
  // const [usersList, setUsersList] = useState<TUser[]>([])

  const registerHandler = () => {
    dispatch(registerAction({ email, password }))
  }
  const loginHandler = () => {
    dispatch(loginAction({ email, password }))
  }
  const logoutHandler = () => {
    dispatch(logoutAction())
  }
  const getUsersList = () => {
    dispatch(getUsersAction())
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuthAction())
    }
  }, [])

  return (
    <div>
      <h1>{isAuth ? `Success authorization for ${user.user.email}` : 'Unauthorized user'}</h1>
      {isAuth ? (
        <div>
          {users && users.map(user => <div key={user.id}>{user.email}</div>)}
          <button
            onClick={() => {
              logoutHandler()
            }}>
            logout
          </button>
          <button
            onClick={() => {
              getUsersList()
            }}>
            Get users
          </button>
        </div>
      ) : (
        <div>
          <FormContainer
            email={email}
            setEmail={setEmail}
            password={password}
            setPaswword={setPaswword}
            registerHandler={registerHandler}
            loginHandler={loginHandler}
          />
        </div>
      )}
    </div>
  )
}

export default App

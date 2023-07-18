import { FC } from 'react'

type Props = {
  email: string
  password: string
  setEmail: (email: string) => void
  setPaswword: (password: string) => void
  registerHandler: () => void
  loginHandler: () => void
}

const FormContainer: FC<Props> = ({
  email,
  setEmail,
  password,
  setPaswword,
  registerHandler,
  loginHandler,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '200px',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
        <div>
          <label>email: </label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>password: </label>
          <input type='password' value={password} onChange={e => setPaswword(e.target.value)} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}>
          <button
            onClick={() => {
              registerHandler()
            }}>
            register
          </button>
          <button
            onClick={() => {
              loginHandler()
            }}>
            login
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormContainer

import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useUser } from "../features/authentication/useUser"
import Spinner from "../ui/Spinner"

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProtectedRout({ children }) {
  const { isLoading, isAuthenticated } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login")
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  if (isAuthenticated) return children
}

export default ProtectedRout

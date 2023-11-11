import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { signup as signupApi } from "../../services/apiAuth"

export const useSignup = () => {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the new account from user's email"
      )
    },
  })

  return { isLoading, signup }
}

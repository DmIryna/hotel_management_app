import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { createUpdateCabin } from "../../services/apiCabins"

export const useCreateCabin = () => {
  const queryClient = useQueryClient()
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      })

      toast.success("New cabin successfully created")
    },
    onError: (err) => toast.error(err.message),
  })

  return { isCreating, createCabin }
}

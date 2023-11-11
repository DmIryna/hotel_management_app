import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { createUpdateCabin } from "../../services/apiCabins"

export const useEditCabin = () => {
  const queryClient = useQueryClient()
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      })

      toast.success("New cabin successfully updated")
    },
    onError: (err) => toast.error(err.message),
  })

  return { isEditing, editCabin }
}

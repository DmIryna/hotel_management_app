import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { updateSetting as updateSettingApi } from "../../services/apiSettings"

export const useUpdateSetting = () => {
  const queryClient = useQueryClient()
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (newSettings) => updateSettingApi(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] })
      toast.success("Setting successfully updated")
    },
    onError: (err) => toast.error(err.message),
  })

  return { isUpdating, updateSetting }
}

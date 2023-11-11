import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants"
import { getAllBookings } from "../../services/apiBookings"

export const useBookings = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  //Filter
  const filteredValue = searchParams.get("status")
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue }

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
  const [field, direction] = sortByRaw.split("-")
  const sortBy = { field, direction }

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  })

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE)

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
    })

  return { isLoading, bookings, error, count }
}

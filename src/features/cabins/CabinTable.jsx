import { useSearchParams } from "react-router-dom"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import Menus from "../../ui/Menus"
import Empty from "../../ui/Empty"
import Cabinrow from "./CabinRow"
import { useCabins } from "./useCabins"

function CabinTable() {
  const { cabins, isLoading } = useCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />
  if (!cabins.length) return <Empty resource="cabins" />

  const filteredValue = searchParams.get("discount") || "all"

  let filteredCabins
  if (filteredValue === "all") filteredCabins = cabins

  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0)

  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0)

  const sortBy = searchParams.get("sortBy") || "name-asc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1

  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  )

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div style={{ textAlign: "center" }}>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins || filteredCabins}
          render={(cabin) => <Cabinrow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable

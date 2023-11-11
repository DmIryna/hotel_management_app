import {
  HiOutlineBriefcase,
  HiOutlineCash,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi"
import Stat from "./Stat"
import { formatCurrency } from "../../utils/helpers"

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  const numBookings = bookings.length
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  const checkins = confirmedStays.length
  const occupation =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (cabinCount * numDays)) *
    100

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineCash />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendar />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={Math.round(occupation) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  )
}

export default Stats

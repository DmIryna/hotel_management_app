import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Row from "../../ui/Row"
import Heading from "../../ui/Heading"
import ButtonGroup from "../../ui/ButtonGroup"
import Button from "../../ui/Button"
import ButtonText from "../../ui/ButtonText"
import Spinner from "../../ui/Spinner"
import Checkbox from "../../ui/Checkbox"
import BookingDataBox from "../../features/bookings/BookingDataBox"
import { useMoveBack } from "../../hooks/useMoveBack"
import { useSingleBooking } from "../bookings/useSingleBooking"
import { formatCurrency } from "../../utils/helpers"
import { useCheckin } from "./useCheckin"
import { useSettings } from "../settings/useSettings"

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)

  const moveBack = useMoveBack()
  const { bookingId } = useParams()
  const { booking, isLoading } = useSingleBooking(bookingId)
  const { checkin, isCheckingIn } = useCheckin()
  const { settings, isLoading: isLoadingSettings } = useSettings()

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking])

  if (isLoading || isLoadingSettings) return <Spinner />

  const { guests, totalPrice, numGuests, hasBreakfast, numNights } = booking
  const optionalBreakfast = settings.breakfastPrice * numGuests * numNights

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add)
              setConfirmPaid(false)
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfast)} (
                ${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast
              )}
              )`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking

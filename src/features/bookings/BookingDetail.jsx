import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { HiInboxIn, HiOutlineLogout } from "react-icons/hi"
import Row from "../../ui/Row"
import Tag from "../../ui/Tag"
import ButtonGroup from "../../ui/ButtonGroup"
import Button from "../../ui/Button"
import ButtonText from "../../ui/ButtonText"
import Spinner from "../../ui/Spinner"
import Heading from "../../ui/Heading"
import Empty from "../../ui/Empty"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"
import BookingDataBox from "./BookingDataBox"
import { useSingleBooking } from "./useSingleBooking"
import { useMoveBack } from "../../hooks/useMoveBack"
import { useCheckout } from "../check-in-out/useCheckout"
import { useDeleteBooking } from "./useDeleteBooking"

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const navigate = useNavigate()
  const { booking, isLoading } = useSingleBooking()
  const moveBack = useMoveBack()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeletingBooking } = useDeleteBooking()

  if (isLoading) return <Spinner />
  if (!booking) return <Empty resource="booking" />

  const { status, id: bookingId } = booking

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>

        {status === "unconfirmed" && (
          <Button
            icon={<HiInboxIn />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiOutlineLogout />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUI } from "../../context/useUI";
import bookingService from "../../services/bookingService";

export default function BookingPage() {
  const { roomId } = useParams();
  const { showAlert } = useUI();
  const [v, setV] = useState({ checkIn: "", checkOut: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (new Date(v.checkOut) <= new Date(v.checkIn)) return showAlert("Invalid dates", "danger");
    try {
      await bookingService.createBooking({ roomId, checkIn: v.checkIn, checkOut: v.checkOut });
      showAlert("Booking created");
    } catch (err) {
      showAlert(err.response?.data?.message || err.message, "danger");
    }
  };

  return <div className="card border-0 shadow-sm"><div className="card-body"><h4>Book Room</h4><form onSubmit={submit}><div className="row g-2"><div className="col-md-6"><input className="form-control" type="date" required value={v.checkIn} onChange={(e) => setV({ ...v, checkIn: e.target.value })} /></div><div className="col-md-6"><input className="form-control" type="date" required value={v.checkOut} onChange={(e) => setV({ ...v, checkOut: e.target.value })} /></div></div><button className="btn btn-primary mt-3">Confirm</button></form></div></div>;
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import roomService from "../../services/roomService";
import { currency } from "../../utils/helpers";

export default function RoomDetailsPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => { roomService.getRoomById(roomId).then(setRoom).catch((e) => setErr(e.response?.data?.message || e.message)); }, [roomId]);

  if (err) return <div className="alert alert-danger">{err}</div>;
  if (!room) return <div className="alert alert-info">Loading room...</div>;

  return <div className="card border-0 shadow-sm"><div className="card-body"><h4>{room.roomNo}</h4><p>{room.type}</p><p>{currency(room.price)} / night</p><p>Status: {room.status}</p><Link className="btn btn-primary" to={`/customer/book/${room._id}`}>Book now</Link></div></div>;
}

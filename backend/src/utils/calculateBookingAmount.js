const calculateBookingAmount = (pricePerNight, checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;
    return nights * pricePerNight;
  };
  
  export default calculateBookingAmount;
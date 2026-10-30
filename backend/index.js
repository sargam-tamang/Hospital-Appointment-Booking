const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const doctors = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiology" },
  { id: 2, name: "Dr. James Patel", specialty: "Dermatology" },
  { id: 3, name: "Dr. Maya Lopez", specialty: "Pediatrics" },
];

const appointments = [
  {
    id: 1,
    doctorId: 1,
    patientName: "Alex Rivera",
    date: "2026-11-04",
    time: "10:00",
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Hospital Appointment Booking API",
    endpoints: {
      health: "GET /health",
      doctors: "GET /doctors",
      appointments: "GET /appointments",
      createAppointment: "POST /appointments",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/doctors", (req, res) => {
  res.json(doctors);
});

app.get("/appointments", (req, res) => {
  res.json(appointments);
});

app.post("/appointments", (req, res) => {
  const { doctorId, patientName, date, time } = req.body;

  if (!doctorId || !patientName || !date || !time) {
    return res.status(400).json({
      error: "doctorId, patientName, date, and time are required",
    });
  }

  const doctor = doctors.find((item) => item.id === Number(doctorId));
  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  const appointment = {
    id: appointments.length + 1,
    doctorId: Number(doctorId),
    patientName,
    date,
    time,
  };

  appointments.push(appointment);
  res.status(201).json(appointment);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});


/*
const db = require("../firebaseConfig");
const sendEmail = require("../utils/emailService");
const { v4: uuidv4 } = require("uuid");

const registerStudent = async (req, res) => {
  try {
    const { name, email, className, registrationId } = req.body;

    if (!name || !email || !className || !registrationId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const id = uuidv4();
    const studentData = {
      id,
      name,
      email,
      className,
      registrationId,
      registeredAt: new Date().toISOString()
    };

    // Realtime Database set
    await db.ref("students/" + id).set(studentData);

    // Confirmation email send
    await sendEmail(studentData);

    res.status(201).json({ message: "Student registered successfully!", student: studentData });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { registerStudent };
*/

const db = require("../firebaseConfig");
const sendEmail = require("../utils/emailService");
const { v4: uuidv4 } = require("uuid");

const registerStudent = async (req, res) => {
  try {
    const { name, email, className } = req.body;

    // Validate input
    if (!name || !email || !className) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Auto-generate unique IDs
    const id = uuidv4();
    const registrationId = `REG-${Math.floor(100000 + Math.random() * 900000)}`; // Ex: REG-349012

    const studentData = {
      id,
      name,
      email,
      className,
      registrationId,
      registeredAt: new Date().toISOString()
    };

    // Save to Firebase Realtime Database
    await db.ref("students/" + id).set(studentData);

    // Send confirmation email
    await sendEmail(studentData);

    res.status(201).json({ message: "Student registered successfully!", student: studentData });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { registerStudent };

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Program from "./models/Program.js";
import Participant from "./models/Participant.js";
import OutcomeRecord from "./models/OutcomeRecord.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB...");

  // Clear existing data
  await Promise.all([
    User.deleteMany(),
    Project.deleteMany(),
    Program.deleteMany(),
    Participant.deleteMany(),
    OutcomeRecord.deleteMany(),
  ]);

  // Users
  const admin = await User.create({
    name: "Sarah Admin",
    email: "sarah@impactos.org",
    password: "Admin123!",
    role: "ADMIN",
    status: "ACTIVE",
  });
  const staff = await User.create({
    name: "James Staff",
    email: "james@impactos.org",
    password: "Staff123!",
    role: "STAFF",
    status: "ACTIVE",
  });
  const viewer = await User.create({
    name: "Maria Viewer",
    email: "maria@impactos.org",
    password: "Viewer123!",
    role: "VIEWER",
    status: "ACTIVE",
  });

  // Projects
  const project1 = await Project.create({
    name: "Youth Education Initiative",
    description: "Improving literacy rates in underserved communities",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-12-31"),
    goals: "80% literacy improvement",
    status: "ACTIVE",
    teamMembers: [admin._id, staff._id],
  });
  const project2 = await Project.create({
    name: "Women Empowerment Program",
    description: "Economic empowerment through skill-building workshops",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2025-02-28"),
    goals: "200 women trained",
    status: "ACTIVE",
    teamMembers: [staff._id],
  });
  const project3 = await Project.create({
    name: "Clean Water Access",
    description: "Providing sustainable clean water to rural villages",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2024-05-31"),
    goals: "5 villages served",
    status: "COMPLETED",
    teamMembers: [admin._id],
  });

  // Programs
  const prog1 = await Program.create({
    name: "Literacy Track",
    projectId: project1._id,
  });
  const prog2 = await Program.create({
    name: "Skills Track",
    projectId: project2._id,
  });
  const prog3 = await Program.create({
    name: "Water Access",
    projectId: project3._id,
  });

  // Participants
  const p1 = await Participant.create({
    fullName: "Amara Diallo",
    age: 19,
    gender: "Female",
    programId: prog1._id,
    baselineScore: 42,
    email: "amara@email.com",
    phone: "+31 6 1234 5678",
    status: "ACTIVE",
  });
  const p2 = await Participant.create({
    fullName: "Fatima Malik",
    age: 31,
    gender: "Female",
    programId: prog1._id,
    baselineScore: 38,
    email: "fatima@email.com",
    status: "COMPLETED",
  });
  const p3 = await Participant.create({
    fullName: "Kwame Asante",
    age: 24,
    gender: "Male",
    programId: prog2._id,
    baselineScore: 55,
    email: "kwame@email.com",
    status: "ACTIVE",
  });
  const p4 = await Participant.create({
    fullName: "Priya Sharma",
    age: 27,
    gender: "Female",
    programId: prog2._id,
    baselineScore: 45,
    email: "priya@email.com",
    status: "ACTIVE",
  });
  const p5 = await Participant.create({
    fullName: "David Osei",
    age: 22,
    gender: "Male",
    programId: prog3._id,
    baselineScore: 60,
    email: "david@email.com",
    status: "ACTIVE",
  });

  // Outcome Records
  const sessions = [
    { participant: p1, scores: [44, 51, 58, 65, 68] },
    { participant: p2, scores: [41, 49, 58, 70, 82] },
    { participant: p3, scores: [57, 62, 66, 71] },
    { participant: p4, scores: [48, 55, 63, 71, 79] },
    { participant: p5, scores: [63, 67, 72, 74] },
  ];

  for (const { participant, scores } of sessions) {
    for (let i = 0; i < scores.length; i++) {
      await OutcomeRecord.create({
        participantId: participant._id,
        currentScore: scores[i],
        progressNotes: `Session ${i + 1} — steady progress noted.`,
        recordedAt: new Date(
          Date.now() - (scores.length - i) * 7 * 24 * 60 * 60 * 1000,
        ),
      });
    }
  }

  console.log("✓ Seed complete");
  console.log("Admin:  sarah@impactos.org / Admin123!");
  console.log("Staff:  james@impactos.org / Staff123!");
  console.log("Viewer: maria@impactos.org / Viewer123!");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

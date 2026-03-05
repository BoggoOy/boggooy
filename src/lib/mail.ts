import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ContactMailOptions {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export async function sendContactEmail(data: ContactMailOptions) {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.projectType ? `Project Type: ${data.projectType}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
    "",
    "Message:",
    data.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  await transporter.sendMail({
    from: `"Boggo Contact Form" <${process.env.SMTP_FROM ?? "hello@boggo.fi"}>`,
    to: process.env.CONTACT_EMAIL ?? "hello@boggo.fi",
    replyTo: data.email,
    subject: `New inquiry from ${data.name}`,
    text: lines,
  });
}

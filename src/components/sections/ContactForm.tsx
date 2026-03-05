"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const projectTypes = [
  "Web Application",
  "Mobile App",
  "Design System",
  "IT Consulting",
  "Other",
];

const budgetRanges = [
  "Under €5,000",
  "€5,000 – €15,000",
  "€15,000 – €50,000",
  "€50,000+",
  "Not sure yet",
];

const timelines = ["ASAP", "1–2 months", "3–6 months", "6+ months", "No rush"];

const inputClasses =
  "w-full border border-neutral-200 rounded-none px-4 py-3 fluid-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-white";
const labelClasses =
  "block fluid-xs uppercase tracking-widest text-neutral-500 mb-2";
const selectClasses =
  "w-full border border-neutral-200 rounded-none px-4 py-3 fluid-sm text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors bg-white appearance-none cursor-pointer";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-16">
        <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="fluid-h3 font-semibold text-neutral-900 mb-2">
          Message sent!
        </h3>
        <p className="fluid-sm text-neutral-500 max-w-xs">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="fluid-sm text-neutral-500 mb-2">
        Tell us about your project and we&apos;ll get back to you within 24
        hours.
      </p>

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className={labelClasses}>
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
          className={inputClasses}
        />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className={labelClasses}>
          Project type
        </label>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className={labelClasses}>
            Budget range
          </label>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="">Select budget</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClasses}>
            Timeline
          </label>
          <div className="relative">
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="">Select timeline</option>
              {timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          Project details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project, goals, and any specific requirements..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-neutral-900 text-white fluid-xs uppercase tracking-widest px-8 py-4 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      {status === "error" && (
        <p className="fluid-xs text-red-500 text-center">
          Something went wrong. Please try again or email us directly at{" "}
          <a href="mailto:hello@boggo.fi" className="underline">
            hello@boggo.fi
          </a>
        </p>
      )}
    </form>
  );
}

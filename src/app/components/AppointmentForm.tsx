"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

interface AppointmentFormProps {
  itemId: string;
}

export default function AppointmentForm({ itemId }: AppointmentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Enforce login for setting up an appointment
      if (!user) {
        setMessage("You must be logged in to schedule an appointment.");
        setLoading(false);
        router.push("/login");
        return;
      }

      const appointmentData = {
        userId: user.uid,
        userEmail: user.email, // optional: store user email from auth
        itemId,
        name,
        email,
        phone,
        date,
      };

      const docRef = await addDoc(
        collection(db, "appointments"),
        appointmentData
      );
      console.log("Document written with ID: ", docRef.id);
      setSuccess(true);
      setMessage("We'll contact you as soon as possible to set up a meeting.");
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage("Failed to schedule appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Make an Appointment</h2>
      {success ? (
        <div className="p-4 bg-green-100 text-green-800 rounded">{message}</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="mt-1 block text-black w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
              className="mt-1 text-black block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+93700000000"
              className="mt-1 text-black block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Preferred Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 text-black block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Loading..." : "Ask for Appointment"}
          </button>
          {message && !success && (
            <p className="text-red-600 mt-2">{message}</p>
          )}
        </form>
      )}
    </div>
  );
}

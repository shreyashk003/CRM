"use client";

import { useEffect, useState } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyId: ""
  });

  useEffect(() => {
    fetch("/api/contacts").then(res => res.json()).then(setContacts);
    fetch("/api/companies").then(res => res.json()).then(setCompanies);
  }, []);

  const submit = async () => {
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    location.reload();
  };

  return (
    <div>
      <h1>Contacts</h1>

      <h3>Add Contact</h3>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />

      <select onChange={e => setForm({ ...form, companyId: e.target.value })}>
        <option value="">Select Company</option>
        {companies.map((c: any) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <button onClick={submit}>Add</button>

      <ul>
        {contacts.map((c: any) => (
          <li key={c._id}>
            {c.name} — {c.company.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    value: "",
    stage: "lead",
    companyId: ""
  });

  useEffect(() => {
    fetch("/api/deals").then(res => res.json()).then(setDeals);
    fetch("/api/companies").then(res => res.json()).then(setCompanies);
  }, []);

  const submit = async () => {
    await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    location.reload();
  };

  return (
    <div>
      <h1>Deals</h1>

      <h3>Add Deal</h3>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Value" onChange={e => setForm({ ...form, value: e.target.value })} />

      <select onChange={e => setForm({ ...form, stage: e.target.value })}>
        <option value="lead">Lead</option>
        <option value="qualified">Qualified</option>
        <option value="proposal">Proposal</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>

      <select onChange={e => setForm({ ...form, companyId: e.target.value })}>
        <option value="">Select Company</option>
        {companies.map((c: any) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <button onClick={submit}>Add</button>

      <ul>
        {deals.map((d: any) => (
          <li key={d._id}>
            {d.title} — {d.company.name} — {d.stage}
          </li>
        ))}
      </ul>
    </div>
  );
}

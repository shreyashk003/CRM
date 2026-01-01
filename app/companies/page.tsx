async function getCompanies() {
  const res = await fetch("http://localhost:3000/api/companies", {
    cache: "no-store",
  });
  return res.json();
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Companies</h1>

      <ul>
        {companies.map((company: any) => (
          <li key={company._id}>
            {company.name} — {company.industry}
          </li>
        ))}
      </ul>
    </div>
  );
}

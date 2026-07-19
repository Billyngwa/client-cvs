import type { CustomerCV } from "@/data/customers";

interface CVProps {
  customer: CustomerCV;
}

export function CV({ customer }: CVProps) {
  return (
    <article id="cv-content" className="cv">
      <header className="cv-header">
        {customer.photo && (
          <div className="cv-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customer.photo}
              alt={customer.name}
              width={96}
              height={120}
            />
          </div>
        )}
        <div className="cv-header-content">
          <h1>{customer.name}</h1>
          <div className="cv-contact">
            <p>
              <strong>Address:</strong> {customer.address}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${customer.email}`}>{customer.email}</a>
            </p>
            {customer.linkedin && (
              <p>
                <strong>LinkedIn:</strong> {customer.linkedin}
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="cv-section">
        <h2>Summary</h2>
        <p>{customer.summary}</p>
      </section>

      <section className="cv-section">
        <h2>Work Experience</h2>
        {customer.experience.map((job) => (
          <div key={`${job.company}-${job.role}`} className="cv-job">
            <div className="cv-job-header">
              <h3>
                {job.role}, {job.company}
              </h3>
              <span className="cv-period">{job.period}</span>
            </div>
            <ul className="cv-responsibilities">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2>Education</h2>
        {customer.education.map((entry) => (
          <div key={entry.degree} className="cv-education">
            <div className="cv-job-header">
              <h3>{entry.degree}</h3>
              <span className="cv-period">Graduated: {entry.graduated}</span>
            </div>
            <ul className="cv-responsibilities">
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2>Achievements</h2>
        <ul className="cv-responsibilities">
          {customer.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="cv-section">
        <h2>Additional Information</h2>
        {customer.additionalInfo.map((item) => (
          <p key={item.label} className="cv-additional">
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
      </section>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { customers } from "@/data/customers";

export function CustomerList() {
  return (
    <ul className="customer-list">
      {customers.map((customer) => (
        <li key={customer.slug}>
          <Link href={`/cv/${customer.slug}`} className="customer-card">
            {customer.photo && (
              <Image
                src={customer.photo}
                alt={customer.name}
                width={64}
                height={80}
                className="customer-card-photo"
              />
            )}
            <div>
              <h2>{customer.name}</h2>
              <p>{customer.title}</p>
              <span className="customer-card-link">View CV →</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import Link from "next/link";

export default function BrochurePage() {
  return (
    <main style={{ padding: "120px 24px 60px", maxWidth: 840, margin: "0 auto" }}>
      <h1>Product Brochure</h1>
      <p>Download the latest Invent Elevator brochure or contact our team for a custom proposal.</p>
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <a href="/brochure.pdf" download>
          Download brochure (PDF)
        </a>
        <Link href="/contact">Talk to sales</Link>
      </div>
    </main>
  );
}

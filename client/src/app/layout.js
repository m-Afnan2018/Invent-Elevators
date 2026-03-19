import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "Invent Elevator | Premium Vertical Mobility",
    template: "%s | Invent Elevator",
  },
  description:
    "Invent Elevator designs, installs, and supports premium residential and commercial lift systems with modern digital service experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#102239",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { signup } from "@/services/auth.service";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await signup({
        fullName: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Account created. Wait for admin approval before signing in.");
      router.push("/login?registered=1");
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Create Account</h1>
          <p>Request access to the Invent Elevator operations workspace.</p>
        </div>

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" name="name" required placeholder="John Doe" onChange={handleChange} value={form.name} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required placeholder="you@example.com" onChange={handleChange} value={form.email} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input id="password" type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••" onChange={handleChange} value={form.password} minLength={6} />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className={styles.toggle} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required placeholder="••••••••" onChange={handleChange} value={form.confirmPassword} minLength={6} />
              <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} className={styles.toggle} aria-label={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}>
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className={styles.forgot}>
            <Link href="/forgot-password">Already requested access? Reset your password</Link>
          </div>

          <button className={styles.registerBtn} disabled={loading}>
            {loading ? "Creating Account..." : "Request Access"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

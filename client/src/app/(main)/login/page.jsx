"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useAuthStore from "@/store/authStore";
import styles from "./login.module.css";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      toast.success("Your account request was submitted. Sign in after approval.");
    }
  }, [searchParams]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      toast.success("Login successful!");
      router.push("/admin/dashboard");
    } catch (error) {
      setPassword("");
      toast.error(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Login to manage products, projects, leads, and content.</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required placeholder="you@example.com" onChange={(event) => setEmail(event.target.value)} value={email} autoComplete="email" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required placeholder="••••••••" onChange={(event) => setPassword(event.target.value)} value={password} autoComplete="current-password" />
          </div>

          <div className={styles.footerLinks}>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          <button className={styles.loginBtn} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Don&apos;t have an account? <Link href="/register">Request access</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

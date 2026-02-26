"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
} from "react-icons/ri";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({ email, password });
      toast.success("Login successful!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Invalid email or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Login to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <RiMailLine className={styles.inputIcon} />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={errors.email ? styles.inputError : ""}
              />
            </div>
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <RiLockPasswordLine className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className={errors.password ? styles.inputError : ""}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <div className={styles.forgotPassword}>
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div>

          <button className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Login <RiArrowRightLine />
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

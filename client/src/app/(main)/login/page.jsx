"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";
import styles from "./login.module.css";
import toast from "react-hot-toast";

export default function Login() {
    const router = useRouter();

    const { login } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await login({ email, password });
            router.push("/admin/dashboard");
            toast.success("Login successful!");
        } catch (error) {
            setEmail('');
            setPassword('');
            console.error("Login error:", error);
            toast.error(error.message || "Invalid email or password");
        }

        setLoading(false);
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
                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <button className={styles.loginBtn} disabled={loading}>
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>
                        Don&apos;t have an account? <span onClick={() => router.push("/register")}>Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
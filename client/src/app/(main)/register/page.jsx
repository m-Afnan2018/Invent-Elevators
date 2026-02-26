"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { signup } from "@/services/auth.service";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";

export default function Register() {
    const router = useRouter();


    const { setUser } = useAuthStore();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                fullName: form.name,
                email: form.email,
                password: form.confirmPassword
            }

            console.log(payload)

            const response = await signup(payload);

            // Set user in store
            setUser(response.user || response.data);

            toast.success('Account created successfully!');
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    // const handleRegister = async (e) => {
    //     e.preventDefault();


    //     if (form.password !== form.confirmPassword) {
    //         alert("Passwords do not match");
    //         return;
    //     }

    //     setLoading(true);

    //     const payload = {
    //         fullName: form.name,
    //         email: form.email, 
    //         password: form.confirmPassword
    //     }

    //     console.log(payload);

    //     const response = await signup(payload);

    //     if(response.success){
    //         router.push('/admin');
    //     }

    //     // setTimeout(() => {
    //     //     setLoading(false);
    //     //     router.push("/dashboard");
    //     // }, 1200);
    //     // const response = await signup({ fullName: form.name, email: form.email, password: form.confirmPassword })

    //     console.log(response);
    // };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Create Account</h1>
                    <p>Register to get started</p>
                </div>

                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            onChange={handleChange}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.toggle}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className={styles.inputGroup}>
                        <label>Confirm Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <span
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className={styles.toggle}
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className={styles.forgot}>
                        <span onClick={() => router.push("/forgot-password")}>
                            Forgot Password?
                        </span>
                    </div>

                    <button className={styles.registerBtn} disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => router.push("/login")}>
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
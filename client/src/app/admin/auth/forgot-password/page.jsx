'use client'

import { useState } from 'react'
import styles from './forgot-password.module.css'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <p>We’ll send you a reset link</p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    )
}

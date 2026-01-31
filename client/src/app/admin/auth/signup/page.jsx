'use client'

import { useState } from 'react'
import styles from './signup.module.css'

export default function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault()

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSignup}>
                <h1>Admin Signup</h1>

                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

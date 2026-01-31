'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './reset-password.module.css'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const handleReset = async (e) => {
        e.preventDefault()

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password })
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleReset}>
                <h1>Reset Password</h1>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    )
}

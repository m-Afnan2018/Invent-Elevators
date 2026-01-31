'use client'

import { useState } from 'react'
import styles from './CategoryCreate.module.css'

export default function CategoryCreate() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
    })

    function handleChange(e) {
        const { name, value, files } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        // Later: send this to backend
        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('image', formData.image)

        console.log('Category Data:', {
            name: formData.name,
            description: formData.description,
            image: formData.image,
        })
    }

    return (
        <div className={styles.wrapper}>
            <h2>Create Category</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label>Category Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. Electronics"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Short description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <label>Category Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className={styles.btn}>
                    Create Category
                </button>
            </form>
        </div>
    )
}

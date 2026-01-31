'use client'

import { useState } from 'react'
import styles from './SubCategoryCreate.module.css'

export default function SubCategoryCreate() {
    const [data, setData] = useState({
        categoryId: '',
        name: '',
        description: '',
        image: null,
        status: 'active',
    })

    function handleChange(e) {
        const { name, value, files } = e.target
        setData(prev => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
    }

    return (
        <div className={styles.card}>
            <h3>Create Sub Category</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
                <select name="categoryId" onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="1">Electronics</option>
                    <option value="2">Furniture</option>
                </select>

                <input
                    name="name"
                    placeholder="Sub Category Name"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description (optional)"
                    onChange={handleChange}
                />

                <input type="file" name="image" onChange={handleChange} />

                <select name="status" onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button>Create Sub Category</button>
            </form>
        </div>
    )
}
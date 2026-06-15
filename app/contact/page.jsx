"use client"

import React, { useState } from 'react'

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || 'Submission failed')

            setStatus('success')
            setName('')
            setEmail('')
            setMessage('')
        } catch (err) {
            console.error(err)
            setStatus('error')
        }
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <section className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold mb-4">Contact Us</h1>
                <p className="text-gray-700 mb-6">Have a question, feedback, or want to sell with QuickCart? Send us a message and we'll get back to you within 2 business days.</p>

                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} name="message" rows="5" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"></textarea>
                    </div>

                    <div className="flex items-center justify-between">
                        <button disabled={status === 'loading'} type="submit" className="bg-indigo-600 disabled:opacity-60 text-white px-5 py-2 rounded-md hover:bg-indigo-700">{status === 'loading' ? 'Sending...' : 'Send Message'}</button>
                        <p className="text-sm text-gray-600">Or email us at <a href="mailto:support@quickcart.example" className="text-indigo-600">support@quickcart.example</a></p>
                    </div>

                    {status === 'success' && <p className="text-green-600">Thanks — your message has been sent.</p>}
                    {status === 'error' && <p className="text-red-600">Something went wrong. Please try again later.</p>}
                </form>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-md">
                        <h3 className="font-medium">Customer Support</h3>
                        <p className="text-sm text-gray-600">Mon-Fri, 9am–6pm</p>
                        <p className="text-sm mt-2">Phone: <a href="tel:+1234567890" className="text-indigo-600">+1 (234) 567-890</a></p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                        <h3 className="font-medium">Seller Inquiries</h3>
                        <p className="text-sm text-gray-600">Interested in selling? We'll help you get started.</p>
                        <p className="text-sm mt-2">Email: <a href="mailto:sellers@quickcart.example" className="text-indigo-600">sellers@quickcart.example</a></p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact

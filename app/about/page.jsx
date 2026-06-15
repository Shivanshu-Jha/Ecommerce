import React from 'react'

const About = () => {
    return (
        <main className="container mx-auto px-4 py-12">
            <section className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold leading-tight mb-4">About QuickCart</h1>
                <p className="text-lg text-gray-700">QuickCart is a small team on a big mission: make everyday shopping fast, reliable, and delightful. We design intuitive experiences, curate great products, and support sellers so customers can find what they need in moments.</p>
            </section>

            <section className="mt-12 grid gap-8 md:grid-cols-2 items-start">
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                    <p className="text-gray-700 mb-4">Deliver a simple, transparent shopping experience that connects local sellers with customers everywhere. We focus on speed, clear product information, and friendly support so you can shop confidently.</p>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                            <span className="inline-block bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3">✓</span>
                            <span>Curate quality products from trusted sellers.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3">✓</span>
                            <span>Make checkout fast and secure.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3">✓</span>
                            <span>Support sellers with tools that help them grow.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-3">Core Values</h3>
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <strong className="block">Customer first</strong>
                            <span className="text-sm">We build features that make shopping easier and more reliable.</span>
                        </div>
                        <div>
                            <strong className="block">Transparent pricing</strong>
                            <span className="text-sm">No surprises — clear costs and honest descriptions.</span>
                        </div>
                        <div>
                            <strong className="block">Support sellers</strong>
                            <span className="text-sm">Tools and fair policies to help small businesses thrive.</span>
                        </div>
                    </div>
                </div>
            </section>

            

            <section className="mt-12 text-center">
                <p className="text-gray-700 mb-4">Have questions or want to sell with us?</p>
                <a href="/contact" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Contact Us</a>
            </section>
        </main>
    )
}

export default About
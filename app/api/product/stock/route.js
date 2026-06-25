import connectDB from '@/config/db'
import authSeller from '@/lib/authSeller'
import Product from '@/models/Product'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PATCH(request) {
    try {
        await connectDB()

        const { userId } = getAuth(request)
        console.log('1. userId from Clerk:', userId)

        const isSeller = await authSeller(userId)
        console.log('2. isSeller:', isSeller)

        const { productId, stock } = await request.json()
        console.log('3. productId:', productId, '| stock:', stock)

        const parsedStock = Number(stock)
        console.log('4. parsedStock:', parsedStock)

        // Check what's actually in DB for this product
        const existing = await Product.findById(productId)
        console.log('5. existing product:', existing)
        console.log('6. userId match:', existing?.userId === userId)

        const product = await Product.findOneAndUpdate(
            { _id: productId, userId },
            { $set: { stock: parsedStock } },
            { new: true }
        )
        console.log('7. updated product:', product)

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found or unauthorized' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Stock updated successfully', product })

    } catch (error) {
        console.log('ERROR:', error.message)
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}

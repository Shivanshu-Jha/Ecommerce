'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from 'axios'
import toast from "react-hot-toast";

const ProductList = () => {

  const { router, getToken, user } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingProductId, setUpdatingProductId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [stockDraft, setStockDraft] = useState('')

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken()

      const { data } = await axios.get('/api/product/seller-list', { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        setProducts(data.products)
        setLoading(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user])

  const openStockModal = (product) => {
    setSelectedProduct(product)
    setStockDraft(String(product.stock ?? 0))
  }

  const closeStockModal = () => {
    setSelectedProduct(null)
    setStockDraft('')
  }

  const handleStockUpdate = async (event) => {
    event.preventDefault()

    if (!selectedProduct) return

    const parsedStock = Number(stockDraft)

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      toast.error('Stock count must be a non-negative whole number')
      return
    }

    try {
      setUpdatingProductId(selectedProduct._id)
      const token = await getToken()
      const { data } = await axios.patch('/api/product/stock', {
        productId: selectedProduct._id,
        stock: parsedStock,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        setProducts(prev => prev.map(item =>
          item._id === selectedProduct._id ? { ...item, stock: parsedStock } : item
        ))
        toast.success('Stock updated successfully')
        closeStockModal()
      } else {
        toast.error(data.message || 'Unable to update stock')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUpdatingProductId(null)
    }
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Product</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className=" table-fixed min-w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                <th className="px-4 py-3 font-medium truncate">
                  Price
                </th>
                <th className="px-4 py-3 font-medium truncate">Stock</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-gray-500/10 rounded p-2">
                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="truncate w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                  <td className="px-4 py-3">${product.offerPrice}</td>
                  <td className="px-4 py-3">{product.stock ?? 0}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openStockModal(product)}
                        disabled={updatingProductId === product._id}
                        className="px-3 py-2 bg-emerald-600 text-white rounded-md disabled:opacity-60"
                      >
                        {updatingProductId === product._id ? 'Updating...' : 'Stock'}
                      </button>
                      <button onClick={() => router.push(`/product/${product._id}`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md">
                        <span className="hidden md:block">Visit</span>
                        <Image
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Update Stock</h3>
            <p className="mt-1 text-sm text-gray-600">Set the available stock for {selectedProduct.name}</p>
            <form onSubmit={handleStockUpdate} className="mt-4 space-y-4">
              <input
                type="number"
                min="0"
                step="1"
                value={stockDraft}
                onChange={(e) => setStockDraft(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeStockModal}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingProductId === selectedProduct._id}
                  className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white disabled:opacity-60"
                >
                  {updatingProductId === selectedProduct._id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;
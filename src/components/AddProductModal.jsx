import React, { useState, useEffect } from 'react'
import { X, Save, Package } from 'lucide-react'

function AddProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    location: 'Migros',
    taste: 5,
    price: 0,
    size: 0,
    protein: 0,
    calories: 0,
    proteinPer100: 0,
    caloriesPer100: 0
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.brand || formData.price <= 0 || formData.protein <= 0) {
      alert('Please fill in all required fields')
      return
    }
    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const newValue = type === 'number' ? parseFloat(value) || 0 : value
    
    setFormData(prev => {
      const updated = { ...prev, [name]: newValue }
      
      // Auto-calculate per 100g values
      if (name === 'protein' || name === 'size') {
        if (updated.size > 0) {
          updated.proteinPer100 = ((updated.protein / updated.size) * 100).toFixed(1)
        }
      }
      if (name === 'calories' || name === 'size') {
        if (updated.size > 0) {
          updated.caloriesPer100 = Math.round((updated.calories / updated.size) * 100)
        }
      }
      
      return updated
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-gray-800 rounded-lg sm:rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="truncate">{product ? 'Edit Product' : 'Add Product'}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base placeholder-gray-400 focus:border-red-500 focus:outline-none"
                placeholder="e.g., High Protein Milk"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base placeholder-gray-400 focus:border-red-500 focus:outline-none"
                placeholder="e.g., Milbona"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Store Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:outline-none"
              >
                <option value="Migros">Migros</option>
                <option value="Coop">Coop</option>
                <option value="Lidl">Lidl</option>
                <option value="Aldi">Aldi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Taste Rating (1-10) *
              </label>
              <input
                type="number"
                name="taste"
                value={formData.taste}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Price (CHF) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Package Size (g) *
              </label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                min="0"
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                placeholder="e.g., 500"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Total Protein (g) *
              </label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                placeholder="0.0"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Total Calories *
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                min="0"
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-2">Auto-calculated Values</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-400">Protein per 100g:</span>
                <span className="ml-2 text-white font-medium">{formData.proteinPer100}g</span>
              </div>
              <div>
                <span className="text-gray-400">Calories per 100g:</span>
                <span className="ml-2 text-white font-medium">{formData.caloriesPer100}</span>
              </div>
              <div>
                <span className="text-gray-400">Protein per CHF:</span>
                <span className="ml-2 text-green-400 font-medium">
                  {formData.price > 0 ? (formData.protein / formData.price).toFixed(2) : '0.00'}g
                </span>
              </div>
              <div>
                <span className="text-gray-400">Smart Score:</span>
                <span className="ml-2 text-yellow-400 font-medium">
                  {formData.price > 0 ? (
                    (formData.protein / formData.price * 10) +
                    (formData.taste * 3) -
                    (formData.caloriesPer100 * 0.1)
                  ).toFixed(1) : '0.0'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm sm:text-base transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-2 transition"
            >
              <Save className="w-4 h-4" />
              {product ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
import React from 'react'
import { Edit, Trash2, Trophy, TrendingUp, Sparkles, MapPin, Package } from 'lucide-react'

function ProductCard({ product, onEdit, onDelete }) {
  const getScoreColor = (score) => {
    const numScore = parseFloat(score)
    if (numScore >= 100) return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
    if (numScore >= 80) return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
    if (numScore >= 60) return 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
    return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
  }

  const getTasteEmoji = (taste) => {
    if (taste >= 9) return '😍'
    if (taste >= 7) return '😊'
    if (taste >= 5) return '😐'
    if (taste >= 3) return '😕'
    return '😣'
  }

  const getLocationColor = (location) => {
    switch(location) {
      case 'Migros': return 'bg-orange-500 text-white'
      case 'Coop': return 'bg-red-500 text-white'
      case 'Lidl': return 'bg-blue-500 text-white'
      case 'Aldi': return 'bg-cyan-500 text-white'
      case 'Online': return 'bg-purple-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="bg-white rounded-xl p-5 hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border-2 border-gray-100 transform hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">{product.name}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{product.brand}</p>
        </div>
        <div className={`px-3 py-2 rounded-xl font-black text-lg sm:text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${getScoreColor(product.score)}`}>
          {product.score}
        </div>
      </div>

      <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-md transform group-hover:scale-110 transition-all duration-300 ${getLocationColor(product.location)}`}>
        <MapPin className="w-3 h-3" />
        {product.location}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 mb-1">
            <TrendingUp className="w-3 h-3" />
            <span>Value</span>
          </div>
          <p className="text-base sm:text-lg font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-lg inline-block">{product.proteinPerCHF}g</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Taste</span>
          </div>
          <p className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-1">
            {product.taste}/10 {getTasteEmoji(product.taste)}
          </p>
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Price</span>
          <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-lg inline-block">CHF {product.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Protein</span>
          <span className="text-gray-900">
            {product.protein}g <span className="text-gray-600 text-[10px] sm:text-xs">/ {product.size}g</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Calories</span>
          <span className="text-gray-900">
            {product.calories} <span className="text-gray-600 text-[10px] sm:text-xs">({product.caloriesPer100}/100g)</span>
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition border border-gray-300"
        >
          <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-700" />
          <span className="text-xs sm:text-sm text-gray-700">Edit</span>
        </button>
        <button
          onClick={() => {
            if (confirm('Delete this product?')) {
              onDelete(product.id)
            }
          }}
          className="flex-1 py-1.5 sm:py-2 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition border border-red-300"
        >
          <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-red-400" />
          <span className="text-xs sm:text-sm text-red-400">Delete</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
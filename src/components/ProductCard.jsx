import React from 'react'
import { Edit, Trash2, Trophy, TrendingUp, Sparkles, MapPin, Package } from 'lucide-react'

function ProductCard({ product, onEdit, onDelete }) {
  const getScoreColor = (score) => {
    const numScore = parseFloat(score)
    if (numScore >= 100) return 'text-green-400 bg-green-400/10'
    if (numScore >= 80) return 'text-yellow-400 bg-yellow-400/10'
    if (numScore >= 60) return 'text-orange-400 bg-orange-400/10'
    return 'text-red-400 bg-red-400/10'
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
      case 'Migros': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'Coop': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'Lidl': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Aldi': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 sm:p-5 hover:bg-gray-800/70 transition-all sm:hover:scale-[1.02] border border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-base sm:text-lg text-white mb-1">{product.name}</h3>
          <p className="text-xs sm:text-sm text-gray-400">{product.brand}</p>
        </div>
        <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold text-base sm:text-lg ${getScoreColor(product.score)}`}>
          {product.score}
        </div>
      </div>

      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium mb-4 border ${getLocationColor(product.location)}`}>
        <MapPin className="w-3 h-3" />
        {product.location}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="bg-gray-900/30 rounded-lg p-2 sm:p-3">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 mb-1">
            <TrendingUp className="w-3 h-3" />
            <span>Value</span>
          </div>
          <p className="text-base sm:text-lg font-semibold text-green-400">{product.proteinPerCHF}g</p>
        </div>
        <div className="bg-gray-900/30 rounded-lg p-2 sm:p-3">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Taste</span>
          </div>
          <p className="text-base sm:text-lg font-semibold text-white flex items-center gap-1">
            {product.taste}/10 {getTasteEmoji(product.taste)}
          </p>
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Price</span>
          <span className="text-yellow-400 font-medium">CHF {product.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Protein</span>
          <span className="text-white">
            {product.protein}g <span className="text-gray-500 text-[10px] sm:text-xs">/ {product.size}g</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Calories</span>
          <span className="text-white">
            {product.calories} <span className="text-gray-500 text-[10px] sm:text-xs">({product.caloriesPer100}/100g)</span>
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 py-1.5 sm:py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition"
        >
          <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400" />
          <span className="text-xs sm:text-sm text-blue-400">Edit</span>
        </button>
        <button
          onClick={() => {
            if (confirm('Delete this product?')) {
              onDelete(product.id)
            }
          }}
          className="flex-1 py-1.5 sm:py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition"
        >
          <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-red-400" />
          <span className="text-xs sm:text-sm text-red-400">Delete</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
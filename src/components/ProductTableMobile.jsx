import React from 'react'
import { Edit, Trash2, Trophy, TrendingUp, Sparkles, MapPin } from 'lucide-react'

function ProductTableMobile({ products, onEdit, onDelete }) {
  const getScoreColor = (score) => {
    const numScore = parseFloat(score)
    if (numScore >= 100) return 'from-green-400 to-emerald-400'
    if (numScore >= 80) return 'from-yellow-400 to-orange-400'
    if (numScore >= 60) return 'from-orange-400 to-red-400'
    return 'from-red-400 to-red-600'
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
      case 'Migros': return 'bg-orange-500/20 text-orange-300'
      case 'Coop': return 'bg-red-500/20 text-red-300'
      case 'Lidl': return 'bg-blue-500/20 text-blue-300'
      case 'Aldi': return 'bg-cyan-500/20 text-cyan-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-800/30 backdrop-blur rounded-xl p-4 border border-gray-700/30">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-white text-lg">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.brand}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${getLocationColor(product.location)}`}>
                <MapPin className="w-3 h-3" />
                {product.location}
              </span>
            </div>
            <div className={`bg-gradient-to-r ${getScoreColor(product.score)} text-white px-3 py-1.5 rounded-lg font-bold text-lg`}>
              {product.score}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gray-900/30 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-gray-400">Value</span>
              </div>
              <p className="text-sm font-semibold text-green-400">{product.proteinPerCHF}g</p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] text-gray-400">Taste</span>
              </div>
              <p className="text-sm font-semibold text-white">{product.taste}/10 {getTasteEmoji(product.taste)}</p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-2 text-center">
              <span className="text-[10px] text-gray-400 block">Price</span>
              <p className="text-sm font-semibold text-yellow-400">CHF {product.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>{product.protein}g protein / {product.size}g</span>
            <span>{product.calories} cal ({product.caloriesPer100}/100g)</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Edit className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Edit</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Delete this product?')) {
                  onDelete(product.id)
                }
              }}
              className="flex-1 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductTableMobile
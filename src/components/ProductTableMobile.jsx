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
      case 'Migros': return 'bg-orange-500 text-white shadow-orange-500/30 shadow-md'
      case 'Coop': return 'bg-red-500 text-white shadow-red-500/30 shadow-md'
      case 'Lidl': return 'bg-blue-500 text-white shadow-blue-500/30 shadow-md'
      case 'Aldi': return 'bg-cyan-500 text-white shadow-cyan-500/30 shadow-md'
      default: return 'bg-gray-500 text-white shadow-gray-500/30 shadow-md'
    }
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl p-4 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold mt-2 transform transition-all duration-300 hover:scale-110 ${getLocationColor(product.location)}`}>
                <MapPin className="w-3 h-3" />
                {product.location}
              </span>
            </div>
            <div className={`bg-gradient-to-r ${getScoreColor(product.score)} text-white px-4 py-2 rounded-xl font-black text-xl shadow-lg transform hover:scale-110 transition-all duration-300`}>
              {product.score}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-gray-400">Value</span>
              </div>
              <p className="text-sm font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-lg inline-block">{product.proteinPerCHF}g</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] text-gray-400">Taste</span>
              </div>
              <p className="text-sm font-black text-gray-900">{product.taste}/10 {getTasteEmoji(product.taste)}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-[10px] text-gray-400 block">Price</span>
              <p className="text-sm font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg inline-block">CHF {product.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
            <span>{product.protein}g protein / {product.size}g</span>
            <span>{product.calories} cal ({product.caloriesPer100}/100g)</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Edit className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-700">Edit</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Delete this product?')) {
                  onDelete(product.id)
                }
              }}
              className="flex-1 py-2 bg-red-50 hover:bg-red-100 border border-red-300 rounded-lg flex items-center justify-center gap-2 transition-all"
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
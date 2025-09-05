import React from 'react'
import { Edit, Trash2, Trophy, TrendingUp, Sparkles } from 'lucide-react'

function ProductTable({ products, onEdit, onDelete }) {
  const getScoreColor = (score) => {
    const numScore = parseFloat(score)
    if (numScore >= 100) return 'text-green-400'
    if (numScore >= 80) return 'text-yellow-400'
    if (numScore >= 60) return 'text-orange-400'
    return 'text-red-400'
  }

  const getTasteEmoji = (taste) => {
    if (taste >= 9) return '😍'
    if (taste >= 7) return '😊'
    if (taste >= 5) return '😐'
    if (taste >= 3) return '😕'
    return '😣'
  }

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full bg-gray-800/30 backdrop-blur-md rounded-xl overflow-hidden">
        <thead className="bg-gradient-to-r from-red-800/50 to-red-900/50 backdrop-blur">
          <tr>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-200">Product</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-200">Store</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-gray-200">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span>Score</span>
              </div>
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-gray-200">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Value</span>
              </div>
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-gray-200">
              <div className="flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Taste</span>
              </div>
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-gray-200">Price</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-gray-200">Protein</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-gray-200">Calories</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/30">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-700/40 transition-all duration-200 group">
              <td className="px-4 py-4">
                <div className="group-hover:translate-x-1 transition-transform duration-200">
                  <div className="font-medium text-white">{product.name}</div>
                  <div className="text-sm text-gray-400">{product.brand}</div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 group-hover:scale-105 ${
                  product.location === 'Migros' ? 'bg-orange-500/20 text-orange-300' :
                  product.location === 'Coop' ? 'bg-red-500/20 text-red-300' :
                  product.location === 'Lidl' ? 'bg-blue-500/20 text-blue-300' :
                  product.location === 'Aldi' ? 'bg-cyan-500/20 text-cyan-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {product.location}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`text-xl font-bold ${getScoreColor(product.score)} group-hover:scale-110 transition-transform duration-200 inline-block`}>
                  {product.score}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="text-green-400 font-semibold group-hover:text-green-300 transition-colors">
                  {product.proteinPerCHF}g
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-1 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-medium">{product.taste}/10</span>
                  <span className="text-lg">{getTasteEmoji(product.taste)}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="text-yellow-400 font-medium">CHF {product.price.toFixed(2)}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <div>
                  <div className="text-white font-medium">{product.protein}g</div>
                  <div className="text-xs text-gray-500">{product.size}g</div>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <div>
                  <div className="text-white">{product.calories}</div>
                  <div className="text-xs text-gray-500">{product.caloriesPer100}/100g</div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this product?')) {
                        onDelete(product.id)
                      }
                    }}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
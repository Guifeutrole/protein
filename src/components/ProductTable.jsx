import React from 'react'
import { Edit, Trash2, Trophy, TrendingUp, Sparkles } from 'lucide-react'

function ProductTable({ products, onEdit, onDelete }) {
  const getScoreColor = (score) => {
    const numScore = parseFloat(score)
    if (numScore >= 100) return 'text-green-600 bg-green-50 px-2 py-1 rounded-lg font-black'
    if (numScore >= 80) return 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg font-black'
    if (numScore >= 60) return 'text-orange-600 bg-orange-50 px-2 py-1 rounded-lg font-black'
    return 'text-red-600 bg-red-50 px-2 py-1 rounded-lg font-black'
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
      <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-red-600">
          <tr>
            <th className="px-4 py-4 text-left text-sm font-semibold text-white">Product</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-white">Store</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-white">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>Score</span>
              </div>
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-white">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span>Value</span>
              </div>
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-white">
              <div className="flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Taste</span>
              </div>
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-white">Price</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-white">Protein</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-white">Calories</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-white">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-0.5">
              <td className="px-4 py-4">
                <div className="group-hover:translate-x-2 transition-all duration-300 transform">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.brand}</div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 group-hover:scale-110 transform ${
                  product.location === 'Migros' ? 'bg-orange-500 text-white shadow-orange-500/30 shadow-lg' :
                  product.location === 'Coop' ? 'bg-red-500 text-white shadow-red-500/30 shadow-lg' :
                  product.location === 'Lidl' ? 'bg-blue-500 text-white shadow-blue-500/30 shadow-lg' :
                  product.location === 'Aldi' ? 'bg-cyan-500 text-white shadow-cyan-500/30 shadow-lg' :
                  'bg-gray-500 text-white shadow-gray-500/30 shadow-lg'
                }`}>
                  {product.location}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`text-xl ${getScoreColor(product.score)} group-hover:scale-125 transition-all duration-300 inline-block transform hover:rotate-3`}>
                  {product.score}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg group-hover:bg-green-100 transition-all duration-300">
                  {product.proteinPerCHF}g
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-1 group-hover:scale-110 transition-all duration-300 transform">
                  <span className="text-gray-900 font-medium">{product.taste}/10</span>
                  <span className="text-lg">{getTasteEmoji(product.taste)}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded-lg">CHF {product.price.toFixed(2)}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <div>
                  <div className="text-gray-900 font-medium">{product.protein}g</div>
                  <div className="text-xs text-gray-600">{product.size}g</div>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <div>
                  <div className="text-gray-900">{product.calories}</div>
                  <div className="text-xs text-gray-600">{product.caloriesPer100}/100g</div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Edit className="w-4 h-4 text-gray-700" />
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
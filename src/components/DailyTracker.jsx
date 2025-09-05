import React, { useState, useEffect } from 'react'
import { X, Plus, Target, TrendingUp, Check, Trash2 } from 'lucide-react'

function DailyTracker({ products, onClose }) {
  const [dailyGoal, setDailyGoal] = useState(() => {
    return parseInt(localStorage.getItem('dailyProteinGoal')) || 140
  })
  const [consumedProducts, setConsumedProducts] = useState(() => {
    const saved = localStorage.getItem('dailyConsumption')
    const savedDate = localStorage.getItem('consumptionDate')
    const today = new Date().toDateString()
    
    if (saved && savedDate === today) {
      return JSON.parse(saved)
    }
    return []
  })
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    localStorage.setItem('dailyProteinGoal', dailyGoal.toString())
  }, [dailyGoal])

  useEffect(() => {
    localStorage.setItem('dailyConsumption', JSON.stringify(consumedProducts))
    localStorage.setItem('consumptionDate', new Date().toDateString())
  }, [consumedProducts])

  const totalProtein = consumedProducts.reduce((sum, item) => sum + item.protein * item.quantity, 0)
  const totalCalories = consumedProducts.reduce((sum, item) => sum + item.calories * item.quantity, 0)
  const totalCost = consumedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const progress = Math.min((totalProtein / dailyGoal) * 100, 100)

  const addProduct = () => {
    if (!selectedProduct) return
    
    const product = products.find(p => p.id.toString() === selectedProduct)
    if (!product) return

    const existing = consumedProducts.find(c => c.id === product.id)
    if (existing) {
      setConsumedProducts(prev => prev.map(c => 
        c.id === product.id 
          ? { ...c, quantity: c.quantity + quantity }
          : c
      ))
    } else {
      setConsumedProducts(prev => [...prev, { ...product, quantity }])
    }
    
    setSelectedProduct('')
    setQuantity(1)
  }

  const removeProduct = (id) => {
    setConsumedProducts(prev => prev.filter(c => c.id !== id))
  }

  const resetDay = () => {
    setConsumedProducts([])
  }

  const getProgressColor = () => {
    if (progress < 50) return 'from-red-500 to-orange-500'
    if (progress < 80) return 'from-yellow-500 to-orange-500'
    if (progress < 100) return 'from-green-500 to-emerald-500'
    return 'from-red-500 to-red-600'
  }

  const getMotivationalMessage = () => {
    if (totalProtein === 0) return "Let's start tracking! 💪"
    if (progress < 25) return "Good start! Keep going! 🚀"
    if (progress < 50) return "You're doing great! 🌟"
    if (progress < 75) return "Almost there! 💪"
    if (progress < 100) return "So close! Final push! 🔥"
    return "Goal crushed! You're amazing! 🎉"
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 shadow-2xl">
        <div className="sticky top-0 bg-gray-900/90 backdrop-blur border-b border-gray-700/50 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-7 h-7 text-red-500" />
            Daily Protein Tracker
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          {/* Progress Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Today's Progress</h3>
              <span className="text-sm text-gray-400">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{totalProtein.toFixed(1)}g</span>
                <span className="text-lg text-gray-400">/ {dailyGoal}g</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 rounded-full flex items-center justify-end pr-2`}
                  style={{ width: `${progress}%` }}
                >
                  {progress >= 20 && (
                    <span className="text-xs text-white font-bold">{progress.toFixed(0)}%</span>
                  )}
                </div>
              </div>
              <p className="text-center mt-3 text-gray-300">{getMotivationalMessage()}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-900/30 rounded-lg p-3">
                <p className="text-xs text-gray-400 uppercase">Calories</p>
                <p className="text-xl font-bold text-orange-400">{totalCalories}</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-3">
                <p className="text-xs text-gray-400 uppercase">Cost</p>
                <p className="text-xl font-bold text-green-400">CHF {totalCost.toFixed(2)}</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-3">
                <p className="text-xs text-gray-400 uppercase">Items</p>
                <p className="text-xl font-bold text-blue-400">{consumedProducts.length}</p>
              </div>
            </div>
          </div>

          {/* Goal Settings */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Daily Goal</h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="50"
                max="250"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value) || 140)}
                className="w-20 px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-center"
              />
              <span className="text-gray-400">g</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Recommended: 0.8-2.2g per kg body weight (for muscle growth)
            </p>
          </div>

          {/* Add Product */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Add Product</h3>
            <div className="flex gap-3">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-red-500 focus:outline-none"
              >
                <option value="">Select a product...</option>
                {products.sort((a, b) => b.score - a.score).map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.brand}) - {product.protein}g protein
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                className="w-20 px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-center"
                placeholder="Qty"
              />
              <button
                onClick={addProduct}
                disabled={!selectedProduct}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg flex items-center gap-2 transition-all duration-300 disabled:opacity-50 text-white"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Consumed Products */}
          {consumedProducts.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Today's Consumption</h3>
                <button
                  onClick={resetDay}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Reset Day
                </button>
              </div>
              <div className="space-y-2">
                {consumedProducts.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-900/30 rounded-lg p-3 hover:bg-gray-900/50 transition-all">
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {item.name} {item.quantity > 1 && `x${item.quantity}`}
                      </div>
                      <div className="text-sm text-gray-400">
                        {item.brand} • {(item.protein * item.quantity).toFixed(1)}g protein • CHF {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="p-1.5 hover:bg-red-600/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyTracker
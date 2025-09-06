import React, { useState, useEffect } from 'react'
import { X, Plus, Target, TrendingUp, Check, Trash2, Flame, DollarSign, Package } from 'lucide-react'

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
    return 'from-red-600 to-red-700'
  }

  const getMotivationalMessage = () => {
    if (totalProtein === 0) return "Let's start tracking! 💪"
    if (progress < 25) return "Good start! Keep going! 🚀"
    if (progress < 50) return "You're doing great! 🌟"
    if (progress < 75) return "Almost there! 💪"
    if (progress < 100) return "So close! Final push! 🔥"
    return "Goal crushed! You're amazing! 🎉"
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 sm:p-2.5 rounded-xl shadow-lg shadow-red-500/30">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="hidden sm:inline">Daily Protein Tracker</span>
            <span className="sm:hidden">Daily Tracker</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-88px)]">
          {/* Progress Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 sm:mb-0">Today's Progress</h3>
              <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-lg">
                {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">{totalProtein.toFixed(1)}g</span>
                <span className="text-lg sm:text-xl text-gray-500 font-semibold">/ {dailyGoal}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 sm:h-6 overflow-hidden shadow-inner">
                <div 
                  className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-700 rounded-full flex items-center justify-end pr-2 shadow-lg transform hover:scale-y-110 origin-left`}
                  style={{ width: `${progress}%` }}
                >
                  {progress >= 15 && (
                    <span className="text-xs text-white font-bold drop-shadow">{progress.toFixed(0)}%</span>
                  )}
                </div>
              </div>
              <p className="text-center mt-3 text-gray-700 font-semibold animate-pulse">{getMotivationalMessage()}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-white rounded-xl p-3 sm:p-4 border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Calories</p>
                </div>
                <p className="text-xl sm:text-2xl font-black text-orange-600">{totalCalories}</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 border-2 border-green-100 hover:border-green-300 transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Cost</p>
                </div>
                <p className="text-xl sm:text-2xl font-black text-green-600">
                  <span className="text-base sm:text-lg">CHF</span> {totalCost.toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Items</p>
                </div>
                <p className="text-xl sm:text-2xl font-black text-blue-600">{consumedProducts.length}</p>
              </div>
            </div>
          </div>

          {/* Goal Settings */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Protein Goal</h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                className="flex-1 accent-red-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(parseInt(e.target.value) || 140)}
                  className="w-20 px-3 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-center font-bold focus:border-red-500 focus:outline-none"
                />
                <span className="text-gray-600 font-semibold">g</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 bg-gray-50 rounded-lg p-2">
              💡 Recommended: 0.8-2.2g per kg body weight for muscle growth
            </p>
          </div>

          {/* Add Product */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Product</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium focus:border-red-500 focus:outline-none hover:border-gray-300 transition-all"
              >
                <option value="">Select a product...</option>
                {products.sort((a, b) => b.score - a.score).map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.brand}) - {product.protein}g protein
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                  className="w-20 px-3 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-center font-bold focus:border-red-500 focus:outline-none"
                  placeholder="Qty"
                />
                <button
                  onClick={addProduct}
                  disabled={!selectedProduct}
                  className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 rounded-xl flex items-center gap-2 transition-all duration-300 disabled:opacity-50 text-white font-bold shadow-lg shadow-red-600/30 disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Consumed Products */}
          {consumedProducts.length > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Today's Consumption</h3>
                <button
                  onClick={resetDay}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all duration-300"
                >
                  Reset Day
                </button>
              </div>
              <div className="space-y-2">
                {consumedProducts.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">
                          {item.name}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-sm font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-lg">
                            x{item.quantity}
                          </span>
                        )}
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getLocationColor(item.location)}`}>
                          {item.location}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-2 sm:gap-3">
                        <span className="font-semibold">{item.brand}</span>
                        <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                          {(item.protein * item.quantity).toFixed(1)}g protein
                        </span>
                        <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded">
                          CHF {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="p-2 hover:bg-red-50 rounded-xl transition-all duration-300 group-hover:scale-110 ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
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
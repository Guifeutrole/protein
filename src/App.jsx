import React, { useState, useEffect } from 'react'
import useStore from './store'
import ProductTable from './components/ProductTable'
import ProductTableMobile from './components/ProductTableMobile'
import ProductCard from './components/ProductCard'
import AddProductModal from './components/AddProductModal'
import WelcomeModal from './components/WelcomeModal'
import DailyTracker from './components/DailyTracker'
import { Download, Upload, Plus, Grid, List, Trophy, Package, Coins, Target, TrendingUp, Sparkles, RefreshCw } from 'lucide-react'

function App() {
  const [viewMode, setViewMode] = useState('table')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [sortBy, setSortBy] = useState('score')
  const [filterLocation, setFilterLocation] = useState('all')
  const [showDailyTracker, setShowDailyTracker] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const { 
    products, 
    isFirstTime,
    initWithDoruksData,
    initEmpty,
    addProduct, 
    updateProduct, 
    deleteProduct,
    exportData,
    importData,
    resetToWelcome 
  } = useStore()

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          importData(data)
          alert('Data imported successfully!')
        } catch (error) {
          alert('Error importing data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowAddModal(true)
  }

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, { ...editingProduct, ...product })
    } else {
      addProduct(product)
    }
    setShowAddModal(false)
    setEditingProduct(null)
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return parseFloat(b.score) - parseFloat(a.score)
      case 'proteinPerCHF':
        return parseFloat(b.proteinPerCHF) - parseFloat(a.proteinPerCHF)
      case 'taste':
        return b.taste - a.taste
      case 'price':
        return a.price - b.price
      case 'protein':
        return b.protein - a.protein
      case 'calories':
        return a.calories - b.calories
      default:
        return 0
    }
  })

  const filteredProducts = filterLocation === 'all' 
    ? sortedProducts 
    : sortedProducts.filter(p => p.location === filterLocation)

  const locations = ['all', ...new Set(products.map(p => p.location))]

  const stats = {
    totalProducts: products.length,
    avgScore: products.length ? (products.reduce((acc, p) => acc + parseFloat(p.score), 0) / products.length).toFixed(1) : 0,
    avgProteinPerCHF: products.length ? (products.reduce((acc, p) => acc + parseFloat(p.proteinPerCHF), 0) / products.length).toFixed(1) : 0
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {isFirstTime && (
        <WelcomeModal 
          onChooseDoruk={initWithDoruksData}
          onStartFresh={initEmpty}
        />
      )}
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <header className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3 text-red-600 flex items-center justify-center gap-2 sm:gap-3">
            <span>Swiss Protein Tracker</span>
            <span className="text-2xl sm:text-3xl animate-pulse">🇨🇭</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">Free tool for everyone in Switzerland hitting their protein goals</p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 px-4 sm:px-0">140g daily from Migros, Coop, Lidl & Aldi - no powder, just real food!</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border-2 border-red-100 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:border-red-300">
            <div className="bg-red-50 p-2 sm:p-3 rounded-lg">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 animate-bounce-slow" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">Avg Score</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.avgScore}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border-2 border-green-100 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:border-green-300">
            <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">Value</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.avgProteinPerCHF}<span className="text-sm sm:text-base">g/CHF</span></p>
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border-2 border-blue-100 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
            <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">Products</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
          <button
            onClick={() => setShowDailyTracker(true)}
            className="bg-red-600 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:bg-red-700 cursor-pointer"
          >
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] sm:text-xs text-white/90 uppercase tracking-wider">Daily Goal</p>
              <p className="text-lg sm:text-2xl font-bold text-white">Track</p>
            </div>
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  viewMode === 'table' 
                    ? 'bg-red-600 text-white shadow-lg scale-105' 
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-300'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  viewMode === 'cards' 
                    ? 'bg-red-600 text-white shadow-lg scale-105' 
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-300'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-initial px-2 sm:px-4 py-2 rounded-lg bg-white text-gray-900 text-sm sm:text-base border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-gray-400"
              >
                <option value="score">Score</option>
                <option value="proteinPerCHF">Value</option>
                <option value="taste">Taste</option>
                <option value="price">Price</option>
                <option value="protein">Protein</option>
                <option value="calories">Calories</option>
              </select>

              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="flex-1 sm:flex-initial px-2 sm:px-4 py-2 rounded-lg bg-white text-gray-900 text-sm sm:text-base border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-gray-400"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === 'all' ? 'All' : loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span className="sm:inline">Add</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={exportData}
                  className="px-3 sm:px-4 py-2 bg-white border-2 border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 text-gray-700"
                  title="Export data"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden lg:inline">Export</span>
                </button>
                <label className="px-3 sm:px-4 py-2 bg-white border-2 border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 text-gray-700"
                  title="Import data"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden lg:inline">Import</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => {
                    if (confirm('Reset all data and start over? This will delete your current list.')) {
                      resetToWelcome()
                    }
                  }}
                  className="px-3 sm:px-4 py-2 bg-white border-2 border-red-300 hover:bg-red-50 rounded-lg flex items-center justify-center gap-1 transition-all duration-300"
                  title="Reset and start over"
                >
                  <RefreshCw className="w-4 h-4 text-red-600" />
                  <span className="hidden lg:inline text-red-600">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {viewMode === 'table' ? (
            isMobile ? (
              <ProductTableMobile
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            ) : (
              <ProductTable
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={deleteProduct}
                />
              ))}
            </div>
          )}
        </div>
        
        <footer className="mt-12 py-6 border-t border-gray-200 text-center">
          <p className="text-gray-700 text-sm sm:text-base mb-3">
            🆓 Free for all Swiss gym bros & girls 🆓
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">
            Made by Doruk (23yo student) for everyone in CH trying to build muscle on a budget
          </p>
          <p className="text-gray-500 text-xs mb-3">
            My taste ratings • Your mileage may vary • Add your own products & ratings!
          </p>
          <div className="flex items-center justify-center gap-4 text-xs mb-4">
            <a 
              href="https://www.linkedin.com/in/doruk-ozturk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 font-semibold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              Connect on LinkedIn
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">Open source & free forever</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Start fresh? This will reset everything and show the welcome screen.')) {
                resetToWelcome()
              }
            }}
            className="text-gray-500 hover:text-red-600 text-xs transition-colors"
          >
            Need to start over? Click here to reset
          </button>
        </footer>
      </div>

      {showAddModal && (
        <AddProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false)
            setEditingProduct(null)
          }}
          onSave={handleSaveProduct}
        />
      )}

      {showDailyTracker && (
        <DailyTracker 
          products={products}
          onClose={() => setShowDailyTracker(false)}
        />
      )}
    </div>
  )
}

export default App
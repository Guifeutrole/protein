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
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-block">
            <h1 className="text-4xl sm:text-6xl font-black mb-3 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent flex items-center justify-center gap-3">
              <span>Swiss Protein Tracker</span>
              <span className="text-3xl sm:text-4xl animate-bounce-slow">🇨🇭</span>
            </h1>
            <div className="h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-4"></div>
          </div>
          <p className="text-gray-700 text-lg sm:text-xl font-semibold">Free tool for everyone in Switzerland hitting their protein goals</p>
          <p className="text-gray-600 text-sm sm:text-base mt-2">140g daily from Migros, Coop, Lidl & Aldi - no powder, just real food!</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-red-200 transform hover:-translate-y-1 group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-lg shadow-red-500/30 group-hover:shadow-xl group-hover:shadow-red-500/40 transition-all duration-500">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">Avg Score</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform duration-300">{stats.avgScore}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-green-200 transform hover:-translate-y-1 group">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-500">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">Value</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform duration-300">{stats.avgProteinPerCHF}<span className="text-sm sm:text-base text-gray-500">g/CHF</span></p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-blue-200 transform hover:-translate-y-1 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-500">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">Products</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform duration-300">{stats.totalProducts}</p>
            </div>
          </div>
          <button
            onClick={() => setShowDailyTracker(true)}
            className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 flex items-center gap-3 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:from-red-700 hover:to-red-800 cursor-pointer transform hover:-translate-y-1 group shadow-lg shadow-red-600/30"
          >
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-all duration-500">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-left">
              <p className="text-[10px] sm:text-xs text-white/90 uppercase tracking-wider font-semibold">Daily Goal</p>
              <p className="text-xl sm:text-2xl font-black text-white group-hover:scale-110 transition-transform duration-300">Track</p>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-8 border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-semibold transform ${
                  viewMode === 'table' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105 shadow-red-600/30' 
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:shadow-md'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-semibold transform ${
                  viewMode === 'cards' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105 shadow-red-600/30' 
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:shadow-md'
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
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white text-gray-900 text-sm sm:text-base border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-md font-medium"
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
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white text-gray-900 text-sm sm:text-base border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-md font-medium"
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
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-xl flex items-center justify-center gap-2 transition-all duration-500 transform hover:scale-105 shadow-lg shadow-red-600/30 font-bold"
              >
                <Plus className="w-4 h-4" />
                <span className="sm:inline">Add</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={exportData}
                  className="px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center gap-1 transition-all duration-300 text-gray-700 hover:shadow-md font-medium"
                  title="Export data"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden lg:inline">Export</span>
                </button>
                <label className="px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 text-gray-700 hover:shadow-md font-medium"
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
                  className="px-4 py-2.5 bg-white border-2 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl flex items-center justify-center gap-1 transition-all duration-300 hover:shadow-md font-medium"
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
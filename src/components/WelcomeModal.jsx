import React from 'react'
import { Package, Sparkles, UserPlus, Zap, Heart, TrendingUp } from 'lucide-react'

function WelcomeModal({ onChooseDoruk, onStartFresh }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center border-2 border-red-200 shadow-2xl animate-slide-up">
        <div className="mb-6">
          <div className="text-6xl mb-4 animate-bounce-slow">🇨🇭</div>
          <h1 className="text-3xl font-bold text-red-600 mb-3">
            Welcome, Swiss Friend! 👋
          </h1>
          <p className="text-gray-700 text-base leading-relaxed">
            I'm Doruk - I built this free tool for everyone in Switzerland
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Track your protein, hit your goals, save money - no powder needed!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-3 border border-green-200">
            <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-gray-700">CHF/Protein</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 border border-red-200">
            <Heart className="w-5 h-5 text-red-600 mx-auto mb-1" />
            <p className="text-xs text-gray-700">My Taste</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-700">Real Food</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onChooseDoruk}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25"
          >
            <Package className="w-5 h-5" />
            Start with My Top 20 (Tested & Rated)
          </button>
          <button
            onClick={onStartFresh}
            className="w-full py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <UserPlus className="w-5 h-5" />
            Create Your Own List
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-6">
          100% Free • No ads • No signup • Made for Swiss people
        </p>
      </div>
    </div>
  )
}

export default WelcomeModal
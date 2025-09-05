import React from 'react'
import { Package, Sparkles, UserPlus, Zap, Heart, TrendingUp } from 'lucide-react'

function WelcomeModal({ onChooseDoruk, onStartFresh }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 rounded-3xl max-w-md w-full p-8 text-center border border-red-500/20 shadow-2xl animate-slide-up">
        <div className="mb-6">
          <div className="text-6xl mb-4 animate-bounce-slow">🇨🇭</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent mb-3">
            Welcome, Swiss Friend! 👋
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            I'm Doruk - I built this free tool for everyone in Switzerland
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Track your protein, hit your goals, save money - no powder needed!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 border border-green-500/20">
            <Zap className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-300">CHF/Protein</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-xl p-3 border border-red-500/20">
            <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-xs text-gray-300">My Taste</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-3 border border-blue-500/20">
            <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-300">Real Food</p>
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
            className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <UserPlus className="w-5 h-5" />
            Create Your Own List
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          100% Free • No ads • No signup • Made for Swiss people
        </p>
      </div>
    </div>
  )
}

export default WelcomeModal
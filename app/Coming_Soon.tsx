'use client'
import { 
  ChevronRight,
  Wallet,
  Calendar,
  Car
} from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { FormEvent, useEffect, useState } from 'react'

/* Firebase Configuration */
const firebaseConfig = {
  apiKey: "AIzaSyDDow9-3GtOiNNG1--LPB9AJiWz64I1Zwk",
  authDomain: "bimmerviz-database.firebaseapp.com",
  projectId: "bimmerviz-database",
  storageBucket: "bimmerviz-database.firebasestorage.app",
  messagingSenderId: "1069352124486",
  appId: "1:1069352124486:web:401f8b7c5cbdc485048a47",
  measurementId: "G-CC78PDD337"
}

/* Initialize Firebase Database */
const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)
const db = getFirestore(app)
// const emailWaitlistCol = collection(db, 'email_waitlist')

{/** --- MAIN APP --- */}
const Coming_Soon = () => { 
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (message && !isError) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [message, isError]);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setMessage('Please enter a valid email')
      setIsError(true)
      setIsLoading(false)
      return
    }

    setIsError(false)
    setIsLoading(true)
    setMessage('')

    try {
      const collectionName = 'email_waitlist'
      const docRef = doc(db, collectionName, trimmedEmail)

      const data = {
        joined_at: serverTimestamp()
      }

      await setDoc(docRef, data)

      setMessage('Success! You have been added to the waitlist.')
      setIsError(false)
      setEmail('')
    } catch (err: unknown) {
        console.error('Firestone Error:', err)

        const error = err as { code?: string}

        console.log('Error code HERE:', error.code)

        setMessage('Please try again');
        setIsError(true)
  } finally {
    setIsLoading(false)
  }
}
  
  return (
    <html className='overscroll-none'>
      <section className="min-h-screen bg-dark-background-1 text-primary-text font-montserrat overflow-x-hidden overscroll-none selection:bg-blue-500 selection:text-white">
        {/* --- BACKGROUND GRAPHICS --- */}
        <div className='fixed inset-0 z-0 pointer-events-none opacity-20'>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[1500px] bg-linear-to-r from-transparent via-[#003366]/50 to-transparent transform -rotate-12 blur-3xl"></div>

          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[128px]"></div>
        </div>

        {/* --- NAVBAR --- */}
        <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            {/* Simple CSS Logo using M Colors */}
            <div className="flex gap-1 h-6 skew-x-[-15deg]">
              <div className="w-2 bg-[#00A6EB]"></div> {/* Light Blue */}
              <div className="w-2 bg-[#000066]"></div> {/* Dark Blue */}
              <div className="w-2 bg-[#FF0000]"></div> {/* Red */}
            </div>
            <span>BimmerViz</span>
          </div>
          <a href="mailto:jalynrtandy@gmail.com" className="text-md text-secondary-text0 hover:text-white transition-colors hidden sm:block hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-primary-text before:absolute before:left-0 before:bottom-0">
            Contact Me
          </a>
        </nav>

        {/* --- HERO SECTION --- */}
        <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-32 text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Accepting Beta Users for E46 Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-primary-text to-secondary-text">
            Build Your BMW. <br className="hidden sm:block" />
            Visualize Your Build. <br className='hidden sm:block'/>
            <span className="text-primary-text">Track Every Dollar.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Stop planning your dream build in a spreadsheet. 
            <strong className="text-white"> BimmerViz</strong> doesn&apos;t just list parts—it 
            calculates your budget, simulates your timeline, and visualizes your build before you spend a dime.
          </p>

          {/* --- EMAIL CAPTURE FORM --- */}
          <div className="w-full max-w-md relative group">

            {/* Glow effect behind form */}
            <div className="absolute -inset-1 bg-linear-to-r from-[#00A6EB] via-[#000066] to-[#FF0000] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            {/* Email Input Form */}
            <div className="relative bg-[#111111] border border-gray-800 p-2 rounded-lg flex flex-col sm:flex-row gap-2">
              <input 
              type="email" 
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-3 focus:outline-none rounded-md"
              />

              {/* CTA Button */}
              <button
              onClick={handleSubmit}
              type = 'submit'
              disabled = {isLoading}
              className='bg-bmw-light-blue text-black cursor-default px-6 py-3 rounded-md font-semibold transition-all flex items-center justify-center gap-2'>
                {isLoading ? 'Submitting...' : 'Join Waitlist'}
                <ChevronRight size={16}/>
                
              </button>
            </div>
          </div>
          <div className={`
            ${message ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'}
            overflow-hidden transition-all duration-300 ease-in-out`}>
            {message &&  (
              <p className={`
              ${isError ? 'bg-error' : 'bg-success border-black'}
                text-md font-medium animate-in slide-in-from-top-2 fade-in duration-300 mt-6
                rounded px-6 py-3
                `}>
                {message}
              </p>
            )}
          </div>

          {/* --- FEATURE GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full text-left">

            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                <Wallet size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Budgeting</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                  Tired of hard to manage spreadsheets? Calculate exactly <strong>how much</strong> your dream build will cost based on your monthly savings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-red-500/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4 text-red-400">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Timeline</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stop guessing. Get a generated timeline that tells you exactly <strong>when</strong> you&apos;ll finally finish your E46 build.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-[#000066]/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#000066]/40 flex items-center justify-center mb-4 text-indigo-400">
                <Car size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">3D Visualization</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Don&apos;t waste time wondering how parts will look on your E46. Visualize and <strong>plan</strong> out how your build will look when it&apos; done.
              </p>
            </div>          
          </div>
        </main>

        {/* --- FOOTER --- */}
        <footer className="relative z-10 border-t border-white/10 mt-20 py-10 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} BimmerViz. Built by an enthusiast, for enthusiasts.</p>
        </footer>
      </section>
    </html>
  )
}

export default Coming_Soon
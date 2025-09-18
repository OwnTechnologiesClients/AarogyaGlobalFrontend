export const metadata = {
  title: "Thank You | Aarogya Global",
  robots: { index: false, follow: false }
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl">
        <div className="bg-white/90 backdrop-blur-md border border-emerald-100 shadow-xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#04CE78] to-green-600 p-8 sm:p-10 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-9 h-9 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Thank you!</h1>
            <p className="mt-3 text-emerald-50 text-base sm:text-lg">We've received your submission. Our team will contact you shortly.</p>
          </div>

          <div className="p-6 sm:p-10 text-center">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-sm text-gray-500">Response time</p>
                <p className="mt-1 font-semibold text-gray-900">Within 24 hours</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-sm text-gray-500">Support</p>
                <p className="mt-1 font-semibold text-gray-900">Mon–Sat, 9am–7pm IST</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-sm text-gray-500">Next step</p>
                <p className="mt-1 font-semibold text-gray-900">Expert will reach out</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#04CE78] hover:bg-[#03B868] text-white font-semibold transition-colors">
                Back to Home
              </a>
              <a href="/hospitalSearch" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold transition-colors">
                Explore Hospitals
              </a>
            </div>

            <p className="mt-6 text-xs text-gray-500">If this wasn't you, please ignore this message.</p>
          </div>
        </div>
      </div>
    </main>
  );
}



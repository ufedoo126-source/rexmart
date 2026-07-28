export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* HERO BANNER */}
      <section className="w-full bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="max-w-xl">
            <p className="inline-block rounded-full bg-red-100 px-3 py-1 text-red-600 font-semibold text-xs tracking-[0.3em] uppercase mb-4">
              Fast Grocery Delivery
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Fresh essentials for <span className="text-red-600">every day</span>.
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Shop pantry staples, drinks, snacks, and household items from Rexmart with quick delivery to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/shop"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition text-center shadow-sm"
              >
                Shop Now
              </a>
              <a
                href="https://wa.me/2347040443049"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold px-8 py-3 rounded-full transition text-center"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-white px-3 py-1 text-gray-700 shadow-sm border border-gray-100">
                Same-day delivery
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-gray-700 shadow-sm border border-gray-100">
                Fresh products daily
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-gray-700 shadow-sm border border-gray-100">
                Easy ordering
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-red-500 rounded-[2rem] blur-3xl opacity-40"></div>
            <div className="relative rounded-[2rem] border border-red-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm">
              <div className="grid gap-4">
                <div className="rounded-2xl bg-red-600 p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] opacity-90">Average Delivery</p>
                  <p className="text-3xl font-bold mt-1">Less than 1 Hour</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-orange-50 p-4">
                    <p className="text-sm font-semibold text-gray-800">Daily essentials</p>
                    <p className="text-xs text-gray-600 mt-1">Groceries, drinks, and snacks</p>
                  </div>
                  <div className="rounded-2xl bg-yellow-50 p-4">
                    <p className="text-sm font-semibold text-gray-800">Trusted service</p>
                    <p className="text-xs text-gray-600 mt-1">Friendly support whenever you need it</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-white py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { icon: "🚚", title: "Fast Delivery", text: "Quick delivery to your doorstep" },
            { icon: "🛡️", title: "Quality Products", text: "We bring only the best for you" },
            { icon: "🏷️", title: "Affordable Prices", text: "Great prices on everyday items" },
            { icon: "🎧", title: "Customer Support", text: "We're here to help anytime" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                <p className="text-gray-500 text-xs">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CURRENT PROMOTIONS */}
      <section className="bg-orange-50 py-16 px-6 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Current Promotions
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-orange-500 font-bold text-lg mb-2">This Week</p>
              <p className="text-gray-600">10% off all beverages</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-orange-500 font-bold text-lg mb-2">New Customer</p>
              <p className="text-gray-600">Free delivery on your first order</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-orange-500 font-bold text-lg mb-2">Bundle Deal</p>
              <p className="text-gray-600">Buy 2 snacks, get 1 free</p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          What Our Customers Say
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: "Amaka O.", text: "Fast delivery and everything was fresh!" },
            { name: "Chidi E.", text: "Ordering on WhatsApp was so convenient." },
            { name: "Blessing T.", text: "Great prices, will definitely order again." },
          ].map((review) => (
            <div
              key={review.name}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200"
            >
              <p className="text-gray-700 mb-3">&ldquo;{review.text}&rdquo;</p>
              <p className="font-semibold text-green-700">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
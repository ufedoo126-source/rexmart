export default function Delivery() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
        Delivery & Pickup
      </h1>
      <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
        Order online and choose whichever option works best for you — we&apos;ll
        confirm your order right away.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-3xl mb-3">🚚</p>
          <h2 className="text-xl font-bold text-red-600 mb-2">Home Delivery</h2>
          <p className="text-gray-600">
            We&apos;ll bring your order straight to your doorstep. Just add your
            address at checkout.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-8 text-center">
          <p className="text-3xl mb-3">🏬</p>
          <h2 className="text-xl font-bold text-yellow-600 mb-2">Store Pickup</h2>
          <p className="text-gray-600">
            Prefer to grab it yourself? Pick your order up at the Rex Mart
            store, ready when you arrive.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Order Confirmation
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Once your order is placed, you&apos;ll receive a confirmation by
          <span className="font-medium text-red-600"> email</span> or
          <span className="font-medium text-red-600"> WhatsApp</span> —
          whichever you prefer.
        </p>
      </div>
    </div>
  );
}
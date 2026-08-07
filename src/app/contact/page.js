export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Get In Touch
      </h1>

      <div className="grid sm:grid-cols-2 gap-10 items-start">

        {/* CONTACT DETAILS */}
        <div className="space-y-6">
          <div>
            <p className="font-semibold text-red-600">Address</p>
            <p className="text-gray-600">Rex Mart, Abuja, Nigeria</p>
            <a
              href="https://www.google.com/maps?q=9.0372960,7.5910160"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 text-sm font-medium hover:underline"
            >
              View on Google Maps
            </a>
          </div>

          <div>
            <p className="font-semibold text-red-600">Phone</p>
            <a href="tel:+2347040443049" className="text-gray-600 hover:text-red-600">
              +234 704 044 3049
            </a>
          </div>

          <div>
            <p className="font-semibold text-red-600">WhatsApp</p>
            <a
              href="https://wa.me/2347040443049"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600"
            >
              +234 704 044 3049
            </a>
          </div>

          <div>
            <p className="font-semibold text-red-600">Email</p>
            <a
              href="mailto:rexmart2903@gmail.com"
              className="text-gray-600 hover:text-red-600"
            >
              rexmart2903@gmail.com
            </a>
          </div>
        </div>

        {/* MAP EMBED */}
        <div className="rounded-xl overflow-hidden border border-gray-200 h-72 sm:h-full">
          <iframe
            title="Rex Mart Location"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps?q=9.0372960,7.5910160&output=embed"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
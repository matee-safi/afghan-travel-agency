import { Shield } from "lucide-react";

const Security = () => {
  return (
    <section id="security" className="md:py-32 pb-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-1 bg-red-500/10 rounded-full text-red-400 text-sm font-medium">
              Enterprise-Grade Security
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Your Security is Our Priority
            </h2>
            <p className="text-gray-400 mb-8">
              Every Booking is protected by our advanced security system,
              ensuring your Booking and personal information remain safe.
            </p>
            <div className="space-y-4">
              {[
                "End-to-end encryption for all communications",
                "Multi-factor authentication",
                "Real-time tracking and verification",
                "Secure payment escrow system",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 blur-3xl" />
            <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500/20 to-red-400/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">
                      We Use Whatsapp for all our communications.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500/20 to-red-400/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">
                      We Use Stripe for all our Transaction.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500/20 to-red-400/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">
                      We Use Firebase for authentication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;

"use client";

export default function HowItWorks() {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold mb-6">How_it_works</h3>
      <div className="space-y-4 text-sm">
        <div>
          <span className="font-bold">1. Add your site.</span>
          <br />
          <span className="text-gray-600 ml-4">
            dataprism tracks it and sends analytics to your dashboard.
          </span>
        </div>
        <div>
          <span className="font-bold">2. Monitor visitors.</span>
          <br />
          <span className="text-gray-600 ml-4">
            Each visitor gets you real-time data in an isolated workspace.
          </span>
        </div>
        <div>
          <span className="font-bold">3. Get insights.</span>
          <br />
          <span className="text-gray-600 ml-4">
            See who's browsing, what needs attention, and review performance.
          </span>
        </div>
      </div>
    </div>
  );
}

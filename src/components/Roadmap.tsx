"use client";

export default function Roadmap() {
  const roadmapItems = [
    {
      title: "Waitlist Platform",
      description: "Early access signup system for product launch",
      status: "completed",
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Live visitor tracking with instant data updates",
      status: "in_progress",
    },
    {
      title: "Advanced User Segmentation",
      description: "Group visitors by behavior and demographics",
      status: "not_started",
    },
    {
      title: "Custom Event Tracking",
      description: "Track specific actions and conversions",
      status: "not_started",
    },
    {
      title: "AI-Powered Insights",
      description: "Automated recommendations and predictions",
      status: "not_started",
    },
  ];

  const getStatusStyle = (status: string) => {
    if (status === "completed") {
      return "w-2 h-2 bg-green-500 rounded-full";
    }
    if (status === "in_progress") {
      return "w-2 h-2 bg-blue-500 rounded-sm";
    }
    return "w-2 h-2 bg-gray-400 rounded-full";
  };

  const getStatusTextColor = (status: string) => {
    if (status === "completed") {
      return "text-green-600";
    }
    if (status === "in_progress") {
      return "text-blue-500";
    }
    return "text-gray-500";
  };

  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold mb-6">Roadmap</h3>
      <div className="space-y-4 text-sm">
        {roadmapItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`${getStatusStyle(item.status)} flex-shrink-0 mt-1.5`}
            ></div>
            <div>
              <span className="font-bold">{item.title}</span>
              <br />
              <span className="text-gray-600 ml-0">{item.description}</span>
              <br />
              <span
                className={`text-xs capitalize ${getStatusTextColor(
                  item.status
                )}`}
              >
                {item.status.replace("_", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

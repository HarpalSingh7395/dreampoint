export default function ServiceCard({ title, description, icon, bgColor = "bg-blue-50" }) {
    return (
      <div className={`card ${bgColor} border border-gray-100 hover:translate-y-[-5px]`}>
        <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6 text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
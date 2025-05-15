export default function FeesTable() {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Subject</th>
              <th className="py-3 px-4 text-left">Group Tuition (Per Year)</th>
              <th className="py-3 px-4 text-left">Group Tuition (Per Month)</th>
              <th className="py-3 px-4 text-left">Home Tuition (Per Month)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-white hover:bg-blue-50">
              <td className="py-3 px-4 font-medium">Chemistry</td>
              <td className="py-3 px-4">₹25,000</td>
              <td className="py-3 px-4">₹2,500</td>
              <td className="py-3 px-4">₹7,500</td>
            </tr>
            <tr className="bg-gray-50 hover:bg-blue-50">
              <td className="py-3 px-4 font-medium">Physics</td>
              <td className="py-3 px-4">₹25,000</td>
              <td className="py-3 px-4">₹2,500</td>
              <td className="py-3 px-4">₹7,500</td>
            </tr>
            <tr className="bg-white hover:bg-blue-50">
              <td className="py-3 px-4 font-medium">Mathematics</td>
              <td className="py-3 px-4">₹25,000</td>
              <td className="py-3 px-4">₹2,500</td>
              <td className="py-3 px-4">₹7,500</td>
            </tr>
            <tr className="bg-gray-50 hover:bg-blue-50">
              <td className="py-3 px-4 font-medium">Biology</td>
              <td className="py-3 px-4">₹25,000</td>
              <td className="py-3 px-4">₹2,500</td>
              <td className="py-3 px-4">₹7,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
import { TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, color, bgColor, textColor }) => (
    <div className="group bg-white hover:bg-gray-50 transition-all duration-200 p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
                </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <TrendingUp className="w-5 h-5 text-gray-700" />
            </div>
        </div>
    </div>
);
export default StatCard;
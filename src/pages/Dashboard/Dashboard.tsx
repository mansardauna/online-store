import React from "react";
import { useTranslation } from "react-i18next";
import Card from "../../components/ui/card";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  const { t } = useTranslation(["dashboard"]);
  const navigate = useNavigate();

  const stats = [
    { label: t("orders"), value: 12, progress: 75 },
    { label: t("watchlist"), value: 8, progress: 60 },
    { label: t("totalSpent"), value: "$1,234.56", progress: 90 },
  ];

  const recentActivity = [
    { id: 1, action: t("orderedProduct"), product: "Smartphone", date: "2025-06-01" },
    { id: 2, action: t("addedToWatchlist"), product: "Laptop", date: "2025-05-30" },
  ];

  return (
    <motion.div
      className="p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {t("dashboard")}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 relative overflow-hidden">
            <h3 className="text-lg font-medium text-gray-600">{stat.label}</h3>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            <div className="absolute -right-10 -bottom-10 w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e0f2fe"
                  strokeWidth="4"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray={`${stat.progress}, 100`}
                />
              </svg>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("recentActivity")}</h2>
        {recentActivity.length === 0 ? (
          <p className="text-gray-600">{t("noActivity")}</p>
        ) : (
          <ul className="space-y-3">
            {recentActivity.map((activity) => (
              <motion.li
                key={activity.id}
                className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * activity.id }}
              >
                <div>
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.product}</p>
                </div>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </Card>

      {/* Quick Links */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("quickLinks")}</h2>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/products")}>{t("browseProducts")}</Button>
          <Button variant="secondary" onClick={() => navigate("/profile")}>
            {t("viewProfile")}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Dashboard;
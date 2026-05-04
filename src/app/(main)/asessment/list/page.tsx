"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AssessmentList = {
  id: string;
  worker_name: string;
  observer_name: string;
  assessment_date: string;
  total_score: number;
  risk_level: string;
};

export default function AssessmentListPage() {
  const [data, setData] = useState<AssessmentList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/asessment");
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          console.error("Failed to fetch data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "Negligible Risk":
        return "bg-green-100 text-green-700 border-green-200";
      case "Low Risk":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Medium Risk":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "High Risk":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Very High Risk":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl text-gray-800">Assessment History</h1>
            <p className="mt-1 text-gray-500">List of all saved ergonomic evaluation results.</p>
          </div>
          <Link href="/asessment/asessform">
            <Button className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-all hover:bg-blue-700">
              + New Assessment
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center p-20 font-medium text-gray-500">Loading data...</div>
            ) : data.length === 0 ? (
              <div className="flex items-center justify-center p-20 font-medium text-gray-500">
                No evaluation data available.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b bg-gray-100 text-gray-600 text-sm">
                      <th className="p-4 font-semibold">Assessment Date</th>
                      <th className="p-4 font-semibold">Worker Name</th>
                      <th className="p-4 font-semibold">Observer</th>
                      <th className="p-4 text-center font-semibold">Total Score</th>
                      <th className="p-4 text-center font-semibold">Risk Level</th>
                      <th className="p-4 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-gray-50">
                        <td className="p-4 text-gray-700">
                          {new Date(item.assessment_date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-4 font-medium text-gray-900">{item.worker_name}</td>
                        <td className="p-4 text-gray-600">{item.observer_name}</td>
                        <td className="p-4 text-center">
                          <span className="font-bold text-gray-800 text-lg">{item.total_score}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`rounded-full border px-3 py-1 font-bold text-xs ${getRiskBadgeColor(item.risk_level)}`}
                          >
                            {item.risk_level}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Link href={`/asessment/list/${item.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              Detail
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

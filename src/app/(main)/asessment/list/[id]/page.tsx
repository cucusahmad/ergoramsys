"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/asessment/${id}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          alert("Failed to load detail data.");
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-semibold text-gray-500">Loading data...</div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center font-semibold text-red-500">Data not found.</div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Negligible Risk":
        return "bg-green-100 text-green-700";
      case "Low Risk":
        return "bg-blue-100 text-blue-700";
      case "Medium Risk":
        return "bg-yellow-100 text-yellow-700";
      case "High Risk":
        return "bg-orange-100 text-orange-700";
      case "Very High Risk":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans md:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <Button onClick={() => router.back()} variant="outline" className="text-gray-600">
            ← Back to List
          </Button>
          <h1 className="font-bold text-2xl text-gray-800">Ergonomic Evaluation Details</h1>
        </div>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="space-y-8 p-8">
            {/* Worker Information */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="border-b pb-2 font-bold text-blue-600 text-lg">Worker Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-500">Name:</span> <span className="font-semibold">{data.worker_name}</span>
                  <span className="text-gray-500">Position:</span>{" "}
                  <span className="font-semibold">{data.worker_position || "-"}</span>
                  <span className="text-gray-500">Age:</span>{" "}
                  <span className="font-semibold">{data.age ? `${data.age} Years` : "-"}</span>
                  <span className="text-gray-500">Experience:</span>{" "}
                  <span className="font-semibold">{data.experience ? `${data.experience} Years` : "-"}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="border-b pb-2 font-bold text-blue-600 text-lg">Observer Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="font-semibold">{data.observer_name}</span>
                  <span className="text-gray-500">Position:</span>{" "}
                  <span className="font-semibold">{data.observer_position || "-"}</span>
                  <span className="text-gray-500">Organization:</span>{" "}
                  <span className="font-semibold">{data.organization || "-"}</span>
                  <span className="text-gray-500">Assessment Date:</span>{" "}
                  <span className="font-semibold">{new Date(data.assessment_date).toLocaleDateString("en-US")}</span>
                </div>
              </div>
            </div>

            {/* Final Result */}
            <div className="flex items-center justify-between rounded-2xl border bg-gray-50 p-6">
              <div>
                <p className="text-gray-500 text-sm">Final Total Score</p>
                <h2 className="font-bold text-4xl text-blue-600">{data.total_score}</h2>
              </div>
              <span className={`rounded-full border px-6 py-3 font-bold text-sm ${getRiskColor(data.risk_level)}`}>
                {data.risk_level}
              </span>
            </div>

            {/* Score Details Table */}
            <div>
              <h3 className="mb-4 font-bold text-gray-800 text-lg">Score Details per Section (Assessment Scores)</h3>
              <div className="overflow-x-auto rounded-xl border shadow-inner">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="p-4 font-medium">Section / Task</th>
                      <th className="p-4 text-center font-medium">Posture</th>
                      <th className="p-4 text-center font-medium">Repetition</th>
                      <th className="p-4 text-center font-medium">MDL (L/R)</th>
                      <th className="p-4 text-center font-medium">Task Value</th>
                      <th className="p-4 font-medium text-center">Photo Posture</th>
                      <th className="p-4 text-center font-medium">Row Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.scores.map((s: any, idx: number) => {
                      const posture = s.posture_score || 0;
                      const rep = s.repetition_score || 0;
                      const activeMdl = s.mdl_score ?? (s.mdl_left || 0) + (s.mdl_right || 0);
                      const taskVal = s.task_value || 0;
                      const rowTotal = s.step_type === "body" ? posture + rep + activeMdl : taskVal;

                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-4 font-semibold text-gray-700 uppercase">{s.step_key}</td>
                          <td className="p-4 text-center">{s.posture_score ?? "-"}</td>
                          <td className="p-4 text-center">{s.repetition_score ?? "-"}</td>
                       <td className="p-4 text-center">
                          {
                            // Cek dulu apakah ini bagian tubuh bilateral (punya kiri/kanan)
                            (s.mdl_left !== null && s.mdl_right !== null) 
                              ? `L:${s.mdl_left} | R:${s.mdl_right}` 
                              // Jika bukan bilateral, cek apakah mdl_score ada (termasuk angka 0)
                              : (s.mdl_score !== null ? s.mdl_score : "-")
                          }
                        </td>
                          <td className="p-4 text-center font-medium text-blue-600">{s.task_value ?? "-"}</td>
                            <td className="p-4 text-center">
                              {s.image_url ? (
                                <a href={s.image_url} target="_blank" rel="noreferrer">
                                  <img 
                                    src={s.image_url} 
                                    alt={`Foto ${s.step_key}`} 
                                    className="h-16 w-16 object-cover rounded-md border shadow-sm mx-auto hover:scale-110 transition-transform cursor-pointer"
                                  />
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">- No Foto -</span>
                              )}
                            </td>
                          <td className="bg-gray-50 p-4 text-center font-bold text-gray-900">{rowTotal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

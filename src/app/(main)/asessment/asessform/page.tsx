"use client";

import { useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/* ================= TYPES ================= */

type StepType = "body" | "task";

type BodyScore = {
  posture: number;
  repetition: number;
  mdl: number;
};

type TaskScore = {
  value: number;
};

type ScoreType = BodyScore | TaskScore;

type StepKey = (typeof steps)[number]["key"];

/* ================= STEPS ================= */

const steps = [
  { key: "neck", type: "body", title: "Neck" },
  { key: "back", type: "body", title: "Back" },
  { key: "shoulder", type: "body", title: "Shoulder" },
  { key: "lowerArm", type: "body", title: "Lower Arm" },
  { key: "wrist", type: "body", title: "Wrist" },
  { key: "knee", type: "body", title: "Knee" },
  { key: "leg", type: "body", title: "Leg" },
  { key: "handGrip", type: "body", title: "Hand Grip" },

  { key: "taskDuration", type: "task", title: "Task Duration" },
  { key: "load", type: "task", title: "Load" },
  { key: "jobDemand", type: "task", title: "Job Demand" },
  { key: "jobSatisfaction", type: "task", title: "Job Satisfaction" },
  { key: "socialSupport", type: "task", title: "Social Support" },
] as const;

/* ================= POSTURE OPTIONS ================= */

const postureOptions: Record<string, any[]> = {
  neck: [
    { value: 0, label: "Neutral", desc: "Neck is in neutral position", img: "/images/posture/11.png" },
    { value: 1, label: "Moderate", desc: "Neck moderately bent", img: "/images/posture/12.png" },
    { value: 2, label: "Extreme", desc: "Neck extremely bent", img: "/images/posture/13.png" },
  ],
  back: [
    { value: 0, label: "Neutral", desc: "Back upright", img: "/images/posture/21.png" },
    { value: 1, label: "Moderate", desc: "Back bent", img: "/images/posture/22.png" },
    { value: 2, label: "Extreme", desc: "Back twisted", img: "/images/posture/23.png" },
  ],
  shoulder: [
    { value: 0, label: "Neutral", desc: "Arm near body", img: "/images/posture/31.png" },
    { value: 2, label: "Moderate", desc: "Arm 45°", img: "/images/posture/32.png" },
    { value: 4, label: "Extreme", desc: "Arm >90°", img: "/images/posture/33.png" },
  ],
  lowerArm: [
    { value: 0, label: "Neutral", desc: "Elbow 90°", img: "/images/posture/41.png" },
    { value: 2, label: "Moderate", desc: "Elbow extended", img: "/images/posture/42.png" },
    { value: 4, label: "Extreme", desc: "Arm stretched", img: "/images/posture/43.png" },
  ],
  wrist: [
    { value: 0, label: "Neutral", desc: "Straight wrist", img: "/images/posture/51.png" },
    { value: 1, label: "Moderate", desc: "Bent wrist", img: "/images/posture/52.png" },
    { value: 2, label: "Extreme", desc: "Twisted wrist", img: "/images/posture/53.png" },
  ],
  knee: [
    { value: 0, label: "Neutral", desc: "Standing", img: "/images/posture/61.png" },
    { value: 1, label: "Slight bend", desc: "Slight bend", img: "/images/posture/62.png" },
    { value: 2, label: "Squat", desc: "Squat", img: "/images/posture/63.png" },
  ],
  leg: [
    { value: 0, label: "Neutral", desc: "Balanced", img: "/images/posture/71.png" },
    { value: 1, label: "Moderate", desc: "Uneven", img: "/images/posture/72.png" },
    { value: 2, label: "Extreme", desc: "Unstable", img: "/images/posture/73.png" },
  ],
  handGrip: [
    { value: 0, label: "Good", desc: "Full grip", img: "/images/posture/81.png" },
    { value: 2, label: "Moderate", desc: "Partial", img: "/images/posture/82.png" },
    { value: 4, label: "Poor", desc: "Pinch", img: "/images/posture/83.png" },
  ],
};
/* ==== repetition   */
const repetitionOptions: Record<string, { value: number; label: string; desc?: string }[]> = {
  neck: [
    { value: 0, label: "Occasional", desc: "Movements with occasional pauses" },
    { value: 1, label: "Frequent", desc: "Movements with frequent pauses" },
    { value: 2, label: "No Rest", desc: "Continuous movement with no rest" },
  ],
  back: [
    { value: 0, label: "0–5 reps/min", desc: "0–5 repetitions per minute" },
    { value: 1, label: "6–10 reps/min", desc: "6–10 repetitions per minute" },
    { value: 2, label: ">10 reps/min", desc: "More than 10 repetitions per minute" },
  ],
  shoulder: [
    { value: 0, label: "Occasional", desc: "Movements with occasional pauses" },
    { value: 1, label: "Frequent", desc: "Movements with frequent pauses" },
    { value: 2, label: "No Rest", desc: "Continuous movement with no rest" },
  ],
  lowerArm: [
    { value: 0, label: "Occasional", desc: "Movements with occasional pauses" },
    { value: 1, label: "Frequent", desc: "Movements with frequent pauses" },
    { value: 2, label: "No Rest", desc: "Continuous movement with no rest" },
  ],
  wrist: [
    { value: 0, label: "0–10 reps/min", desc: "0–10 repetitions per minute" },
    { value: 1, label: "11–20 reps/min", desc: "11–20 repetitions per minute" },
    { value: 2, label: ">20 reps/min", desc: "More than 20 repetitions per minute" },
  ],
  knee: [
    { value: 0, label: "0–10 reps/min", desc: "0–10 repetitions per minute" },
    { value: 1, label: "11–20 reps/min", desc: "11–20 repetitions per minute" },
    { value: 2, label: ">20 reps/min", desc: "More than 20 repetitions per minute" },
  ],
  leg: [
    { value: 0, label: "0–10 reps/min", desc: "0–10 repetitions per minute" },
    { value: 1, label: "11–20 reps/min", desc: "11–20 repetitions per minute" },
    { value: 2, label: ">20 reps/min", desc: "More than 20 repetitions per minute" },
  ],
  handGrip: [
    { value: 0, label: "Rare Grip" },
    { value: 2, label: "Repeated Grip" },
    { value: 4, label: "Constant Grip" },
  ],
};
/* ================= TASK OPTIONS ================= */

const taskOptionsMap = {
  taskDuration: ["< 1 hours / day", "1-2 hours / day", "> 2 hours / day"],
  load: ["Male <5kg", "Male 5-15kg", "Male >15kg", "Female <3 Kg", "Female 3-10 Kg", "Female >10 Kg"],
  jobDemand: [
    "Lower arm is positioned across the midline or extended to the side of the body",
    "Manageable levels of physical, mental, or emotional effort required",
    "Significant physical, mental, or emotional effort required",
  ],
  jobSatisfaction: [
    "Strong sense of fulfillment and value in work",
    "General contentment with job duties but some areas for improvement",
    "Feelings of frustration or dissatisfaction with work",
  ],
  socialSupport: [
    "Strong support from supervisors and colleagues,open communication channels, access to training and resources,and mentorship programs and teamwork being encouraged",
    "Some support is available from supervisors and peers, with occasional communication and feedback, but there is limited access to training resources.",
    "There is minimal or no support from supervisors and colleagues, accompanied by poor communication and feedback, as well as a lack of training and resources",
  ],
};

/* ================= MDL ================= */

const mdlOptions = [
  { value: 0, label: "No Pain", color: "bg-green-500", icon: "😊" },
  { value: 1, label: "Mild", color: "bg-lime-500", icon: "🙂" },
  { value: 2, label: "Moderate", color: "bg-yellow-500", icon: "😐" },
  { value: 3, label: "Severe", color: "bg-orange-500", icon: "😣" },
  { value: 4, label: "Extreme", color: "bg-red-600", icon: "😫" },
];

/* ================= COMPONENT ================= */

export default function ErgonomicPage() {
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [scores, setScores] = useState<Record<StepKey, ScoreType>>(() => {
    const init: any = {};
    steps.forEach((s) => {
      init[s.key] = s.type === "body" ? { posture: 0, repetition: 0, mdl: 0 } : { value: 0 };
    });
    return init;
  });

  const current = steps[step];

  const updateBody = (field: keyof BodyScore, value: number) => {
    setScores({
      ...scores,
      [current.key]: {
        ...(scores[current.key] as BodyScore),
        [field]: value,
      },
    });
  };

  const updateTask = (value: number) => {
    setScores({
      ...scores,
      [current.key]: { value },
    });
  };

  const next = () => {
    if (step === steps.length - 1) setIsFinished(true);
    else setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const totalScore = Object.values(scores).reduce((total, s) => {
    if ("value" in s) return total + s.value;
    return total + s.posture + s.repetition + s.mdl;
  }, 0);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
      {isFinished ? (
        <Card className="w-full max-w-5xl shadow-xl rounded-3xl p-8 bg-white">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold mb-4 text-blue-600">Final Result</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="bg-gray-100 p-6 rounded-xl border shadow-inner">
              <div className="flex justify-between text-lg font-semibold text-gray-700">
                <span>Total Score</span>
                <span className="text-blue-600">{totalScore}</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border shadow-inner">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Body Part</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">BP</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">MDL</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {steps.map((s) => {
                    const val = scores[s.key];
                    if (s.type === "body") {
                      const body = val as BodyScore;
                      const total = body.posture + body.repetition + body.mdl;
                      return (
                        <tr key={s.key}>
                          <td className="p-4">{s.title}</td>
                          <td className="p-4 text-center">{body.posture + body.repetition}</td>
                          <td className="p-4 text-center">{body.mdl}</td>
                          <td className="p-4 text-center font-semibold">{total}</td>
                        </tr>
                      );
                    }
                    const task = val as TaskScore;
                    return (
                      <tr key={s.key}>
                        <td className="p-4">{s.title}</td>
                        <td className="p-4 text-center">{task.value}</td>
                        <td className="p-4 text-center">-</td>
                        <td className="p-4 text-center font-semibold">{task.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                className="px-6 py-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setIsFinished(false);
                  setStep(0);
                }}
              >
                Restart
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-4xl shadow-xl rounded-3xl p-8 bg-white">
          <CardHeader className="mb-4 text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">{current.title}</CardTitle>
            <Progress value={((step + 1) / steps.length) * 100} className="mt-2" />
          </CardHeader>

          <CardContent className="space-y-6">
            {current.type === "body" ? (
              <div className="grid md:grid-cols-2 gap-8">
                {/* POSTURE */}
                <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Posture</h3>
                  <RadioGroup
                    value={String((scores[current.key] as BodyScore).posture)}
                    onValueChange={(v) => updateBody("posture", Number(v))}
                    className="flex flex-col gap-2"
                  >
                    {postureOptions[current.key].map((item) => (
                      <Label
                        key={item.value}
                        className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                      >
                        <RadioGroupItem value={String(item.value)} className="mr-3" />
                        <div>
                          <Image src={item.img} alt="" width={400} height={200} className="mr-3 rounded" />
                          <center>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </center>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* REPETITION & MDL */}
                <div className="space-y-4">
                  {/* Repetition */}
                  <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Repetition</h3>
                    <RadioGroup
                      value={String((scores[current.key] as BodyScore).repetition)}
                      onValueChange={(v) => updateBody("repetition", Number(v))}
                      className="flex flex-col gap-2"
                    >
                      {repetitionOptions[current.key].map((item) => (
                        <Label
                          key={item.value}
                          className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                        >
                          <RadioGroupItem value={String(item.value)} className="mr-3" />
                          <div>
                            <p className="font-medium">{item.label}</p>
                            {item.desc && <p className="text-sm text-gray-500">{item.desc}</p>}
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* MDL */}
                  <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">MDL</h3>
                    <RadioGroup
                      value={String((scores[current.key] as BodyScore).mdl)}
                      onValueChange={(v) => updateBody("mdl", Number(v))}
                      className="flex flex-col gap-2"
                    >
                      {mdlOptions.map((m) => (
                        <Label
                          key={m.value}
                          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                        >
                          <RadioGroupItem value={String(m.value)} />

                          <span className="text-xl">{m.icon}</span>

                          <span className={`px-2 py-1 rounded text-white text-sm ${m.color}`}>{m.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Option</h3>
                <RadioGroup
                  value={String((scores[current.key] as TaskScore).value)}
                  onValueChange={(v) => updateTask(Number(v))}
                  className="flex flex-col gap-2"
                >
                  {taskOptionsMap[current.key].map((t, i) => (
                    <Label
                      key={i}
                      className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                      <RadioGroupItem value={String(i)} className="mr-3" />
                      {t}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}
          </CardContent>

          <div className="flex justify-between p-6">
            <Button variant="outline" onClick={prev} className="px-6 py-3 font-semibold hover:bg-gray-100">
              Previous
            </Button>
            <Button onClick={next} className="px-6 py-3 font-semibold hover:bg-blue-100">
              {step === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

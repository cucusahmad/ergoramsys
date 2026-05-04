import { type NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth"; // 👉 1. Import ini

import { pool } from "@/lib/db";

import { authOptions } from "../auth/[...nextauth]/route"; // 👉 2. Import authOptions

export async function POST(req: NextRequest) {
  let client;

  try {
    // 1. KITA PINDAHKAN KONEKSI KE DALAM BLOK TRY
    // 👉 3. Cek siapa yang sedang login
    const session = await getServerSession(authOptions);

    // Jika tidak ada session (belum login), tolak aksesnya!
    if (!session || !(session.user as any).observerId) {
      return NextResponse.json({ success: false, message: "Unauthorized. Silakan login." }, { status: 401 });
    }
    client = await pool.connect();

    const body = await req.json();
    const { userInfo, scores, totalScore, riskLevel } = body;

    const observerId = (session.user as any).observerId;

    await client.query("BEGIN");

    const insertWorkerQuery = `
      INSERT INTO workers (worker_name, worker_position, age, experience)
      VALUES ($1, $2, $3, $4) RETURNING id;
    `;
    const workerValues = [
      userInfo.workerName,
      userInfo.workerPosition,
      userInfo.workerAge ? parseInt(userInfo.workerAge, 10) : null,
      userInfo.workerExperience ? parseInt(userInfo.workerExperience, 10) : null,
    ];
    const workerResult = await client.query(insertWorkerQuery, workerValues);
    const workerId = workerResult.rows[0].id;

    const insertAssessmentQuery = `
      INSERT INTO assessments (observer_id, worker_id, assessment_date, total_score, risk_level)
      VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `;
    const assessmentValues = [observerId, workerId, userInfo.assessmentDate, totalScore, riskLevel];
    const assessmentResult = await client.query(insertAssessmentQuery, assessmentValues);
    const assessmentId = assessmentResult.rows[0].id;

    const insertScoreQuery = `
      INSERT INTO assessment_scores (
        assessment_id, step_key, step_type, posture_score, repetition_score, 
        mdl_score, mdl_left, mdl_right, task_value
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    const taskKeys = ["taskDuration", "load", "jobDemand", "jobSatisfaction", "socialSupport"];

    for (const [key, scoreData] of Object.entries(scores)) {
      const isTask = taskKeys.includes(key);
      const stepType = isTask ? "task" : "body";
      const s = scoreData as any;

      const postureScore = isTask ? null : s.posture;
      const repetitionScore = isTask || key === "handGrip" ? null : s.repetition;
      const mdlScore = isTask ? null : s.mdl;
      const mdlLeft = isTask ? null : s.mdlLeft;
      const mdlRight = isTask ? null : s.mdlRight;
      const taskValue = isTask ? s.value : null;

      await client.query(insertScoreQuery, [
        assessmentId,
        key,
        stepType,
        postureScore,
        repetitionScore,
        mdlScore,
        mdlLeft,
        mdlRight,
        taskValue,
      ]);
    }

    await client.query("COMMIT");
    return NextResponse.json({ success: true, message: "Berhasil menyimpan evaluasi!" }, { status: 201 });
  } catch (error) {
    if (client) await client.query("ROLLBACK");

    // INI AKAN MENUNJUKKAN ERROR ASLINYA DI TERMINAL
    console.error("🔥 DATABASE ERROR TERDETEKSI 🔥");
    console.error(error);

    return NextResponse.json({ success: false, message: "Gagal memproses data." }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}

// ... (biarkan fungsi POST di atasnya) ...

export async function GET(_req: NextRequest) {
  let client;

  try {
    client = await pool.connect();

    // Kita ambil data dari tabel assessments, lalu gabungkan (JOIN)
    // dengan tabel workers dan observers agar namanya muncul.
    const query = `
      SELECT 
        a.id, 
        w.worker_name, 
        o.observer_name, 
        a.assessment_date, 
        a.total_score, 
        a.risk_level
      FROM assessments a
      JOIN workers w ON a.worker_id = w.id
      JOIN observers o ON a.observer_id = o.id
      ORDER BY a.created_at DESC; -- Urutkan dari yang paling baru
    `;

    const result = await client.query(query);

    return NextResponse.json({ success: true, data: result.rows }, { status: 200 });
  } catch (error) {
    console.error("🔥 GET DATABASE ERROR 🔥");
    console.error(error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data dari database." }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}

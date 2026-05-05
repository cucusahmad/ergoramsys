import { type NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> | { id: string } }) {
  let client;
  try {
    client = await pool.connect();

    // Mendukung Next.js versi lama dan baru terkait cara mengambil params
    const params = await context.params;
    const { id } = params;

    // 1. Ambil data Header (Observer & Worker)
    const headerQuery = `
      SELECT 
        a.id, a.assessment_date, a.total_score, a.risk_level,
        w.worker_name, w.worker_position, w.age, w.experience,
        o.observer_name, o.position as observer_position, o.organization
      FROM assessments a
      JOIN workers w ON a.worker_id = w.id
      JOIN observers o ON a.observer_id = o.id
      WHERE a.id = $1
    `;
    const headerResult = await client.query(headerQuery, [id]);

    if (headerResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });
    }

    // 2. Ambil data Detail Skor (assessment_scores)
    const scoreQuery = `
      SELECT step_key, step_type, posture_score, repetition_score, mdl_score, mdl_left, mdl_right, task_value,image_url
      FROM assessment_scores
      WHERE assessment_id = $1
    `;
    const scoreResult = await client.query(scoreQuery, [id]);

    // 3. Gabungkan hasilnya dan kirim ke Frontend
    return NextResponse.json(
      {
        success: true,
        data: {
          ...headerResult.rows[0],
          scores: scoreResult.rows,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("🔥 GET DETAIL ERROR 🔥", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}

// Tambahkan di bagian bawah file src/app/api/asessment/[id]/route.ts

// Perhatikan bagian "Promise<{ id: string }>" dan "await params"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 👉 1. Ubah tipe datanya menjadi Promise
) {
  let client;
  try {
    // 👉 2. Tambahkan 'await' sebelum mengekstrak id
    const { id } = await params; 
    
    client = await pool.connect();
    
    // Mulai transaksi
    await client.query("BEGIN");

    // 1. Hapus data anak (scores) terlebih dahulu agar tidak kena error Foreign Key
    await client.query("DELETE FROM assessment_scores WHERE assessment_id = $1", [id]);

    // 2. Hapus data induk (assessment)
    await client.query("DELETE FROM assessments WHERE id = $1", [id]);

    // Simpan perubahan
    await client.query("COMMIT");

    return NextResponse.json({ success: true, message: "Data berhasil dihapus!" }, { status: 200 });
  } catch (error) {
    if (client) await client.query("ROLLBACK"); // Batalkan jika terjadi error
    console.error("🔥 ERROR DELETE DATABASE 🔥", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus data." }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
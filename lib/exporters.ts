import type { PointTransaction, Student } from "@/types";
import { totalPoints } from "@/lib/scoring";

export async function exportStudentsToExcel(students: Student[]) {
  const XLSX = await import("xlsx");
  const rows = students.map((student) => ({
    "الاسم": student.name,
    "الكود": student.code,
    "الصف": student.grade,
    "رقم الجلوس": student.seatNumber ?? "",
    "Bonus": student.bonus,
    "Minus": student.minus,
    "الصافي": totalPoints(student)
  }));
  const sheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Students");
  XLSX.writeFile(workbook, "bonus-minus-students.xlsx");
}

export async function exportTransactionsToPdf(transactions: PointTransaction[]) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  doc.setFontSize(16);
  doc.text("Bonus Minus Transactions", 14, 18);
  doc.setFontSize(10);
  transactions.slice(0, 30).forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.studentName} | ${item.type} | ${item.points} | ${item.reason}`,
      14,
      30 + index * 7
    );
  });
  doc.save("bonus-minus-transactions.pdf");
}

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Registrations</h1>
    <button
      @click="exportToPDF"
      class="bg-uil-400 text-white px-4 py-2 mb-4 rounded"
    >
      Export to PDF
    </button>
    <table class="w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr>
          <th class="px-4 py-2">Student's Name</th>
          <th class="px-4 py-2">Matric. Number</th>
          <th class="px-4 py-2">Chosen Skill</th>
          <th class="px-4 py-2">Date Registered</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in registrations" :key="reg.registration_id">
          <td class="border px-4 py-2">{{ reg.student.full_name }}</td>
          <td class="border px-4 py-2">{{ reg.student.matric_number }}</td>
          <td class="border px-4 py-2">{{ reg.skill.skill_name }}</td>
          <td class="border px-4 py-2">{{ reg.date_registered }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "@/utils/formatDate.js";

const registrations = ref([]);

const fetchRegistrations = async () => {
  try {
    const { data: regsData } = await axios.get(
      "http://localhost:5000/api/v1/registrations"
    );
    regsData.forEach((reg) => {
      reg.date_registered = formatDate(reg.date_registered);
    });
    registrations.value = regsData;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("GSE 301 Skill Registrations Report, 2023/24 Session", 14, 22);
  doc.setFontSize(12);
  doc.setTextColor(100);

  autoTable(doc, {
    startY: 30,
    head: [["Student", "Matric. Number", "Skill", "Date Registered"]],
    body: registrations.value.map((reg) => [
      reg.student.full_name,
      reg.student.matric_number,
      reg.skill.skill_name,
      reg.date_registered,
    ]),
    styles: { fillColor: "#ffffff", textColor: "#000000" },
    headStyles: { fillColor: "808080", textColor: "#000000" },
    alternateRowStyles: { fillColor: "d3d3d3", textColor: "#000000" },
  });
  doc.save("GSE301-registrations.pdf");
};

onMounted(() => {
  fetchRegistrations();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Registered Students</h1>
    <button
      @click="exportToPDF"
      class="bg-uil-400 text-white px-4 py-2 mb-4 rounded"
    >
      Export to PDF
    </button>
    <table class="w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr>
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Matriculation Number</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Department</th>
          <th class="px-4 py-2">Level</th>
          <!-- <th class="px-4 py-2">Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.student_id">
          <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.full_name }}</td>
          <td class="border px-4 py-2">{{ student.matric_number }}</td>
          <td class="border px-4 py-2">{{ student.email }}</td>
          <td class="border px-4 py-2">{{ student.department }}</td>
          <td class="border px-4 py-2">{{ student.level }}</td>
          <td class="border px-4 py-2">
            <!-- <button
              @click="viewStudentDetails(student)"
              class="bg-uil-400 text-white px-2 py-1 rounded"
            >
              More Details
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Student Details Modal -->
    <!-- <StudentModal
      :student="selectedStudent"
      v-if="showModal"
      @close="closeModal"
    /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import StudentModal from "@/components/StudentModal";

const students = ref([]);
const selectedStudent = ref(null);
const showModal = ref(false);

const fetchStudents = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_PROD}/students`
    );
    students.value = data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const viewStudentDetails = (student) => {
  selectedStudent.value = student;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedStudent.value = null;
};

const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("List of Registered Students for GSE 301", 14, 22);
  doc.setFontSize(12);
  doc.setTextColor(100);

  autoTable(doc, {
    startY: 30,
    head: [["Name", "Matric. Number", "Email", "Department", "Level"]],
    body: students.value.map((student) => [
      student.full_name,
      student.matric_number,
      student.email,
      student.department,
      student.level,
    ]),
    styles: { fillColor: "#ffffff", textColor: "#000000" },
    headStyles: { fillColor: "808080", textColor: "#000000" },
    alternateRowStyles: { fillColor: "d3d3d3", textColor: "#000000" },
  });
  doc.save("GSE301-registered-students.pdf");
};

onMounted(() => {
  fetchStudents();
});
</script>

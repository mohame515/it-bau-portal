/* ==========================================================================
   IT-BAU Student Portal - GPA Calculator Engine
   Support 4.0 Scale & Percentage Scale (BAU Standard)
   ========================================================================== */

const GRADE_POINTS_4 = {
  "A": 4.0,
  "A-": 3.75,
  "B+": 3.5,
  "B": 3.0,
  "B-": 2.75,
  "C+": 2.5,
  "C": 2.0,
  "C-": 1.75,
  "D+": 1.5,
  "D": 1.0,
  "D-": 0.75,
  "F": 0.0
};

class GPACalculator {
  static calculateSemesterGPA(subjects) {
    let totalPoints = 0;
    let totalHours = 0;

    subjects.forEach(sub => {
      const hours = parseFloat(sub.hours) || 0;
      const gradeVal = parseFloat(sub.grade);
      
      if (!isNaN(gradeVal) && hours > 0) {
        totalPoints += gradeVal * hours;
        totalHours += hours;
      }
    });

    if (totalHours === 0) return { gpa: 0, totalHours: 0 };

    const gpa = totalPoints / totalHours;
    return {
      gpa: parseFloat(gpa.toFixed(2)),
      totalHours: totalHours
    };
  }

  static calculateCumulativeGPA(prevGpa, prevHours, semGpa, semHours) {
    const pGpa = parseFloat(prevGpa) || 0;
    const pHours = parseFloat(prevHours) || 0;
    const sGpa = parseFloat(semGpa) || 0;
    const sHours = parseFloat(semHours) || 0;

    const totalHours = pHours + sHours;
    if (totalHours === 0) return 0;

    const totalQualityPoints = (pGpa * pHours) + (sGpa * sHours);
    const newCumGpa = totalQualityPoints / totalHours;

    return parseFloat(newCumGpa.toFixed(2));
  }

  static getRating(gpa, scale = 4.0) {
    if (scale === 4.0) {
      if (gpa >= 3.65) return { text: "امتياز مع مرتبة الشرف 🏆", class: "rating-excellent" };
      if (gpa >= 3.0) return { text: "جيد جداً ⭐", class: "rating-very-good" };
      if (gpa >= 2.5) return { text: "جيد 👍", class: "rating-good" };
      if (gpa >= 2.0) return { text: "مقبول 😐", class: "rating-pass" };
      return { text: "ضعيف / إنذار أكاديمي ⚠️", class: "rating-warning" };
    } else {
      if (gpa >= 84) return { text: "امتياز 🏆", class: "rating-excellent" };
      if (gpa >= 76) return { text: "جيد جداً ⭐", class: "rating-very-good" };
      if (gpa >= 68) return { text: "جيد 👍", class: "rating-good" };
      if (gpa >= 60) return { text: "مقبول 😐", class: "rating-pass" };
      return { text: "ضعيف ⚠️", class: "rating-warning" };
    }
  }
}

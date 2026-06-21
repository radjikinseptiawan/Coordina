export const presentColors = (val: any) => {
  if (!val) return null;
  if (val.status == "ABSENT") {
    return <span className={`text-red-500`}>Absent</span>;
  }

  if (val.status == "PRESENT") {
    return <span className={`text-green-500`}>Present</span>;
  }

  if (val.status == "PERMISSION") {
    return <span className={`text-blue-500`}>Permission</span>;
  }

  if (val.status == "PRESENT") {
    return <span className={`text-green-500`}>Present</span>;
  }

  if (val.status == "SICK") {
    return <span className="text-yellow-500">SICK</span>;
  }
};

export const scoreColors = (val: any) => {
  if (val.attendance.score <= 50) {
    return <p className="text-red-500">{val.attendance.score}%</p>;
  }

  if (val.attendance.score > 50 || val.attendace.score <= 69) {
    return <p className="text-yellow-500">{val.attendance.score}%</p>;
  }

  if (val.attendace.score >= 70 || val.attendace.score < 80) {
    return <p className="text-orange-500">{val.attendance.score}%</p>;
  }

  if (val.attendace.score >= 80) {
    return <p className="text-green-500">{val.attendance.score}%</p>;
  }
};

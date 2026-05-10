import { useEffect, useMemo, useState } from 'react';

export default function FacultyPerformance() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/submission/principal/pending');
        const data = await res.json();

        const formattedData = data.submissions.map((item) => ({
          id: item._id,
          name: item.facultyName,
          department: item.department || 'N/A',

          // TL + TL2 + TL3 combined
          teachingLearning:
            (item.calculatedMarks?.tl || 0) +
            (item.hodEvaluation?.tl2Total || 0) +
            (item.hodEvaluation?.tl3Score || 0),

          research: item.calculatedMarks?.research || 0,
          selfDev: item.calculatedMarks?.sd || 0,

          totalScore:
            item.hodEvaluation?.totalScore ||
            item.calculatedMarks?.finalTotal ||
            0,
        }));

        setFacultyData(formattedData);
      } catch (error) {
        console.error('Error fetching faculty performance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  const departments = useMemo(() => {
    return ['All', ...new Set(facultyData.map((item) => item.department))];
  }, [facultyData]);

  const filteredFaculty = useMemo(() => {
    return facultyData.filter((item) => {
      const matchesDept =
        selectedDept === 'All' || item.department === selectedDept;

      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDept && matchesSearch;
    });
  }, [facultyData, selectedDept, searchTerm]);

  if (loading) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading Faculty Performance...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 border-b gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Faculty Performance Dashboard
            </h2>
            <p className="text-slate-500 text-sm">
              Detailed breakdown of evaluation metrics
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 border border-slate-300 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-widest">
                <th className="px-6 py-4 font-bold">S.No</th>
                <th className="px-6 py-4 font-bold">Faculty Name</th>
                <th className="px-6 py-4 font-bold text-center">Dept</th>
                <th className="px-4 py-4 font-bold text-center">Teaching Learning</th>
                <th className="px-4 py-4 font-bold text-center">Research</th>
                <th className="px-4 py-4 font-bold text-center">Self Dev</th>
                <th className="px-6 py-4 font-bold text-right">Total Score</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((faculty, index) => (
                <tr key={faculty.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-400 text-sm">{index + 1}</td>

                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {faculty.name}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold">
                      {faculty.department}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center font-medium">
                    {faculty.teachingLearning}
                  </td>

                  <td className="px-4 py-4 text-center text-slate-600">
                    {faculty.research}
                  </td>

                  <td className="px-4 py-4 text-center text-slate-600">
                    {faculty.selfDev}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-block w-12 text-center py-1 rounded-lg font-bold text-white ${
                        faculty.totalScore >= 90
                          ? 'bg-emerald-500'
                          : faculty.totalScore >= 80
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                    >
                      {faculty.totalScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredFaculty.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-400 font-medium">
                No faculty records match your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
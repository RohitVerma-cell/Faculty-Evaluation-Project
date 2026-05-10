import { DEPARTMENT_STATS } from '../../data/principalmockdata';
import { useNavigate } from 'react-router-dom';

export default function DepartmentList() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-white">All Departments</h1>

      <table className="w-full text-white">
        <tbody>
          {DEPARTMENT_STATS.map((dept) => (
            <tr
              key={dept.id}
              onClick={() => navigate(`/principal/departments/${dept.id}`)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="p-3">{dept.name}</td>
              <td>{dept.faculty}</td>
              <td>{dept.avgScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
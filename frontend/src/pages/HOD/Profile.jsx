import Card from '../../components/HOD/Card'
import Avatar from '../../components/HOD/Avatar'

const fields = [
  ['Employee ID',    'CSE-HOD-01'],
  ['Department',     'Computer Science'],
  ['Email',          'pkumar@university.ac.in'],
  ['Phone',          '+91-98765-43210'],
  ['Joining Year',   '2006'],
  ['Designation',    'Professor & Head of Department'],
  ['Qualification',  'Ph.D – IIT Delhi'],
  ['Experience',     '18 years'],
]

export default function Profile() {
  return (
    <div className="page-enter max-w-2xl space-y-5">
      <Card className="p-6">
        <div className="flex items-start gap-5 mb-6">
          <Avatar name="Dr. P. Kumar" initials="PK" size={72} />
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 dark:text-white" style={{fontFamily:"'Playfair Display',serif"}}>
              Dr. Pradeep Kumar
            </h2>
            <p className="text-[13px] text-slate-400 mt-1">Head of Department — Computer Science</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold rounded-full">
                ✓ Active HoD
              </span>
              <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-semibold rounded-full">
                Ph.D (IIT Delhi)
              </span>
              <span className="px-2.5 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-[11px] font-semibold rounded-full">
                18 yrs experience
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-5">
          <div className="grid grid-cols-2 gap-3">
            {fields.map(([label, value]) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
                <div className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

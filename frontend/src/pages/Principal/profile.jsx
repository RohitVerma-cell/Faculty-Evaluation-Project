import Card from '../../components/principal/Card'
import Avatar from '../../components/principal/Avatar'

const fields = [
  ['Principal ID',    'PRIN-INST-2024'],
  ['Institution',     'University College of Engineering'],
  ['Official Email',  'principal@university.ac.in'],
  ['Contact Number',  '+91-99999-88888'],
  ['Tenure Started',  '2018'],
  ['Designation',     'Principal & Academic Chair'],
  ['Qualification',   'Post-Doc (Stanford), Ph.D (IISc)'],
  ['Total Experience','25 years'],
]

export default function Profile() {
  return (
    <div className="page-enter max-w-2xl space-y-5">
      <Card className="p-6">
        {/* Header Section */}
        <div className="flex items-start gap-5 mb-6">
          <Avatar name="Dr. Amit Sharma" initials="AS" size={72} />
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 dark:text-white" style={{fontFamily:"'Playfair Display',serif"}}>
              Dr. Amit Sharma
            </h2>
            <p className="text-[13px] text-slate-400 mt-1">Head of Institution — Principal Office</p>
            
            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[11px] font-semibold rounded-full">
                ★ Administrative Head
              </span>
              <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-semibold rounded-full">
                Post-Doc (Stanford)
              </span>
              <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold rounded-full">
                25+ yrs Exp
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
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
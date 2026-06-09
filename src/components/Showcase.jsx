import { websites } from '../data/websites';

function CategoryCard({ site, index, onViewDesigns }) {
  return (
    <div
      className="group relative bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
      onClick={() => onViewDesigns(site)}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${site.accent}`}></div>

      {/* Preview area */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {/* Browser bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-3 py-2 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
          <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
          <div className="flex-1 mx-2 bg-gray-100 rounded-full h-4 flex items-center px-2">
            <span className="text-gray-400 text-[9px]">preview.bitbyte.studio/{site.slug}</span>
          </div>
          <span className="text-[9px] text-blue-500 font-semibold">7 designs</span>
        </div>

        {/* Cover image */}
        <img
          src={site.coverImage}
          alt={site.category}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ marginTop: 28 }}
          loading="lazy"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        {/* Fallback */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${site.previewBg} hidden items-center justify-center`}
          style={{ marginTop: 28 }}
        >
          <span className="text-5xl">{site.icon}</span>
        </div>

        {/* Hover overlay — shows "View 7 Designs" */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center z-20">
          <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-gradient-to-r ${site.accent} text-white font-bold text-sm px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2`}>
            <span>View 7 Designs</span>
            <span className="text-base">→</span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${site.badgeColor}`}>
            {site.badge}
          </span>
          <span className="text-2xl">{site.icon}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
          {site.category}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {site.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {site.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Action row */}
        <div className="flex gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onViewDesigns(site); }}
            className={`flex-1 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r ${site.accent} rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md`}
          >
            View 7 Designs →
          </button>
          <a
            href="#contact"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2.5 text-center text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Showcase({ onViewDesigns }) {
  return (
    <section id="showcase" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4 border border-blue-100">
            7 Designs Per Category
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
            Website Design{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Click any category to explore{' '}
            <strong className="text-gray-700">7 different design styles</strong> with live previews.
            Pick the one that fits your brand.
          </p>
        </div>

        {/* Info banner */}
        <div className="bg-gradient-to-r from-navy-900 to-indigo-900 rounded-2xl p-5 mb-12 flex flex-col sm:flex-row items-center gap-4 text-white shadow-xl">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center text-xl">
            💡
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-sm sm:text-base">
              Each category has 7 curated design variants to choose from.
            </p>
            <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
              Click a category card → browse 7 designs → pick your favourite → come back any time.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-blue-400 to-cyan-400 text-navy-900 font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Get Free Quote →
          </a>
        </div>

        {/* Category cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {websites.map((site, i) => (
            <CategoryCard
              key={site.id}
              site={site}
              index={i}
              onViewDesigns={onViewDesigns}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

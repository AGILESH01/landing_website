import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, Filter, CheckCircle2 } from 'lucide-react';
import { FabricCard3D } from '../components/3d/FabricCard3D';
import { fabricService } from '../services/fabricService';
import { Fabric, FabricCategory, CatalogueFilterState } from '../types';
import { PATTERN_OPTIONS, APPLICATION_OPTIONS } from '../data/seedData';

export const CataloguePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState<FabricCategory[]>([]);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL search params
  const filterState: CatalogueFilterState = useMemo(() => ({
    searchQuery: searchParams.get('q') || '',
    categorySlug: searchParams.get('category') || 'all',
    pattern: searchParams.get('pattern') || 'all',
    application: searchParams.get('application') || 'all',
    sortBy: (searchParams.get('sort') as CatalogueFilterState['sortBy']) || 'featured',
  }), [searchParams]);

  // Load Categories & Fabrics
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, items] = await Promise.all([
          fabricService.getCategories(),
          fabricService.getFabrics(filterState),
        ]);
        setCategories(cats);
        setFabrics(items);
      } catch (err) {
        console.error('Failed to load catalogue data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterState]);

  // Filter Update Handler
  const updateFilter = (key: keyof CatalogueFilterState, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === 'all') {
      if (key === 'searchQuery') params.delete('q');
      else if (key === 'categorySlug') params.delete('category');
      else if (key === 'sortBy') params.delete('sort');
      else params.delete(key);
    } else {
      if (key === 'searchQuery') params.set('q', value);
      else if (key === 'categorySlug') params.set('category', value);
      else if (key === 'sortBy') params.set('sort', value);
      else params.set(key, value);
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = Boolean(
    filterState.searchQuery ||
    filterState.categorySlug !== 'all' ||
    filterState.pattern !== 'all' ||
    filterState.application !== 'all' ||
    filterState.sortBy !== 'featured'
  );

  return (
    <div className="bg-cream-100 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
            <span>B2B Fabric Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Woven Fabric Catalogue
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Browse our core woven fabric categories. From pure cotton shirting to resilient poly-cotton twills and yarn-dyed checks, all fabrics are manufactured and processed to your custom specifications.
          </p>
        </div>

        {/* Search & Top Action Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-cream-300 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search fabrics by name, blend, pattern..."
                value={filterState.searchQuery}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/50"
              />
            </div>

            {/* Controls: Sort and Mobile Filter Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-cream-100 border border-cream-300 text-navy-900"
              >
                <SlidersHorizontal className="w-4 h-4 text-gold-600" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 whitespace-nowrap font-medium">Sort by:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="py-2 pl-3 pr-8 rounded-xl border border-cream-300 text-xs font-medium text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                >
                  <option value="featured">Featured First</option>
                  <option value="name_asc">Name (A – Z)</option>
                  <option value="name_desc">Name (Z – A)</option>
                  <option value="newest">Newest Additions</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Category Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-cream-200">
            <button
              onClick={() => updateFilter('categorySlug', 'all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterState.categorySlug === 'all'
                  ? 'bg-navy-900 text-white font-semibold'
                  : 'bg-cream-100 text-slate-700 hover:bg-cream-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateFilter('categorySlug', cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  filterState.categorySlug === cat.slug
                    ? 'bg-navy-900 text-white font-semibold'
                    : 'bg-cream-100 text-slate-700 hover:bg-cream-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout with Sidebar Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar (Desktop & Mobile Drawer) */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-sm space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                <div className="flex items-center gap-2 text-navy-900 font-serif font-bold text-base">
                  <Filter className="w-4 h-4 text-gold-600" />
                  <span>Filter Catalogue</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                  Fabric Type
                </label>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => updateFilter('categorySlug', 'all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                      filterState.categorySlug === 'all'
                        ? 'bg-gold-500/15 text-navy-950 font-bold'
                        : 'text-slate-600 hover:bg-cream-100'
                    }`}
                  >
                    All Types
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => updateFilter('categorySlug', c.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                        filterState.categorySlug === c.slug
                          ? 'bg-gold-500/15 text-navy-950 font-bold'
                          : 'text-slate-600 hover:bg-cream-100'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pattern Filter */}
              <div className="pt-4 border-t border-cream-200">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                  Pattern
                </label>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => updateFilter('pattern', 'all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                      filterState.pattern === 'all'
                        ? 'bg-gold-500/15 text-navy-950 font-bold'
                        : 'text-slate-600 hover:bg-cream-100'
                    }`}
                  >
                    All Patterns
                  </button>
                  {PATTERN_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => updateFilter('pattern', p)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                        filterState.pattern === p
                          ? 'bg-gold-500/15 text-navy-950 font-bold'
                          : 'text-slate-600 hover:bg-cream-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Application Filter */}
              <div className="pt-4 border-t border-cream-200">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                  Intended Application
                </label>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => updateFilter('application', 'all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                      filterState.application === 'all'
                        ? 'bg-gold-500/15 text-navy-950 font-bold'
                        : 'text-slate-600 hover:bg-cream-100'
                    }`}
                  >
                    All Applications
                  </button>
                  {APPLICATION_OPTIONS.map((a) => (
                    <button
                      key={a}
                      onClick={() => updateFilter('application', a)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                        filterState.application === a
                          ? 'bg-gold-500/15 text-navy-950 font-bold'
                          : 'text-slate-600 hover:bg-cream-100'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Policy Callout */}
              <div className="p-3.5 rounded-xl bg-cream-100 border border-gold-500/20 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 text-navy-900 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                  <span>Sample Policy</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Fabric sample swatches can be dispatched to prospective garment buyers upon request.
                </p>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 rounded-2xl bg-white border border-cream-300 animate-pulse" />
                ))}
              </div>
            ) : fabrics.length > 0 ? (
              <div>
                <div className="mb-4 text-xs text-slate-500 flex items-center justify-between">
                  <span>Showing {fabrics.length} fabric {fabrics.length === 1 ? 'variety' : 'varieties'}</span>
                  {hasActiveFilters && (
                    <span className="text-gold-600 font-medium">Filtered Results</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {fabrics.map((fabric) => (
                    <FabricCard3D key={fabric.id} fabric={fabric} />
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl p-12 text-center border border-cream-300 shadow-sm max-w-md mx-auto my-8">
                <div className="w-14 h-14 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-slate-400 mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">
                  No Fabrics Found
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  We could not find any fabric matching your active search or filter criteria. Try adjusting the parameters or clear all filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gold-400" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

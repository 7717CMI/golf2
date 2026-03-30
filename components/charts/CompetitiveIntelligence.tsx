'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

interface CIRecord {
  country: string
  companyBrand: string
  model: string
  productType: string
  seating: string
  usage: string
  unitsSold2022: number
  unitsSold2023: number
  unitsSold2024: number
  unitsSold2025: number
  marketShare2025: number
  payloadLbs: number
  towingLbs: number
  motorHP: number
  speedMph: number
  distributorMarginPercent: number
  distributorMarginUSD: number
  distributorPriceUSD: number
  retailerMarginPercent: number
  retailerMarginUSD: number
  retailPriceUSD: number
}

type SortDir = 'asc' | 'desc' | null
type SortKey = keyof CIRecord

interface CompetitiveIntelligenceProps {
  height?: number
}

function formatNumber(val: number | string): string {
  const n = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(n) || n === null || n === undefined) return '-'
  return n.toLocaleString('en-US')
}

function formatDollar(val: number | string): string {
  const n = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(n) || n === null || n === undefined) return '-'
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function formatPercent(val: number | string): string {
  const n = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(n) || n === null || n === undefined) return '-'
  return (n * 100).toFixed(1) + '%'
}

function clean(val: string | undefined | null): string {
  if (!val || typeof val !== 'string' || val.trim() === '') return ''
  return val.trim()
}

function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: string[]
  selected: string[]
  onChange: (vals: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val))
    } else {
      onChange([...selected, val])
    }
  }

  const displayText = selected.length === 0
    ? `All ${label}`
    : selected.length <= 2
      ? selected.join(', ')
      : `${selected.length} selected`

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded px-2 py-1 text-[10px] bg-white text-black min-w-[120px] text-left flex items-center justify-between gap-1"
      >
        <span className="truncate">{displayText}</span>
        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto min-w-[160px]">
          <div className="px-2 py-1 border-b border-gray-200 flex gap-2">
            <button
              onClick={() => onChange([...options])}
              className="text-[9px] text-blue-600 hover:underline"
            >
              Select All
            </button>
            <button
              onClick={() => onChange([])}
              className="text-[9px] text-blue-600 hover:underline"
            >
              Clear
            </button>
          </div>
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-100 cursor-pointer text-[10px] text-black"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="w-3 h-3"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function SingleSelectDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: string[]
  selected: string
  onChange: (val: string) => void
}) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-[10px] bg-white text-black min-w-[100px]"
    >
      <option value="">All {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

interface ColumnDef {
  key: SortKey
  label: string
  format: (val: number | string) => string
  align: 'left' | 'center'
  minW: string
}

const COLUMNS: ColumnDef[] = [
  { key: 'country', label: 'Country', format: (v) => String(v || '-'), align: 'left', minW: '100px' },
  { key: 'companyBrand', label: 'Company/Brand', format: (v) => String(v || '-'), align: 'left', minW: '110px' },
  { key: 'model', label: 'Model', format: (v) => String(v || '-'), align: 'left', minW: '120px' },
  { key: 'productType', label: 'Product Type', format: (v) => String(v || '-'), align: 'center', minW: '100px' },
  { key: 'seating', label: 'Seating', format: (v) => String(v || '-'), align: 'center', minW: '70px' },
  { key: 'usage', label: 'Usage', format: (v) => String(v || '-'), align: 'center', minW: '110px' },
  { key: 'unitsSold2022', label: 'Units 2022', format: formatNumber, align: 'center', minW: '75px' },
  { key: 'unitsSold2023', label: 'Units 2023', format: formatNumber, align: 'center', minW: '75px' },
  { key: 'unitsSold2024', label: 'Units 2024', format: formatNumber, align: 'center', minW: '75px' },
  { key: 'unitsSold2025', label: 'Units 2025', format: formatNumber, align: 'center', minW: '75px' },
  { key: 'marketShare2025', label: 'Market Share 2025 (%)', format: formatPercent, align: 'center', minW: '100px' },
  { key: 'payloadLbs', label: 'Payload (lbs)', format: formatNumber, align: 'center', minW: '80px' },
  { key: 'towingLbs', label: 'Towing (lbs)', format: formatNumber, align: 'center', minW: '80px' },
  { key: 'motorHP', label: 'Motor (HP)', format: formatNumber, align: 'center', minW: '70px' },
  { key: 'speedMph', label: 'Speed (mph)', format: formatNumber, align: 'center', minW: '70px' },
  { key: 'distributorMarginPercent', label: 'Dist. Margin %', format: formatPercent, align: 'center', minW: '85px' },
  { key: 'distributorMarginUSD', label: 'Dist. Margin $', format: formatDollar, align: 'center', minW: '90px' },
  { key: 'distributorPriceUSD', label: 'Dist. Price (USD)', format: formatDollar, align: 'center', minW: '100px' },
  { key: 'retailerMarginPercent', label: 'Ret. Margin %', format: formatPercent, align: 'center', minW: '85px' },
  { key: 'retailerMarginUSD', label: 'Ret. Margin $', format: formatDollar, align: 'center', minW: '90px' },
  { key: 'retailPriceUSD', label: 'Retail Price (USD)', format: formatDollar, align: 'center', minW: '100px' },
]

export function CompetitiveIntelligence({ height }: CompetitiveIntelligenceProps) {
  const [data, setData] = useState<CIRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedProductType, setSelectedProductType] = useState('')
  const [selectedSeating, setSelectedSeating] = useState('')

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  useEffect(() => {
    fetch('/data/competitive-intelligence.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load data')
        return res.json()
      })
      .then((json: CIRecord[]) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Derive unique filter options
  const filterOptions = useMemo(() => {
    const countries = [...new Set(data.map((r) => clean(r.country)).filter(Boolean))].sort()
    const companies = [...new Set(data.map((r) => clean(r.companyBrand)).filter(Boolean))].sort()
    const productTypes = [...new Set(data.map((r) => clean(r.productType)).filter(Boolean))].sort()
    const seatings = [...new Set(data.map((r) => clean(r.seating)).filter(Boolean))].sort()
    return { countries, companies, productTypes, seatings }
  }, [data])

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter((r) => {
      if (selectedCountries.length > 0 && !selectedCountries.includes(clean(r.country))) return false
      if (selectedCompanies.length > 0 && !selectedCompanies.includes(clean(r.companyBrand))) return false
      if (selectedProductType && clean(r.productType) !== selectedProductType) return false
      if (selectedSeating && clean(r.seating) !== selectedSeating) return false
      return true
    })
  }, [data, selectedCountries, selectedCompanies, selectedProductType, selectedSeating])

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return filteredData
    const sorted = [...filteredData]
    sorted.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      const aStr = String(aVal || '')
      const bStr = String(bVal || '')
      return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
    })
    return sorted
  }, [filteredData, sortKey, sortDir])

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        if (sortDir === 'asc') setSortDir('desc')
        else if (sortDir === 'desc') {
          setSortKey(null)
          setSortDir(null)
        }
      } else {
        setSortKey(key)
        setSortDir('asc')
      }
    },
    [sortKey, sortDir]
  )

  const getSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return ' \u2195'
    if (sortDir === 'asc') return ' \u2191'
    return ' \u2193'
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-gray-500 text-sm">Loading competitive intelligence data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-red-500 text-sm">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-4">Competitive Intelligence 2025</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-[10px] font-semibold text-gray-600 uppercase">Filters:</span>
        <MultiSelectDropdown
          label="Countries"
          options={filterOptions.countries}
          selected={selectedCountries}
          onChange={setSelectedCountries}
        />
        <MultiSelectDropdown
          label="Companies"
          options={filterOptions.companies}
          selected={selectedCompanies}
          onChange={setSelectedCompanies}
        />
        <SingleSelectDropdown
          label="Product Type"
          options={filterOptions.productTypes}
          selected={selectedProductType}
          onChange={setSelectedProductType}
        />
        <SingleSelectDropdown
          label="Seating"
          options={filterOptions.seatings}
          selected={selectedSeating}
          onChange={setSelectedSeating}
        />
        {(selectedCountries.length > 0 || selectedCompanies.length > 0 || selectedProductType || selectedSeating) && (
          <button
            onClick={() => {
              setSelectedCountries([])
              setSelectedCompanies([])
              setSelectedProductType('')
              setSelectedSeating('')
            }}
            className="text-[10px] text-red-500 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Table */}
      <div
        className="overflow-auto border border-gray-300 rounded"
        style={{ maxHeight: height ? height - 120 : 600 }}
      >
        <table className="min-w-full border-collapse text-[10px]">
          <thead className="sticky top-0 z-10">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white cursor-pointer select-none whitespace-nowrap hover:bg-[#3d6a87]"
                  style={{ minWidth: col.minW }}
                >
                  {col.label}
                  <span className="text-[8px] opacity-80">{getSortIndicator(col.key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}>
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className={`border border-gray-300 px-2 py-1.5 text-[10px] text-black ${
                      col.align === 'center' ? 'text-center' : ''
                    } ${col.key === 'retailPriceUSD' ? 'font-semibold' : ''} ${
                      col.key === 'companyBrand' || col.key === 'country' ? 'font-medium' : ''
                    } whitespace-nowrap`}
                  >
                    {col.format(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="text-center py-8 text-gray-500 text-sm">
                  No records match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-2 text-[10px] text-gray-500 flex justify-between">
        <span>
          Showing {sortedData.length.toLocaleString()} of {data.length.toLocaleString()} total records
        </span>
        <span>
          {selectedCountries.length > 0 || selectedCompanies.length > 0 || selectedProductType || selectedSeating
            ? 'Filters active'
            : 'No filters applied'}
        </span>
      </div>
    </div>
  )
}

export default CompetitiveIntelligence

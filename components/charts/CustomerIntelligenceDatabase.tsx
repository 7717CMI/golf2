'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CustomerData {
  // Customer Information
  customerName: string
  businessOverview: string
  industryVertical: string
  assetFootprint: string
  estimatedFleetSize: string
  ownershipType: string
  // Contact Details
  keyContactPerson: string
  designation: string
  emailAddress: string
  phoneNumber: string
  linkedInProfile: string
  websiteUrl: string
  // Professional Drivers (for Proposition 2 & 3)
  primaryMotivation: string
  keyPainPoints: string
  upcomingTriggers: string
  // Purchasing Behaviour Metrics (for Proposition 3)
  budgetOwnership: string
  procurementModel: string
  buyingFrequency: string
  decisionDrivers: string
  // Solution Requirements (for Proposition 3)
  preferredProductType: string
  preferredConfiguration: string
  performanceExpectations: string
  technologyAddOns: string
  // CMI Insights (for Proposition 3)
  customerBenchmarking: string
  additionalComments: string
}

// Sample data for Golf Cart Industry
const sampleCustomerData: CustomerData[] = [
  {
    customerName: 'Emirates Golf Club',
    businessOverview: 'Hospitality & Golf Resort',
    industryVertical: 'Golf & Leisure',
    assetFootprint: '2 championship golf courses, 1 resort',
    estimatedFleetSize: '85 units (70 passenger, 15 utility)',
    ownershipType: 'Private enterprise',
    keyContactPerson: 'Ahmed Al Maktoum',
    designation: 'Operations Director',
    emailAddress: 'a.almaktoum@emiratesgolf.com',
    phoneNumber: '+971 4 380 1234',
    linkedInProfile: 'linkedin.com/in/ahmedalmaktoum',
    websiteUrl: 'www.dubaigolf.com',
    primaryMotivation: 'Guest experience and comfort, Sustainability goals',
    keyPainPoints: 'Battery downtime and charging inefficiencies, High maintenance costs',
    upcomingTriggers: 'Replacement cycle of existing carts, Sustainability mandates',
    budgetOwnership: 'Central corporate budget',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'Multi-year replacement cycle (5 years)',
    decisionDrivers: 'Battery warranty and lifecycle, After-sales support',
    preferredProductType: 'Electric golf carts, Lithium battery preference',
    preferredConfiguration: '4-seater, Passenger focus, Custom branding',
    performanceExpectations: '36-hole battery runtime, Fast charging',
    technologyAddOns: 'Fleet tracking, GPS navigation',
    customerBenchmarking: 'High potential - Premium segment',
    additionalComments: 'Looking to upgrade entire fleet to electric by 2025'
  },
  {
    customerName: 'Atlantis The Palm',
    businessOverview: 'Luxury Resort & Hotel',
    industryVertical: 'Hospitality & Tourism',
    assetFootprint: '1 mega resort, 2 water parks',
    estimatedFleetSize: '120 units (80 passenger, 40 utility)',
    ownershipType: 'Private enterprise',
    keyContactPerson: 'Sarah Johnson',
    designation: 'VP - Facilities Management',
    emailAddress: 's.johnson@atlantis.com',
    phoneNumber: '+971 4 426 5000',
    linkedInProfile: 'linkedin.com/in/sarahjohnson-atlantis',
    websiteUrl: 'www.atlantis.com',
    primaryMotivation: 'Internal mobility efficiency, Guest experience',
    keyPainPoints: 'Fleet availability during peak seasons, Inconsistent service quality',
    upcomingTriggers: 'New resort expansion, Increase in tourist volumes',
    budgetOwnership: 'Site-level operational budget',
    procurementModel: 'Leasing or rental',
    buyingFrequency: 'Annual contract renewal',
    decisionDrivers: 'Total cost of ownership, Local service presence',
    preferredProductType: 'Electric golf carts',
    preferredConfiguration: '6-seater, Customization (AC, enclosure)',
    performanceExpectations: 'Durability in heat and humidity',
    technologyAddOns: 'Fleet tracking, Preventive maintenance alerts',
    customerBenchmarking: 'High potential - Large fleet',
    additionalComments: 'Interested in managed fleet services'
  },
  {
    customerName: 'Dubai International Airport',
    businessOverview: 'International Airport Operations',
    industryVertical: 'Airports & Transportation Hubs',
    assetFootprint: '3 terminals, 2 concourses',
    estimatedFleetSize: '250 units (200 passenger, 50 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Mohammed Al Rasheed',
    designation: 'Director - Ground Operations',
    emailAddress: 'm.alrasheed@dubaiairports.ae',
    phoneNumber: '+971 4 224 5555',
    linkedInProfile: 'linkedin.com/in/mohammedalrasheed',
    websiteUrl: 'www.dubaiairports.ae',
    primaryMotivation: 'Internal mobility efficiency, Noise reduction indoor',
    keyPainPoints: 'Limited spare parts availability, Battery downtime',
    upcomingTriggers: 'Terminal expansion, Green mobility targets',
    budgetOwnership: 'Central corporate budget, CAPEX',
    procurementModel: 'Project-based procurement',
    buyingFrequency: 'Phased rollout across sites',
    decisionDrivers: 'After-sales support and SLA, Brand reputation',
    preferredProductType: 'Electric golf carts, Lithium battery',
    preferredConfiguration: '8+ seater, Passenger focus, Luggage racks',
    performanceExpectations: 'High payload capacity, 12+ hour runtime',
    technologyAddOns: 'Fleet tracking, Charging management systems',
    customerBenchmarking: 'High potential - Strategic account',
    additionalComments: 'Government tender process, long procurement cycle'
  },
  {
    customerName: 'DAMAC Properties',
    businessOverview: 'Real Estate Developer',
    industryVertical: 'Residential Communities',
    assetFootprint: '5 residential communities, 2 golf courses',
    estimatedFleetSize: '65 units (40 passenger, 25 utility)',
    ownershipType: 'Private enterprise',
    keyContactPerson: 'Fatima Al Hashimi',
    designation: 'Community Services Manager',
    emailAddress: 'f.alhashimi@damac.com',
    phoneNumber: '+971 4 373 1000',
    linkedInProfile: 'linkedin.com/in/fatimaalhashimi',
    websiteUrl: 'www.damacproperties.com',
    primaryMotivation: 'Cost optimization vs manpower, Internal mobility',
    keyPainPoints: 'High maintenance costs, Inconsistent service quality from dealers',
    upcomingTriggers: 'New township launch, Replacement cycle',
    budgetOwnership: 'Site-level operational budget',
    procurementModel: 'Managed mobility contracts',
    buyingFrequency: 'One-time bulk purchase',
    decisionDrivers: 'Total cost of ownership, Local service presence',
    preferredProductType: 'Electric golf carts',
    preferredConfiguration: '4-seater, Utility focus',
    performanceExpectations: 'Durability in heat and sand environments',
    technologyAddOns: 'Fleet tracking',
    customerBenchmarking: 'Medium potential - Growing',
    additionalComments: 'Multiple sites, potential for standardized fleet'
  },
  {
    customerName: 'DP World Logistics',
    businessOverview: 'Port & Logistics Operations',
    industryVertical: 'Industrial & Logistics',
    assetFootprint: '3 port facilities, 5 warehouses',
    estimatedFleetSize: '180 units (30 passenger, 150 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Khalid Rahman',
    designation: 'Head of Fleet Management',
    emailAddress: 'k.rahman@dpworld.com',
    phoneNumber: '+971 4 881 5000',
    linkedInProfile: 'linkedin.com/in/khalidrahman-dpworld',
    websiteUrl: 'www.dpworld.com',
    primaryMotivation: 'Cost optimization, Sustainability goals',
    keyPainPoints: 'Battery downtime, High maintenance costs of aging fleets',
    upcomingTriggers: 'Sustainability mandates, Terminal expansion',
    budgetOwnership: 'Central corporate budget, OPEX for lease',
    procurementModel: 'Leasing or rental',
    buyingFrequency: 'Multi-year replacement cycle',
    decisionDrivers: 'Total cost of ownership, Battery warranty',
    preferredProductType: 'ICE carts for rugged sites, Electric for indoor',
    preferredConfiguration: '2-seater utility, High payload',
    performanceExpectations: 'Heavy duty, 16+ hour runtime',
    technologyAddOns: 'Fleet tracking, Preventive maintenance alerts',
    customerBenchmarking: 'High potential - Large fleet',
    additionalComments: 'Focus on utility carts, industrial grade'
  },
  {
    customerName: 'King Fahd International Airport',
    businessOverview: 'International Airport',
    industryVertical: 'Airports & Transportation Hubs',
    assetFootprint: '1 main terminal, VIP terminal',
    estimatedFleetSize: '95 units (80 passenger, 15 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Abdullah Al Saud',
    designation: 'Operations Manager',
    emailAddress: 'a.alsaud@kfia.gov.sa',
    phoneNumber: '+966 13 883 4000',
    linkedInProfile: 'linkedin.com/in/abdullahalsaud',
    websiteUrl: 'www.kfia.gov.sa',
    primaryMotivation: 'Guest experience, Internal mobility efficiency',
    keyPainPoints: 'Fleet availability during peak seasons, Spare parts',
    upcomingTriggers: 'Vision 2030 projects, Airport modernization',
    budgetOwnership: 'Central corporate budget',
    procurementModel: 'Project-based procurement',
    buyingFrequency: 'Phased rollout',
    decisionDrivers: 'Brand reputation, After-sales support',
    preferredProductType: 'Electric golf carts',
    preferredConfiguration: '6-seater with AC, Premium finish',
    performanceExpectations: 'Durability in heat, Fast charging',
    technologyAddOns: 'GPS navigation, Fleet tracking',
    customerBenchmarking: 'High potential - Government',
    additionalComments: 'Part of Saudi Vision 2030 modernization'
  },
  {
    customerName: 'Yas Island Resort',
    businessOverview: 'Entertainment & Resort Destination',
    industryVertical: 'Hospitality & Tourism',
    assetFootprint: '4 theme parks, 2 hotels, F1 circuit',
    estimatedFleetSize: '200 units (150 passenger, 50 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Lina Al Mubarak',
    designation: 'Director of Operations',
    emailAddress: 'l.almubarak@yasland.ae',
    phoneNumber: '+971 2 509 8000',
    linkedInProfile: 'linkedin.com/in/linaalmubarak',
    websiteUrl: 'www.yasisland.ae',
    primaryMotivation: 'Guest experience and comfort, Internal mobility',
    keyPainPoints: 'Fleet availability during events, Battery downtime',
    upcomingTriggers: 'New attraction openings, F1 season expansion',
    budgetOwnership: 'Central corporate budget',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'Annual additions, 5-year replacement',
    decisionDrivers: 'After-sales support, Total cost of ownership',
    preferredProductType: 'Electric golf carts, Lithium battery',
    preferredConfiguration: '4-6 seater, Custom theming',
    performanceExpectations: 'All-day runtime, Quick charge capability',
    technologyAddOns: 'Fleet tracking, Charging management',
    customerBenchmarking: 'High potential - Strategic',
    additionalComments: 'Large diverse fleet across multiple venues'
  },
  {
    customerName: 'Al Mouj Golf',
    businessOverview: 'Golf Course & Community',
    industryVertical: 'Golf & Leisure',
    assetFootprint: '1 championship course, residential community',
    estimatedFleetSize: '45 units (40 passenger, 5 utility)',
    ownershipType: 'Private enterprise',
    keyContactPerson: 'James Mitchell',
    designation: 'Golf Operations Manager',
    emailAddress: 'j.mitchell@almoujgolf.com',
    phoneNumber: '+968 2452 0000',
    linkedInProfile: 'linkedin.com/in/jamesmitchell-golf',
    websiteUrl: 'www.almoujgolf.com',
    primaryMotivation: 'Guest experience, Sustainability goals',
    keyPainPoints: 'High maintenance costs, Inconsistent dealer service',
    upcomingTriggers: 'Replacement cycle, Green certification goals',
    budgetOwnership: 'Site-level operational budget',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'One-time bulk purchase',
    decisionDrivers: 'Battery warranty, Local service presence',
    preferredProductType: 'Electric golf carts',
    preferredConfiguration: '2-4 seater, Golf specific features',
    performanceExpectations: '36-hole runtime, Hill climbing ability',
    technologyAddOns: 'GPS navigation',
    customerBenchmarking: 'Medium potential - Niche',
    additionalComments: 'Premium golf destination in Oman'
  },
  {
    customerName: 'Hamad International Airport',
    businessOverview: 'International Hub Airport',
    industryVertical: 'Airports & Transportation Hubs',
    assetFootprint: '2 terminals, 5 concourses',
    estimatedFleetSize: '300 units (250 passenger, 50 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Nasser Al Thani',
    designation: 'VP Ground Services',
    emailAddress: 'n.althani@qatarairways.com.qa',
    phoneNumber: '+974 4010 6666',
    linkedInProfile: 'linkedin.com/in/nasseralthani',
    websiteUrl: 'www.dohahamadairport.com',
    primaryMotivation: 'Premium passenger experience, Efficiency',
    keyPainPoints: 'Fleet management complexity, Charging infrastructure',
    upcomingTriggers: 'World Cup legacy projects, Terminal expansion',
    budgetOwnership: 'Central corporate budget, CAPEX',
    procurementModel: 'Framework agreement',
    buyingFrequency: 'Phased rollout',
    decisionDrivers: 'Brand reputation, Premium quality',
    preferredProductType: 'Electric golf carts, Premium models',
    preferredConfiguration: '8+ seater, Luxury interior, AC',
    performanceExpectations: 'Premium finish, Quiet operation',
    technologyAddOns: 'Full telematics, Charging management',
    customerBenchmarking: 'High potential - Premium segment',
    additionalComments: 'Focus on luxury and premium passenger experience'
  },
  {
    customerName: 'Jebel Ali Free Zone',
    businessOverview: 'Industrial Free Zone',
    industryVertical: 'Industrial & Logistics',
    assetFootprint: '15 industrial zones, logistics parks',
    estimatedFleetSize: '120 units (20 passenger, 100 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Rashid Al Mahmoud',
    designation: 'Facilities Director',
    emailAddress: 'r.almahmoud@jafza.ae',
    phoneNumber: '+971 4 881 1111',
    linkedInProfile: 'linkedin.com/in/rashidalmahmoud',
    websiteUrl: 'www.jafza.ae',
    primaryMotivation: 'Cost optimization, Sustainability mandates',
    keyPainPoints: 'Aging fleet maintenance, Spare parts availability',
    upcomingTriggers: 'Green zone certification, Fleet modernization',
    budgetOwnership: 'OPEX for lease',
    procurementModel: 'Managed mobility contracts',
    buyingFrequency: 'Multi-year contract',
    decisionDrivers: 'Total cost of ownership, Service SLA',
    preferredProductType: 'Mix of Electric and ICE for heavy duty',
    preferredConfiguration: 'Utility focus, High payload',
    performanceExpectations: 'Industrial grade durability',
    technologyAddOns: 'Fleet tracking, Maintenance alerts',
    customerBenchmarking: 'High potential - Large fleet',
    additionalComments: 'Industrial utility carts primary focus'
  }
]

interface PrepositionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function Preposition({ title, isOpen, onToggle, children }: PrepositionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg font-semibold text-black">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-2 pb-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  )
}

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

export default function CustomerIntelligenceDatabase({ title }: CustomerIntelligenceDatabaseProps) {
  const [openPreposition, setOpenPreposition] = useState<number | null>(1)

  const togglePreposition = (num: number) => {
    setOpenPreposition(openPreposition === num ? null : num)
  }

  // Preposition 1 Table - Customer Information + Contact Details
  const renderPreposition1Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Customer Name/Company Name</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Business Overview</div>
              <div className="font-normal text-[10px] text-gray-600">(hospitality, transportation, real estate)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Industry Vertical</div>
              <div className="font-normal text-[10px] text-gray-600">(Golf & Leisure, Hospitality & Tourism, Airports & Transportation Hubs, Industrial & Logistics, Residential Communities)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Asset Footprint / Mobility Environment</div>
              <div className="font-normal text-[10px] text-gray-600">(Number of golf courses, resorts, terminals, campuses, or industrial sites)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Estimated Fleet Size (Units)</div>
              <div className="font-normal text-[10px] text-gray-600">(Current golf cart fleet size, Passenger vs utility split)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Ownership Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Government / Semi-government, Private enterprise, Public private partnership, Family owned resort or developer)</div>
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Designation/Role</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Phone/WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Website URL</th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.businessOverview}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.industryVertical}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.assetFootprint}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.estimatedFleetSize}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.ownershipType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 2 Table - Same as Preposition 1 + Professional Drivers
  const renderPreposition2Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={3} className="bg-[#90EE90] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Professional Drivers
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Customer Name/Company Name</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Business Overview</div>
              <div className="font-normal text-[10px] text-gray-600">(hospitality, transportation, real estate)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Industry Vertical</div>
              <div className="font-normal text-[10px] text-gray-600">(Golf & Leisure, Hospitality & Tourism, Airports & Transportation Hubs, Industrial & Logistics, Residential Communities)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Asset Footprint / Mobility Environment</div>
              <div className="font-normal text-[10px] text-gray-600">(Number of golf courses, resorts, terminals, campuses, or industrial sites)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Estimated Fleet Size (Units)</div>
              <div className="font-normal text-[10px] text-gray-600">(Current golf cart fleet size, Passenger vs utility split)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Ownership Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Government / Semi-government, Private enterprise, Public private partnership, Family owned resort or developer)</div>
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Designation/Role</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Phone/WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Website URL</th>
            {/* Professional Drivers */}
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Primary Motivation for Golf Cart Adoption</div>
              <div className="font-normal text-[10px] text-gray-600">(Guest experience and comfort, Internal mobility efficiency, Cost optimization vs manpower, Sustainability and low-emission goals, Noise reduction and indoor usability)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Key Pain Points</div>
              <div className="font-normal text-[10px] text-gray-600">(High maintenance costs of aging fleets, Battery downtime and charging inefficiencies, Limited spare parts availability, Inconsistent service quality from dealers, Fleet availability during peak seasons)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Upcoming Triggers and Initiatives</div>
              <div className="font-normal text-[10px] text-gray-600">(New resort or township launch, Airport or terminal expansion, Replacement cycle of existing carts, Sustainability mandates or green mobility targets, Increase in tourist or footfall volumes)</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.businessOverview}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.industryVertical}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.assetFootprint}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.estimatedFleetSize}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.ownershipType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.primaryMotivation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyPainPoints}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.upcomingTriggers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 3 Table - Same as Preposition 2 + Purchasing Behaviour Metrics + Solution Requirements + CMI Insights
  const renderPreposition3Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={3} className="bg-[#90EE90] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Professional Drivers
            </th>
            <th colSpan={4} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Purchasing Behaviour Metrics
            </th>
            <th colSpan={4} className="bg-[#FFDAB9] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Solution Requirements
            </th>
            <th colSpan={2} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Customer Name/Company Name</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Business Overview</div>
              <div className="font-normal text-[10px] text-gray-600">(hospitality, transportation, real estate)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Industry Vertical</div>
              <div className="font-normal text-[10px] text-gray-600">(Golf & Leisure, Hospitality & Tourism, Airports & Transportation Hubs, Industrial & Logistics, Residential Communities)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Asset Footprint / Mobility Environment</div>
              <div className="font-normal text-[10px] text-gray-600">(Number of golf courses, resorts, terminals, campuses, or industrial sites)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Estimated Fleet Size (Units)</div>
              <div className="font-normal text-[10px] text-gray-600">(Current golf cart fleet size, Passenger vs utility split)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Ownership Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Government / Semi-government, Private enterprise, Public private partnership, Family owned resort or developer)</div>
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Designation/Role</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Phone/WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Website URL</th>
            {/* Professional Drivers */}
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Primary Motivation for Golf Cart Adoption</div>
              <div className="font-normal text-[10px] text-gray-600">(Guest experience and comfort, Internal mobility efficiency, Cost optimization vs manpower, Sustainability and low-emission goals, Noise reduction and indoor usability)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Key Pain Points</div>
              <div className="font-normal text-[10px] text-gray-600">(High maintenance costs of aging fleets, Battery downtime and charging inefficiencies, Limited spare parts availability, Inconsistent service quality from dealers, Fleet availability during peak seasons)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Upcoming Triggers and Initiatives</div>
              <div className="font-normal text-[10px] text-gray-600">(New resort or township launch, Airport or terminal expansion, Replacement cycle of existing carts, Sustainability mandates or green mobility targets, Increase in tourist or footfall volumes)</div>
            </th>
            {/* Purchasing Behaviour Metrics */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Budget Ownership</div>
              <div className="font-normal text-[10px] text-gray-600">(Central corporate budget, Site-level operational budget, CAPEX for purchase or OPEX for lease)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Procurement Model</div>
              <div className="font-normal text-[10px] text-gray-600">(Direct purchase, Leasing or rental, Managed mobility contracts, Project-based procurement (new builds))</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Buying Frequency</div>
              <div className="font-normal text-[10px] text-gray-600">(One-time bulk purchase/Phased rollout across sites/Annual or multi-year replacement cycle)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Decision Drivers</div>
              <div className="font-normal text-[10px] text-gray-600">(Total cost of ownership/After-sales support and SLA/Battery warranty and lifecycle/Local service presence/Brand reputation)</div>
            </th>
            {/* Solution Requirements */}
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Preferred Product Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Electric golf carts/ICE carts for rugged or remote sites/Lithium battery preference vs lead-acid)</div>
            </th>
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Preferred Configuration</div>
              <div className="font-normal text-[10px] text-gray-600">(Seating capacity (2, 4, 6, 8+ seater)/Passenger vs utility focus/Customization needs (enclosure, AC, branding, luggage racks))</div>
            </th>
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Performance Expectations</div>
              <div className="font-normal text-[10px] text-gray-600">(Battery runtime per shift/Charging time/Payload or passenger capacity/Durability in heat, humidity, or sand environments)</div>
            </th>
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Technology Add-ons</div>
              <div className="font-normal text-[10px] text-gray-600">(Fleet tracking or telematics/Preventive maintenance alerts/Charging management systems)</div>
            </th>
            {/* CMI Insights */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Customer Benchmarking Summary</div>
              <div className="font-normal text-[10px] text-gray-600">(Potential Customers)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Additional Comments/Notes By CMI team</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Customer Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.businessOverview}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.industryVertical}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.assetFootprint}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.estimatedFleetSize}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.ownershipType}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
              {/* Professional Drivers */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.primaryMotivation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyPainPoints}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.upcomingTriggers}</td>
              {/* Purchasing Behaviour Metrics */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.budgetOwnership}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.procurementModel}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.buyingFrequency}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.decisionDrivers}</td>
              {/* Solution Requirements */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.preferredProductType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.preferredConfiguration}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.performanceExpectations}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.technologyAddOns}</td>
              {/* CMI Insights */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerBenchmarking}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.additionalComments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <Preposition
        title="Customer Intelligence Database"
        isOpen={openPreposition === 1}
        onToggle={() => togglePreposition(1)}
      >
        {renderPreposition1Table()}
      </Preposition>
    </div>
  )
}

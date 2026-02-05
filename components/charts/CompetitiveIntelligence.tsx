'use client'

import { useState } from 'react'

interface CompetitiveIntelligenceData {
  brandOrigin: string
  brand: string
  model: string
  productType: string
  seating: string
  usageMode: string
  country: string
  salesChannel: string
  endUserSegment: string
  distributorMarginPercent: number
  distributorMarginUSD: number
  distributorPriceUSD: number
  retailerMarginPercent: number
  retailerMarginUSD: number
  retailPriceUSD: number
}

// Competitive Intelligence Data - Golf Cart Market
const competitiveIntelligenceData: CompetitiveIntelligenceData[] = [
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 Li-ion', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 18, distributorMarginUSD: 1467, distributorPriceUSD: 9617, retailerMarginPercent: 35, retailerMarginUSD: 3366, retailPriceUSD: 12983 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 Li-ion', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 22, distributorMarginUSD: 1969, distributorPriceUSD: 10919, retailerMarginPercent: 35, retailerMarginUSD: 3822, retailPriceUSD: 14741 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 Li-ion', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'UAE', salesChannel: 'Offline', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 20, distributorMarginUSD: 2140, distributorPriceUSD: 12840, retailerMarginPercent: 35, retailerMarginUSD: 4494, retailPriceUSD: 17334 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 Li-ion', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'UAE', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 25, distributorMarginUSD: 2988, distributorPriceUSD: 14938, retailerMarginPercent: 30, retailerMarginUSD: 4481, retailPriceUSD: 19419 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 Li-ion', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'Vietnam', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 2343, distributorPriceUSD: 12993, retailerMarginPercent: 35, retailerMarginUSD: 4548, retailPriceUSD: 17541 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 Li-ion', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'Vietnam', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 22, distributorMarginUSD: 1782, distributorPriceUSD: 9882, retailerMarginPercent: 35, retailerMarginUSD: 3459, retailPriceUSD: 13341 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Philippines', salesChannel: 'Offline', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 18, distributorMarginUSD: 2034, distributorPriceUSD: 13334, retailerMarginPercent: 30, retailerMarginUSD: 4000, retailPriceUSD: 17334 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Philippines', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 22, distributorMarginUSD: 1760, distributorPriceUSD: 9760, retailerMarginPercent: 35, retailerMarginUSD: 3416, retailPriceUSD: 13176 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Turkey', salesChannel: 'Offline', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 18, distributorMarginUSD: 2646, distributorPriceUSD: 17346, retailerMarginPercent: 35, retailerMarginUSD: 6071, retailPriceUSD: 23417 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Turkey', salesChannel: 'Offline', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 25, distributorMarginUSD: 3450, distributorPriceUSD: 17250, retailerMarginPercent: 30, retailerMarginUSD: 5175, retailPriceUSD: 22425 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Saudi Arabia', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 20, distributorMarginUSD: 3750, distributorPriceUSD: 22500, retailerMarginPercent: 30, retailerMarginUSD: 6750, retailPriceUSD: 29250 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'RXV Elite 2.0 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Saudi Arabia', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 25, distributorMarginUSD: 2638, distributorPriceUSD: 13188, retailerMarginPercent: 30, retailerMarginUSD: 3956, retailPriceUSD: 17144 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'TXT ELITE Lithium', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 25, distributorMarginUSD: 4400, distributorPriceUSD: 22000, retailerMarginPercent: 30, retailerMarginUSD: 6600, retailPriceUSD: 28600 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'TXT ELITE Lithium', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Offline', endUserSegment: 'Residential Communities', distributorMarginPercent: 22, distributorMarginUSD: 3652, distributorPriceUSD: 20252, retailerMarginPercent: 30, retailerMarginUSD: 6076, retailPriceUSD: 26328 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'TXT ELITE Lithium', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'Indonesia', salesChannel: 'Offline', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 22, distributorMarginUSD: 1617, distributorPriceUSD: 8967, retailerMarginPercent: 30, retailerMarginUSD: 2690, retailPriceUSD: 11657 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'TXT ELITE Lithium', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'Indonesia', salesChannel: 'Offline', endUserSegment: 'Residential Communities', distributorMarginPercent: 20, distributorMarginUSD: 1300, distributorPriceUSD: 7800, retailerMarginPercent: 30, retailerMarginUSD: 2340, retailPriceUSD: 10140 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'TXT ELITE Lithium', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'Oman', salesChannel: 'Offline', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 22, distributorMarginUSD: 1606, distributorPriceUSD: 8906, retailerMarginPercent: 35, retailerMarginUSD: 3117, retailPriceUSD: 12023 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'TXT ELITE Lithium', productType: 'Electric - Lithium-ion', seating: '2-Seater', usageMode: 'Passenger', country: 'Oman', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 1859, distributorPriceUSD: 10309, retailerMarginPercent: 30, retailerMarginUSD: 3093, retailPriceUSD: 13402 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Freedom TXT 4P Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Passenger', country: 'Singapore', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 25, distributorMarginUSD: 1813, distributorPriceUSD: 9063, retailerMarginPercent: 30, retailerMarginUSD: 2719, retailPriceUSD: 11781 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Freedom TXT 4P Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Passenger', country: 'Singapore', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 18, distributorMarginUSD: 1530, distributorPriceUSD: 10030, retailerMarginPercent: 35, retailerMarginUSD: 3511, retailPriceUSD: 13541 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Freedom TXT 4P Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Passenger', country: 'Thailand', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 22, distributorMarginUSD: 2871, distributorPriceUSD: 15921, retailerMarginPercent: 35, retailerMarginUSD: 5572, retailPriceUSD: 21493 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Freedom TXT 4P Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Passenger', country: 'Thailand', salesChannel: 'Offline', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 25, distributorMarginUSD: 2450, distributorPriceUSD: 12250, retailerMarginPercent: 35, retailerMarginUSD: 4288, retailPriceUSD: 16538 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Freedom TXT 4P Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Passenger', country: 'Turkey', salesChannel: 'Offline', endUserSegment: 'Residential Communities', distributorMarginPercent: 20, distributorMarginUSD: 2380, distributorPriceUSD: 14280, retailerMarginPercent: 35, retailerMarginUSD: 4998, retailPriceUSD: 19278 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Freedom TXT 4P Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Passenger', country: 'Turkey', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 18, distributorMarginUSD: 3015, distributorPriceUSD: 19765, retailerMarginPercent: 35, retailerMarginUSD: 6918, retailPriceUSD: 26683 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express S4 Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Utility', country: 'Saudi Arabia', salesChannel: 'Offline', endUserSegment: 'Airports & Transportation', distributorMarginPercent: 22, distributorMarginUSD: 3872, distributorPriceUSD: 21472, retailerMarginPercent: 35, retailerMarginUSD: 7515, retailPriceUSD: 28987 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express S4 Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Utility', country: 'Saudi Arabia', salesChannel: 'Offline', endUserSegment: 'Educational Campuses', distributorMarginPercent: 20, distributorMarginUSD: 2960, distributorPriceUSD: 17760, retailerMarginPercent: 30, retailerMarginUSD: 5328, retailPriceUSD: 23088 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express S4 Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Utility', country: 'Indonesia', salesChannel: 'Offline', endUserSegment: 'Industrial Facilities', distributorMarginPercent: 25, distributorMarginUSD: 4325, distributorPriceUSD: 21625, retailerMarginPercent: 35, retailerMarginUSD: 7569, retailPriceUSD: 29194 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express S4 Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Utility', country: 'Indonesia', salesChannel: 'Online', endUserSegment: 'Educational Campuses', distributorMarginPercent: 18, distributorMarginUSD: 3267, distributorPriceUSD: 21417, retailerMarginPercent: 30, retailerMarginUSD: 6425, retailPriceUSD: 27842 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express S4 Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Utility', country: 'Singapore', salesChannel: 'Offline', endUserSegment: 'Educational Campuses', distributorMarginPercent: 25, distributorMarginUSD: 4925, distributorPriceUSD: 24625, retailerMarginPercent: 35, retailerMarginUSD: 8619, retailPriceUSD: 33244 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express S4 Gasoline', productType: 'ICE - Gasoline', seating: '4-Seater', usageMode: 'Utility', country: 'Singapore', salesChannel: 'Offline', endUserSegment: 'Industrial Facilities', distributorMarginPercent: 18, distributorMarginUSD: 3366, distributorPriceUSD: 22066, retailerMarginPercent: 30, retailerMarginUSD: 6620, retailPriceUSD: 28686 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express L6 Gasoline', productType: 'ICE - Gasoline', seating: '6-Seater', usageMode: 'Utility', country: 'Indonesia', salesChannel: 'Online', endUserSegment: 'Airports & Transportation', distributorMarginPercent: 18, distributorMarginUSD: 2259, distributorPriceUSD: 14809, retailerMarginPercent: 30, retailerMarginUSD: 4443, retailPriceUSD: 19252 },
  { brandOrigin: 'Non-Chinese Player', brand: 'E-Z-GO', model: 'Express L6 Gasoline', productType: 'ICE - Gasoline', seating: '6-Seater', usageMode: 'Utility', country: 'Indonesia', salesChannel: 'Offline', endUserSegment: 'Educational Campuses', distributorMarginPercent: 20, distributorMarginUSD: 3960, distributorPriceUSD: 23760, retailerMarginPercent: 35, retailerMarginUSD: 8316, retailPriceUSD: 32076 },
  // Chinese Player entries
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A2 Electric LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Bahrain', salesChannel: 'Offline', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 935, distributorPriceUSD: 5185, retailerMarginPercent: 35, retailerMarginUSD: 1815, retailPriceUSD: 7000 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A2 Electric LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Bahrain', salesChannel: 'Offline', endUserSegment: 'Residential Communities', distributorMarginPercent: 20, distributorMarginUSD: 870, distributorPriceUSD: 5220, retailerMarginPercent: 30, retailerMarginUSD: 1566, retailPriceUSD: 6786 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A2 Electric LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Kuwait', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 20, distributorMarginUSD: 780, distributorPriceUSD: 4680, retailerMarginPercent: 35, retailerMarginUSD: 1638, retailPriceUSD: 6318 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A2 Electric LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Kuwait', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 968, distributorPriceUSD: 5368, retailerMarginPercent: 35, retailerMarginUSD: 1879, retailPriceUSD: 7247 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A4 Electric Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'UAE', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 20, distributorMarginUSD: 1200, distributorPriceUSD: 7200, retailerMarginPercent: 30, retailerMarginUSD: 2160, retailPriceUSD: 9360 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A4 Electric Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'UAE', salesChannel: 'Offline', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 20, distributorMarginUSD: 1890, distributorPriceUSD: 11340, retailerMarginPercent: 35, retailerMarginUSD: 3969, retailPriceUSD: 15309 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A4 Electric Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Qatar', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 20, distributorMarginUSD: 1650, distributorPriceUSD: 9900, retailerMarginPercent: 35, retailerMarginUSD: 3465, retailPriceUSD: 13365 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A4 Electric Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Qatar', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 25, distributorMarginUSD: 2100, distributorPriceUSD: 10500, retailerMarginPercent: 30, retailerMarginUSD: 3150, retailPriceUSD: 13650 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A4 Electric Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Philippines', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 2233, distributorPriceUSD: 12383, retailerMarginPercent: 30, retailerMarginUSD: 3715, retailPriceUSD: 16098 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-A4 Electric Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Philippines', salesChannel: 'Offline', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 25, distributorMarginUSD: 1588, distributorPriceUSD: 7938, retailerMarginPercent: 30, retailerMarginUSD: 2381, retailPriceUSD: 10319 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-U2 Utility LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Utility', country: 'Oman', salesChannel: 'Online', endUserSegment: 'Educational Campuses', distributorMarginPercent: 22, distributorMarginUSD: 704, distributorPriceUSD: 3904, retailerMarginPercent: 30, retailerMarginUSD: 1171, retailPriceUSD: 5075 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-U2 Utility LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Utility', country: 'Oman', salesChannel: 'Online', endUserSegment: 'Airports & Transportation', distributorMarginPercent: 18, distributorMarginUSD: 657, distributorPriceUSD: 4307, retailerMarginPercent: 30, retailerMarginUSD: 1292, retailPriceUSD: 5599 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-U2 Utility LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Utility', country: 'Saudi Arabia', salesChannel: 'Offline', endUserSegment: 'Airports & Transportation', distributorMarginPercent: 18, distributorMarginUSD: 540, distributorPriceUSD: 3540, retailerMarginPercent: 30, retailerMarginUSD: 1062, retailPriceUSD: 4602 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-U2 Utility LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Utility', country: 'Saudi Arabia', salesChannel: 'Online', endUserSegment: 'Industrial Facilities', distributorMarginPercent: 18, distributorMarginUSD: 810, distributorPriceUSD: 5310, retailerMarginPercent: 35, retailerMarginUSD: 1859, retailPriceUSD: 7169 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-U2 Utility LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Utility', country: 'Thailand', salesChannel: 'Offline', endUserSegment: 'Educational Campuses', distributorMarginPercent: 22, distributorMarginUSD: 814, distributorPriceUSD: 4514, retailerMarginPercent: 30, retailerMarginUSD: 1354, retailPriceUSD: 5868 },
  { brandOrigin: 'Chinese Player', brand: 'Guangdong Lvtong', model: 'LT-U2 Utility LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Utility', country: 'Thailand', salesChannel: 'Online', endUserSegment: 'Industrial Facilities', distributorMarginPercent: 25, distributorMarginUSD: 763, distributorPriceUSD: 3813, retailerMarginPercent: 35, retailerMarginUSD: 1334, retailPriceUSD: 5147 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G2 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Thailand', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 770, distributorPriceUSD: 4270, retailerMarginPercent: 35, retailerMarginUSD: 1495, retailPriceUSD: 5765 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G2 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Thailand', salesChannel: 'Offline', endUserSegment: 'Residential Communities', distributorMarginPercent: 18, distributorMarginUSD: 855, distributorPriceUSD: 5605, retailerMarginPercent: 35, retailerMarginUSD: 1962, retailPriceUSD: 7567 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G2 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Singapore', salesChannel: 'Offline', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 20, distributorMarginUSD: 630, distributorPriceUSD: 3780, retailerMarginPercent: 35, retailerMarginUSD: 1323, retailPriceUSD: 5103 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G2 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Singapore', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 25, distributorMarginUSD: 1038, distributorPriceUSD: 5188, retailerMarginPercent: 35, retailerMarginUSD: 1816, retailPriceUSD: 7003 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G2 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Turkey', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 682, distributorPriceUSD: 3782, retailerMarginPercent: 30, retailerMarginUSD: 1135, retailPriceUSD: 4917 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G2 LA', productType: 'Electric - Lead-Acid', seating: '2-Seater', usageMode: 'Passenger', country: 'Turkey', salesChannel: 'Offline', endUserSegment: 'Residential Communities', distributorMarginPercent: 25, distributorMarginUSD: 1000, distributorPriceUSD: 5000, retailerMarginPercent: 30, retailerMarginUSD: 1500, retailPriceUSD: 6500 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G4 Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 25, distributorMarginUSD: 3163, distributorPriceUSD: 15813, retailerMarginPercent: 30, retailerMarginUSD: 4744, retailPriceUSD: 20556 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G4 Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 20, distributorMarginUSD: 1410, distributorPriceUSD: 8460, retailerMarginPercent: 35, retailerMarginUSD: 2961, retailPriceUSD: 11421 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G4 Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Vietnam', salesChannel: 'Offline', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 2739, distributorPriceUSD: 15189, retailerMarginPercent: 35, retailerMarginUSD: 5316, retailPriceUSD: 20505 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G4 Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Vietnam', salesChannel: 'Offline', endUserSegment: 'Residential Communities', distributorMarginPercent: 25, distributorMarginUSD: 2000, distributorPriceUSD: 10000, retailerMarginPercent: 30, retailerMarginUSD: 3000, retailPriceUSD: 13000 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G4 Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Bahrain', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 20, distributorMarginUSD: 1370, distributorPriceUSD: 8220, retailerMarginPercent: 30, retailerMarginUSD: 2466, retailPriceUSD: 10686 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G4 Li-ion', productType: 'Electric - Lithium-ion', seating: '4-Seater', usageMode: 'Passenger', country: 'Bahrain', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 25, distributorMarginUSD: 2825, distributorPriceUSD: 14125, retailerMarginPercent: 30, retailerMarginUSD: 4238, retailPriceUSD: 18363 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G6 Li-ion', productType: 'Electric - Lithium-ion', seating: '6-Seater', usageMode: 'Passenger', country: 'Saudi Arabia', salesChannel: 'Offline', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 20, distributorMarginUSD: 2740, distributorPriceUSD: 16440, retailerMarginPercent: 30, retailerMarginUSD: 4932, retailPriceUSD: 21372 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G6 Li-ion', productType: 'Electric - Lithium-ion', seating: '6-Seater', usageMode: 'Passenger', country: 'Saudi Arabia', salesChannel: 'Online', endUserSegment: 'Residential Communities', distributorMarginPercent: 18, distributorMarginUSD: 1083, distributorPriceUSD: 11033, retailerMarginPercent: 35, retailerMarginUSD: 3862, retailPriceUSD: 14895 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G6 Li-ion', productType: 'Electric - Lithium-ion', seating: '6-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Online', endUserSegment: 'Golf Courses & Clubs', distributorMarginPercent: 22, distributorMarginUSD: 2563, distributorPriceUSD: 14213, retailerMarginPercent: 30, retailerMarginUSD: 4264, retailPriceUSD: 18477 },
  { brandOrigin: 'Chinese Player', brand: 'HDK Electric', model: 'HDK-G6 Li-ion', productType: 'Electric - Lithium-ion', seating: '6-Seater', usageMode: 'Passenger', country: 'South Africa', salesChannel: 'Online', endUserSegment: 'Hospitality & Tourism', distributorMarginPercent: 25, distributorMarginUSD: 2000, distributorPriceUSD: 10000, retailerMarginPercent: 35, retailerMarginUSD: 3500, retailPriceUSD: 13500 }
]

interface CountryPricing {
  country: string
  distributorMarginPercent: number
  distributorMarginDollar: number
  distributorPrice: number
  retailerMarginPercent: number
  retailerMarginDollar: number
  retailPrice: number
}

// Country-wise retail pricing data
const countryPricingData: CountryPricing[] = [
  { country: 'Thailand', distributorMarginPercent: 18, distributorMarginDollar: 1872, distributorPrice: 12272, retailerMarginPercent: 30, retailerMarginDollar: 3682, retailPrice: 15954 },
  { country: 'UAE', distributorMarginPercent: 20, distributorMarginDollar: 1680, distributorPrice: 10080, retailerMarginPercent: 30, retailerMarginDollar: 2484, retailPrice: 10764 },
  { country: 'Malaysia', distributorMarginPercent: 25, distributorMarginDollar: 2113, distributorPrice: 10563, retailerMarginPercent: 30, retailerMarginDollar: 3169, retailPrice: 13731 },
  { country: 'Saudi Arabia', distributorMarginPercent: 22, distributorMarginDollar: 1605, distributorPrice: 8906, retailerMarginPercent: 30, retailerMarginDollar: 2672, retailPrice: 11578 },
  { country: 'Philippines', distributorMarginPercent: 22, distributorMarginDollar: 1749, distributorPrice: 9699, retailerMarginPercent: 30, retailerMarginDollar: 2910, retailPrice: 12609 },
  { country: 'Indonesia', distributorMarginPercent: 18, distributorMarginDollar: 1584, distributorPrice: 10384, retailerMarginPercent: 30, retailerMarginDollar: 3115, retailPrice: 13499 },
  { country: 'Singapore', distributorMarginPercent: 20, distributorMarginDollar: 3990, distributorPrice: 23940, retailerMarginPercent: 30, retailerMarginDollar: 7182, retailPrice: 31122 },
  { country: 'Vietnam', distributorMarginPercent: 25, distributorMarginDollar: 4560, distributorPrice: 22790, retailerMarginPercent: 30, retailerMarginDollar: 6825, retailPrice: 29575 },
  { country: 'Cambodia', distributorMarginPercent: 25, distributorMarginDollar: 4575, distributorPrice: 22875, retailerMarginPercent: 35, retailerMarginDollar: 8006, retailPrice: 30881 },
  { country: 'Laos', distributorMarginPercent: 25, distributorMarginDollar: 4975, distributorPrice: 24875, retailerMarginPercent: 30, retailerMarginDollar: 7463, retailPrice: 32338 },
  { country: 'Myanmar', distributorMarginPercent: 22, distributorMarginDollar: 2288, distributorPrice: 12688, retailerMarginPercent: 35, retailerMarginDollar: 4441, retailPrice: 17129 },
  { country: 'Brunei', distributorMarginPercent: 25, distributorMarginDollar: 3300, distributorPrice: 16500, retailerMarginPercent: 35, retailerMarginDollar: 5775, retailPrice: 22275 },
  { country: 'Qatar', distributorMarginPercent: 20, distributorMarginDollar: 5070, distributorPrice: 30420, retailerMarginPercent: 30, retailerMarginDollar: 9126, retailPrice: 39546 },
  { country: 'Oman', distributorMarginPercent: 22, distributorMarginDollar: 5665, distributorPrice: 31415, retailerMarginPercent: 30, retailerMarginDollar: 9425, retailPrice: 40840 },
  { country: 'Bahrain', distributorMarginPercent: 18, distributorMarginDollar: 4131, distributorPrice: 27081, retailerMarginPercent: 35, retailerMarginDollar: 9478, retailPrice: 36559 },
  { country: 'Turkey', distributorMarginPercent: 25, distributorMarginDollar: 6438, distributorPrice: 32188, retailerMarginPercent: 30, retailerMarginDollar: 9656, retailPrice: 41844 },
  { country: 'South Africa', distributorMarginPercent: 22, distributorMarginDollar: 4598, distributorPrice: 25498, retailerMarginPercent: 30, retailerMarginDollar: 7649, retailPrice: 33147 },
  { country: 'Rest of MEA', distributorMarginPercent: 22, distributorMarginDollar: 2827, distributorPrice: 15677, retailerMarginPercent: 30, retailerMarginDollar: 4703, retailPrice: 20380 }
]

interface CompetitiveIntelligenceProps {
  height?: number
}

export function CompetitiveIntelligence({ height }: CompetitiveIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<'intelligence' | 'pricing'>('intelligence')

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-6">Competitive Intelligence 2022-2025</h2>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('intelligence')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'intelligence'
              ? 'text-[#4A7C9D] border-b-2 border-[#4A7C9D]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Competitive Intelligence
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'pricing'
              ? 'text-[#4A7C9D] border-b-2 border-[#4A7C9D]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Countrywise Retail Pricing
        </button>
      </div>

      {/* Competitive Intelligence Table */}
      {activeTab === 'intelligence' && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-[10px]">
            <thead>
              <tr>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Brand Origin
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[80px]">
                  Brand
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[150px]">
                  Model
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Product Type
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[80px]">
                  Seating
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                  Usage Mode
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[110px]">
                  Country
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                  Sales Channel
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[160px]">
                  End-User Segment
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Distributor Margin %(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Distributor Margin (USD)(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Distributor Price (USD)(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Retailer Margin %(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Retailer Margin (USD)(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Retail Price (USD)(2025)
                </th>
              </tr>
            </thead>
            <tbody>
              {competitiveIntelligenceData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black font-medium">
                    {item.brandOrigin}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black font-medium">
                    {item.brand}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black">
                    {item.model}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {item.productType}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {item.seating}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {item.usageMode}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {item.country}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {item.salesChannel}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black font-medium">
                    {item.endUserSegment}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {item.distributorMarginPercent}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${item.distributorMarginUSD.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${item.distributorPriceUSD.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {item.retailerMarginPercent}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${item.retailerMarginUSD.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-semibold">
                    ${item.retailPriceUSD.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Countrywise Retail Pricing Table */}
      {activeTab === 'pricing' && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-[10px]">
            <thead>
              <tr>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Country/Region
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Distributor Margin %(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Distributor Margin $(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Distributor Price(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Retailer Margin %(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Retailer Margin $(2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Retail Price (USD)(2025)
                </th>
              </tr>
            </thead>
            <tbody>
              {countryPricingData.map((country, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black font-medium">
                    {country.country}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {country.distributorMarginPercent}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${country.distributorMarginDollar.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${country.distributorPrice.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {country.retailerMarginPercent}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${country.retailerMarginDollar.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-semibold">
                    ${country.retailPrice.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CompetitiveIntelligence

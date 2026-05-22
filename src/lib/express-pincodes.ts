// Express shipping eligible pincode ranges
// Only these metro/tier-1 city pincodes qualify for express delivery

interface PincodeRange {
  start: number;
  end: number;
}

const expressRanges: PincodeRange[] = [
  // Delhi NCR
  { start: 110001, end: 110099 },
  { start: 121001, end: 121010 },
  { start: 122001, end: 122022 },
  { start: 201301, end: 201310 },
  // Mumbai MMR
  { start: 400001, end: 400107 },
  // Bengaluru
  { start: 560001, end: 560103 },
  // Hyderabad
  { start: 500001, end: 500090 },
  // Chennai
  { start: 600001, end: 600130 },
  // Pune
  { start: 411001, end: 411057 },
  // Ahmedabad
  { start: 380001, end: 380061 },
  // Kolkata
  { start: 700001, end: 700156 },
  // Chandigarh Tricity
  { start: 160001, end: 160071 },
  { start: 140603, end: 140603 },
  // Jaipur
  { start: 302001, end: 302039 },
  // Lucknow
  { start: 226001, end: 226031 },
  // Indore
  { start: 452001, end: 452020 },
  // Kochi
  { start: 682001, end: 682042 },
  // Surat
  { start: 395001, end: 395017 },
];

export function isExpressEligible(pincode: string): boolean {
  const pin = parseInt(pincode, 10);
  if (isNaN(pin) || pincode.length !== 6) return false;
  return expressRanges.some((range) => pin >= range.start && pin <= range.end);
}

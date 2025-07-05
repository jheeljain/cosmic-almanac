import { MhahPanchang } from 'mhah-panchang'

const obj = new MhahPanchang()

export function calculatePanchang(date, lat = 28.6139, lon = 77.2090) {
  // Use .calendar() for location-aware calculation
  const p = obj.calendar(date, lat, lon)
  return {
    tithi: p.Tithi?.name_en_IN || p.Tithi?.name || '',
    nakshatra: p.Nakshatra?.name_en_IN || p.Nakshatra?.name || '',
    yoga: p.Yoga?.name_en_IN || p.Yoga?.name || '',
    karana: p.Karana?.name_en_IN || p.Karana?.name || '',
    sunrise: p.Sunrise || '—',
    sunset: p.Sunset || '—',
    paksha: p.Paksha?.name_en_IN || p.Paksha?.name || '',
    masa: p.Masa?.name_en_UK || p.Masa?.name || '',
    raasi: p.Raasi?.name_en_UK || p.Raasi?.name || '',
  }
}

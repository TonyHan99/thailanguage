import * as XLSX from 'xlsx'

export interface ThaiPhrase {
  id: number
  kr: string
  gender?: 'male' | 'female'  // Make gender optional
  pronunciation: string
  thai: string
  level?: number  // Add level field to distinguish between different levels
}

interface ExcelRow {
  '번호': number
  '한국어': string
  '성별'?: '남성' | '여성'  // Make gender optional
  '태국어(한국어 발음)': string
  '태국어': string
}

// Load data from Voca I tab (Level 0)
async function loadVocaData(worksheet: XLSX.WorkSheet): Promise<ThaiPhrase[]> {
  const headers = ['번호', '한국어', '태국어(한국어 발음)', '태국어']
  const startRow = 5  // Voca I starts from row 5

  const rawData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
    header: headers,
    range: startRow,
    blankrows: false
  })

  return rawData
    .filter(row => {
      const hasRequiredFields = row['번호'] && row['한국어'] && row['태국어(한국어 발음)'] && row['태국어']
      if (!hasRequiredFields) {
        console.log('Skipping incomplete Voca row:', row)
      }
      return hasRequiredFields
    })
    .map(row => ({
      id: row['번호'],
      kr: row['한국어'],
      pronunciation: row['태국어(한국어 발음)'],
      thai: row['태국어'],
      level: 0
    }))
}

// Load data from main sheet (Level 1 & 2)
async function loadMainSheetData(worksheet: XLSX.WorkSheet, level: string): Promise<ThaiPhrase[]> {
  // Get all data from the worksheet with raw: false to get formatted data
  const rawData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
    raw: false,
    blankrows: false,
    header: ['번호', '한국어', '성별', '태국어(한국어 발음)', '태국어'],
    range: 0  // Start from A1 (0-based index)
  })

  console.log('Total rows loaded:', rawData.length)
  console.log('First few rows:', rawData.slice(0, 3))

  // Filter out rows where essential fields are missing
  const data = rawData
    .filter(row => {
      // Only require number, Korean text, gender and pronunciation
      const hasRequiredFields = row['번호'] && row['한국어'] && row['성별'] && row['태국어(한국어 발음)']
      if (!hasRequiredFields) {
        console.log('Skipping incomplete row:', row)
      }
      return hasRequiredFields
    })
    .map(row => {
      const gender = row['성별'] === '남성' ? 'male' as const : 'female' as const
      return {
        id: Number(row['번호']),
        kr: row['한국어'],
        gender,
        pronunciation: row['태국어(한국어 발음)'],
        thai: row['태국어'] || '',  // Use empty string if Thai text is missing
        level: parseInt(level)
      }
    })

  console.log(`Processed ${data.length} valid entries for level ${level}`)
  return data
}

export async function loadThaiData(level: string = '1'): Promise<ThaiPhrase[]> {
  try {
    const response = await fetch('/Thai_Basic.xlsx')
    const arrayBuffer = await response.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { 
      type: 'array',
      cellDates: true,
      cellNF: false,
      cellText: false
    })
    
    // Select worksheet based on level
    const sheetName = level === '0' ? 'Voca I' : 'Sheet2'  // Use Sheet2 for Level 1 & 2
    const worksheet = workbook.Sheets[sheetName]
    
    if (!worksheet) {
      console.error(`Worksheet ${sheetName} not found`)
      return []
    }

    console.log(`Loading data for level ${level} from sheet ${sheetName}`)
    console.log('Worksheet range:', worksheet['!ref'])
    
    // Load data based on level
    const data = level === '0' 
      ? await loadVocaData(worksheet)
      : await loadMainSheetData(worksheet, level)
    
    return data
  } catch (error) {
    console.error('Error loading Thai data:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
} 
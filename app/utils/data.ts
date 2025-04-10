import * as XLSX from 'xlsx'

export interface ThaiPhrase {
  id: number
  kr: string
  gender: 'male' | 'female'
  pronunciation: string
  thai: string
}

interface ExcelRow {
  '번호': number
  '한국어': string
  '성별': '남성' | '여성'
  '태국어(한국어 발음)': string
  '태국어': string
}

export async function loadThaiData(): Promise<ThaiPhrase[]> {
  try {
    const response = await fetch('/Thai_Basic.xlsx')
    const arrayBuffer = await response.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    
    const rawData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { header: ['번호', '한국어', '성별', '태국어(한국어 발음)', '태국어'], range: 4 })

    const data: ThaiPhrase[] = rawData.map(row => ({
      id: row['번호'],
      kr: row['한국어'],
      gender: row['성별'] === '남성' ? 'male' : 'female',
      pronunciation: row['태국어(한국어 발음)'],
      thai: row['태국어'],
    }))
    
    console.log('Loaded data:', data)
    return data
  } catch (error) {
    console.error('Error loading Thai data:', error)
    return []
  }
} 
'use server'
import { NextRequest, NextResponse } from 'next/server'
import TVSeriesDetail from '@/db/models/m_tv_series_detail'
import fs from 'fs'
import { promisify } from 'util'
import sequelize from '@/db/sequelize'
import { v4 as uuidv4 } from 'uuid'
import { pipeline } from 'stream'
const pump = promisify(pipeline)

export async function CreateTVSeries(formData) {
  console.log(formData)

  const uuid = uuidv4()
  const clean_uuid = 'tv_s-' + uuid.replace(/-/g, '').substring(0, 11)

  const data = {}
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      data[key] = value
      if (key === 'cover_file') {
        const file = value
        console.log('file', file)
        if (file.size > 0) {
          const fileExtension = file.name.split('.').pop()
          try {
            await pump(
              file.stream(),
              fs.createWriteStream(
                `videos/series_cover/${clean_uuid}.${fileExtension}`,
              ),
            )
            console.log(`File uploaded successfully`)
          } catch (error) {
            console.error(`Error uploading file: ${error}`)
            return { success: false, message: 'Failed to upload file' }
          }
        }
      }
    } else {
      data[key] = value
    }
  }
  data['series_id'] = clean_uuid

  try {
    const createdUser = await TVSeriesDetail.create(data)
    return {
      success: true,
      message: 'TV Series created successfully',
      data: createdUser,
    }
  } catch (error) {
    return { success: false, message: 'Failed to create TV Series' }
  }
}

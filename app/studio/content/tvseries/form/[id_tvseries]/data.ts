'use server'
import { NextRequest, NextResponse } from 'next/server'
import TVSeriesDetail from '@/db/models/m_tv_series_detail'
import fs from 'fs'
import { promisify } from 'util'
import sequelize from '@/db/sequelize'
import { v4 as uuidv4 } from 'uuid'
import { pipeline } from 'stream'
const pump = promisify(pipeline)

export async function UpdateTVSeries(formData, id) {
  console.log(formData)
  const data = {}
  const tvSeries = await TVSeriesDetail.findByPk(id)
  if (!tvSeries) {
    return { success: false, message: 'TV Series not found' }
  }
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
                `videos/series_cover/${tvSeries.series_id}.${fileExtension}`,
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
  try {
    await tvSeries.update(data)
    return {
      success: true,
      message: 'TV Series updated successfully',
      data: tvSeries,
    }
  } catch (error) {
    return { success: false, message: 'Failed to update TV Series' }
  }
}
export async function findByPk(id) {
  const _data = await TVSeriesDetail.findByPk(id, { raw: true })
  console.log('_data', _data)
  return _data
}

import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url) //me devuelve el nombre de archivo
export const __dirname = dirname(__filename) // me devuelve la carpeta del archivo

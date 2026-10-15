export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function acceptsFile(file: File, accept = "") {
  const rules = accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
  if (!rules.length) return true
  const name = file.name.toLowerCase()
  const mime = file.type.toLowerCase()
  return rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule)
    if (rule.endsWith("/*")) return mime.startsWith(rule.slice(0, -1))
    return mime === rule
  })
}

function sameFile(a: File, b: File) {
  return (
    a.name === b.name &&
    a.size === b.size &&
    a.lastModified === b.lastModified &&
    a.type === b.type
  )
}

export function addFiles(
  current: File[],
  incoming: File[],
  {
    accept = "",
    maxFiles = 5,
    maxSize = 10 * 1024 * 1024,
    multiple = true,
  }: {
    accept?: string
    maxFiles?: number
    maxSize?: number
    multiple?: boolean
  } = {}
) {
  const files = [...current]
  const errors: string[] = []
  const limit = multiple ? maxFiles : Math.min(1, maxFiles)
  for (const file of incoming) {
    if (!acceptsFile(file, accept)) {
      errors.push(`${file.name}: this file type is not allowed.`)
    } else if (file.size > maxSize) {
      errors.push(`${file.name}: maximum size is ${formatFileSize(maxSize)}.`)
    } else if (files.some((existing) => sameFile(existing, file))) {
      errors.push(`${file.name}: already selected.`)
    } else if (files.length >= limit) {
      errors.push(`${file.name}: you can select up to ${limit} file(s).`)
    } else {
      files.push(file)
    }
  }
  return { files, errors }
}

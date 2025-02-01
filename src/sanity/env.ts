export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-23'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skTQG8yPUCxHwBfdh1sMNfPzJQYldhncLianA3vKIwpf4npAPj6vrqB9EPfBlkaO5Ej4AUQD6se1jmbTgyQSjSdg4NEkgD1QDmlK85mkPDdOlaqwebNxZ3AmNj3WFfBlT5t4pikKq7NfNVmH3810eQMxzZnq3vikWpzKuaFj8tixkn5p3wXO",
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_TOKEN'
)


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

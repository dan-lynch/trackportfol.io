import { authService } from 'services/authService'

export async function handleResponse(response: Response) {
  const text = await response.text()
  const data = text && JSON.parse(text)
  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      authService.signout()
    }
  }
  return data
}

import { userService } from 'services/userService';

export async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      userService.logout();
    }
  }
  return data;
}

import fetch from 'isomorphic-unfetch';
import Cookie from 'js-cookie';
import { API_URL } from 'helpers/constants';

class FetchService {
	public isofetch(url: string, data: object, type: string): Promise<any> {
		return fetch(`${API_URL}${url}`, {
			body: JSON.stringify({ ...data }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: type
		})
			.then((response: Response) => response.json())
			.then(this.handleErrors)
			.catch(error => {
				throw error;
			});
	}

	public isofetchAuthed(url: string, data: object, type: string): Promise<any> {
		const token = Cookie.get('token');

		return fetch(`${API_URL}${url}`, {
			body: JSON.stringify({ ...data }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			method: type
		})
			.then((response: Response) => response.json())
			.then(this.handleErrors)
			.catch(error => {
				throw error;
			});
	}

	public handleErrors(response: string): string {
		if (response === 'TypeError: Failed to fetch') {
			throw Error('Server error.');
		}
		return response;
	}
}

export default new FetchService();
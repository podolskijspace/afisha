export default class GetData {
  _apiBase = 'https://run.mocky.io/v3/49b8fbae-13e6-4aac-a8d1-644e3881cc62';

  async getResource(url = '') {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error (`Could not fetch ${url}, received ${res.stutes}`);
    }

    return await res.json();
  }
}
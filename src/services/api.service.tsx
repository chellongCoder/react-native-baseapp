import { setAccessKey, getAccessKey, clearCache } from '../utils/common.util'
import { Alert } from 'react-native'

const TOKEN_EXPIRED_ERROR_CODE = '510'
export const SUCCESS_CODE = 200

export class APIBase {
  controller = new AbortController()
  signal = this.controller.signal
  // eslint-disable-next-line prettier/prettier
  public static getInstance() {
    if (!this.instance) {
      this.instance = new APIBase()
    }
    return this.instance
  }
  private static instance: APIBase
  private domain: string = ''
  private apiKey: string | null = ''
  private constructor() {
    this.setupDomain('https://dev.ibeauty88.com')
  }

  public abortFetch() {
    this.controller.abort()
  }

  public async setupDomain(domain: string) {
    this.domain = domain
    this.apiKey = await getAccessKey()
  }

  public async setAPIKey(apiKey: string, saved: boolean = true) {
    this.apiKey = apiKey
    saved && (await setAccessKey(apiKey))
  }
  public getApiKey() {
    return this.apiKey
  }

  public resetAPIKey() {
    this.apiKey = ''
    clearCache()
  }

  post(path: string, data: any = undefined, dataKey: string = '') {
    console.log("data", data)
    return this.raw(
      this.domain + path,
      {
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.apiKey ? `Bearer ${this.apiKey}` : undefined,
        },
        method: 'POST',
        signal: this.signal
      },
      dataKey
    )
  }

  postFormData(path: string, data: any, dataKey: string = '') {
    return this.raw(
      this.domain + path,
      {
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: this.apiKey ? `Bearer ${this.apiKey}` : undefined,
        },
        method: 'POST',
        signal: this.signal
      },
      dataKey
    )
  }

  get(path: string, data?: any, dataKey: string = '') {
    if (this.apiKey) {
      dataKey = this.apiKey
    }
    console.log('api key', this.apiKey)
    console.log('api path', path)
    const query = data ? `?${this.buildQueryString(data)}` : ''
    return this.raw(
      this.domain + path + query,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        method: 'GET',
        signal: this.signal
      },
      dataKey
    )
  }

  delete(path: string, dataKey: string = '') {
    return this.raw(
      this.domain + path,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        method: 'DELETE',
        signal: this.signal
      },
      dataKey
    )
  }

  put(path: string, data: any, dataKey: string = '') {
    return this.raw(
      this.domain + path,
      {
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        method: 'PUT',
        signal: this.signal
      },
      dataKey
    )
  }
  buildQueryString(objectParam: any) {
    const query = Object.keys(objectParam)
      .map(param => param + '=' + objectParam[param])
      .join('&')
    return query
  }
  async raw(url: string, params: any, dataKey: string = '') {
    try {
      console.log('api', url)
      const res: any = await fetch(url, params).then((response: Response) => {
        console.log("respone", response)

        return response.json()
      })
      console.log("res", res)
      if (res && !res.errors) {
        return [null, res, res]
      } else {
        return [res.errors, null, null]
      }
    } catch (err) {
      Alert.alert(err.message)
      return [err.message, null, null]
    }
  }
}

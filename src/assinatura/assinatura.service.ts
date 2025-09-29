import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios'
 
@Injectable()
export class AssinaturaService {
  private readonly asaasApiUrl = 'https://sandbox.asaas.com/api/v3'; // Replace with actual API URL
  private readonly ASAAS_API_KEY = `$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzE3NzU6OiRhYWNoX2YzZTUwZTI0LTBkMmQtNDQ5ZS05OTE5LTdjNjYyZTFjODRkZQ==` // Replace with actual API Key

  constructor(private httpService: HttpService) {}

  async createSubscription(dataCliente: any): Promise<any> {
    const url = `${this.asaasApiUrl}/subscriptions`;
    const headers = {
      access_token: this.ASAAS_API_KEY,
      'Content-Type': 'application/json',
    };

    try {
      const response: AxiosResponse = await this.httpService
        .post(url, dataCliente, { headers })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error(error)
      console.log(error)
      throw error;
    }
  }
}

import { CreateImportRequest } from '@/types/requests/create-import-request.ts'
import { OrderImport } from '@/types/order-import.ts'
import { formDataHttp, jsonHttp } from '@/http/http'

export const uploadProductionList = async (createImportRequest: CreateImportRequest): Promise<OrderImport> => {
  const formData = new FormData();
  formData.append('file', createImportRequest.file);

  const response = await formDataHttp.post('/api/order-imports/xlsx/', formData);
  return response.data as OrderImport;
}

export const fetchOrderImports = async (): Promise<OrderImport[]> => {
  const response = await jsonHttp.get('/api/order-imports/');
  return response.data as OrderImport[];
}

export const fetchOrderImport = async (id: string): Promise<OrderImport> => {
  const response = await jsonHttp.get(`/api/order-imports/${id}/`);
  return response.data as OrderImport;
}

export const assignOrderImportToAgent = async (orderImportId: string, agentId: number) => {
  const response = await jsonHttp.post(`/api/order-imports/${orderImportId}/assign-agent/${agentId}/`);
  return response.data as OrderImport;
}

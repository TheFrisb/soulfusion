import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { OrderImport } from '@/types/order-import.ts'
import { ref } from 'vue'
import { fetchOrderImports, uploadProductionList, fetchOrderImport, assignOrderImportToAgent } from '@/http/order-import.ts'
import type { CreateImportRequest } from '@/types/requests/create-import-request.ts'

export const userOrderImportsStore = defineStore('orderImportsStore', () => {
  const toast = useToast();
  const orderImports = ref<OrderImport[]>([]);
  const isLoading = ref(false);

  async function loadOrderImports() {
    isLoading.value = true;

    try {
      const response = await fetchOrderImports();
      orderImports.value = response as OrderImport[];
    } catch (error) {
      console.error(error);
      toast.error('Error loading order imports');
    } finally {
      isLoading.value = false;
    }
  }

  async function createOrderImport(createImportRequest: CreateImportRequest) {
    isLoading.value = true;

    try {
      const newImport = await uploadProductionList(createImportRequest);
      orderImports.value.push(newImport);
      toast.success('Order import created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error creating order import');
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchOrderImportById(id: string) {
    try {
      return await fetchOrderImport(id)
    } catch (error) {
      console.error(error)
      toast.error('Error loading order import details')
      throw error
    }
  }

  async function assignOrderImportAgent(importId: string, agentId: number) {
    try {
      const updatedImport = await assignOrderImportToAgent(importId, agentId)
      // Update the local order import in the store
      const idx = orderImports.value.findIndex((imp) => imp.id === importId)
      if (idx !== -1) orderImports.value[idx] = updatedImport
      toast.success('Agent assigned to import successfully')
      return updatedImport
    } catch (error) {
      console.error(error)
      toast.error('Failed to assign agent to import')
      throw error
    }
  }
  

  return {
    orderImports,
    loadOrderImports,
    createOrderImport,
    fetchOrderImportById,
    assignOrderImportAgent,
    isLoading
  }
})

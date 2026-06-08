import api from "../api/axiosInstance";

export const downloadWorkOrderPdf = async (workOrderId) => {
  const response = await api.get(
    `/work-orders/${workOrderId}/report/pdf`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob([response.data], {
    type: "application/pdf",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `work-order-${workOrderId}.pdf`;

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
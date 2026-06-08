export const formatFileName = (fileName) => {
  if (!fileName) return "-";

  // removes UUID prefix like: a46248ac-9d06-4ee2-b01a-4c897d8dbfe5-S.png
  const parts = fileName.split("-");

  if (parts.length >= 6) {
    return parts.slice(5).join("-");
  }

  return fileName;
};
export const handleDownloadAttachment = async (attachment) => {
  const response = await fetch(attachment.fileUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = attachment.fileName || "attachment";
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
import api from "@/lib/axios";

export const fetchPendingInstitutions = async () => {
  const { data } = await api.get("/admin/institutions/pending");
  return data;
};

export const approveInstitutionRequest = async (userId) => {
  const { data } = await api.post(`/admin/institutions/${userId}/approve`);
  return data;
};

export const rejectInstitutionRequest = async ({ userId, reason }) => {
  const { data } = await api.post(`/admin/institutions/${userId}/reject`, {
    reason,
  });
  return data;
};

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

/**
 * Placeholder: replace with real endpoint when available.
 * Expected shape: { institutions: [...], count?: number }
 */
export const fetchAllInstitutions = async () => {
  // const { data } = await api.get("/admin/institutions");
  // return data;
  return null;
};

/**
 * Placeholder: replace with real endpoint when available.
 * Expected shape: institution object
 */
export const fetchInstitutionById = async (institutionId) => {
  // const { data } = await api.get(`/admin/institutions/${institutionId}`);
  // return data;
  return { institutionId };
};

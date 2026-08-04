import {
  approveInstitutionRequest,
  fetchPendingInstitutions,
  rejectInstitutionRequest,
} from "@/features/institutions/api/institutionsApi";

export const getPendingInstitutions = async () => {
  const data = await fetchPendingInstitutions();

  return {
    count: data.count ?? data.institutions?.length ?? 0,
    institutions: data.institutions ?? [],
  };
};

export const approveInstitution = async (userId) => {
  return approveInstitutionRequest(userId);
};

export const rejectInstitution = async ({ userId, reason }) => {
  return rejectInstitutionRequest({ userId, reason });
};

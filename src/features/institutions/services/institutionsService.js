import {
  approveInstitutionRequest,
  fetchAllInstitutions,
  fetchInstitutionById,
  fetchPendingInstitutions,
  rejectInstitutionRequest,
} from "@/features/institutions/api/institutionsApi";
import { MOCK_INSTITUTIONS } from "@/features/institutions/data/mockInstitutions";

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

export const getAllInstitutions = async () => {
  const data = await fetchAllInstitutions();

  if (data) {
    return {
      count: data.count ?? data.institutions?.length ?? 0,
      institutions: data.institutions ?? [],
    };
  }

  // Temporary mock until the list endpoint is provided
  await delay(250);
  return {
    count: MOCK_INSTITUTIONS.length,
    institutions: MOCK_INSTITUTIONS,
  };
};

export const getInstitutionById = async (institutionId) => {
  const data = await fetchInstitutionById(institutionId);
  const institution = data?.institution ?? (data?.id ? data : null);

  if (institution) {
    return institution;
  }

  await delay(200);
  const found = MOCK_INSTITUTIONS.find(
    (item) => String(item.id) === String(institutionId)
  );

  if (!found) {
    const error = new Error("Institution not found");
    error.response = { data: { message: "Institution not found" } };
    throw error;
  }

  return found;
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

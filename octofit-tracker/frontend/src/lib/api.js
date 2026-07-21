const normalizeRecords = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export const fetchCollection = async (collection) => {
  const response = await fetch(`${getApiBaseUrl()}/${collection}/`);

  if (!response.ok) {
    throw new Error(`Failed to load ${collection}`);
  }

  const payload = await response.json();
  return normalizeRecords(payload);
};

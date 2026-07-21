const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const buildApiUrl = (resource) => {
  if (typeof resource !== 'string' || resource.trim() === '') {
    return '/api/';
  }

  const normalizedResource = resource.replace(/^\/+|\/+$/g, '');
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${normalizedResource}/`
    : `/api/${normalizedResource}/`;

  return baseUrl;
};

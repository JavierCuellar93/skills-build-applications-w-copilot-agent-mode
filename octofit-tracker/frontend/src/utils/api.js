const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const buildApiUrl = (resource) => {
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
    : `/api/${resource}/`;

  return baseUrl;
};

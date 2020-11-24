export async function getShelfConfig(clientKey, vitrinaId) {
  const response = await fetch(`/vitrina_cfg?ck=${clientKey}&vid=${vitrinaId}`)

  const data = await response.json();

  return data;
}
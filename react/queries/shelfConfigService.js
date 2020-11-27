export async function getShelfConfig(clientKey, vitrinaId) {
  //const response = await fetch(`/vitrina_cfg?ck=${clientKey}&vid=${vitrinaId}`)

  //const data = await response.json();

  const data = {
    productos: [1, 2, 8, 6, 7, 10],
    titleText: "Vitrina de BrainDW (bdw-shelf)",
    cfg: {
      paginationDotsVisibility: 'visible',
      showTitle: true,
      maxItems: 15,
      itemsPerPage: 4,
      minItemsPerPage: 2,
      arrows: true
    }
  }
  
  return data;
}
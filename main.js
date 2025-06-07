
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const skinGrid = document.getElementById("skinGrid");

  fetch("skins/skins.json")
    .then(res => res.json())
    .then(data => {
      window.skinsData = data;
      renderSkins(data);
    });

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filtered = window.skinsData.filter(skin => skin.name.toLowerCase().includes(query));
    renderSkins(filtered);
  });

  function renderSkins(skins) {
    skinGrid.innerHTML = "";
    skins.forEach(skin => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${skin.url}" alt="${skin.name}" width="100%" />
        <p>${skin.name}</p>
        <a href="${skin.url}" download>Download</a>
      `;
      skinGrid.appendChild(div);
    });
  }
});

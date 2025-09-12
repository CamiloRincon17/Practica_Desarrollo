async function cargarComponentes(id, url) {
    const resp = await fetch(url);
    const html = await resp.text();
    document.getElementById(id).innerHTML = html;
}
cargarComponentes("header", "components/header.html");
cargarComponentes("footer", "components/footer.html");
cargarComponentes("ul", "components/ul.html");
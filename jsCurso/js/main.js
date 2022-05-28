const dropZone = document.querySelector('.drop_zone');
const progressBar = document.querySelector('.progress_bar');
const container = document.querySelector('.container');
dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    changeStyle(e.target, "white");
})
dropZone.addEventListener('dragleave', e => {
    e.preventDefault();
    changeStyle(e.target, "red");
})
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    changeStyle(e.target, "green");
    loadFile(e.dataTransfer.files[0]);
})

const loadFile = archivo => {
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.addEventListener('progress', e => {
        showProgress(e, archivo);
    })
    reader.addEventListener('load', e => {
        renderImg(archivo);
    })
}

function renderImg(archivo) {
    let url = URL.createObjectURL(archivo);
    let img = document.createElement('img');
    img.setAttribute('src', url);
    container.appendChild(img);
}

function showProgress(e, archivo) {
    let loadPercent = (e.loaded / archivo.size) * 100;
    progressBar.style.width = `${loadPercent}%`;
    if (loadPercent == 100) {
        changeStyle(dropZone, "solid", "lightgreen");
    }
}

const changeStyle = (obj, border, color) => {
    if (!border) border = "dashed";
    obj.style.color = color;
    obj.style.border = `3px ${border} ${color}`;
}
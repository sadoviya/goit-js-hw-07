import { galleryItems } from "./gallery-items.js";

const containerRef = document.querySelector(".gallery");
containerRef.addEventListener("click", getOriginalUrl);

function getOriginalUrl(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  openModalWindow(evt);
}

const createCardMarkup = createItemsList(galleryItems);
containerRef.innerHTML = createCardMarkup;

function createItemsList(items) {
  return items
    .map(
      ({ original, preview, description }) =>
        `<a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}"
        data-source="${original}" alt="${description}">
        </a>`
    )
    .join("");
}

function openModalWindow(evt) {
  const modal = basicLightbox.create(
    `<img src="${evt.target.dataset.source}">`,
    {
      onShow: (modal) =>
        document.body.addEventListener("keydown", onEscKeyPress),
      onClose: (modal) =>
        document.body.removeEventListener("keydown", onEscKeyPress),
    }
  );
  modal.show();

  function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
      modal.close();
    }
  }
}

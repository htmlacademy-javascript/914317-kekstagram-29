const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.image_preview');

const imgEffectPreview = document.querySelectorAll('span[class^="effects__preview"]');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    imgEffectPreview.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url("${preview.src}")`;
    });
  }
});

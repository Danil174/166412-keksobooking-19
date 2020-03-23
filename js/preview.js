'use strict';

(function () {
  var checkImgType = function (img, types) {
    var fileName = img.name.toLowerCase();

    var checkStatus = types.some(function (type) {
      return fileName.endsWith(type);
    });

    return checkStatus;
  };

  var createMultiplePreviews = function (input, container) {
    var photo = document.createElement('div');
    photo.classList.add('ad-form__photo');
    var innerImg = document.createElement('img');
    innerImg.style.width = '100%';
    innerImg.style.height = '100%';
    photo.appendChild(innerImg);
    container.appendChild(photo);
    createImgPreview(input, innerImg);
  };

  var createImgPreview = function (input, container) {
    var file = input.files[0];

    if (checkImgType(file, window.constants.FILE_TYPES)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        container.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.preview = {
    createMultiplePreviews: createMultiplePreviews,
    createImgPreview: createImgPreview
  };
})();

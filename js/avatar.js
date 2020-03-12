'use strict';

(function () {
  var avatarInput = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();

    var mathces = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (mathces) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

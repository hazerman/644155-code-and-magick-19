'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var upload = document.querySelector('.upload');
  var uploadImage = upload.querySelector('img');
  var uploadInput = upload.querySelector('input[type=file]');

  uploadInput.addEventListener('change', function () {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();

      var readerLoadHandler = function () {
        uploadImage.src = reader.result;
        reader.removeEventListener('load', readerLoadHandler);
      };

      reader.addEventListener('load', readerLoadHandler);
      reader.readAsDataURL(file);
    }
  });
})();

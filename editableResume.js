document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('resumeForm');
    var resumePreview = document.getElementById('resumePreview');
    var resumeContent = document.getElementById('resumeContent');
    var profilePicInput = document.getElementById("profilePic");
    var profilePicPreview = document.getElementById("profilePicPreview");
    var profilePicImage = document.getElementById("profilePicImage");
    var profilePicSrc = ""; // Store the base64 image data
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        createResume();
    });
    // Handle profile picture preview and store base64 data
    if (profilePicInput && profilePicPreview && profilePicImage) {
        profilePicInput.addEventListener("change", function () {
            var _a;
            var file = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var _a;
                    profilePicSrc = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Store the base64 image data
                    profilePicImage.src = profilePicSrc;
                    profilePicPreview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            }
            else {
                profilePicPreview.classList.add("hidden");
            }
        });
    }
    function createResume() {
        var formData = new FormData(resumeForm);
        resumeContent.innerHTML = "\n            <div contenteditable=\"true\">\n                ".concat(profilePicSrc ? "<img src=\"".concat(profilePicSrc, "\" alt=\"Profile Picture\" class=\"profile-pic\" />") : '', " \n                <h2>").concat(formData.get('name'), "</h2>\n                <p>Email: ").concat(formData.get('email'), "</p>\n                <p>Phone: ").concat(formData.get('phone'), "</p>\n                <h3>Education</h3>\n                <p>").concat(formData.get('education'), "</p>\n                <h3>Work Experience</h3>\n                <p>").concat(formData.get('experience'), "</p>\n                <h3>Skills</h3>\n                <p>").concat(formData.get('skills'), "</p>\n            </div>\n        ");
        resumePreview.classList.remove('hidden');
        addEditableListeners();
    }
    function addEditableListeners() {
        var editableElements = resumeContent.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(function (element) {
            element.addEventListener('input', function () {
                saveChanges();
            });
        });
    }
    function saveChanges() {
        var editableContent = resumeContent.querySelector('[contenteditable="true"]');
        console.log('Changes saved:', editableContent.innerHTML);
    }
});

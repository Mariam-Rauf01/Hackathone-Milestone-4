document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const resumePreview = document.getElementById('resumePreview') as HTMLDivElement;
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
    const profilePicInput = document.getElementById("profilePic") as HTMLInputElement | null;
    const profilePicPreview = document.getElementById("profilePicPreview") as HTMLDivElement | null;
    const profilePicImage = document.getElementById("profilePicImage") as HTMLImageElement | null;

    let profilePicSrc = ""; // Store the base64 image data

    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        createResume();
    });

    // Handle profile picture preview and store base64 data
    if (profilePicInput && profilePicPreview && profilePicImage) {
        profilePicInput.addEventListener("change", () => {
            const file = profilePicInput.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    profilePicSrc = e.target?.result as string; // Store the base64 image data
                    profilePicImage.src = profilePicSrc;
                    profilePicPreview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            } else {
                profilePicPreview.classList.add("hidden");
            }
        });
    }

    function createResume() {
        const formData = new FormData(resumeForm);
        resumeContent.innerHTML = `
            <div contenteditable="true">
                ${profilePicSrc ? `<img src="${profilePicSrc}" alt="Profile Picture" class="profile-pic" />` : ''} 
                <h2>${formData.get('name')}</h2>
                <p>Email: ${formData.get('email')}</p>
                <p>Phone: ${formData.get('phone')}</p>
                <h3>Education</h3>
                <p>${formData.get('education')}</p>
                <h3>Work Experience</h3>
                <p>${formData.get('experience')}</p>
                <h3>Skills</h3>
                <p>${formData.get('skills')}</p>
            </div>
        `;
        resumePreview.classList.remove('hidden');
        addEditableListeners();
    }

    function addEditableListeners() {
        const editableElements = resumeContent.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(element => {
            element.addEventListener('input', () => {
                saveChanges();
            });
        });
    }

    function saveChanges() {
        const editableContent = resumeContent.querySelector('[contenteditable="true"]') as HTMLElement;
        console.log('Changes saved:', editableContent.innerHTML);
    }
});

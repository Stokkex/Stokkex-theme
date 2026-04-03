// Toggle password type

function togglePassword(){
    let password = document.getElementById('password');
    let eye = document.getElementById('eyeIcon');

    if (password.type === "password") {
        password.type = "text";
        eye.classList.add('fa-eye-slash');
        eye.classList.remove('fa-eye');
    } else {
        password.type = "password";
        eye.classList.add('fa-eye');
        eye.classList.remove('fa-eye-slash');
    }
}

// Toggle the parent categpries

const parentSelect = document.getElementById("parentCategory");
const subSelect = document.getElementById("subCategory");
if(parentSelect){
    parentSelect.addEventListener("change", function() {
        const selectedParent = this.value;

        subSelect.disabled = false;
        subSelect.value = "";

        Array.from(subSelect.options).forEach(option => {
            if (!option.dataset.parent) return;

            if (option.dataset.parent.includes(selectedParent)) {
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        });
    });
}


// Stepper
$(document).ready(function () {

    let current = 0;
    let fieldsets = $("fieldset");
    let steps = fieldsets.length;

    fieldsets.hide();
    fieldsets.eq(current).show();

    updateProgress();
    updateSteps();

    // ---------------- VALIDATION FUNCTION ----------------
    function validateStep(fieldset) {

        let isValid = true;

        // Required inputs
        fieldset.find(".required").each(function () {

            if ($(this).val().trim() === "") {
                isValid = false;
                $(this).addClass("error");
            } else {
                $(this).removeClass("error");
            }

        });

        // Required Select
        fieldset.find(".required-select").each(function () {

            if (!$(this).val()) {
                isValid = false;
                $(this).addClass("error-select");
            } else {
                $(this).removeClass("error-select");
            }

        });

        // Required File
        fieldset.find(".required-photo").each(function () {

            if (!this.files || this.files.length === 0) {
                isValid = false;
                $(this).addClass("error-photo");
            } else {
                $(this).removeClass("error-photo");
            }

        });

        return isValid;
    }


    // ---------------- NEXT BUTTON ----------------
    $(".next").click(function () {

        let current_fs = fieldsets.eq(current);

        if (!validateStep(current_fs)) return;

        current_fs.hide();

        if (current < steps - 1) {
            current++;
        }

        fieldsets.eq(current).fadeIn();

        updateProgress();
        updateSteps();
    });


    // ---------------- PREVIOUS BUTTON ----------------
    $(".previous").click(function () {

        fieldsets.eq(current).hide();

        if (current > 0) {
            current--;
        }

        fieldsets.eq(current).fadeIn();

        updateProgress();
        updateSteps();
    });


    // ---------------- LIVE VALIDATION ----------------
    $("input, textarea, select").on("keyup change", function () {

        let fieldset = $(this).closest("fieldset");
        let nextBtn = fieldset.find(".next");

        if (nextBtn.length) {
            nextBtn.prop("disabled", !validateStep(fieldset));
        }

    });


    // ---------------- PROGRESS BAR ----------------
    function updateProgress() {

        let percent = Math.round(((current + 1) / steps) * 100);

        $("#formProgress").css("width", percent + "%");
        document.getElementById('formProgress').innerText = percent + "%";

    }


    // ---------------- STEP LABEL ACTIVE ----------------
    function updateSteps() {

        $(".step-label").removeClass("active");

        $(".step-label").each(function (index) {

            if (index <= current) {
                $(this).addClass("active");
            }

        });

    }

});

// 

const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
if(input){
input.addEventListener("change", function() {
    const file = this.files[0];

    if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function() {
        preview.innerHTML = `<img src="${this.result}" alt="Image Preview">`;
    });

    reader.readAsDataURL(file);
    } else {
    preview.innerHTML = "<span>No image selected</span>";
    }
});
}


document.addEventListener("click", function(e) {
    if (e.target.classList.contains("see-more-btn")) {
        
        let btn = e.target;
        let text = btn.closest("p").querySelector(".description-text");

        text.classList.toggle("truncate-3");

        if (text.classList.contains("truncate-3")) {
            btn.innerText = "See More";
        } else {
            btn.innerText = "See Less";
        }
    }
});
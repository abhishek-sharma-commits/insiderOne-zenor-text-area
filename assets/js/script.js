// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme')



// add post upload image 
// document.getElementById('addPostUrl').addEventListener('change', function(){
// if (this.files[0] ) {
//     var picture = new FileReader();
//     picture.readAsDataURL(this.files[0]);
//     picture.addEventListener('load', function(event) {
//     document.getElementById('addPostImage').setAttribute('src', event.target.result);
//     document.getElementById('addPostImage').style.display = 'block';
//     });
// }
// });


// Create Status upload image 
// document.getElementById('createStatusUrl').addEventListener('change', function(){
// if (this.files[0] ) {
//     var picture = new FileReader();
//     picture.readAsDataURL(this.files[0]);
//     picture.addEventListener('load', function(event) {
//     document.getElementById('createStatusImage').setAttribute('src', event.target.result);
//     document.getElementById('createStatusImage').style.display = 'block';
//     });
// }
// });


// create product upload image
// document.getElementById('createProductUrl').addEventListener('change', function(){
// if (this.files[0] ) {
//     var picture = new FileReader();
//     picture.readAsDataURL(this.files[0]);
//     picture.addEventListener('load', function(event) {
//     document.getElementById('createProductImage').setAttribute('src', event.target.result);
//     document.getElementById('createProductImage').style.display = 'block';
//     });
// }
// });



const chooseFile = document.getElementById("image-upload");
const imgPreview = document.getElementById("img-preview");

if (chooseFile != null) {
    chooseFile.addEventListener("change", function() {
        const files = chooseFile.files;
        if (files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]); // Read the first file
            fileReader.onload = function() {
                // imgPreview.style.display = "contents"; // Show the preview div
                // imgPreview.innerHTML = '<img src="' + this.result + '" alt="Image Preview"/>'; // Set the image source
                imgPreview.src = this.result;
            };
        } else {
            //imgPreview.style.display = "none"; // Hide the preview if no file is selected
            imgPreview.src = "";
        }
    });
}

function likePost(button) {
    const postObject = {
        post_id: button.id,
        user_id: user_id
    };

    $.ajax({
        type: "POST",
        url: SERVER_ENDPOINT + "feeds/controller.php/like-post",
        data: JSON.stringify(postObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            // Check if the response indicates success
            if (response.success) {
                if (response.likes >= 0) {
                    var escapedId = button.id.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/?])/g, '\\$1');
                    $("#like_count_" + escapedId).text(response.likes);
                }
            } else {
                console.error("success : false");
            }
        },
        error: function(xhr, status, error) {
            // Handle error response
            console.error("Error:", error);
        }
    });
}

function commentPost(button) {
    var content_id = document.getElementById("comment-" + button.id);

    const postObject = {
        post_id: button.id,
        user_id: user_id,
        content: content_id.value
    };

    postData(SERVER_ENDPOINT + "feeds/controller.php/comment-post", postObject);
}

function postData(url, postData) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(postData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            // Handle successful response
            console.log("Success:", response);

            // Refresh the page
            location.reload();
        },
        error: function(xhr, status, error) {
            // Handle error response
            console.error("Error:", error);
        }
    });
}

// upcoming and past events headi
function changeContent(heading) {
    // Change the heading
    document.getElementById('events-heading').innerText = heading;

    // Show or hide the appropriate event cards
    if (heading === 'Upcoming Events') {
        document.getElementById('upcoming-events').classList.remove('hidden');
        document.getElementById('past-events').classList.add('hidden');
    } else {
        document.getElementById('upcoming-events').classList.add('hidden');
        document.getElementById('past-events').classList.remove('hidden');
    }
}


// / for event-details page 
// Dropdown functionality
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

if (dropdownButton != null) {
    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });
}

// Close the dropdown if clicked outside
if (dropdownButton != null) {
    document.addEventListener('click', (event) => {
        if (!dropdownButton.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
}

// <!--as a team-->
function toggleElementsVisibility() {
    var participationType = document.getElementById('participationType');
    var div = document.getElementById('myDiv');

    if (participationType != null) {
        if (participationType.value === '2') {
            div.classList.remove("hidden");
        } else {
            div.classList.add("hidden");
        }
    }
}


// <!--category type others button-->
function handleCategoryChange() {
    var categorySelect = document.getElementById('categorySelect');
    var othersTextbox = document.getElementById('othersTextbox');

    // Check if the selected value is "Others"
    if (categorySelect.value === '21') {
        // Show the textbox
        othersTextbox.style.display = 'block';
    } else {
        // Hide the textbox for other options
        othersTextbox.style.display = 'none';
    }
}

// <!--event type others button-->

function handleEventTypeChange() {
    var eventTypeSelect = document.getElementById('eventTypeSelect');
    var othersEventTextbox = document.getElementById('othersEventTextbox');

    // Check if the selected value is "Others"
    if (eventTypeSelect.value === '9') {
        // Show the textbox
        othersEventTextbox.style.display = 'block';
    } else {
        // Hide the textbox for other options
        othersEventTextbox.style.display = 'none';
    }
}

// <!--organisation type others button-->

function handleOrganisationChange() {
    var organisationSelect = document.getElementById('organisationSelect');
    var othersEventTextbox = document.getElementById('othersEventTextbox');

    // Check if the selected value is "Others"
    if (organisationSelect.value === '6') {
        // Show the textbox
        othersEventTextbox.style.display = 'block';
    } else {
        // Hide the textbox for other options
        othersEventTextbox.style.display = 'none';
    }
}

// profile page share button (can be used anywhere)
const shareButton = document.getElementById('shareButton');
if (shareButton != null) {
    shareButton.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    //title: 'Check out this page!',
                    //text: 'This is an awesome page. Check it out!',
                    url: window.location.href
                });
                console.log('Page shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    });
}

function toggleReadMoreNew(sectionId) {
    const container = document.getElementById(sectionId);
    if (!container) {
        console.warn(`No container found for ID: ${sectionId}`);
        return;
    }

    const content = container.querySelector(".read-more-content");
    const readMoreBtn = container.querySelector('#read-more');
    const fadeOverlay = container.querySelector('#fade-overlay');
    const maxHeight = 120;

    if (!readMoreBtn || !content || !fadeOverlay) {
        console.warn('Missing required elements in section:', sectionId);
        return;
    }

    if (content.classList.contains('max-h-[120px]')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.classList.remove('max-h-[120px]');
        readMoreBtn.textContent = 'Read Less';
        fadeOverlay.style.display = 'none';
    } else {
        content.style.maxHeight = maxHeight + 'px';
        content.classList.add('max-h-[120px]');
        readMoreBtn.textContent = 'Read More';
        fadeOverlay.style.display = 'block';
    }
}
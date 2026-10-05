const $ = id => document.getElementById(id);
let selectedImgSrc = "";

function login() {
    const userVal = $('user').value.trim();
    if (!userVal) return alert('Enter your email or phone.');
    $('name').innerText = userVal;
    $('login').classList.add('hidden');
    $('feed').classList.remove('hidden');
}

function logout() {
    $('login').classList.remove('hidden');
    $('feed').classList.add('hidden');
    $('posts').innerHTML = '';
    resetImg();
    $('user').value = '';
    $('msg').value = '';
}

function previewImg() {
    const fileInput = $('img-input');
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            selectedImgSrc = e.target.result;
            const preview = $('img-preview');
            preview.src = selectedImgSrc;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function resetImg() {
    selectedImgSrc = "";
    $('img-input').value = "";
    const preview = $('img-preview');
    preview.style.display = 'none';
    preview.src = "";
}

function post() {
    const msgText = $('msg').value.trim();
    if (!msgText && !selectedImgSrc) return;

    const div = document.createElement('div');
    div.className = 'post';

    if (msgText) {
        const p = document.createElement('p');
        p.style.margin = '0 0 8px 0';
        p.innerText = msgText;
        div.appendChild(p);
    }

    if (selectedImgSrc) {
        const img = document.createElement('img');
        img.src = selectedImgSrc;
        div.appendChild(img);
    }

    $('posts').prepend(div);
    $('msg').value = '';
    resetImg();
}

document.addEventListener('DOMContentLoaded', () => {
    const selectImageBtn = document.getElementById('select-image-btn');
    const imageInput = document.getElementById('image-input');
    const chatArea = document.getElementById('chat-area');
    const roleSwitch = document.getElementById('role-switch');
    const roleLabelMe = document.getElementById('role-label-me');
    const roleLabelPartner = document.getElementById('role-label-partner');

    selectImageBtn.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            const isMine = roleSwitch.checked;
            addStampToChat(imageUrl, isMine);
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    });

    roleSwitch.addEventListener('change', () => {
        roleLabelMe.classList.toggle('active', roleSwitch.checked);
        roleLabelPartner.classList.toggle('active', !roleSwitch.checked);
    });

    function addStampToChat(imageUrl, isMine) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timestamp = `${hours}:${minutes}`;

        const messageContainer = document.createElement('div');
        
        if (isMine) {
            // --- 自分のスタンプ ---
            messageContainer.classList.add('my-message');
            messageContainer.innerHTML = `
                <div class="status-wrapper">
                    <span class="read-status">既読 1</span>
                    <span class="timestamp">${timestamp}</span>
                </div>
                <img src="${imageUrl}" alt="自分のスタンプ" class="stamp-image">
            `;
        } else {
            // --- 相手のスタンプ ---
            messageContainer.classList.add('message-container', 'partner');
            // 相手のアバターをランダムな色にする
            const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
            messageContainer.innerHTML = `
                <div class="avatar" style="background-color: ${randomColor};"></div>
                <div class="message-content">
                    <div class="stamp-and-time">
                        <img src="${imageUrl}" alt="相手のスタンプ" class="stamp-image">
                        <span class="timestamp">${timestamp}</span>
                    </div>
                </div>
            `;
        }
        
        chatArea.appendChild(messageContainer);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    // Add initial bot message
    addBotMessage("Hello! I'm your health assistant. Describe your symptoms and I'll provide:\n- Suspected Condition\n- Home Remedies\n- Recommended Specialist\n- How to Explain to Doctor\n- Precautions\n- Nutrition");

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addUserMessage(message);
        userInput.value = '';
        showLoading();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            
            const data = await response.json();
            addBotMessage(formatResponse(data.reply));
        } catch (error) {
            addBotMessage("Sorry, I'm having trouble connecting. Please try again.");
        } finally {
            hideLoading();
        }
    }

    function formatResponse(text) {
        return text.split('\n').map(line => {
            if (line.includes(':')) {
                const [prefix, content] = line.split(':');
                return `<div class="response-item"><strong>${prefix.trim()}:</strong> ${content.trim()}</div>`;
            }
            return line;
        }).join('');
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'message user-message';
        div.innerHTML = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'message bot-message';
        div.innerHTML = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'message bot-message';
        loading.innerHTML = '<div class="loading-dots"><span>.</span><span>.</span><span>.</span></div>';
        chatMessages.appendChild(loading);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideLoading() {
        const lastMessage = chatMessages.lastElementChild;
        if (lastMessage && lastMessage.querySelector('.loading-dots')) {
            lastMessage.remove();
        }
    }
});
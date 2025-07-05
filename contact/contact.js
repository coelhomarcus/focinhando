// Funcionalidade do formulário de contato
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Simular envio do formulário
            const submitBtn = contactForm.querySelector(".btn-primary");
            const originalText = submitBtn.textContent;

            // Mostrar loading
            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;

            // Simular envio (normalmente seria uma requisição real)
            setTimeout(() => {
                // Mostrar sucesso
                submitBtn.textContent = "Mensagem Enviada!";
                submitBtn.style.background = "#28a745";

                // Reset do formulário
                contactForm.reset();

                // Mostrar alerta de sucesso
                showSuccessMessage();

                // Restaurar botão após 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = "";
                }, 3000);
            }, 2000);
        });
    }
});

// Função para mostrar mensagem de sucesso
function showSuccessMessage() {
    // Criar elemento de notificação
    const notification = document.createElement("div");
    notification.className = "success-notification";
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <span class="notification-text">Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Adicionar estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;

    const notificationContent = notification.querySelector(".notification-content");
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
    `;

    // Adicionar ao body
    document.body.appendChild(notification);

    // Função para remover notificação
    const removeNotification = () => {
        notification.style.animation = "slideOutRight 0.5s ease";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    };

    // Remover ao clicar no X
    closeBtn.addEventListener("click", removeNotification);

    // Remover automaticamente após 5 segundos
    setTimeout(removeNotification, 5000);
}

// Adicionar animações CSS dinamicamente
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

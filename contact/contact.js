document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault()

            const submitBtn = contactForm.querySelector(".btn-primary")
            const originalText = submitBtn.textContent

            submitBtn.textContent = "Enviando..."
            submitBtn.disabled = true

            const formData = {
                fullName: contactForm.fullName.value,
                email: contactForm.email.value,
                number: contactForm.number.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            }

            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                if (response.ok) {
                    submitBtn.textContent = "Mensagem Enviada!";
                    submitBtn.style.background = "#28a745"
                    contactForm.reset()
                    showSuccessMessage()
                } else {
                    throw new Error("Erro ao enviar os dados");
                }
            } catch (error) {
                console.error("Erro:", error)
                alert("Ocorreu um erro ao enviar o formulário. Tente novamente.")
            } finally {
                setTimeout(() => {
                    submitBtn.textContent = originalText
                    submitBtn.disabled = false
                    submitBtn.style.background = ""
                }, 3000)
            }
        })
    }
})

function showSuccessMessage() {
    const notification = document.createElement("div")
    notification.className = "success-notification"
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-text">Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
            <button class="notification-close">&times;</button>
        </div>
    `

    document.body.appendChild(notification)

    const removeNotification = () => {
        notification.style.animation = "slideOutRight 5s ease"
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification)
            }
        }, 500)
    }

    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", removeNotification)
    setTimeout(removeNotification, 5000)
}
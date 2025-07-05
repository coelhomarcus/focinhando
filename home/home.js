// Array de pets disponíveis para adoção
const pets = [
    {
        id: 1,
        name: "Luna",
        age: "8 meses",
        location: "Marabá - PA",
        image: "../assets/home/luna.png",
        tags: ["Fêmea", "Vacinada"],
        description:
            "Luna é uma gatinha muito carinhosa e brincalhona. Adora brincar com bolinhas e dormir no colo. É muito sociável com outros gatos e crianças.",
        owner: {
            name: "Ana Maria Silva",
            phone: "(94) 99999-1234",
            email: "ana.maria@email.com",
            address: "Bairro Cidade Nova, Marabá - PA",
            availability: "Segunda a sexta: 8h às 18h | Sábado: 8h às 12h",
        },
        details: {
            species: "Gato",
            breed: "SRD (Sem Raça Definida)",
            weight: "2,5 kg",
            vaccinated: "Sim - V4 em dia",
            dewormed: "Sim",
            castrated: "Não",
            specialNeeds: "Nenhuma",
        },
    },
    {
        id: 2,
        name: "Max",
        age: "1 ano",
        location: "Belém - PA",
        image: "../assets/home/max.jpg",
        tags: ["Macho", "Castrado"],
        description:
            "Max é um cão muito leal e protetor. Adora passear e brincar no quintal. É obediente e se dá bem com crianças maiores de 8 anos.",
        owner: {
            name: "Carlos Eduardo Santos",
            phone: "(91) 98888-5678",
            email: "carlos.santos@email.com",
            address: "Bairro Pedreira, Belém - PA",
            availability: "Todos os dias: 14h às 20h",
        },
        details: {
            species: "Cão",
            breed: "Labrador Mix",
            weight: "28 kg",
            vaccinated: "Sim - V10 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Precisa de espaço para correr",
        },
    },
    {
        id: 3,
        name: "Mia",
        age: "6 meses",
        location: "Parauapebas - PA",
        image: "../assets/home/golden.webp",
        tags: ["Fêmea", "Dócil"],
        description:
            "Mia é uma cachorrinha muito dócil e tranquila. Perfeita para famílias com crianças pequenas. Adora carinho e é muito obediente.",
        owner: {
            name: "Mariana Costa",
            phone: "(94) 97777-9012",
            email: "mariana.costa@email.com",
            address: "Bairro Rio Verde, Parauapebas - PA",
            availability: "Segunda a sábado: 9h às 17h",
        },
        details: {
            species: "Cão",
            breed: "Golden Retriever Mix",
            weight: "15 kg",
            vaccinated: "Sim - V8 em dia",
            dewormed: "Sim",
            castrated: "Não",
            specialNeeds: "Nenhuma",
        },
    },
    {
        id: 4,
        name: "Thor",
        age: "3 ano",
        location: "Ananindeua - PA",
        image: "../assets/home/pastoralemao.webp",
        tags: ["Macho", "Brincalhão"],
        description:
            "Thor é cheio de energia e adora brincar. É perfeito para pessoas ativas que gostam de caminhadas e exercícios. Muito inteligente e fácil de treinar.",
        owner: {
            name: "Roberto Lima",
            phone: "(91) 96666-3456",
            email: "roberto.lima@email.com",
            address: "Bairro Coqueiro, Ananindeua - PA",
            availability: "Terça a domingo: 10h às 19h",
        },
        details: {
            species: "Cão",
            breed: "Pastor Alemão Mix",
            weight: "32 kg",
            vaccinated: "Sim - V10 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Precisa de exercícios diários",
        },
    },
    {
        id: 5,
        name: "Bella",
        age: "2 anos",
        location: "Santarém - PA",
        image: "../assets/home/siames.jpg",
        tags: ["Fêmea", "Carinhosa"],
        description:
            "Bella é uma gatinha muito meiga e carinhosa. Adora dormir em lugares altos e observar pela janela. É independente mas muito afetuosa com seus tutores.",
        owner: {
            name: "Fernanda Oliveira",
            phone: "(93) 99888-7777",
            email: "fernanda.oliveira@email.com",
            address: "Bairro Santarenzinho, Santarém - PA",
            availability: "Segunda a sexta: 7h às 17h | Fins de semana: 9h às 15h",
        },
        details: {
            species: "Gato",
            breed: "Siamês Mix",
            weight: "3,2 kg",
            vaccinated: "Sim - V4 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Nenhuma",
        },
    },
    {
        id: 6,
        name: "Rex",
        age: "4 anos",
        location: "Castanhal - PA",
        image: "../assets/home/rot.jpg",
        tags: ["Macho", "Protetor"],
        description:
            "Rex é um cão muito leal e protetor. Ideal para quem busca um companheiro fiel e um bom guardião. É carinhoso com a família e cauteloso com estranhos.",
        owner: {
            name: "João Pedro Santos",
            phone: "(91) 97777-2222",
            email: "joao.santos@email.com",
            address: "Bairro Novo Estrela, Castanhal - PA",
            availability: "Todos os dias: 16h às 21h",
        },
        details: {
            species: "Cão",
            breed: "Rottweiler Mix",
            weight: "38 kg",
            vaccinated: "Sim - V10 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Quintal amplo recomendado",
        },
    },
    {
        id: 7,
        name: "Mel",
        age: "5 meses",
        location: "Abaetetuba - PA",
        image: "../assets/home/mel.jpg",
        tags: ["Fêmea", "Filhote"],
        description:
            "Mel é uma filhotinha muito esperta e curiosa. Está aprendendo comandos básicos e adora brincar com crianças. É perfeita para famílias que querem treinar desde pequena.",
        owner: {
            name: "Patrícia Monteiro",
            phone: "(91) 96666-9999",
            email: "patricia.monteiro@email.com",
            address: "Bairro Centro, Abaetetuba - PA",
            availability: "Segunda a sexta: 10h às 16h | Sábado: 8h às 14h",
        },
        details: {
            species: "Cão",
            breed: "Beagle Mix",
            weight: "8 kg",
            vaccinated: "Sim - Primeira dose",
            dewormed: "Sim",
            castrated: "Não (muito nova)",
            specialNeeds: "Precisa completar vacinação",
        },
    },
    {
        id: 8,
        name: "Simba",
        age: "3 anos",
        location: "Tucuruí - PA",
        image: "../assets/home/simba.jpg",
        tags: ["Macho", "Tranquilo"],
        description:
            "Simba é um gato muito tranquilo e majestoso. Adora receber carinho e é muito tolerante. Ideal para apartamentos e pessoas que buscam um companheiro calmo.",
        owner: {
            name: "Ricardo Ferreira",
            phone: "(94) 98888-1111",
            email: "ricardo.ferreira@email.com",
            address: "Bairro Mercês, Tucuruí - PA",
            availability: "Terça a sábado: 9h às 18h",
        },
        details: {
            species: "Gato",
            breed: "Persa Mix",
            weight: "4,1 kg",
            vaccinated: "Sim - V4 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Escovação regular do pelo",
        },
    },
    {
        id: 9,
        name: "Nina",
        age: "1 ano e 6 meses",
        location: "Bragança - PA",
        image: "../assets/home/border.jpg",
        tags: ["Fêmea", "Ativa"],
        description:
            "Nina é uma cachorrinha muito ativa e brincalhona. Adora correr na praia e nadar. É perfeita para pessoas que gostam de atividades ao ar livre.",
        owner: {
            name: "Gabriela Sousa",
            phone: "(91) 95555-4444",
            email: "gabriela.sousa@email.com",
            address: "Bairro Aldeia, Bragança - PA",
            availability: "Todos os dias: 6h às 11h e 15h às 19h",
        },
        details: {
            species: "Cão",
            breed: "Border Collie Mix",
            weight: "22 kg",
            vaccinated: "Sim - V10 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Muito exercício diário",
        },
    },
    {
        id: 10,
        name: "Oliver",
        age: "4 meses",
        location: "Salinópolis - PA",
        image: "../assets/home/oliver.jpg",
        tags: ["Macho", "Filhote"],
        description:
            "Oliver é um filhotinho muito carinhoso e sociável. Adora brincar com outros gatos e é muito curioso. Está aprendendo a usar a caixa de areia.",
        owner: {
            name: "Amanda Costa",
            phone: "(91) 94444-7777",
            email: "amanda.costa@email.com",
            address: "Bairro Atalaia, Salinópolis - PA",
            availability: "Segunda a sexta: 8h às 12h e 14h às 18h",
        },
        details: {
            species: "Gato",
            breed: "SRD (Sem Raça Definida)",
            weight: "1,8 kg",
            vaccinated: "Sim - Primeira dose",
            dewormed: "Sim",
            castrated: "Não (muito novo)",
            specialNeeds: "Precisa completar vacinação",
        },
    },
    {
        id: 11,
        name: "Lola",
        age: "6 anos",
        location: "Altamira - PA",
        image: "../assets/home/lola.jpg",
        tags: ["Fêmea", "Idosa"],
        description:
            "Lola é uma senhora muito gentil e carinhosa. Já passou da fase de filhote e busca uma família que valorize sua experiência e carinho. É muito obediente.",
        owner: {
            name: "Antônio Silva",
            phone: "(93) 93333-8888",
            email: "antonio.silva@email.com",
            address: "Bairro Sudam II, Altamira - PA",
            availability: "Todos os dias: 8h às 17h",
        },
        details: {
            species: "Cão",
            breed: "Cocker Spaniel Mix",
            weight: "18 kg",
            vaccinated: "Sim - V10 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Check-ups veterinários regulares",
        },
    },
    {
        id: 12,
        name: "Zeca",
        age: "2 anos",
        location: "Cametá - PA",
        image: "../assets/home/zeca.png",
        tags: ["Macho", "Enérgico"],
        description:
            "Zeca é um cão muito enérgico e inteligente. Adora aprender truques novos e brincar de buscar. É ideal para famílias ativas que gostam de interação.",
        owner: {
            name: "Luiza Pereira",
            phone: "(91) 92222-5555",
            email: "luiza.pereira@email.com",
            address: "Bairro Matinha, Cametá - PA",
            availability: "Segunda a sábado: 7h às 16h",
        },
        details: {
            species: "Cão",
            breed: "Jack Russell Mix",
            weight: "12 kg",
            vaccinated: "Sim - V10 em dia",
            dewormed: "Sim",
            castrated: "Sim",
            specialNeeds: "Estimulação mental diária",
        },
    },
];

// Função para renderizar os pets dinamicamente
function renderPets(filterType = "all") {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";

    let filteredPets = pets;

    if (filterType !== "all") {
        if (filterType === "filhote") {
            filteredPets = pets.filter((pet) => {
                const age = pet.age.toLowerCase();
                return (
                    age.includes("meses") ||
                    age.includes("mes") ||
                    (age.includes("ano") && (age.includes("1 ano") || age.includes("0")))
                );
            });
        } else {
            filteredPets = pets.filter((pet) => pet.details.species === filterType);
        }
    }

    if (filteredPets.length === 0) {
        cardsContainer.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #666; background: #f8f9fa; border-radius: 15px; border: 2px dashed #ddd;">
                <div style="font-size: 3rem; margin-bottom: 20px;">🐾</div>
                <h3 style="margin-bottom: 10px; color: #333;">Nenhum pet encontrado</h3>
                <p style="font-size: 1rem; line-height: 1.6;">Não há pets disponíveis para este filtro no momento.<br>Tente outro filtro ou volte mais tarde!</p>
            </div>
        `;
        return;
    }

    filteredPets.forEach((pet) => {
        const petCard = document.createElement("a");
        petCard.className = "card";
        petCard.href = "#";
        petCard.setAttribute("data-pet-id", pet.id);

        // Gerar as tags
        const tagsHTML = pet.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

        petCard.innerHTML = `
            <div class="card-image">
                <img src="${pet.image}" alt="${pet.name}" />
            </div>
            <div class="card-info">
                <h2>${pet.name}</h2>
                <p class="age">${pet.age}</p>
                <p class="location">${pet.location}</p>
                <div class="card-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;

        // Adicionar evento de clique
        petCard.addEventListener("click", (e) => {
            e.preventDefault();
            openPetModal(pet.id);
        });

        cardsContainer.appendChild(petCard);
    });
}

// Função para configurar os filtros
function setupFilters() {
    const filterItems = document.querySelectorAll(".filter-item");

    filterItems.forEach((item) => {
        item.addEventListener("click", () => {
            filterItems.forEach((f) => f.classList.remove("active"));

            item.classList.add("active");

            const filterType = item.getAttribute("data-filter");

            const cardsContainer = document.querySelector(".cards-container");
            cardsContainer.classList.add("filtering");

            setTimeout(() => {
                renderPets(filterType);
                cardsContainer.classList.remove("filtering");
            }, 150);

            const contentTitle = document.querySelector(".content h1");
            let count = 0;

            if (filterType === "all") {
                count = pets.length;
            } else if (filterType === "filhote") {
                count = pets.filter((pet) => {
                    const age = pet.age.toLowerCase();
                    return (
                        age.includes("meses") ||
                        age.includes("mes") ||
                        (age.includes("ano") && (age.includes("1 ano") || age.includes("0")))
                    );
                }).length;
            } else {
                count = pets.filter((pet) => pet.details.species === filterType).length;
            }

            switch (filterType) {
                case "all":
                    contentTitle.textContent = `Todos os pets (${count})`;
                    break;
                case "Cão":
                    contentTitle.textContent = `Cachorros disponíveis (${count})`;
                    break;
                case "Gato":
                    contentTitle.textContent = `Gatos disponíveis (${count})`;
                    break;
                case "filhote":
                    contentTitle.textContent = `Filhotes disponíveis (${count})`;
                    break;
            }
        });
    });
}

// Função para abrir o modal com os dados do pet
function openPetModal(petId) {
    const pet = pets.find((p) => p.id === petId);
    if (!pet) return;

    // Criar o modal se não existir
    let modal = document.getElementById("petModal");
    if (!modal) {
        modal = createPetModal();
        document.body.appendChild(modal);
    }

    // Preencher os dados do modal
    const modalContent = modal.querySelector(".modal-content");
    const tagsHTML = pet.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <div class="modal-header">
            <div class="pet-image">
                <img src="${pet.image}" alt="${pet.name}" />
            </div>
            <div class="pet-basic-info">
                <h2>${pet.name}</h2>
                <p class="pet-age">${pet.age}</p>
                <p class="pet-location">📍 ${pet.location}</p>
                <div class="pet-tags">
                    ${tagsHTML}
                </div>
            </div>
        </div>
        <div class="modal-body">
            <div class="pet-description">
                <h3>Sobre o ${pet.name}</h3>
                <p>${pet.description}</p>
            </div>
            
            <div class="pet-details">
                <h3>Informações</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <strong>Espécie:</strong> ${pet.details.species}
                    </div>
                    <div class="detail-item">
                        <strong>Raça:</strong> ${pet.details.breed}
                    </div>
                    <div class="detail-item">
                        <strong>Peso:</strong> ${pet.details.weight}
                    </div>
                    <div class="detail-item">
                        <strong>Vacinado:</strong> ${pet.details.vaccinated}
                    </div>
                    <div class="detail-item">
                        <strong>Vermifugado:</strong> ${pet.details.dewormed}
                    </div>
                    <div class="detail-item">
                        <strong>Castrado:</strong> ${pet.details.castrated}
                    </div>
                    <div class="detail-item">
                        <strong>Necessidades especiais:</strong> ${pet.details.specialNeeds}
                    </div>
                </div>
            </div>
            
            <div class="owner-contact">
                <h3>Contato para Adoção</h3>
                <div class="contact-info">
                    <div class="contact-item">
                        <strong>👤 Responsável:</strong> ${pet.owner.name}
                    </div>
                    <div class="contact-item">
                        <strong>📱 Telefone:</strong> 
                        <a href="tel:${pet.owner.phone.replace(/\D/g, "")}">${pet.owner.phone}</a>
                    </div>
                    <div class="contact-item">
                        <strong>📧 Email:</strong> 
                        <a href="mailto:${pet.owner.email}">${pet.owner.email}</a>
                    </div>
                    <div class="contact-item">
                        <strong>📍 Endereço:</strong> ${pet.owner.address}
                    </div>
                    <div class="contact-item">
                        <strong>🕒 Disponibilidade:</strong> ${pet.owner.availability}
                    </div>
                </div>
                
                <div class="contact-buttons">
                    <a href="https://wa.me/55${pet.owner.phone.replace(
                        /\D/g,
                        ""
                    )}?text=Olá! Tenho interesse em adotar o ${pet.name}. Podemos conversar?" 
                       target="_blank" class="btn btn-whatsapp">
                        💬 WhatsApp
                    </a>
                    <a href="mailto:${pet.owner.email}?subject=Interesse em adotar ${pet.name}&body=Olá ${
        pet.owner.name
    },%0D%0A%0D%0ATenho interesse em adotar o ${
        pet.name
    }. Gostaria de saber mais informações sobre o processo de adoção.%0D%0A%0D%0AObrigado!" 
                       class="btn btn-email">
                        📧 Email
                    </a>
                </div>
            </div>
        </div>
    `;

    // Adicionar evento para fechar o modal
    const closeBtn = modal.querySelector(".close");
    closeBtn.addEventListener("click", closePetModal);

    // Mostrar o modal
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Função para criar a estrutura do modal
function createPetModal() {
    const modal = document.createElement("div");
    modal.id = "petModal";
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <!-- Conteúdo será inserido dinamicamente -->
        </div>
    `;

    // Fechar modal ao clicar fora
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closePetModal();
        }
    });

    return modal;
}

// Função para fechar o modal
function closePetModal() {
    const modal = document.getElementById("petModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Função para destacar o item ativo na navbar mobile
function setActiveNavItem() {
    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        const href = item.getAttribute("href");

        // Remove classe active de todos os itens
        item.classList.remove("active");

        // Adiciona classe active ao item correspondente à página atual
        if (
            currentPage.includes(href.split("/").pop().split(".")[0]) ||
            (currentPage.includes("home") && href.includes("home"))
        ) {
            item.classList.add("active");
        }
    });
}

// Executa quando a página carrega
document.addEventListener("DOMContentLoaded", function () {
    setupFilters(); // Configurar filtros primeiro
    renderPets(); // Depois renderizar pets

    // Atualizar título inicial com contador
    const contentTitle = document.querySelector(".content h1");
    contentTitle.textContent = `Todos os pets (${pets.length})`;

    setActiveNavItem();

    // Fechar modal com a tecla ESC
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closePetModal();
        }
    });
});

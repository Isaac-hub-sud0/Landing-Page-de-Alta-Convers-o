document.addEventListener('DOMContentLoaded', () => {
    // --- Animações de carregamento da página ---
    const heroElements = document.querySelectorAll('.animate-on-load');
    // Aqui Usa um pequeno tempo limite para garantir que o navegador tenha renderizado o estado inicial
    setTimeout(() => {
        heroElements.forEach(el => {
            el.classList.add('loaded');
        });
    }, 100);

    // --- Rolagem suave para o botão CTA(Chamada para Ação) na seção principal
    const primaryCtaButton = document.querySelector('.btn-primary');

    if (primaryCtaButton) {
        primaryCtaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = primaryCtaButton.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Observador de interseção para animações de rolagem
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // observa interseções relativas à janela de visualização (no caso o que o usuário está vendo)
        threshold: 0.1 // dispara o evento quando pelo menos 10% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Envio do formulário via EmailJS ---
    emailjs.init('3UUu7UYs5WCsnzOaZ'); // Minha Public Key do EmailJS

    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            emailjs.sendForm('service_mlox0ft', 'template_iaq2t1l', this)
                .then(function(response) {
                    alert('Obrigado! Recebemos suas informações e entraremos em contato em breve.');
                    quoteForm.reset(); // Limpa o formulário após envio
                }, function(error) {
                    alert('Erro ao enviar: ' + error.text);
                });
        });
    }
});
// =============== MENU TOGGLE ===============
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu on mobile when clicking nav links
const navLinks = document.querySelectorAll('.nav__link');
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(link => link.addEventListener('click', linkAction));

// =============== CHANGE HEADER BACKGROUND ON SCROLL ===============
function scrollHeader() {
    const header = document.getElementById('header');
    if(window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// =============== ACTIVE LINK ON SCROLL ===============
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav__link').forEach(link => {
                if(link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            });
        }
    });
}
window.addEventListener('scroll', scrollActive);

// =============== SHOW SCROLL UP BUTTON ===============
function scrollUp() {
    const scrollUpBtn = document.getElementById('scroll-up');
    if(window.scrollY >= 350) {
        scrollUpBtn.classList.add('show-scroll');
    } else {
        scrollUpBtn.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

// Scroll to top functionality
const scrollUpBtn = document.getElementById('scroll-up');
scrollUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =============== SMOOTH SCROLL FOR ANCHOR LINKS ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if(href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// =============== SCROLL REVEAL ANIMATION ===============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.home__content, .home__image, .feature__card, .product__card, .about__content, .about__image, .contact__info, .contact__form'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// =============== FORM VALIDATION AND SUBMISSION ===============
const contactForm = document.getElementById('contact-form');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if(name && email && subject && message) {
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
            
            // Reset form
            this.reset();
        } else {
            showNotification('Por favor, completa todos los campos.', 'error');
        }
    });
}

// =============== NOTIFICATION SYSTEM ===============
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? '#00f0ff' : '#ff006e'};
        color: #0a0e27;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 8px 32px rgba(0, 240, 255, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Append to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 5000);
}

// =============== PARALLAX EFFECT FOR HOME SECTION ===============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home');
    if(homeSection) {
        const shapes = homeSection.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px)`;
        });
    }
});

// =============== TYPING EFFECT FOR HOME TITLE (OPTIONAL) ===============
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if(i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// =============== COUNTER ANIMATION FOR STATS ===============
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if(start < target) {
            element.textContent = Math.floor(start).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    }
    updateCounter();
}

// Observe stats section and animate counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if(number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const homeStats = document.querySelector('.home__stats');
if(homeStats) {
    statsObserver.observe(homeStats);
}

// =============== CARD HOVER EFFECTS ===============
document.querySelectorAll('.feature__card, .product__card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if(card.classList.contains('product__card')) {
            this.style.transform = 'translateY(-5px)';
        } else {
            this.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =============== INITIALIZE ON PAGE LOAD ===============
window.addEventListener('load', () => {
    // Set active link on page load
    scrollActive();
    
    // Check scroll position on load
    scrollHeader();
    scrollUp();
});

// =============== PREVENT DEFAULT BEHAVIOR FOR EMPTY LINKS ===============
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// =============== DYNAMIC ACTIVE USERS COUNTER ===============
function updateActiveUsersCounter() {
    const activeUsersElement = document.getElementById('active-users-count');
    if(!activeUsersElement) return;
    
    // Generate random number between 300 and 899
    const randomNumber = Math.floor(Math.random() * (899 - 300 + 1)) + 300;
    
    // Update the counter with smooth animation
    const currentValue = parseInt(activeUsersElement.textContent.replace(/[^0-9]/g, '')) || 500;
    const targetValue = randomNumber;
    const duration = 1000; // Animation duration in ms
    const steps = 30;
    const increment = (targetValue - currentValue) / steps;
    let currentStep = 0;
    
    function animateCounter() {
        currentStep++;
        const newValue = Math.round(currentValue + (increment * currentStep));
        activeUsersElement.textContent = newValue + '+';
        
        if(currentStep < steps) {
            requestAnimationFrame(animateCounter);
        } else {
            activeUsersElement.textContent = targetValue + '+';
        }
    }
    
    animateCounter();
}

// Update counter on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveUsersCounter();
    
    // Update counter every 30 seconds (30000ms)
    setInterval(updateActiveUsersCounter, 30000);
});

// =============== LANGUAGE SYSTEM ===============
const translations = {
    es: {
        nav: {
            home: "Inicio",
            showcase: "Showcase",
            features: "Características",
            products: "Productos",
            about: "Acerca de",
            faq: "FAQ"
        },
        home: {
            subtitle: "La mejor solución para FiveM",
            title: "QUANTUM ENGINE",
            subtitle2: "Cheat External y Spoofer",
            description: "Cheat external avanzado y spoofer para FiveM. Bypassea todos los anti-cheats y juega sin preocupaciones. Únete a nuestra comunidad en Discord.",
            joinDiscord: "Unirse a Discord",
            viewProducts: "Ver Productos",
            activeUsers: "Usuarios Activos",
            successRate: "Tasa de Éxito",
            support: "Soporte"
        },
        features: {
            subtitle: "Características",
            title: "Por qué elegir Quantum Engine",
            antiDetection: "Anti-Detección Avanzado",
            antiDetectionDesc: "Bypassea todos los anti-cheats principales de FiveM. Tecnología avanzada de evasión.",
            spoofer: "Spoofer Integrado",
            spooferDesc: "Spoofer completo que elimina todos los bans. Restaura tu cuenta y vuelve a jugar sin restricciones.",
            updates: "Actualizaciones Constantes",
            updatesDesc: "Actualizaciones regulares para mantener la compatibilidad y mejorar las funciones.",
            community: "Comunidad Activa",
            communityDesc: "Únete a nuestra comunidad en Discord con más de 2000 miembros. Soporte y ayuda garantizada.",
            cheat: "Cheat External",
            cheatDesc: "Cheat externo seguro y estable. No requiere inyección, totalmente indetectable.",
            support: "Soporte 24/7",
            supportDesc: "Equipo de soporte disponible las 24 horas. Resolvemos tus dudas rápidamente."
        },
        showcase: {
            subtitle: "Showcase",
            title: "Videos de Nuestros Productos",
            spoofer: {
                subtitle: "Video",
                title: "Spoofer",
                desc1: "Descubre cómo funciona nuestro Spoofer para FiveM. Elimina todos los bans y restricciones de anti-cheats de forma segura y efectiva.",
                desc2: "Nuestro spoofer está diseñado para bypassear los principales sistemas de detección, permitiéndote volver a jugar sin restricciones.",
                btn: "Ver Planes"
            },
            external: {
                subtitle: "Video",
                title: "Cheat External",
                desc1: "Conoce nuestro Cheat External para FiveM. Una solución completa y totalmente indetectable para mejorar tu experiencia de juego.",
                desc2: "Nuestro cheat externo incluye todas las funciones que necesitas, con actualizaciones constantes y soporte garantizado.",
                btn: "Ver Planes"
            }
        },
        products: {
            subtitle: "Productos",
            title: "Nuestros Menús Disponibles",
            spooferCategory: "Spoofer FiveM",
            externalCategory: "Cheat External FiveM",
            popular: "Popular",
            bestValue: "Mejor Valor",
            spooferWeekly: "Spoofer Semanal",
            spooferMonthly: "Spoofer Mensual",
            spooferLifetime: "Spoofer Lifetime",
            externalWeekly: "External Semanal",
            externalMonthly: "External Mensual",
            externalLifetime: "External Lifetime",
            week: "/semana",
            month: "/mes",
            oneTime: "pago único",
            buyNow: "Comprar Ahora",
            feature1: "Elimina todos los bans",
            feature2: "Compatible con todos los anti-cheats",
            feature3: "Soporte incluido",
            feature4: "Actualizaciones automáticas",
            feature5: "Soporte de por vida",
            feature6: "Actualizaciones de por vida",
            feature7: "Acceso permanente",
            feature8: "Mejor relación calidad-precio",
            feature9: "Ahorra más que el plan semanal",
            feature10: "Ahorra más que planes cortos",
            externalFeature1: "Cheat external completo",
            externalFeature2: "Totalmente indetectable",
            externalFeature3: "Todas las funciones desbloqueadas"
        },
        about: {
            subtitle: "Acerca de Nosotros",
            title: "Quantum Engine",
            desc1: "Quantum Engine es una tienda especializada en cheats externos y spoofers para FiveM. Ofrecemos las mejores soluciones para bypassear anti-cheats y eliminar bans, permitiéndote disfrutar de FiveM sin restricciones.",
            desc2: "Nuestro equipo está comprometido con proporcionar productos de alta calidad, actualizaciones constantes y un soporte excepcional. Únete a nuestra comunidad en Discord y forma parte de más de 2000 usuarios satisfechos.",
            feature1: "Productos probados y seguros",
            feature2: "Actualizaciones regulares garantizadas",
            feature3: "Soporte 24/7 en Discord"
        },
        team: {
            subtitle: "Equipo",
            title: "Conoce al Equipo",
            nk: {
                role: "CEO & Developer",
                description: "Fundador y CEO de Quantum Engine. Desarrollador principal y líder técnico. Apasionado por crear las mejores soluciones para la comunidad gaming."
            },
            teg0: {
                role: "CEO",
                description: "Co-fundador y CEO de Quantum Engine. Comprometido con la excelencia y la innovación constante en el mundo gaming."
            }
        },
        footer: {
            description: "Cheat external y spoofer para FiveM. La mejor solución para bypassear anti-cheats y eliminar bans.",
            quickLinks: "Enlaces Rápidos",
            support: "Soporte",
            helpCenter: "Centro de Ayuda",
            terms: "Términos de Servicio",
            privacy: "Política de Privacidad",
            copyright: "© 2026 Quantum Engine. Todos los derechos reservados."
        },
        faq: {
            subtitle: "Preguntas Frecuentes",
            title: "¿Tienes alguna pregunta?",
            q1: {
                question: "¿Qué es Quantum Engine?",
                answer: "Quantum Engine es una tienda especializada en cheats externos y spoofers para FiveM. Ofrecemos soluciones avanzadas para bypassear anti-cheats y eliminar bans de forma segura."
            },
            q2: {
                question: "¿Cómo funciona el spoofer?",
                answer: "Nuestro spoofer cambia los identificadores de hardware de tu sistema, permitiéndote bypassear los bans y volver a jugar en FiveM sin restricciones."
            },
            q3: {
                question: "¿Es seguro usar el cheat external?",
                answer: "Sí, nuestro cheat external está diseñado para ser completamente indetectable. Utiliza tecnología avanzada de evasión y se actualiza constantemente para mantener la seguridad."
            },
            q4: {
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos diversos métodos de pago. Para más información sobre métodos disponibles, únete a nuestro Discord donde podrás ver todas las opciones."
            },
            q5: {
                question: "¿Ofrecen soporte técnico?",
                answer: "Sí, ofrecemos soporte 24/7 a través de nuestro servidor de Discord. Nuestro equipo está disponible para ayudarte con cualquier problema o duda."
            },
            q6: {
                question: "¿Los productos se actualizan regularmente?",
                answer: "Sí, nuestros productos reciben actualizaciones constantes para mantener la compatibilidad y mejorar la efectividad contra los sistemas de detección."
            }
        }
    },
    en: {
        nav: {
            home: "Home",
            showcase: "Showcase",
            features: "Features",
            products: "Products",
            about: "About",
            faq: "FAQ"
        },
        home: {
            subtitle: "The best solution for FiveM",
            title: "QUANTUM ENGINE",
            subtitle2: "External Cheat and Spoofer",
            description: "Advanced external cheat and spoofer for FiveM. Bypass all anti-cheats and play without worries. Join our Discord community.",
            joinDiscord: "Join Discord",
            viewProducts: "View Products",
            activeUsers: "Active Users",
            successRate: "Success Rate",
            support: "Support"
        },
        features: {
            subtitle: "Features",
            title: "Why choose Quantum Engine",
            antiDetection: "Advanced Anti-Detection",
            antiDetectionDesc: "Bypass all main FiveM anti-cheats. Advanced evasion technology.",
            spoofer: "Integrated Spoofer",
            spooferDesc: "Complete spoofer that removes all bans. Restore your account and play again without restrictions.",
            updates: "Constant Updates",
            updatesDesc: "Stay up to date with regular updates. Always compatible with the latest versions.",
            community: "Active Community",
            communityDesc: "Join our Discord community with over 2000 members. Guaranteed support and help.",
            cheat: "External Cheat",
            cheatDesc: "Safe and stable external cheat. No injection required, completely undetectable.",
            support: "24/7 Support",
            supportDesc: "Support team available 24 hours. We resolve your doubts quickly."
        },
        showcase: {
            subtitle: "Showcase",
            title: "Our Products Videos",
            spoofer: {
                subtitle: "Video",
                title: "Spoofer",
                desc1: "Discover how our Spoofer for FiveM works. Removes all bans and anti-cheat restrictions safely and effectively.",
                desc2: "Our spoofer is designed to bypass the main detection systems, allowing you to play again without restrictions.",
                btn: "View Plans"
            },
            external: {
                subtitle: "Video",
                title: "External Cheat",
                desc1: "Learn about our External Cheat for FiveM. A complete and completely undetectable solution to enhance your gaming experience.",
                desc2: "Our external cheat includes all the features you need, with constant updates and guaranteed support.",
                btn: "View Plans"
            }
        },
        products: {
            subtitle: "Products",
            title: "Our Available Menus",
            spooferCategory: "FiveM Spoofer",
            externalCategory: "FiveM External Cheat",
            popular: "Popular",
            bestValue: "Best Value",
            spooferWeekly: "Weekly Spoofer",
            spooferMonthly: "Monthly Spoofer",
            spooferLifetime: "Spoofer Lifetime",
            externalWeekly: "Weekly External",
            externalMonthly: "Monthly External",
            externalLifetime: "External Lifetime",
            week: "/week",
            month: "/month",
            oneTime: "one-time payment",
            buyNow: "Buy Now",
            feature1: "Removes all bans",
            feature2: "Compatible with all anti-cheats",
            feature3: "Support included",
            feature4: "Automatic updates",
            feature5: "Lifetime support",
            feature6: "Lifetime updates",
            feature7: "Permanent access",
            feature8: "Best value for money",
            feature9: "Save more than weekly plan",
            feature10: "Save more than short plans",
            externalFeature1: "Complete external cheat",
            externalFeature2: "Completely undetectable",
            externalFeature3: "All features unlocked"
        },
        about: {
            subtitle: "About Us",
            title: "Quantum Engine",
            desc1: "Quantum Engine is a store specialized in external cheats and spoofers for FiveM. We offer the best solutions to bypass anti-cheats and remove bans, allowing you to enjoy FiveM without restrictions.",
            desc2: "Our team is committed to providing high-quality products, constant updates and exceptional support. Join our Discord community and be part of over 2000 satisfied users.",
            feature1: "Tested and safe products",
            feature2: "Guaranteed regular updates",
            feature3: "24/7 support on Discord"
        },
        team: {
            subtitle: "Team",
            title: "Meet the Team",
            nk: {
                role: "CEO & Developer",
                description: "Founder and CEO of Quantum Engine. Lead developer and technical leader. Passionate about creating the best solutions for the gaming community."
            },
            teg0: {
                role: "CEO",
                description: "Co-founder and CEO of Quantum Engine. Committed to excellence and constant innovation in the gaming world."
            }
        },
        footer: {
            description: "External cheat and spoofer for FiveM. The best solution to bypass anti-cheats and remove bans.",
            quickLinks: "Quick Links",
            support: "Support",
            helpCenter: "Help Center",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            copyright: "© 2026 Quantum Engine. All rights reserved."
        },
        faq: {
            subtitle: "Frequently Asked Questions",
            title: "Do you have any questions?",
            q1: {
                question: "What is Quantum Engine?",
                answer: "Quantum Engine is a store specialized in external cheats and spoofers for FiveM. We offer advanced solutions to bypass anti-cheats and remove bans safely."
            },
            q2: {
                question: "How does the spoofer work?",
                answer: "Our spoofer changes your system's hardware identifiers, allowing you to bypass bans and play again on FiveM without restrictions."
            },
            q3: {
                question: "Is it safe to use the external cheat?",
                answer: "Yes, our external cheat is designed to be completely undetectable. It uses advanced evasion technology and is constantly updated to maintain security."
            },
            q4: {
                question: "What payment methods do you accept?",
                answer: "We accept various payment methods. For more information about available methods, join our Discord where you can see all options."
            },
            q5: {
                question: "Do you offer technical support?",
                answer: "Yes, we offer 24/7 support through our Discord server. Our team is available to help you with any problem or question."
            },
            q6: {
                question: "Are products updated regularly?",
                answer: "Yes, our products receive constant updates to maintain compatibility and improve effectiveness against detection systems."
            }
        }
    },
    pt: {
        nav: {
            home: "Início",
            showcase: "Showcase",
            features: "Recursos",
            products: "Produtos",
            about: "Sobre",
            faq: "FAQ"
        },
        home: {
            subtitle: "A melhor solução para FiveM",
            title: "QUANTUM ENGINE",
            subtitle2: "Cheat Externo e Spoofer",
            description: "Cheat externo avançado e spoofer para FiveM. Bypassa todos os anti-cheats e jogue sem preocupações. Junte-se à nossa comunidade no Discord.",
            joinDiscord: "Entrar no Discord",
            viewProducts: "Ver Produtos",
            activeUsers: "Usuários Ativos",
            successRate: "Taxa de Sucesso",
            support: "Suporte"
        },
        features: {
            subtitle: "Recursos",
            title: "Por que escolher Quantum Engine",
            antiDetection: "Anti-Detecção Avançado",
            antiDetectionDesc: "Bypassa todos os principais anti-cheats do FiveM. Tecnologia avançada de evasão.",
            spoofer: "Spoofer Integrado",
            spooferDesc: "Spoofer completo que remove todos os bans. Restaure sua conta e jogue novamente sem restrições.",
            updates: "Atualizações Constantes",
            updatesDesc: "Mantenha-se atualizado com atualizações regulares. Sempre compatível com as versões mais recentes.",
            community: "Comunidade Ativa",
            communityDesc: "Junte-se à nossa comunidade no Discord com mais de 2000 membros. Suporte e ajuda garantidos.",
            cheat: "Cheat Externo",
            cheatDesc: "Cheat externo seguro e estável. Não requer injeção, totalmente indetectável.",
            support: "Suporte 24/7",
            supportDesc: "Equipe de suporte disponível 24 horas. Resolvemos suas dúvidas rapidamente."
        },
        showcase: {
            subtitle: "Showcase",
            title: "Vídeos dos Nossos Produtos",
            spoofer: {
                subtitle: "Vídeo",
                title: "Spoofer",
                desc1: "Descubra como funciona nosso Spoofer para FiveM. Remove todos os bans e restrições de anti-cheats de forma segura e eficaz.",
                desc2: "Nosso spoofer é projetado para bypassar os principais sistemas de detecção, permitindo que você jogue novamente sem restrições.",
                btn: "Ver Planos"
            },
            external: {
                subtitle: "Vídeo",
                title: "Cheat Externo",
                desc1: "Conheça nosso Cheat Externo para FiveM. Uma solução completa e totalmente indetectável para melhorar sua experiência de jogo.",
                desc2: "Nosso cheat externo inclui todos os recursos que você precisa, com atualizações constantes e suporte garantido.",
                btn: "Ver Planos"
            }
        },
        products: {
            subtitle: "Produtos",
            title: "Nossos Menus Disponíveis",
            spooferCategory: "Spoofer FiveM",
            externalCategory: "Cheat Externo FiveM",
            popular: "Popular",
            bestValue: "Melhor Valor",
            spooferWeekly: "Spoofer Semanal",
            spooferMonthly: "Spoofer Mensal",
            spooferLifetime: "Spoofer Lifetime",
            externalWeekly: "External Semanal",
            externalMonthly: "External Mensal",
            externalLifetime: "External Lifetime",
            week: "/semana",
            month: "/mês",
            oneTime: "pagamento único",
            buyNow: "Comprar Agora",
            feature1: "Remove todos os bans",
            feature2: "Compatível com todos os anti-cheats",
            feature3: "Suporte incluído",
            feature4: "Atualizações automáticas",
            feature5: "Suporte vitalício",
            feature6: "Atualizações vitalícias",
            feature7: "Acesso permanente",
            feature8: "Melhor relação qualidade-preço",
            feature9: "Economize mais que o plano semanal",
            feature10: "Economize mais que planos curtos",
            externalFeature1: "Cheat externo completo",
            externalFeature2: "Totalmente indetectável",
            externalFeature3: "Todos os recursos desbloqueados"
        },
        about: {
            subtitle: "Sobre Nós",
            title: "Quantum Engine",
            desc1: "Quantum Engine é uma loja especializada em cheats externos e spoofers para FiveM. Oferecemos as melhores soluções para bypassar anti-cheats e remover bans, permitindo que você desfrute do FiveM sem restrições.",
            desc2: "Nossa equipe está comprometida em fornecer produtos de alta qualidade, atualizações constantes e suporte excepcional. Junte-se à nossa comunidade no Discord e faça parte de mais de 2000 usuários satisfeitos.",
            feature1: "Produtos testados e seguros",
            feature2: "Atualizações regulares garantidas",
            feature3: "Suporte 24/7 no Discord"
        },
        team: {
            subtitle: "Equipe",
            title: "Conheça a Equipe",
            nk: {
                role: "CEO & Developer",
                description: "Fundador e CEO da Quantum Engine. Desenvolvedor principal e líder técnico. Apaixonado por criar as melhores soluções para a comunidade gaming."
            },
            teg0: {
                role: "CEO",
                description: "Co-fundador e CEO da Quantum Engine. Comprometido com a excelência e a inovação constante no mundo gaming."
            }
        },
        footer: {
            description: "Cheat externo e spoofer para FiveM. A melhor solução para bypassar anti-cheats e remover bans.",
            quickLinks: "Links Rápidos",
            support: "Suporte",
            helpCenter: "Central de Ajuda",
            terms: "Termos de Serviço",
            privacy: "Política de Privacidade",
            copyright: "© 2026 Quantum Engine. Todos os direitos reservados."
        },
        faq: {
            subtitle: "Perguntas Frequentes",
            title: "Tem alguma pergunta?",
            q1: {
                question: "O que é Quantum Engine?",
                answer: "Quantum Engine é uma loja especializada em cheats externos e spoofers para FiveM. Oferecemos soluções avançadas para bypassar anti-cheats e remover bans com segurança."
            },
            q2: {
                question: "Como funciona o spoofer?",
                answer: "Nosso spoofer altera os identificadores de hardware do seu sistema, permitindo que você bypass os bans e jogue novamente no FiveM sem restrições."
            },
            q3: {
                question: "É seguro usar o cheat externo?",
                answer: "Sim, nosso cheat externo é projetado para ser completamente indetectável. Usa tecnologia avançada de evasão e é constantemente atualizado para manter a segurança."
            },
            q4: {
                question: "Quais métodos de pagamento vocês aceitam?",
                answer: "Aceitamos vários métodos de pagamento. Para mais informações sobre métodos disponíveis, junte-se ao nosso Discord onde você pode ver todas as opções."
            },
            q5: {
                question: "Vocês oferecem suporte técnico?",
                answer: "Sim, oferecemos suporte 24/7 através do nosso servidor Discord. Nossa equipe está disponível para ajudá-lo com qualquer problema ou dúvida."
            },
            q6: {
                question: "Os produtos são atualizados regularmente?",
                answer: "Sim, nossos produtos recebem atualizações constantes para manter a compatibilidade e melhorar a eficácia contra sistemas de detecção."
            }
        }
    }
};

// Get current language from localStorage or default to Spanish
let currentLanguage = localStorage.getItem('language') || 'es';

// Language flags mapping (URLs)
const languageFlags = {
    es: 'https://flagcdn.com/w20/es.png',
    en: 'https://flagcdn.com/w20/gb.png',
    pt: 'https://flagcdn.com/w20/pt.png'
};

// Language names mapping
const languageNames = {
    es: 'Español',
    en: 'English',
    pt: 'Português'
};

// Update page content based on current language
function updatePageLanguage(lang) {
    const trans = translations[lang];
    if (!trans) return;

    // Update navigation
    document.querySelectorAll('[data-translate^="nav."]').forEach(el => {
        const key = el.getAttribute('data-translate').replace('nav.', '');
        if (trans.nav[key]) {
            el.textContent = trans.nav[key];
        }
    });

    // Update FAQ
    document.querySelectorAll('[data-translate^="faq."]').forEach(el => {
        const key = el.getAttribute('data-translate').replace('faq.', '');
        const keys = key.split('.');
        if (keys.length === 1 && trans.faq[keys[0]]) {
            el.textContent = trans.faq[keys[0]];
        } else if (keys.length === 2 && trans.faq[keys[0]] && trans.faq[keys[0]][keys[1]]) {
            el.textContent = trans.faq[keys[0]][keys[1]];
        }
    });

    // Update language selector button (only flag)
    const langBtn = document.getElementById('language-btn');
    if (langBtn) {
        const flagImg = document.getElementById('language-flag-icon');
        if (flagImg && languageFlags[lang]) {
            flagImg.src = languageFlags[lang];
        }
    }
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const keys = key.split('.');
        let value = trans;
        
        for (let k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        
        if (value !== null && value !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = value;
            } else if (el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', value);
            } else {
                el.textContent = value;
            }
        }
    });
}

// Initialize language selector
function initLanguageSelector() {
    const langBtn = document.getElementById('language-btn');
    const langDropdown = document.getElementById('language-dropdown');
    
    if (!langBtn || !langDropdown) return;

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
        langBtn.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
            langBtn.classList.remove('active');
        }
    });

    // Handle language selection
    langDropdown.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            currentLanguage = selectedLang;
            localStorage.setItem('language', selectedLang);
            updatePageLanguage(selectedLang);
            langDropdown.classList.remove('active');
            langBtn.classList.remove('active');
        });
    });

    // Set initial language
    updatePageLanguage(currentLanguage);
}

// =============== FAQ ACCORDION ===============
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    initFAQ();
});

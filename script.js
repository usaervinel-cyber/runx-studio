/* ========================================
   RUNX Portfolio · Interactions
======================================== */

(() => {
    'use strict';

    /* -------- LOADER -------- */
    const loader = document.getElementById('loader');
    const loaderCount = document.getElementById('loaderCount');
    let count = 0;
    const counter = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2;
        if (count >= 100) {
            count = 100;
            clearInterval(counter);
            setTimeout(() => {
                loader.classList.add('is-done');
                document.body.classList.add('is-loaded');
                renderHeroTitle(currentLang);
            }, 400);
        }
        loaderCount.textContent = count;
    }, 40);

    /* -------- LANGUAGE SWITCHER -------- */
    let currentLang = localStorage.getItem('runx-lang') || 'en';

    function applyLang(lang) {
        currentLang = lang;
        // BCP 47: Ukrainian is 'uk', not 'ua'
        document.documentElement.lang = lang === 'ua' ? 'uk' : 'en';
        localStorage.setItem('runx-lang', lang);

        // Text swaps
        document.querySelectorAll('[data-en]').forEach(el => {
            if (el.id === 'heroTitle') return; // handled separately
            const val = el.getAttribute(`data-${lang}`);
            if (val != null) el.innerHTML = val;
        });

        // Placeholder swaps
        document.querySelectorAll('[data-en-ph]').forEach(el => {
            const val = el.getAttribute(`data-${lang}-ph`);
            if (val != null) el.placeholder = val;
        });

        // Toggle button state
        document.querySelectorAll('[data-set-lang]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-set-lang') === lang);
        });

        // Hero title — re-render with letter split
        renderHeroTitle(lang);
    }

    function renderHeroTitle(lang) {
        const el = document.getElementById('heroTitle');
        if (!el) return;
        const text = el.getAttribute(`data-${lang}`) || el.textContent;

        // Simple split: detect words that should be italic/accent by markers
        // We'll hardcode the last word to be italic+accent
        const words = text.trim().split(/\s+/);
        const html = words.map((word, wi) => {
            const isLast = wi === words.length - 1;
            const cls = isLast ? 'word italic accent' : 'word';
            const letters = [...word].map((l, li) => {
                const delay = 0.15 + (wi * 0.08) + (li * 0.025);
                return `<span class="letter" style="animation-delay:${delay}s">${l === ' ' ? '&nbsp;' : l}</span>`;
            }).join('');
            return `<span class="${cls}">${letters}</span>`;
        }).join(' ');

        el.innerHTML = html;
    }

    // Wire up switcher
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLang(btn.getAttribute('data-set-lang'));
        });
    });

    // Apply initial language (after DOM ready)
    applyLang(currentLang);

    /* -------- CUSTOM CURSOR -------- */
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateCursor = () => {
        const ease = 0.18;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('[data-cursor]').forEach(el => {
        const type = el.getAttribute('data-cursor');
        el.addEventListener('mouseenter', () => cursor.classList.add(`is-${type}`));
        el.addEventListener('mouseleave', () => cursor.classList.remove(`is-${type}`));
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    /* -------- SCROLL PROGRESS + HEADER -------- */
    const progress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');

    const onScroll = () => {
        const h = document.documentElement;
        const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        progress.style.width = p + '%';

        if (h.scrollTop > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* -------- REVEAL ON SCROLL -------- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* -------- PROJECTS IN-VIEW -------- */
    const projectIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in-view');
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.project').forEach(el => projectIO.observe(el));

    /* -------- COUNTER ANIMATIONS -------- */
    const statEls = document.querySelectorAll('[data-count]');
    const statIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                const duration = 1600;
                const start = performance.now();
                const tick = (now) => {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = Math.round(target * eased);
                    if (t < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                statIO.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    statEls.forEach(el => statIO.observe(el));

    /* ==========================================================
       PREVIEW ANIMATION — desktop: hover · mobile: in-viewport
       Single rAF loop per preview. Same speed either mode.
    ========================================================== */
    const PREVIEW_DURATION = 9000; // ms for one top→bottom sweep
    const IS_TOUCH = window.matchMedia('(hover: none)').matches ||
                     window.matchMedia('(max-width: 900px)').matches;

    document.querySelectorAll('.project-preview').forEach(wrap => {
        const img = wrap.querySelector('img');
        if (!img) return;

        let rafId = null;
        let startTime = 0;
        let active = false;
        let leavingAnim = null;

        let mx = 0, my = 0;
        let tx = 0, ty = 0;

        const setPos = (percent) => {
            img.style.objectPosition = `50% ${percent.toFixed(2)}%`;
        };
        const setTransform = (x, y, scale = IS_TOUCH ? 1 : 1.015) => {
            if (IS_TOUCH) return; // no parallax/scale on touch
            wrap.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale})`;
        };

        const loop = (now) => {
            if (!active) return;
            const elapsed = now - startTime;
            const phase = (elapsed % (PREVIEW_DURATION * 2)) / PREVIEW_DURATION;
            const pos = phase <= 1 ? phase : 2 - phase;
            setPos(pos * 100);

            if (!IS_TOUCH) {
                tx += (mx - tx) * 0.08;
                ty += (my - ty) * 0.08;
                setTransform(tx, ty);
            }

            rafId = requestAnimationFrame(loop);
        };

        const killLeaveAnim = () => {
            if (leavingAnim) {
                cancelAnimationFrame(leavingAnim);
                leavingAnim = null;
            }
            img.style.transition = 'filter 0.5s ease';
            wrap.style.transition = '';
        };

        const activate = () => {
            killLeaveAnim();
            setPos(0);
            mx = 0; my = 0; tx = 0; ty = 0;
            if (!IS_TOUCH) setTransform(0, 0);

            void img.offsetHeight;

            active = true;
            startTime = performance.now();
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(loop);
        };

        const deactivate = () => {
            active = false;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;

            const startPos = parseFloat(
                (img.style.objectPosition || '50% 0%').split(' ')[1]
            ) || 0;
            const startTx = tx, startTy = ty;
            const leaveStart = performance.now();
            const LEAVE_DUR = 500;

            const leaveTick = (now) => {
                const t = Math.min((now - leaveStart) / LEAVE_DUR, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                const p = startPos * (1 - eased);
                setPos(p);
                if (!IS_TOUCH) {
                    const x = startTx * (1 - eased);
                    const y = startTy * (1 - eased);
                    setTransform(x, y, 1.015 - 0.015 * eased);
                }
                if (t < 1) {
                    leavingAnim = requestAnimationFrame(leaveTick);
                } else {
                    leavingAnim = null;
                    setPos(0);
                    if (!IS_TOUCH) wrap.style.transform = '';
                    tx = 0; ty = 0; mx = 0; my = 0;
                }
            };
            leavingAnim = requestAnimationFrame(leaveTick);
        };

        if (IS_TOUCH) {
            // Mobile: activate when preview is in viewport
            const pIO = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) activate();
                    else deactivate();
                });
            }, { threshold: 0.45 });
            pIO.observe(wrap);
        } else {
            // Desktop: hover + mouse parallax
            wrap.addEventListener('mouseenter', activate);
            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                mx = x * 6;
                my = y * 6;
            });
            wrap.addEventListener('mouseleave', deactivate);
        }
    });

    /* -------- SCROLL TO TOP (mobile FAB) -------- */
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        const toggleScrollTop = () => {
            if (window.scrollY > 400) scrollTopBtn.classList.add('is-visible');
            else scrollTopBtn.classList.remove('is-visible');
        };
        window.addEventListener('scroll', toggleScrollTop, { passive: true });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        toggleScrollTop();
    }

    /* -------- PROJECT MODAL -------- */
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const modalNum = document.getElementById('modalNum');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');

    const openModal = (project) => {
        const num = project.querySelector('.project-num').textContent;
        const title = project.querySelector('.project-title').textContent;
        const img = project.querySelector('.preview-wrap img');

        modalNum.textContent = num;
        modalTitle.textContent = title;
        modalBody.innerHTML = '';
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.alt = title;
        modalBody.appendChild(fullImg);

        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.project-open, .project-preview').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const project = btn.closest('.project');
            if (project) openModal(project);
        });
    });
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalBody) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    /* -------- SMOOTH ANCHOR NAV -------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = a.getAttribute('href');
            if (target === '#' || target.length < 2) return;
            const el = document.querySelector(target);
            if (el) {
                e.preventDefault();
                window.scrollTo({
                    top: el.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -------- PARALLAX HERO -------- */
    const heroGrid = document.querySelector('.hero-grid');
    const heroGradient = document.querySelector('.hero-gradient');
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (scroll > window.innerHeight) return;
        if (heroGrid) heroGrid.style.transform = `translateY(${scroll * 0.3}px)`;
        if (heroGradient) heroGradient.style.transform = `translateY(${scroll * 0.15}px)`;
    }, { passive: true });

    /* -------- MAGNETIC BUTTONS (not on previews — they have own transform) -------- */
    document.querySelectorAll('.btn, .cta-btn, .project-open, .modal-close').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    /* -------- FORM SUBMIT -------- */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            const doneText = currentLang === 'ua' ? 'Надіслано ✓' : 'Sent ✓';
            btn.innerHTML = `<span>${doneText}</span>`;
            btn.style.background = '#3FE074';
            btn.style.color = '#0A0D14';
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    /* -------- PREVENT BODY SCROLL WHEN MODAL OPEN -------- */
    document.addEventListener('wheel', (e) => {
        if (modal.classList.contains('is-open') && !modal.contains(e.target)) {
            e.preventDefault();
        }
    }, { passive: false });

    /* -------- KEYBOARD NAVIGATION -------- */
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('is-open')) return;
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        if (e.key === 'j' || e.key === 'J') {
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
        if (e.key === 'k' || e.key === 'K') {
            window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        }
        if (e.key === 'g' || e.key === 'G') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

})();

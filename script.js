/* RUNX HUB — interactions, i18n, theme */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;

  /* ============================================================
     I18N — EN (default, у HTML) / UA / RU
     ============================================================ */
  var I18N = {
    ua: {
      'nav.about': 'Про нас',
      'nav.caps': 'Компетенції',
      'nav.contact': 'Контакт',
      'nav.cta': 'Почати розмову',

      'hero.eyebrow': 'ОДНА КОМПАНІЯ / КІЛЬКА СИСТЕМ РОСТУ',
      'hero.l1': 'ЗРОСТАННЮ НЕ ТРЕБА',
      'hero.l2': 'БІЛЬШЕ <em class="outline">ХАОСУ.</em>',
      'hero.l3': 'ЙОМУ ТРЕБА <em class="accent">СИСТЕМА.</em>',
      'hero.sub': 'RUNX поєднує стратегію, маркетинг, технології, автоматизацію та AI в інфраструктуру, що допомагає бізнесу зростати з ясністю та контролем.',
      'hero.choose': 'ОБЕРИ, ДЕ ТИ ХОЧЕШ ЗРОСТАТИ &nbsp;&darr;',

      'r1.title': 'Сайти',
      'r1.kicker': 'САЙТИ, ЩО КОНВЕРТУЮТЬ',
      'r1.desc': 'Розумні сайти, що перетворюють увагу на дію — чіткі меседжі, форми, підключені до CRM, AI-асистенти, автоматичний розподіл лідів.',
      'r1.cta': 'ПЕРЕЙТИ ДО САЙТІВ',
      'r2.kicker': 'ІНФРАСТРУКТУРА РЕКРУТИНГУ ВОДІЇВ',
      'r2.desc': 'Система під ключ для тракових компаній: генерація лідів-водіїв, AI-кваліфікація, воркфлоу рекрутерів, автоматичні фолоу-апи, аналітика.',
      'r2.cta': 'ПЕРЕЙТИ ДО TRS',
      'r3.title': 'Бізнес-системи',
      'r3.kicker': 'МАРКЕТИНГ, АВТОМАТИЗАЦІЯ І КАСТОМНІ РІШЕННЯ',
      'r3.desc': 'Пов&rsquo;язані системи зростання для бізнесу — стратегія, брендинг, платна реклама, локальна видимість, CRM, AI-автоматизація, кастомний софт.',
      'r3.cta': 'ПЕРЕЙТИ ДО БІЗНЕС-СИСТЕМ',

      'marquee': 'МАРКЕТИНГ <i>&#10022;</i> ТЕХНОЛОГІЇ <i>&#10022;</i> АВТОМАТИЗАЦІЯ <i>&#10022;</i> AI <i>&#10022;</i> ОДНА СИСТЕМА <i>&#10022;</i>&nbsp;',
      'marquee2': 'СИСТЕМИ <i>&#10022;</i> А НЕ ПОСЛУГИ <i>&#10022;</i> ПОБУДОВАНО НАДОВГО <i>&#10022;</i> ВИМІРЮВАНО <i>&#10022;</i> ПОВ&rsquo;ЯЗАНО <i>&#10022;</i>&nbsp;',

      'ov.tag': '02 — ЩО ТАКЕ RUNX',
      'ov.statement': 'Ми не продаємо розрізнені послуги.<br>Ми будуємо <span class="hl">єдину інфраструктуру зростання.</span>',
      'ov.lede': 'Від першого кліку до фінальної конверсії RUNX з&rsquo;єднує шлях клієнта в одну вимірювану систему — стратегія, залучення, комунікація, CRM, автоматизація й аналітика.',
      'p1.h': 'Спершу система',
      'p1.t': 'Кожен інструмент працює як частина єдиного процесу, а не як окрема послуга.',
      'p2.h': 'Повна видимість',
      'p2.t': 'Ліди, комунікацію, етапи й результати можна бачити та вимірювати.',
      'p3.h': 'Працює без зупинок',
      'p3.t': 'Система зберігає процес, дані та фолоу-апи — навіть коли команда змінюється.',

      'caps.tag': '03 — КОМПЕТЕНЦІЇ',
      'caps.statement': 'Чотири дисципліни.<br>Одна операційна система.',
      'capA.h': 'Ріст і маркетинг',
      'capA.t': 'Стратегія, позиціонування бренду, реклама Meta та Google, локальна присутність, воронки, аналітика ефективності.',
      'capB.h': 'Розробка',
      'capB.t': 'Сайти, що конвертують, кастомний софт, інтеграції, дашборди, операційні інструменти.',
      'capC.h': 'Автоматизація і CRM',
      'capC.t': 'Дизайн пайплайнів, маршрутизація лідів, логіка фолоу-апів, централізовані дані, видимість процесів.',
      'capD.h': 'AI-комунікація',
      'capD.t': 'Обробка дзвінків і чатів 24/7, кваліфікація, фолоу-апи, розумна комунікація з клієнтами й кандидатами.',

      'proc.tag': '04 — ЯК МИ ПРАЦЮЄМО',
      'proc.statement': 'Чіткий шлях від<br>хаосу до <span class="accent-text">контролю.</span>',
      's1.h': 'Діагностика',
      's1.t': 'Мапуємо поточний шлях клієнта, рекрутинг-флоу, інструменти, вузькі місця, дані та цілі бізнесу.',
      's2.h': 'Проєктування',
      's2.t': 'Визначаємо архітектуру системи, меседжинг, воркфлоу, інтеграції, відповідальність і метрики успіху.',
      's3.h': 'Запуск',
      's3.t': 'Запускаємо пов&rsquo;язаний досвід — маркетинг, сайт чи воронку, CRM, автоматизацію, AI та звітність.',
      's4.h': 'Оптимізація',
      's4.t': 'Вимірюємо результати, покращуємо точки конверсії, реактивуємо базу та підсилюємо систему з часом.',

      'why.tag': '05 — ЧОМУ RUNX',
      'why.statement': 'Різниця — <span class="hl">структурна.</span>',
      'pr1': '<strong>Спершу система.</strong> Ми будуємо постійну інфраструктуру, а не тимчасовий потік лідів.',
      'pr2': '<strong>Повна видимість.</strong> Кожен лід, етап, розмову й результат можна відстежити.',
      'pr3': '<strong>Вбудовані фолоу-апи.</strong> Можливості не зникають після першої пропущеної відповіді.',
      'pr4': '<strong>Дані належать клієнту.</strong> Бізнес зберігає контроль над своєю базою та історією.',
      'pr5': '<strong>Створено для безперервності.</strong> Процес працює далі, коли змінюються кампанії чи люди в команді.',

      'loc.tag': '06 — ДЕ МИ',
      'loc.statement': 'Базуємось у <span class="hl">Чикаго, Іллінойс</span>.<br>Працюємо з бізнесами по всіх США.',
      'loc.lede': 'Наша команда працює віддалено й координує проєкти зі стратегії, маркетингу, розробки, автоматизації та AI. Стратегічні сесії на місці — за домовленістю.',

      'ct.tag': '07 — КОНТАКТ',
      'ct.statement': 'Розкажіть, що ви хочете <span class="accent-text">зростити, виправити чи автоматизувати.</span>',
      'f.name': 'ІМ&rsquo;Я',
      'f.namePh': 'Ваше ім&rsquo;я',
      'f.email': 'РОБОЧИЙ EMAIL',
      'f.phone': 'ТЕЛЕФОН — НЕОБОВ&rsquo;ЯЗКОВО',
      'f.interest': 'МЕНЕ ЦІКАВИТЬ',
      'f.opt0': 'Оберіть напрямок',
      'f.opt1': 'Сайти',
      'f.opt3': 'Бізнес-системи',
      'f.opt4': 'Ще не знаю',
      'f.message': 'ЩО ВИ ХОЧЕТЕ ЗРОСТИТИ, ВИПРАВИТИ ЧИ АВТОМАТИЗУВАТИ?',
      'f.messagePh': 'Кількох речень достатньо.',
      'f.submit': 'Почати розмову',
      'f.confirm': '&#10003; ДЯКУЄМО — ВАШЕ ПОВІДОМЛЕННЯ ВЖЕ В ПОТРІБНОЇ КОМАНДИ RUNX. МИ СКОРО ЗВ&rsquo;ЯЖЕМОСЬ.',

      'ft.brand': 'СИСТЕМИ, ЩО СТОЯТЬ ЗА ПЕРЕДБАЧУВАНИМ РОСТОМ.',
      'ft.dir': 'НАПРЯМКИ',
      'ft.web': 'Сайти',
      'ft.biz': 'Бізнес-системи',
      'ft.company': 'КОМПАНІЯ',
      'ft.about': 'Про нас',
      'ft.how': 'Як ми працюємо',
      'ft.contactLink': 'Контакт',
      'ft.contact': 'КОНТАКТ',
      'ft.rights': 'ВСІ ПРАВА ЗАХИЩЕНО.',
      'ft.privacy': 'ПРИВАТНІСТЬ',
      'ft.terms': 'УМОВИ'
    },

    ru: {
      'nav.about': 'О нас',
      'nav.caps': 'Компетенции',
      'nav.contact': 'Контакт',
      'nav.cta': 'Начать разговор',

      'hero.eyebrow': 'ОДНА КОМПАНИЯ / НЕСКОЛЬКО СИСТЕМ РОСТА',
      'hero.l1': 'РОСТУ НЕ НУЖНО',
      'hero.l2': 'БОЛЬШЕ <em class="outline">ХАОСА.</em>',
      'hero.l3': 'ЕМУ НУЖНА <em class="accent">СИСТЕМА.</em>',
      'hero.sub': 'RUNX соединяет стратегию, маркетинг, технологии, автоматизацию и AI в инфраструктуру, которая помогает бизнесу расти с ясностью и контролем.',
      'hero.choose': 'ВЫБЕРИ, ГДЕ ХОЧЕШЬ РАСТИ &nbsp;&darr;',

      'r1.title': 'Сайты',
      'r1.kicker': 'САЙТЫ, КОТОРЫЕ КОНВЕРТИРУЮТ',
      'r1.desc': 'Умные сайты, превращающие внимание в действие — чёткие месседжи, формы, подключённые к CRM, AI-ассистенты, автоматическая маршрутизация лидов.',
      'r1.cta': 'ПЕРЕЙТИ К САЙТАМ',
      'r2.kicker': 'ИНФРАСТРУКТУРА РЕКРУТИНГА ВОДИТЕЛЕЙ',
      'r2.desc': 'Система под ключ для траковых компаний: генерация лидов-водителей, AI-квалификация, воркфлоу рекрутеров, автоматические фоллоу-апы, аналитика.',
      'r2.cta': 'ПЕРЕЙТИ К TRS',
      'r3.title': 'Бизнес-системы',
      'r3.kicker': 'МАРКЕТИНГ, АВТОМАТИЗАЦИЯ И КАСТОМНЫЕ РЕШЕНИЯ',
      'r3.desc': 'Связанные системы роста для бизнеса — стратегия, брендинг, платная реклама, локальная видимость, CRM, AI-автоматизация, кастомный софт.',
      'r3.cta': 'ПЕРЕЙТИ К БИЗНЕС-СИСТЕМАМ',

      'marquee': 'МАРКЕТИНГ <i>&#10022;</i> ТЕХНОЛОГИИ <i>&#10022;</i> АВТОМАТИЗАЦИЯ <i>&#10022;</i> AI <i>&#10022;</i> ОДНА СИСТЕМА <i>&#10022;</i>&nbsp;',
      'marquee2': 'СИСТЕМЫ <i>&#10022;</i> А НЕ УСЛУГИ <i>&#10022;</i> ПОСТРОЕНО НАДОЛГО <i>&#10022;</i> ИЗМЕРИМО <i>&#10022;</i> СВЯЗАНО <i>&#10022;</i>&nbsp;',

      'ov.tag': '02 — ЧТО ТАКОЕ RUNX',
      'ov.statement': 'Мы не продаём разрозненные услуги.<br>Мы строим <span class="hl">единую инфраструктуру роста.</span>',
      'ov.lede': 'От первого клика до финальной конверсии RUNX соединяет путь клиента в одну измеримую систему — стратегия, привлечение, коммуникация, CRM, автоматизация и аналитика.',
      'p1.h': 'Сначала система',
      'p1.t': 'Каждый инструмент работает как часть единого процесса, а не как отдельная услуга.',
      'p2.h': 'Полная видимость',
      'p2.t': 'Лиды, коммуникацию, этапы и результаты можно видеть и измерять.',
      'p3.h': 'Работает без остановок',
      'p3.t': 'Система сохраняет процесс, данные и фоллоу-апы — даже когда команда меняется.',

      'caps.tag': '03 — КОМПЕТЕНЦИИ',
      'caps.statement': 'Четыре дисциплины.<br>Одна операционная система.',
      'capA.h': 'Рост и маркетинг',
      'capA.t': 'Стратегия, позиционирование бренда, реклама Meta и Google, локальное присутствие, воронки, аналитика эффективности.',
      'capB.h': 'Разработка',
      'capB.t': 'Конвертирующие сайты, кастомный софт, интеграции, дашборды, операционные инструменты.',
      'capC.h': 'Автоматизация и CRM',
      'capC.t': 'Дизайн пайплайнов, маршрутизация лидов, логика фоллоу-апов, централизованные данные, видимость процессов.',
      'capD.h': 'AI-коммуникация',
      'capD.t': 'Обработка звонков и чатов 24/7, квалификация, фоллоу-апы, умная коммуникация с клиентами и кандидатами.',

      'proc.tag': '04 — КАК МЫ РАБОТАЕМ',
      'proc.statement': 'Чёткий путь от<br>хаоса к <span class="accent-text">контролю.</span>',
      's1.h': 'Диагностика',
      's1.t': 'Мапируем текущий путь клиента, рекрутинг-флоу, инструменты, узкие места, данные и цели бизнеса.',
      's2.h': 'Проектирование',
      's2.t': 'Определяем архитектуру системы, месседжинг, воркфлоу, интеграции, ответственность и метрики успеха.',
      's3.h': 'Запуск',
      's3.t': 'Запускаем связанный опыт — маркетинг, сайт или воронку, CRM, автоматизацию, AI и отчётность.',
      's4.h': 'Оптимизация',
      's4.t': 'Измеряем результаты, улучшаем точки конверсии, реактивируем базу и усиливаем систему со временем.',

      'why.tag': '05 — ПОЧЕМУ RUNX',
      'why.statement': 'Разница — <span class="hl">структурная.</span>',
      'pr1': '<strong>Сначала система.</strong> Мы строим постоянную инфраструктуру, а не временный поток лидов.',
      'pr2': '<strong>Полная видимость.</strong> Каждый лид, этап, разговор и результат можно отследить.',
      'pr3': '<strong>Встроенные фоллоу-апы.</strong> Возможности не исчезают после первого пропущенного ответа.',
      'pr4': '<strong>Данные принадлежат клиенту.</strong> Бизнес сохраняет контроль над своей базой и историей.',
      'pr5': '<strong>Создано для непрерывности.</strong> Процесс продолжает работать, когда меняются кампании или люди в команде.',

      'loc.tag': '06 — ГДЕ МЫ',
      'loc.statement': 'Базируемся в <span class="hl">Чикаго, Иллинойс</span>.<br>Работаем с бизнесами по всем США.',
      'loc.lede': 'Наша команда работает удалённо и координирует проекты по стратегии, маркетингу, разработке, автоматизации и AI. Стратегические сессии на месте — по договорённости.',

      'ct.tag': '07 — КОНТАКТ',
      'ct.statement': 'Расскажите, что вы хотите <span class="accent-text">вырастить, исправить или автоматизировать.</span>',
      'f.name': 'ИМЯ',
      'f.namePh': 'Ваше имя',
      'f.email': 'РАБОЧИЙ EMAIL',
      'f.phone': 'ТЕЛЕФОН — НЕОБЯЗАТЕЛЬНО',
      'f.interest': 'МЕНЯ ИНТЕРЕСУЕТ',
      'f.opt0': 'Выберите направление',
      'f.opt1': 'Сайты',
      'f.opt3': 'Бизнес-системы',
      'f.opt4': 'Пока не знаю',
      'f.message': 'ЧТО ВЫ ХОТИТЕ ВЫРАСТИТЬ, ИСПРАВИТЬ ИЛИ АВТОМАТИЗИРОВАТЬ?',
      'f.messagePh': 'Нескольких предложений достаточно.',
      'f.submit': 'Начать разговор',
      'f.confirm': '&#10003; СПАСИБО — ВАШЕ СООБЩЕНИЕ УЖЕ У НУЖНОЙ КОМАНДЫ RUNX. МЫ СКОРО СВЯЖЕМСЯ.',

      'ft.brand': 'СИСТЕМЫ, СТОЯЩИЕ ЗА ПРЕДСКАЗУЕМЫМ РОСТОМ.',
      'ft.dir': 'НАПРАВЛЕНИЯ',
      'ft.web': 'Сайты',
      'ft.biz': 'Бизнес-системы',
      'ft.company': 'КОМПАНИЯ',
      'ft.about': 'О нас',
      'ft.how': 'Как мы работаем',
      'ft.contactLink': 'Контакт',
      'ft.contact': 'КОНТАКТ',
      'ft.rights': 'ВСЕ ПРАВА ЗАЩИЩЕНЫ.',
      'ft.privacy': 'ПРИВАТНОСТЬ',
      'ft.terms': 'УСЛОВИЯ'
    }
  };

  /* EN словник знімається з HTML при старті — щоб можна було повернутись */
  var enDefaults = { text: {}, ph: {} };
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in enDefaults.text)) enDefaults.text[k] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    var k = el.getAttribute('data-i18n-ph');
    if (!(k in enDefaults.ph)) enDefaults.ph[k] = el.getAttribute('placeholder') || '';
  });

  var langSwitch = document.getElementById('langSwitch');

  function setLang(lang) {
    var dict = I18N[lang] || null; /* null → EN defaults */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var html = dict && dict[k] != null ? dict[k] : enDefaults.text[k];
      if (html == null) return;
      el.innerHTML = html;
      if (el.hasAttribute('data-text')) el.setAttribute('data-text', el.textContent);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      var v = dict && dict[k] != null ? dict[k] : enDefaults.ph[k];
      if (v == null) return;
      var tmp = document.createElement('span');
      tmp.innerHTML = v;
      el.setAttribute('placeholder', tmp.textContent);
    });
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
    langSwitch.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('runx-lang', lang); } catch (e) {}
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    /* re-split animated typography for the new language */
    initStatements();
    initChaosLetters();
    loopMarquees();
  }

  /* ============================================================
     Marquee: clone content until the track covers 2× viewport,
     keep px/s speed constant regardless of width/language
     ============================================================ */
  function loopMarquees() {
    document.querySelectorAll('.marquee-track').forEach(function (track) {
      var spans = track.querySelectorAll(':scope > span');
      if (!spans.length) return;
      var tpl = spans[0];
      for (var i = spans.length - 1; i > 0; i--) track.removeChild(spans[i]);
      var w = tpl.getBoundingClientRect().width;
      if (!w) { track.appendChild(tpl.cloneNode(true)); return; }
      var copies = Math.max(2, Math.ceil((window.innerWidth * 1.1) / w));
      var frag = document.createDocumentFragment();
      for (var j = 1; j < copies * 2; j++) frag.appendChild(tpl.cloneNode(true));
      track.appendChild(frag);
      /* -50% за цикл → половина треку; швидкість ~95 px/s */
      track.style.animationDuration = Math.max(14, Math.round((w * copies) / 95)) + 's';
    });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(loopMarquees);
  } else {
    loopMarquees();
  }
  var marqueeResizeT;
  window.addEventListener('resize', function () {
    clearTimeout(marqueeResizeT);
    marqueeResizeT = setTimeout(loopMarquees, 200);
  });

  /* ============================================================
     Split typography helpers
     ============================================================ */

  /* wrap every word of .statement in a masked span → staggered rise */
  var statementIO = null;
  function splitWordsIn(node, state) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === 3) { /* text */
        var parts = child.textContent.split(' ');
        var frag = document.createDocumentFragment();
        parts.forEach(function (word, i) {
          if (word !== '') {
            var w = document.createElement('span');
            w.className = 'w';
            var inner = document.createElement('span');
            inner.className = 'w-inner';
            inner.textContent = word;
            inner.style.setProperty('--wd', (state.i * 0.045) + 's');
            state.i++;
            w.appendChild(inner);
            frag.appendChild(w);
          }
          if (i < parts.length - 1) frag.appendChild(document.createTextNode(' '));
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') {
        splitWordsIn(child, state);
      }
    });
  }

  function initStatements() {
    if (reduced) return;
    var statements = document.querySelectorAll('.statement');
    if (!statementIO && 'IntersectionObserver' in window) {
      statementIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('words-in');
            statementIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
    }
    statements.forEach(function (el) {
      if (el.querySelector('.w')) return; /* уже розбито (init після setLang) */
      splitWordsIn(el, { i: 0 });
      el.classList.add('split');
      if (!el.classList.contains('words-in') && statementIO) statementIO.observe(el);
    });
  }

  /* split the outlined CHAOS word into jittering letters */
  function initChaosLetters() {
    if (reduced) return;
    document.querySelectorAll('.hero-headline .outline').forEach(function (em) {
      if (em.querySelector('.chaos-letter')) return;
      var text = em.textContent;
      em.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var s = document.createElement('span');
        s.className = 'chaos-letter';
        s.textContent = text[i];
        s.style.setProperty('--cd', (-(i * 0.37) % 2.1).toFixed(2) + 's');
        em.appendChild(s);
      }
    });
  }

  langSwitch.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-lang]');
    if (btn) setLang(btn.getAttribute('data-lang'));
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem('runx-lang'); } catch (e) {}
  if (savedLang && savedLang !== 'en') {
    setLang(savedLang); /* всередині викликає initStatements/initChaosLetters */
  } else {
    initStatements();
    initChaosLetters();
  }

  /* footer RUNX letters rise */
  (function () {
    var logo = document.querySelector('.footer-logo');
    var top = document.querySelector('.footer-top');
    if (!logo || !top) return;
    if (!reduced) {
      var text = logo.textContent;
      logo.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var s = document.createElement('span');
        s.className = 'fl';
        s.style.setProperty('--fd', i);
        s.textContent = text[i];
        logo.appendChild(s);
      }
    }
    if ('IntersectionObserver' in window && !reduced) {
      var fio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            top.classList.add('is-visible');
            fio.disconnect();
          }
        });
      }, { threshold: 0.25 });
      fio.observe(top);
    } else {
      top.classList.add('is-visible');
    }
  })();

  /* section-tag rules draw on view */
  (function () {
    var tags = document.querySelectorAll('.section-tag');
    if ('IntersectionObserver' in window && !reduced) {
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            tio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      tags.forEach(function (t) { tio.observe(t); });
    } else {
      tags.forEach(function (t) { t.classList.add('is-visible'); });
    }
  })();

  /* ============================================================
     THEME (light / dark)
     ============================================================ */
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');

  function applyThemeIcon() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeIcon.innerHTML = dark ? '&#9788;' : '&#9789;'; /* ☼ / ☽ */
  }
  applyThemeIcon();

  themeToggle.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    try {
      localStorage.setItem('runx-theme', dark ? 'light' : 'dark');
    } catch (e) {}
    applyThemeIcon();
  });

  /* ============================================================
     Loader
     ============================================================ */
  var loader = document.getElementById('loader');
  var loaderCount = document.getElementById('loaderCount');

  function finishLoad() {
    if (document.body.classList.contains('is-loaded')) return;
    document.body.classList.add('is-loaded');
    if (loader) {
      loader.classList.add('is-done');
      setTimeout(function () { loader.remove(); }, 900);
    }
  }

  if (reduced || !loader) {
    finishLoad();
  } else {
    var n = 0;
    var tick = setInterval(function () {
      n = Math.min(100, n + Math.ceil(Math.random() * 14));
      loaderCount.textContent = n;
      if (n >= 100) {
        clearInterval(tick);
        setTimeout(finishLoad, 220);
      }
    }, 55);
    /* safety: never trap the page behind the loader */
    setTimeout(finishLoad, 2600);
  }

  /* ============================================================
     Header scroll state + progress bar
     ============================================================ */
  var header = document.getElementById('siteHeader');
  var progressBar = document.getElementById('progressBar');
  var hudPct = document.getElementById('hudPct');
  var heroGrid = document.querySelector('.hero-grid-lines');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? window.scrollY / h : 0;
    progressBar.style.transform = 'scaleX(' + p + ')';
    if (hudPct) {
      hudPct.textContent = ('00' + Math.round(p * 100)).slice(-3);
      var hud = document.getElementById('scrollHud');
      if (hud) hud.classList.toggle('is-hidden', p > 0.96);
    }
    /* subtle parallax on the hero blueprint grid */
    if (heroGrid && !reduced && window.scrollY < window.innerHeight * 1.5) {
      heroGrid.style.transform = 'translate3d(0,' + (window.scrollY * 0.18) + 'px,0)';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* HUD active-section tracker */
  (function () {
    var hudSec = document.getElementById('hudSec');
    if (!hudSec || !('IntersectionObserver' in window)) return;
    var map = [
      ['hero', '01 / HERO'],
      ['overview', '02 / ABOUT'],
      ['capabilities', '03 / CAPS'],
      ['process', '04 / PROCESS'],
      ['why', '05 / WHY'],
      ['location', '06 / LOCATION'],
      ['contact', '07 / CONTACT']
    ];
    var hio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          for (var i = 0; i < map.length; i++) {
            if (map[i][0] === entry.target.id) hudSec.textContent = map[i][1];
          }
        }
      });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    map.forEach(function (m) {
      var el = document.getElementById(m[0]);
      if (el) hio.observe(el);
    });
  })();

  /* ============================================================
     Mobile nav
     ============================================================ */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    var open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mainNav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ============================================================
     Reveal on scroll
     ============================================================ */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ============================================================
     Process line draw
     ============================================================ */
  var processGrid = document.getElementById('processGrid');
  if (processGrid && 'IntersectionObserver' in window && !reduced) {
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          processGrid.classList.add('is-active');
          pio.disconnect();
        }
      });
    }, { threshold: 0.3 });
    pio.observe(processGrid);
  } else if (processGrid) {
    processGrid.classList.add('is-active');
  }

  /* ============================================================
     Text scramble (mono tags)
     ============================================================ */
  var CHARS = '#$%&/=?_—<>*01';
  function scramble(el) {
    var target = el.getAttribute('data-text') || el.textContent;
    var frame = 0;
    var total = Math.max(14, target.length);
    var timer = setInterval(function () {
      var current = el.getAttribute('data-text') || target;
      var out = '';
      for (var i = 0; i < current.length; i++) {
        if (current[i] === ' ') { out += ' '; continue; }
        var threshold = (frame / total) * current.length;
        out += i < threshold ? current[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      frame += 1.4;
      if (frame >= total + 2) { el.textContent = current; clearInterval(timer); }
    }, 34);
  }
  var scrambles = document.querySelectorAll('.scramble');
  if ('IntersectionObserver' in window && !reduced) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          scramble(entry.target);
          sio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    scrambles.forEach(function (el) { sio.observe(el); });
  }

  /* ============================================================
     Custom cursor
     ============================================================ */
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (canHover && !reduced && dot && ring) {
    var mx = -100, my = -100, rx = -100, ry = -100;
    var shown = false;
    window.addEventListener('pointermove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        rx = mx; ry = my;
      }
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
      var half = ring.offsetWidth / 2;
      ring.style.transform = 'translate(' + (rx - half) + 'px,' + (ry - half) + 'px)';
      requestAnimationFrame(loop);
    })();
    /* delegated: працює і для елементів, перемальованих при зміні мови */
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('[data-hover]')) ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('[data-hover]')) ring.classList.remove('is-hover');
    });
  }

  /* ============================================================
     Magnetic buttons
     ============================================================ */
  if (canHover && !reduced) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      var strength = 22;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        el.style.transform = 'translate(' + x * strength * 0.4 + 'px,' + y * strength * 0.3 + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform .45s cubic-bezier(0.22,1,0.36,1)';
        el.style.transform = 'translate(0,0)';
        setTimeout(function () { el.style.transition = ''; }, 460);
      });
    });
  }

  /* ============================================================
     Contact form (front-end only for now)
     ============================================================ */
  var form = document.getElementById('contactForm');
  var confirmation = document.getElementById('formConfirmation');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    /* TODO: підключити реальний endpoint (CRM / GHL webhook) */
    confirmation.hidden = false;
    form.querySelector('button[type="submit"]').disabled = true;
    confirmation.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  });

  /* ============================================================
     Footer year
     ============================================================ */
  document.getElementById('year').textContent = new Date().getFullYear();
})();

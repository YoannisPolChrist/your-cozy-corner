document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');
    const steps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progress');
    const stepIndicator = document.getElementById('step-indicator');
    const stepDots = document.querySelectorAll('.step-dot');
    const btnSendJohannes = document.getElementById('btn-send-johannes');
    const btnSendEmail = document.getElementById('btn-send-email');
    const btnDownloadPdf = document.getElementById('btn-download-pdf');

    let currentStepIndex = 0;
    let currentLang = 'de';

    // ───── ROUTING & SPRACHERKENNUNG ─────
    const slugs = {
        '/Eingangsdiagnostik': 'de',
        '/intake-assessment': 'en',
        '/diagnostic-initial': 'fr'
    };

    function detectLanguage() {
        // 1. URL Path check
        const path = window.location.pathname;
        if (slugs[path]) return slugs[path];

        // 2. Browser language check as fallback
        const browserLang = navigator.language.slice(0, 2);
        if (['de', 'en', 'fr'].includes(browserLang)) return browserLang;

        return 'de'; // Default
    }

    currentLang = detectLanguage();

    // Initial UI setup
    applyTranslations();
    updateUI();
    // Set active class on lang buttons based on currentLang
    document.querySelectorAll('.lang-btn').forEach(b => {
        if (b.dataset.lang === currentLang) b.classList.add('active');
        else b.classList.remove('active');
    });

    // ───── NAVIGATION ─────
    nextBtn.addEventListener('click', () => {
        if (currentStepIndex < steps.length - 1) {
            steps[currentStepIndex].classList.remove('active');
            currentStepIndex++;
            steps[currentStepIndex].classList.add('active');
            updateUI();
        } else {
            // Show success actions
            document.getElementById('nav-actions').style.display = 'none';
            document.getElementById('success-actions').style.display = 'flex';
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            steps[currentStepIndex].classList.remove('active');
            currentStepIndex--;
            steps[currentStepIndex].classList.add('active');
            updateUI();
        }
    });



    // ───── STEP NAVIGATION DOTS ─────
    stepDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.dataset.step) - 1;
            if (target === currentStepIndex) return;

            steps[currentStepIndex].classList.remove('active');
            currentStepIndex = target;
            steps[currentStepIndex].classList.add('active');
            updateUI();

            // Bring back form if in success view
            document.getElementById('nav-actions').style.display = 'flex';
            document.getElementById('success-actions').style.display = 'none';
        });
    });

    function updateUI() {
        prevBtn.disabled = (currentStepIndex === 0);

        const L = window.T || {};
        if (currentStepIndex === steps.length - 1) {
            nextBtn.textContent = (L.btnFinish && L.btnFinish[currentLang]) || 'Abschließen';
        } else {
            nextBtn.textContent = (L.btnNext && L.btnNext[currentLang]) || 'Weiter';
        }
        prevBtn.textContent = (L.btnPrev && L.btnPrev[currentLang]) || 'Zurück';

        // Update Dots
        stepDots.forEach((dot, idx) => {
            if (idx === currentStepIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });

        const percent = ((currentStepIndex + 1) / steps.length) * 100;
        progressBar.style.width = percent + '%';

        const stepTpl = (L.stepOf && L.stepOf[currentLang]) || 'Schritt {current} von {total}';
        stepIndicator.textContent = stepTpl.replace('{current}', currentStepIndex + 1).replace('{total}', steps.length);
        stepIndicator.style.cursor = 'pointer';
        stepIndicator.title = L.jumpPrompt ? L.jumpPrompt[currentLang] : 'Klicken um zu springen';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ───── LANGUAGE SWITCHING ─────
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;

            // Sync URL with language switch
            const newSlug = Object.keys(slugs).find(key => slugs[key] === currentLang);
            if (newSlug) {
                window.history.pushState({}, '', newSlug);
            }

            applyTranslations();
            updateUI();
        });
    });

    function t(key) {
        const L = window.T;
        if (!L || !L[key]) return null;
        return L[key][currentLang] || L[key]['de'] || '';
    }

    function applyTranslations() {
        // Map of element ID → translation key
        const idMap = {
            't-app-title': 'appTitle',
            't-app-subtitle': 'appSubtitle',
            't-success-title': 'successTitle',
            't-success-desc': 'successDesc',
            't-btn-pdf': 'btnPdf',
            't-btn-email': 'btnEmail',
        };

        for (const [id, key] of Object.entries(idMap)) {
            const el = document.getElementById(id);
            if (el) el.textContent = t(key) || el.textContent;
        }

        // Step titles
        const stepTitleMap = {
            '1': 's1Title',
            '2': 's2Title',
            '3': 's3Title',
            '4': 's4Title',
            '5': 's5Title',
            '6': 's6Title',
            '7': 's7Title',
        };

        document.querySelectorAll('.step-title').forEach(el => {
            const step = el.closest('.form-step');
            if (step) {
                const num = step.dataset.step;
                if (stepTitleMap[num]) {
                    el.textContent = t(stepTitleMap[num]) || el.textContent;
                }
            }
        });

        // Translate all data-t attributes (labels, questions, placeholders)
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.dataset.t;
            const val = t(key);
            if (val) el.textContent = val;
        });

        // Translate data-t-label (for floating labels inside inputs)
        document.querySelectorAll('[data-t-label]').forEach(el => {
            const key = el.dataset.tLabel;
            const val = t(key);
            if (val) el.textContent = val;
        });

        // Translate Ja/Nein cards
        document.querySelectorAll('.radio-card .card-content[data-t-yn]').forEach(el => {
            const val = el.dataset.tYn;
            if (val === 'yes') el.textContent = t('yes') || 'JA';
            if (val === 'no') el.textContent = t('no') || 'NEIN';
        });

        // Translate mini-slider endpoints
        document.querySelectorAll('.mini-slider-endpoints [data-t]').forEach(el => {
            const key = el.dataset.t;
            const val = t(key);
            if (val) el.textContent = val;
        });
    }

    // ───── CONDITIONAL FIELDS (JA/NEIN LOGIC) ─────
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const wrapper = e.target.closest('.radio-group-wrapper');
            if (!wrapper) return;

            const condField = wrapper.querySelector('.conditional-field');
            if (condField) {
                if (e.target.value === 'ja') {
                    condField.classList.add('visible');
                    const input = condField.querySelector('input, textarea');
                    if (input) {
                        input.focus();
                        input.setAttribute('required', 'required');
                    }
                } else {
                    condField.classList.remove('visible');
                    const input = condField.querySelector('input, textarea');
                    if (input) {
                        input.value = '';
                        input.removeAttribute('required');
                    }
                }
            }
        });
    });

    // ───── ALL SLIDERS (incl. mini-sliders) ─────
    function initSlider(slider) {
        const valDisplay = slider.closest('.slider-container, .mini-slider-container')
            ?.querySelector('.mini-slider-val, #intensitaet-val');

        slider.addEventListener('input', function () {
            if (valDisplay) {
                valDisplay.textContent = this.value;
                // Color gradient: 0=green → 5=yellow → 10=red
                const hue = 120 - ((this.value / 10) * 120);
                valDisplay.style.color = `hsl(${hue}, 70%, 45%)`;
            }
            // Track fill
            const value = (this.value - this.min) / (this.max - this.min) * 100;
            this.style.background = `linear-gradient(to right, var(--christ-gold) 0%, var(--christ-gold) ${value}%, var(--christ-line) ${value}%, var(--christ-line) 100%)`;
        });

        // Initial trigger
        slider.dispatchEvent(new Event('input'));
    }

    document.querySelectorAll('.slider').forEach(initSlider);

    // ───── LOKALER ZWISCHENSPEICHER (LOCAL STORAGE) ─────
    const formEl = document.getElementById('anamnese-form');

    function saveToLocalStorage() {
        if (!formEl) return;
        const formData = new FormData(formEl);
        const dataObj = {};
        for (let [key, val] of formData.entries()) {
            dataObj[key] = val;
        }
        // Save current step as well to persist exact navigation
        dataObj['_currentStepIndex'] = currentStepIndex;
        localStorage.setItem('anamneseFormData', JSON.stringify(dataObj));
    }

    function loadFromLocalStorage() {
        const dataStr = localStorage.getItem('anamneseFormData');
        if (!dataStr) return;
        try {
            const dataObj = JSON.parse(dataStr);

            // Restore answers
            Object.keys(dataObj).forEach(key => {
                if (key === '_currentStepIndex') return;
                const els = document.getElementsByName(key);
                if (!els.length) return;
                const el = els[0];
                if (el.type === 'radio') {
                    const radio = Array.from(els).find(r => r.value === dataObj[key]);
                    if (radio) {
                        radio.checked = true;
                        radio.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                } else {
                    el.value = dataObj[key];
                    if (el.type === 'range') {
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }
            });

            // Restore navigation step
            if (dataObj['_currentStepIndex'] !== undefined) {
                const stepIdx = parseInt(dataObj['_currentStepIndex']);
                if (!isNaN(stepIdx) && stepIdx >= 0 && stepIdx < steps.length) {
                    steps[currentStepIndex].classList.remove('active');
                    currentStepIndex = stepIdx;
                    steps[currentStepIndex].classList.add('active');
                    updateUI();
                }
            }

        } catch (e) {
            console.error('Fehler beim Laden des Zwischenspeichers:', e);
        }
    }

    if (formEl) {
        formEl.addEventListener('input', saveToLocalStorage);
        formEl.addEventListener('change', saveToLocalStorage);
        // Delay load slightly to ensure UI is ready
        setTimeout(loadFromLocalStorage, 50);
    }

    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', (e) => {
            e.preventDefault();
            const msg = t('resetConfirm') || 'Möchtest du wirklich alle Eingaben verwerfen und das Formular neu starten?';
            if (confirm(msg)) {
                localStorage.removeItem('anamneseFormData');
                location.reload();
            }
        });
    }

    // ───── DATENSAMMLUNG ─────
    function gatherFormData() {
        let data = [];
        const nameInput = document.getElementById('name');
        const name = nameInput ? nameInput.value.trim() : 'Patient';

        document.querySelectorAll('.form-step').forEach(step => {
            const inputs = step.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                if (input.type === 'radio' && !input.checked) return;
                if (input.type === 'button' || input.type === 'submit') return;
                if (input.value.trim() === '' && input.type !== 'range') return;

                const condField = input.closest('.conditional-field');
                if (condField && !condField.classList.contains('visible')) return;

                let key = '';
                let answer = input.value;

                // 1. Try to find the data-t (translation key) associated with this input
                if (input.type === 'radio') {
                    const wrapper = input.closest('.radio-group-wrapper');
                    if (wrapper) {
                        const labelEl = wrapper.querySelector('[data-t]');
                        if (labelEl) key = labelEl.getAttribute('data-t');
                    }
                    if (!key) key = input.name; // Fallback to radio group name

                    const span = input.nextElementSibling;
                    if (span && span.classList.contains('card-content')) {
                        // Keep the value or get the raw value, but since answer is sent in email body, keep localized text if possible
                        answer = span.textContent.trim();
                    }
                } else if (input.type === 'range') {
                    const container = input.closest('.slider-container, .mini-slider-container');
                    if (container) {
                        const labelEl = container.querySelector('[data-t]');
                        if (labelEl) {
                            key = labelEl.getAttribute('data-t');
                        }
                    }
                    if (!key) key = input.id; // Fallback
                    answer = input.value + ' / 10';
                } else {
                    // Normal text/email inputs
                    const labelWrapper = input.closest('.input-group, .conditional-field');
                    if (labelWrapper) {
                        const labelEl = labelWrapper.querySelector('label[data-t-label], label[data-t]');
                        if (labelEl) {
                            key = labelEl.getAttribute('data-t-label') || labelEl.getAttribute('data-t');
                        }
                    }
                    if (!key) key = input.id || input.name;
                }

                if (key) {
                    data.push({ question: key, answer });
                }
            });
        });

        let email = '';
        const emailInput = document.getElementById('email');
        if (emailInput) {
            email = emailInput.value.trim();
        }

        return { name, email, data };
    }

    // ───── PDF EXPORT (jsPDF via pdf-generator.js) ─────
    if (btnDownloadPdf) {
        btnDownloadPdf.addEventListener('click', () => {
            const btnSpan = document.getElementById('t-btn-pdf');
            // Store original text firmly to avoid stacking checkmarks
            if (!btnDownloadPdf.dataset.origText && btnSpan) {
                btnDownloadPdf.dataset.origText = btnSpan.textContent;
            }
            if (btnSpan) btnSpan.textContent = '...';

            try {
                downloadAnamesePDF(gatherFormData, t, currentLang);
            } catch (e) {
                console.error('PDF generation error:', e);
                alert('PDF Fehler: ' + e.message);
            }

            if (btnSpan) {
                btnSpan.textContent = '✓ ' + (btnDownloadPdf.dataset.origText || 'PDF');
            }
        });
    }

    // ───── E-MAIL VERSAND AN PATIENT (SICH SELBST) ─────
    if (btnSendEmail) {
        btnSendEmail.addEventListener('click', () => {
            let { email } = gatherFormData();

            // Re-prompt for email if missing or invalid looking
            if (!email || email.indexOf('@') === -1) {
                const promptMsg = t('emailPromptMsg') || 'Bitte gib deine E-Mail Adresse ein:';
                const enteredEmail = prompt(promptMsg, email);
                if (enteredEmail && enteredEmail.indexOf('@') !== -1) {
                    // Temporarily set it so gatherFormData picks it up later
                    const emailInput = document.getElementById('email');
                    if (emailInput) emailInput.value = enteredEmail;
                    // Proceed with new email
                    sendViaWebhook('patient');
                } else {
                    return; // User cancelled or invalid
                }
            } else {
                sendViaWebhook('patient');
            }
        });
    }

    // ───── AUTOMATISCHER E-MAIL VERSAND (Activepieces Webhook) ─────
    async function sendViaWebhook(target) {
        const { name, email, data } = gatherFormData();
        const btnId = target === 'johannes' ? 'btn-send-johannes' : 'btn-send-email';
        const spanId = target === 'johannes' ? 't-btn-email-johannes' : 't-btn-email';
        const btn = document.getElementById(btnId);
        const span = document.getElementById(spanId);

        if (span && !btn.dataset.origText) btn.dataset.origText = span.textContent;
        if (span) span.textContent = '...';

        try {
            // PDF generieren (Data-URI String inkl. mimeType für Activepieces)
            const doc = window.generateAnamesePDF(gatherFormData, t, currentLang);
            const pdfDataUri = doc.output('datauristring');

            // Clean up name/email to ensure they are valid strings
            const safeName = (name && typeof name === 'string' && name.trim() !== '') ? name.trim() : 'Unbenannt';
            const safeEmail = (email && typeof email === 'string' && email.trim() !== '') ? email.trim() : 'no-reply@johanneschrist.com';

            // Check recipient
            const recipientEmail = target === 'johannes' ? 'ps.johanneschrist@gmail.com' : safeEmail;

            // Daten als JSON an Activepieces Webhook senden
            const payload = {
                target: target || 'johannes',
                name: safeName,
                email: safeEmail,
                recipientEmail: recipientEmail,
                pdfDataUri: pdfDataUri,
                subject: (target === 'johannes' ? (t('emailJohannesSubject') || 'Neue Anamnese von') : (t('emailPatientSubject') || 'Dein Anamnese PDF')) + ' - ' + safeName,
                message: target === 'johannes'
                    ? (t('emailJohannesBody') || 'Hier sind die Ergebnisse der ersten Eingangsanalyse.')
                    : (t('emailPatientBody') || 'Hallo,\nvielen Dank für das Ausfüllen der Anamnese.')
            };

            // Nutzt die finale Webhook-URL für Activepieces
            const WEBHOOK_URL = 'https://cloud.activepieces.com/api/v1/webhooks/ICJmRRbsk8Enk7T8ulVKL';

            console.log("Sending payload to Activepieces:", {
                target: payload.target,
                name: payload.name,
                email: payload.email,
                recipientEmail: payload.recipientEmail,
                subject: payload.subject,
                messageLength: payload.message.length,
                pdfLength: payload.pdfDataUri.length
            });

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorDetails = `Status: ${response.status}`;
                try {
                    const errorBody = await response.text();
                    if (errorBody) errorDetails += `\nAntwort: ${errorBody}`;
                } catch (e) {
                    console.error("Could not read error body", e);
                }
                throw new Error(errorDetails);
            }

            setTimeout(() => {
                if (span) span.textContent = '✓ ' + btn.dataset.origText;
                alert(t('emailSuccessMsg') || 'Erfolgreich an den Server übermittelt.');
            }, 500);

        } catch (error) {
            console.error("Webhook Error Details:", error);
            if (span) span.textContent = btn.dataset.origText;
            alert(`Fehler bei der Übermittlung:\n\n${error.message}\n\nBitte mache einen Screenshot von dieser Meldung für den Support.`);
        }
    }

    if (btnSendJohannes) {
        btnSendJohannes.addEventListener('click', () => {
            sendViaWebhook('johannes');
        });
    }

    // ───── SHAKE ANIMATION ─────
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.3s;
        }
    `;
    document.head.appendChild(style);
});

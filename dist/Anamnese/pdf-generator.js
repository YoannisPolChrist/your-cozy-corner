/**
 * PDF Generator for Klinisch-Biologische Anamnese
 * Uses jsPDF — generates a professional PDF with:
 *   - Section headers (3px larger than standard text)
 *   - Inline progress bars for 0-10 scale values
 *   - Summary chart page with horizontal bar diagram (traffic-light colors)
 *   - Safety alert box when 'Sicherheit' is flagged
 */

function generateAnamesePDF(gatherFormData, tFunc, currentLang) {
    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentW = pageW - margin * 2;
    let y = margin;

    // Colors
    const blue = [31, 58, 95];
    const gold = [196, 163, 90];
    const gray = [107, 114, 128];
    const textColor = [28, 28, 28];
    const stdFontSize = 10;
    const headerFontSize = stdFontSize + 3; // 3px larger as required

    function t(key) { return tFunc(key); }

    // ── Helpers ──
    function checkPage(needed) {
        if (y + needed > pageH - margin) {
            doc.addPage();
            y = margin;
        }
    }

    function trafficColor(val) {
        val = parseInt(val) || 0;
        if (val <= 5) return [76, 175, 80];   // green
        if (val === 6) return [255, 235, 59]; // yellow
        if (val <= 8) return [255, 152, 0];   // orange
        return [244, 67, 54];                  // red
    }

    function drawProgressBar(x, barY, val, barW) {
        barW = barW || 40;
        var barH = 4;
        val = parseInt(val) || 0;
        doc.setFillColor(230, 230, 230);
        doc.roundedRect(x, barY, barW, barH, 2, 2, 'F');
        var fillW = (val / 10) * barW;
        if (fillW > 0) {
            var c = trafficColor(val);
            doc.setFillColor(c[0], c[1], c[2]);
            doc.roundedRect(x, barY, Math.max(fillW, 2), barH, 2, 2, 'F');
        }
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        doc.text(val + '/10', x + barW + 2, barY + 3.5);
    }

    // ── TITLE ──
    var pdfLogoEl = document.getElementById('pdf-logo');
    if (pdfLogoEl && pdfLogoEl.complete && pdfLogoEl.naturalHeight !== 0) {
        var logoW = 60; // mm width
        var logoH = (pdfLogoEl.naturalHeight / pdfLogoEl.naturalWidth) * logoW;
        try {
            var canvas = document.createElement('canvas');
            canvas.width = pdfLogoEl.naturalWidth;
            canvas.height = pdfLogoEl.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(pdfLogoEl, 0, 0);
            var imgData = canvas.toDataURL('image/png');
            // Center the logo
            doc.addImage(imgData, 'PNG', pageW / 2 - logoW / 2, y, logoW, logoH);
            y += logoH + 8;
        } catch (error) {
            console.error('Error rendering logo for PDF:', error);
        }
    }

    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 12, pageW - margin, y + 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(blue[0], blue[1], blue[2]);
    var pdfTitle = t('pdfTitle') || 'Klinisch-Biologische Anamnese';
    doc.text(pdfTitle, pageW / 2, y + 8, { align: 'center' });

    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    var { name: formName, email: formEmail } = gatherFormData();
    var nameVal = formName || (t('patient') || 'Patient');
    var emailStr = formEmail ? ` | ${formEmail}` : '';
    var locale = currentLang === 'fr' ? 'fr-FR' : (currentLang === 'en' ? 'en-US' : 'de-DE');
    var dateStr = new Date().toLocaleDateString(locale);
    doc.text(nameVal + emailStr + '  |  ' + dateStr, pageW / 2, y, { align: 'center' });
    y += 10;

    // ── SAFETY ALERT BOX REMOVED ──

    // ── SECTIONS ──
    var sectionNames = {
        '1': t('s1Title') || 'Deine Daten & Setup',
        '2': t('s2Title') || 'Aktuelle Symptomatik & Beschwerden',
        '3': t('s3Title') || 'Psychische Historie',
        '4': t('s4Title') || 'Physische Stressanzeichen',
        '5': t('s5Title') || 'Umfeld, Arbeit & Finanzen',
        '6': t('s6Title') || 'Regeneration & Biologie',
        '7': t('s7Title') || 'Sicherheit & Abschluss'
    };

    // Group data by steps
    var stepGroups = {};
    document.querySelectorAll('.form-step').forEach(function (step) {
        var stepNum = step.dataset.step;
        var items = [];
        step.querySelectorAll('input, textarea, select').forEach(function (input) {
            if (input.type === 'radio' && !input.checked) return;
            if (input.type === 'button' || input.type === 'submit') return;
            if (input.value.trim() === '' && input.type !== 'range') return;
            var condField = input.closest('.conditional-field');
            if (condField && !condField.classList.contains('visible')) return;

            var question = '';
            var answer = input.value;
            var isScale = false;

            if (input.type === 'radio') {
                var wrapper = input.closest('.radio-group-wrapper');
                if (wrapper) {
                    var labelEl = wrapper.querySelector('.radio-label');
                    if (labelEl) question = labelEl.textContent.trim();
                }
                var span = input.nextElementSibling;
                if (span && span.classList.contains('card-content')) answer = span.textContent.trim();
            } else if (input.type === 'range') {
                isScale = true;
                var container = input.closest('.mini-slider-container, .slider-container');
                if (container) {
                    var lbl = container.querySelector('.mini-slider-label');
                    if (lbl) question = lbl.textContent.trim();
                }
                if (!question) question = input.name;
                answer = input.value;
            } else {
                var label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') question = label.textContent.trim();
                else question = input.id || input.name;
            }

            if (question) items.push({ question: question, answer: answer, isScale: isScale });
        });
        if (items.length > 0) stepGroups[stepNum] = items;
    });

    // Render each section
    Object.keys(stepGroups).forEach(function (stepNum) {
        var sectionTitle = sectionNames[stepNum] || (t('section') || 'Abschnitt ') + stepNum;
        var items = stepGroups[stepNum];

        // Section header
        checkPage(14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(headerFontSize);
        doc.setTextColor(blue[0], blue[1], blue[2]);
        doc.text(sectionTitle, margin, y + 5);
        y += 7;
        doc.setDrawColor(gold[0], gold[1], gold[2]);
        doc.setLineWidth(0.3);
        doc.line(margin, y, margin + 50, y);
        y += 5;

        items.forEach(function (item) {
            if (item.isScale) {
                checkPage(12);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(stdFontSize);
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                var scaleLabel = item.question.length > 50 ? item.question.substring(0, 48) + '...' : item.question;
                doc.text(scaleLabel, margin, y + 3.5);
                drawProgressBar(pageW - margin - 52, y, item.answer);
                y += 8;
            } else {
                checkPage(14);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(9);
                doc.setTextColor(blue[0], blue[1], blue[2]);
                var qLines = doc.splitTextToSize(item.question, contentW);
                // Draw question block
                checkPage(qLines.length * 4.5 + 12);
                doc.text(item.question, margin, y + 4, { maxWidth: contentW });
                y += qLines.length * 4.5 + 1;

                // Answer text with subtle background for readability
                var aLines = doc.splitTextToSize(item.answer, contentW - 6);
                var boxH = aLines.length * 5.5 + 4;
                doc.setFillColor(248, 248, 250); // very light background
                doc.roundedRect(margin, y, contentW, boxH, 1.5, 1.5, 'F');
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10.5);
                doc.setTextColor(20, 20, 20); // near-black for maximum contrast
                aLines.forEach(function (line) {
                    checkPage(6);
                    doc.text(line, margin + 3, y + 4.5);
                    y += 5.5;
                });
                y += 5; // spacing after each entry
            }
        });
        y += 4;
    });

    // ── SUMMARY CHART PAGE (Triage View) ──
    doc.addPage();
    y = margin;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(blue[0], blue[1], blue[2]);
    var chartTitle = t('pdfSummaryTitle') || 'Zusammenfassung Marker';
    doc.text(chartTitle, pageW / 2, y + 8, { align: 'center' });
    y += 16;
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    // Data Storytelling mapping: Keys normalize values so that 10 = Max Burden
    var psychKeys = {
        'scale_depression': { invert: false, key: 'scaleDepression' },
        'scale_concentration': { invert: false, key: 'scaleConcentration' },
        'scale_burnout': { invert: false, key: 'scaleBurnout' },
        'scale_finance': { invert: true, key: 'scaleFinance' },
        'scale_emot_eating': { invert: false, key: 'scaleEmotEating' }
    };

    var somaticKeys = {
        'scale_headache': { invert: false, key: 'scaleHeadache' },
        'scale_jaw': { invert: false, key: 'scaleJaw' },
        'scale_hormones': { invert: false, key: 'scaleHormones' },
        'scale_sleep': { invert: true, key: 'scaleSleep' },
        'scale_digestion': { invert: false, key: 'scaleDigestion' }
    };

    var mainComplaintKeys = {
        'intensitaet': { invert: false, key: 'lMainComp' }
    };

    var psychData = [];
    var somaticData = [];
    var mainComplaintData = [];

    document.querySelectorAll('input[type="range"]').forEach(function (input) {
        var rawVal = parseInt(input.value) || 0;
        var name = input.name || input.id;

        var isPsych = psychKeys[name];
        var isSomat = somaticKeys[name];
        var isMain = mainComplaintKeys[name];

        if (isPsych) {
            var normVal = isPsych.invert ? (10 - rawVal) : rawVal;
            psychData.push({ label: t(isPsych.key) || name, value: normVal });
        } else if (isSomat) {
            var normVal = isSomat.invert ? (10 - rawVal) : rawVal;
            somaticData.push({ label: t(isSomat.key) || name, value: normVal });
        } else if (isMain) {
            var normVal = isMain.invert ? (10 - rawVal) : rawVal;
            mainComplaintData.push({ label: t(isMain.key) || name, value: normVal });
        } else {
            // General fallback
            var container = input.closest('.mini-slider-container, .slider-container');
            var labelEl = container ? container.querySelector('[data-t]') : null;
            var label = labelEl ? t(labelEl.getAttribute('data-t')) : name;
            somaticData.push({ label: label, value: rawVal });
        }
    });

    // Sort descending by burden severity (10 to 0)
    psychData.sort((a, b) => b.value - a.value);
    somaticData.sort((a, b) => b.value - a.value);

    var barH = 10;
    var gap = 5;
    var labelW = 95;
    var barMaxW = contentW - labelW - 15;

    function renderCategory(title, data) {
        if (data.length === 0) return;

        checkPage(15);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(blue[0], blue[1], blue[2]);
        doc.text(title, margin, y + 5);
        y += 8;

        data.forEach(function (item) {
            checkPage(barH + gap + 2);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            var shortLabel = item.label.length > 55 ? item.label.substring(0, 53) + '...' : item.label;
            doc.text(shortLabel, margin, y + barH / 2 + 1);

            var barX = margin + labelW;
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(barX, y, barMaxW, barH, 2, 2, 'F');

            var fillW = (item.value / 10) * barMaxW;
            if (fillW > 0) {
                var c = trafficColor(item.value);
                doc.setFillColor(c[0], c[1], c[2]);
                doc.roundedRect(barX, y, Math.max(fillW, 3), barH, 2, 2, 'F');
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(60, 60, 60);
            doc.text(item.value.toString() + '/10', barX + Math.max(fillW, 3) + 3, y + barH / 2 + 1.5);

            y += barH + gap;
        });
        y += 4;
    }

    renderCategory(t('lMainComp') || 'Main Complaint', mainComplaintData);
    y += 4;
    renderCategory(t('s3Title') || 'Psychological & Emotional', psychData);
    y += 2;
    renderCategory(t('s4Title') || 'Physical & Somatic', somaticData);

    // Legend & Explainer
    y += 2;
    checkPage(16);

    // Note explaining normalization
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    var normNote = t('pdfNormNote') || '* Normalized: 10 = maximum burden.';
    doc.text(normNote, margin, y);
    y += 6;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    var legendItems = [
        { color: [76, 175, 80], label: '0-3: ' + (t('legendLow') || 'Low') },
        { color: [255, 152, 0], label: '4-8: ' + (t('legendModerate') || 'Moderate/High') },
        { color: [244, 67, 54], label: '9-10: ' + (t('legendCritical') || 'Critical') },
    ];
    var legendX = margin;
    legendItems.forEach(function (li) {
        doc.setFillColor(li.color[0], li.color[1], li.color[2]);
        doc.roundedRect(legendX, y, 6, 4, 1, 1, 'F');
        doc.setTextColor(80, 80, 80);
        doc.text(li.label, legendX + 8, y + 3.5);
        legendX += 45;
    });

    // Footer on each page
    var totalPages = doc.internal.getNumberOfPages();
    for (var p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setTextColor(160, 160, 160);
        doc.text('Johannes Christ  —  ' + pdfTitle, margin, pageH - 5);
        doc.text(p + ' / ' + totalPages, pageW - margin, pageH - 5, { align: 'right' });
    }

    // Return doc so caller can either save or use for email
    return doc;
}

// Helper: generates AND saves the PDF (used by download button)
function downloadAnamesePDF(gatherFormData, tFunc, currentLang) {
    const doc = generateAnamesePDF(gatherFormData, tFunc, currentLang);
    if (doc) {
        const { name: formName } = gatherFormData();
        const nameVal = formName || (tFunc('patient') || 'Patient');
        doc.save((tFunc('appTitle') || 'Anamnese') + '_' + nameVal.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf');
    }
    return doc;
}

/**
 * PDF generator for the anamnesis form.
 * The layout is intentionally more editorial:
 * - a proper cover page
 * - calmer section hierarchy
 * - answer cards with stronger readability
 * - a clearer marker summary page
 */

function generateAnamesePDF(gatherFormData, tFunc, currentLang) {
    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    const layout = {
        marginX: 16,
        top: 28,
        bottom: 15,
    };
    layout.contentW = pageW - layout.marginX * 2;

    const colors = {
        ink: [28, 33, 41],
        navy: [31, 58, 95],
        navySoft: [68, 91, 123],
        gold: [196, 163, 90],
        sand: [245, 241, 234],
        surface: [250, 248, 244],
        surfaceStrong: [244, 238, 229],
        line: [223, 214, 201],
        muted: [108, 117, 127],
        green: [76, 175, 80],
        amber: [255, 193, 7],
        orange: [245, 145, 60],
        red: [214, 73, 58],
    };

    const sectionNames = {
        "1": t("s1Title") || "Deine Daten und Setup",
        "2": t("s2Title") || "Aktuelle Symptomatik und Beschwerden",
        "3": t("s3Title") || "Psychische Historie",
        "4": t("s4Title") || "Physische Stressanzeichen",
        "5": t("s5Title") || "Umfeld, Arbeit und Finanzen",
        "6": t("s6Title") || "Regeneration und Biologie",
        "7": t("s7Title") || "Sicherheit und Abschluss",
    };

    const locale = currentLang === "fr" ? "fr-FR" : (currentLang === "en" ? "en-US" : "de-DE");
    const languageLabel = {
        de: "Deutsch",
        en: "English",
        fr: "Francais",
    }[currentLang] || currentLang.toUpperCase();

    const pdfTitle = t("pdfTitle") || "Klinisch-Biologische Anamnese";
    const pdfSubtitle = t("appSubtitle") || "Aktuelle Bestandsaufnahme deiner Situation";
    const pdfSummaryTitle = t("pdfSummaryTitle") || "Zusammenfassung Marker";
    const pdfNormNote = t("pdfNormNote") || "* Normalized: 10 = maximum burden.";
    const lowLabel = t("legendLow") || "Low";
    const moderateLabel = t("legendModerate") || "Moderate / High";
    const criticalLabel = t("legendCritical") || "Critical";

    const formMeta = gatherFormData();
    const patientName = formMeta.name || (t("patient") || "Patient");
    const patientEmail = formMeta.email || "-";
    const dateStr = new Date().toLocaleDateString(locale);

    let y = layout.top;
    let currentPageTitle = "";

    function t(key) {
        return tFunc(key);
    }

    function setFill(color) {
        doc.setFillColor(color[0], color[1], color[2]);
    }

    function setDraw(color) {
        doc.setDrawColor(color[0], color[1], color[2]);
    }

    function setText(color) {
        doc.setTextColor(color[0], color[1], color[2]);
    }

    function trafficColor(val) {
        const safeVal = parseInt(val, 10) || 0;
        if (safeVal <= 3) return colors.green;
        if (safeVal <= 6) return colors.amber;
        if (safeVal <= 8) return colors.orange;
        return colors.red;
    }

    function drawLogo(centerX, topY, targetW) {
        const pdfLogoEl = document.getElementById("pdf-logo");
        if (!pdfLogoEl || !pdfLogoEl.complete || pdfLogoEl.naturalHeight === 0) return 0;

        try {
            const canvas = document.createElement("canvas");
            canvas.width = pdfLogoEl.naturalWidth;
            canvas.height = pdfLogoEl.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(pdfLogoEl, 0, 0);
            const imgData = canvas.toDataURL("image/png");
            const targetH = (pdfLogoEl.naturalHeight / pdfLogoEl.naturalWidth) * targetW;
            doc.addImage(imgData, "PNG", centerX - targetW / 2, topY, targetW, targetH);
            return targetH;
        } catch (error) {
            console.error("Error rendering PDF logo:", error);
            return 0;
        }
    }

    function drawCoverCard(x, topY, width, height, label, value) {
        setFill(colors.surface);
        setDraw(colors.line);
        doc.setLineWidth(0.2);
        doc.roundedRect(x, topY, width, height, 4, 4, "FD");

        setFill(colors.gold);
        doc.roundedRect(x, topY, 2.2, height, 2, 2, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        setText(colors.muted);
        doc.text(label.toUpperCase(), x + 6, topY + 6);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        setText(colors.ink);
        const lines = doc.splitTextToSize(value || "-", width - 12);
        doc.text(lines, x + 6, topY + 12);
    }

    function drawCoverPage() {
        setFill(colors.surface);
        doc.rect(0, 0, pageW, pageH, "F");

        setFill(colors.navy);
        doc.rect(0, 0, pageW, 56, "F");
        setFill(colors.gold);
        doc.rect(0, 56, pageW, 2, "F");

        setFill(colors.surfaceStrong);
        doc.roundedRect(layout.marginX, 78, layout.contentW, 50, 6, 6, "F");

        const logoHeight = drawLogo(pageW / 2, 18, 54);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        setText(colors.navy);
        doc.text(pdfTitle, pageW / 2, 92 + Math.max(0, logoHeight ? 0 : -6), { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        setText(colors.muted);
        const subtitleLines = doc.splitTextToSize(pdfSubtitle, 120);
        doc.text(subtitleLines, pageW / 2, 102, { align: "center" });

        const cardY = 138;
        const cardGap = 6;
        const cardW = (layout.contentW - cardGap) / 2;

        drawCoverCard(layout.marginX, cardY, cardW, 22, t("lName") || "Name", patientName);
        drawCoverCard(layout.marginX + cardW + cardGap, cardY, cardW, 22, t("lEmail") || "E-Mail", patientEmail);
        drawCoverCard(layout.marginX, cardY + 28, cardW, 22, t("lDate") || "Datum", dateStr);
        drawCoverCard(layout.marginX + cardW + cardGap, cardY + 28, cardW, 22, "Language", languageLabel);

        setFill(colors.surface);
        setDraw(colors.line);
        doc.roundedRect(layout.marginX, 198, layout.contentW, 42, 6, 6, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        setText(colors.navy);
        doc.text((t("successTitle") || "Danke fuer deinen Mut zur Ehrlichkeit.").toUpperCase(), layout.marginX + 8, 208);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        setText(colors.ink);
        const note = t("successDesc") || "Diese Bestandsaufnahme bildet die Grundlage fuer die gemeinsame Einordnung und die weiteren Schritte.";
        const noteLines = doc.splitTextToSize(note, layout.contentW - 16);
        doc.text(noteLines, layout.marginX + 8, 216);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        setText(colors.muted);
        doc.text("Confidential clinical intake document", layout.marginX, pageH - 12);
        doc.text("Johannes Christ", pageW - layout.marginX, pageH - 12, { align: "right" });
    }

    function drawPageChrome(title) {
        setFill(colors.navy);
        doc.rect(0, 0, pageW, 18, "F");
        setFill(colors.gold);
        doc.rect(0, 18, pageW, 1.2, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        setText([255, 255, 255]);
        doc.text(pdfTitle, layout.marginX, 11);

        if (title) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8.5);
            setText([230, 235, 241]);
            doc.text(title, pageW - layout.marginX, 11, { align: "right" });
        }
    }

    function startBodyPage(title, addNewPage) {
        if (addNewPage) doc.addPage();
        currentPageTitle = title || "";
        drawPageChrome(currentPageTitle);
        y = layout.top;
    }

    function ensureSpace(heightNeeded) {
        if (y + heightNeeded <= pageH - layout.bottom) return;
        startBodyPage(currentPageTitle, true);
    }

    function drawSectionHeader(title, count) {
        ensureSpace(20);

        setFill(colors.surfaceStrong);
        setDraw(colors.line);
        doc.setLineWidth(0.2);
        doc.roundedRect(layout.marginX, y, layout.contentW, 15, 4, 4, "FD");

        setFill(colors.gold);
        doc.roundedRect(layout.marginX, y, 2.5, 15, 2, 2, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        setText(colors.navy);
        doc.text(title, layout.marginX + 7, y + 9.5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        setText(colors.muted);
        const meta = `${count} ${count === 1 ? "entry" : "entries"}`;
        doc.text(meta, pageW - layout.marginX - 5, y + 9.5, { align: "right" });

        y += 20;
    }

    function drawProgressBar(x, topY, value, width) {
        const safeVal = Math.max(0, Math.min(10, parseInt(value, 10) || 0));
        const height = 5;
        const radius = 2.5;
        const fillW = (safeVal / 10) * width;
        const tone = trafficColor(safeVal);

        setFill([231, 233, 237]);
        doc.roundedRect(x, topY, width, height, radius, radius, "F");

        if (fillW > 0) {
            setFill(tone);
            doc.roundedRect(x, topY, Math.max(fillW, 3), height, radius, radius, "F");
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        setText(colors.muted);
        doc.text(`${safeVal}/10`, x + width + 4, topY + 3.8);
    }

    function drawScaleCard(item) {
        const questionLines = doc.splitTextToSize(item.question, 95);
        const cardH = Math.max(17, questionLines.length * 4.4 + 9);

        ensureSpace(cardH + 4);

        setFill(colors.surface);
        setDraw(colors.line);
        doc.roundedRect(layout.marginX, y, layout.contentW, cardH, 4, 4, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        setText(colors.navy);
        doc.text(questionLines, layout.marginX + 6, y + 6.5);

        const barW = 44;
        const barX = pageW - layout.marginX - barW - 15;
        const barY = y + cardH / 2 - 2.5;
        drawProgressBar(barX, barY, item.answer, barW);

        y += cardH + 4;
    }

    function drawAnswerChunk(lines, topY, boxH) {
        setFill(colors.surface);
        setDraw(colors.line);
        doc.roundedRect(layout.marginX, topY, layout.contentW, boxH, 3, 3, "FD");

        setFill(colors.gold);
        doc.roundedRect(layout.marginX, topY, 2, boxH, 1.5, 1.5, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        setText(colors.ink);
        doc.text(lines, layout.marginX + 6, topY + 6.2);
    }

    function drawTextEntry(item) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        const questionLines = doc.splitTextToSize(item.question, layout.contentW);
        const questionH = questionLines.length * 4.3 + 2;
        ensureSpace(questionH + 12);

        setText(colors.navy);
        doc.text(questionLines, layout.marginX, y + 4.2);
        y += questionH;

        const allAnswerLines = doc.splitTextToSize(item.answer, layout.contentW - 12);
        const lineH = 5;
        const paddingTop = 6;
        const paddingBottom = 4;
        let cursor = 0;
        let isContinuation = false;

        while (cursor < allAnswerLines.length) {
            const available = pageH - layout.bottom - y;
            let linesFit = Math.floor((available - paddingTop - paddingBottom) / lineH);

            if (linesFit < 2) {
                startBodyPage(currentPageTitle, true);
                continue;
            }

            const chunk = allAnswerLines.slice(cursor, cursor + linesFit);
            const boxH = chunk.length * lineH + paddingTop + paddingBottom;
            drawAnswerChunk(chunk, y, boxH);
            y += boxH + 4;
            cursor += chunk.length;

            if (cursor < allAnswerLines.length) {
                isContinuation = true;
                startBodyPage(currentPageTitle, true);
                doc.setFont("helvetica", "italic");
                doc.setFontSize(8);
                setText(colors.muted);
                doc.text("(continued)", layout.marginX, y - 4);
            }
        }

        if (!allAnswerLines.length && !isContinuation) {
            ensureSpace(14);
            drawAnswerChunk(["-"], y, 14);
            y += 18;
        }
    }

    function gatherStepGroups() {
        const stepGroups = {};

        document.querySelectorAll(".form-step").forEach(function (step) {
            const stepNum = step.dataset.step;
            const items = [];

            step.querySelectorAll("input, textarea, select").forEach(function (input) {
                if (input.type === "radio" && !input.checked) return;
                if (input.type === "button" || input.type === "submit") return;
                if ((input.value || "").trim() === "" && input.type !== "range") return;

                const condField = input.closest(".conditional-field");
                if (condField && !condField.classList.contains("visible")) return;

                let question = "";
                let answer = input.value;
                let isScale = false;

                if (input.type === "radio") {
                    const wrapper = input.closest(".radio-group-wrapper");
                    if (wrapper) {
                        const labelEl = wrapper.querySelector(".radio-label");
                        if (labelEl) question = labelEl.textContent.trim();
                    }

                    const span = input.nextElementSibling;
                    if (span && span.classList.contains("card-content")) {
                        answer = span.textContent.replace(/\s+/g, " ").trim();
                    }
                } else if (input.type === "range") {
                    isScale = true;
                    const container = input.closest(".mini-slider-container, .slider-container");
                    if (container) {
                        const lbl = container.querySelector(".mini-slider-label");
                        if (lbl) question = lbl.textContent.trim();
                    }
                    if (!question) question = input.name;
                    answer = input.value;
                } else {
                    const label = input.nextElementSibling;
                    if (label && label.tagName === "LABEL") {
                        question = label.textContent.trim();
                    } else {
                        question = input.id || input.name;
                    }
                }

                if (question) {
                    items.push({
                        question: question.replace(/\s+/g, " ").trim(),
                        answer: String(answer || "").replace(/\s+/g, " ").trim(),
                        isScale,
                    });
                }
            });

            if (items.length > 0) {
                stepGroups[stepNum] = items;
            }
        });

        return stepGroups;
    }

    function buildMarkerData() {
        const psychKeys = {
            scale_depression: { invert: false, key: "scaleDepression" },
            scale_concentration: { invert: false, key: "scaleConcentration" },
            scale_burnout: { invert: false, key: "scaleBurnout" },
            scale_finance: { invert: true, key: "scaleFinance" },
            scale_emot_eating: { invert: false, key: "scaleEmotEating" },
        };

        const somaticKeys = {
            scale_headache: { invert: false, key: "scaleHeadache" },
            scale_jaw: { invert: false, key: "scaleJaw" },
            scale_hormones: { invert: false, key: "scaleHormones" },
            scale_sleep: { invert: true, key: "scaleSleep" },
            scale_digestion: { invert: false, key: "scaleDigestion" },
        };

        const mainComplaintKeys = {
            intensitaet: { invert: false, key: "lMainComp" },
        };

        const psychData = [];
        const somaticData = [];
        const mainComplaintData = [];

        document.querySelectorAll('input[type="range"]').forEach(function (input) {
            const rawVal = parseInt(input.value, 10) || 0;
            const name = input.name || input.id;
            const psych = psychKeys[name];
            const somatic = somaticKeys[name];
            const main = mainComplaintKeys[name];

            function normalizedValue(config) {
                return config.invert ? (10 - rawVal) : rawVal;
            }

            if (psych) {
                psychData.push({
                    label: t(psych.key) || name,
                    value: normalizedValue(psych),
                });
                return;
            }

            if (somatic) {
                somaticData.push({
                    label: t(somatic.key) || name,
                    value: normalizedValue(somatic),
                });
                return;
            }

            if (main) {
                mainComplaintData.push({
                    label: t(main.key) || name,
                    value: normalizedValue(main),
                });
                return;
            }

            const container = input.closest(".mini-slider-container, .slider-container");
            const labelEl = container ? container.querySelector("[data-t]") : null;
            const fallbackLabel = labelEl ? t(labelEl.getAttribute("data-t")) : name;
            somaticData.push({ label: fallbackLabel, value: rawVal });
        });

        psychData.sort(function (a, b) { return b.value - a.value; });
        somaticData.sort(function (a, b) { return b.value - a.value; });
        mainComplaintData.sort(function (a, b) { return b.value - a.value; });

        return { psychData, somaticData, mainComplaintData };
    }

    function drawInsightCards(items) {
        if (!items.length) return;

        const count = Math.min(3, items.length);
        const gap = 5;
        const cardW = (layout.contentW - gap * (count - 1)) / count;

        ensureSpace(22);

        for (let i = 0; i < count; i += 1) {
            const item = items[i];
            const x = layout.marginX + i * (cardW + gap);

            setFill(colors.surface);
            setDraw(colors.line);
            doc.roundedRect(x, y, cardW, 19, 4, 4, "FD");

            const tone = trafficColor(item.value);
            setFill(tone);
            doc.circle(x + 7, y + 7, 2.2, "F");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            setText(colors.navy);
            const shortLabel = doc.splitTextToSize(item.label, cardW - 12);
            doc.text(shortLabel, x + 12, y + 7.8);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            setText(colors.ink);
            doc.text(`${item.value}/10`, x + 6, y + 15.2);
        }

        y += 24;
    }

    function drawCategory(title, data) {
        if (!data.length) return;

        ensureSpace(16);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        setText(colors.navy);
        doc.text(title, layout.marginX, y);
        y += 5;

        data.forEach(function (item) {
            const labelLines = doc.splitTextToSize(item.label, 78);
            const rowH = Math.max(11, labelLines.length * 3.9 + 3);
            ensureSpace(rowH + 2);

            setFill(colors.surface);
            setDraw(colors.line);
            doc.roundedRect(layout.marginX, y, layout.contentW, rowH, 3, 3, "FD");

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            setText(colors.ink);
            doc.text(labelLines, layout.marginX + 5, y + 6);

            const barX = layout.marginX + 88;
            const barW = layout.contentW - 110;
            const barY = y + rowH / 2 - 2.5;
            drawProgressBar(barX, barY, item.value, barW);

            y += rowH + 2;
        });

        y += 2;
    }

    function drawLegend() {
        ensureSpace(18);

        doc.setFont("helvetica", "italic");
        doc.setFontSize(7.5);
        setText(colors.muted);
        doc.text(pdfNormNote, layout.marginX, y);
        y += 6;

        const items = [
            { color: colors.green, label: `0-3: ${lowLabel}` },
            { color: colors.orange, label: `4-8: ${moderateLabel}` },
            { color: colors.red, label: `9-10: ${criticalLabel}` },
        ];

        items.forEach(function (item, index) {
            const x = layout.marginX + index * 58;
            setFill(item.color);
            doc.roundedRect(x, y, 7, 4, 1, 1, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            setText(colors.muted);
            doc.text(item.label, x + 10, y + 3.4);
        });

        y += 8;
    }

    function drawFooter(pageNumber, totalPages) {
        setDraw(colors.line);
        doc.setLineWidth(0.2);
        doc.line(layout.marginX, pageH - 10, pageW - layout.marginX, pageH - 10);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        setText(colors.muted);
        doc.text(`${patientName}  |  ${dateStr}`, layout.marginX, pageH - 5);
        doc.text(`${pageNumber} / ${totalPages}`, pageW - layout.marginX, pageH - 5, { align: "right" });
    }

    doc.setProperties({
        title: pdfTitle,
        subject: pdfSubtitle,
        author: "Johannes Christ",
        creator: "Johannes Christ Anamnese",
    });

    drawCoverPage();

    const stepGroups = gatherStepGroups();
    startBodyPage(t("appTitle") || "Anamnese", true);

    ["1", "2", "3", "4", "5", "6", "7"].forEach(function (stepNum) {
        const items = stepGroups[stepNum];
        if (!items || !items.length) return;

        currentPageTitle = sectionNames[stepNum] || `Section ${stepNum}`;
        drawSectionHeader(currentPageTitle, items.length);

        items.forEach(function (item) {
            if (item.isScale) {
                drawScaleCard(item);
            } else {
                drawTextEntry(item);
            }
        });

        y += 4;
    });

    startBodyPage(pdfSummaryTitle, true);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    setText(colors.navy);
    doc.text(pdfSummaryTitle, layout.marginX, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setText(colors.muted);
    doc.text("Top burden markers and normalized overview.", layout.marginX, y);
    y += 10;

    const markerData = buildMarkerData();
    const combinedTop = markerData.mainComplaintData
        .concat(markerData.psychData)
        .concat(markerData.somaticData)
        .sort(function (a, b) { return b.value - a.value; });

    drawInsightCards(combinedTop);
    drawCategory(t("lMainComp") || "Main complaint", markerData.mainComplaintData);
    drawCategory(t("s3Title") || "Psychological and emotional", markerData.psychData);
    drawCategory(t("s4Title") || "Physical and somatic", markerData.somaticData);
    drawLegend();

    const totalPages = doc.internal.getNumberOfPages();
    for (let page = 1; page <= totalPages; page += 1) {
        doc.setPage(page);
        drawFooter(page, totalPages);
    }

    return doc;
}

function downloadAnamesePDF(gatherFormData, tFunc, currentLang) {
    const doc = generateAnamesePDF(gatherFormData, tFunc, currentLang);
    if (doc) {
        const meta = gatherFormData();
        const nameVal = meta.name || (tFunc("patient") || "Patient");
        const safeName = nameVal.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        doc.save(`${tFunc("appTitle") || "Anamnese"}_${safeName}.pdf`);
    }
    return doc;
}

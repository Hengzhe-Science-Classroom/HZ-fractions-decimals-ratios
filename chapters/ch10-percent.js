// === Chapter 10: Percent ===
// Fun, colorful content for elementary/middle school students (ages 8-12)

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Percent',
    subtitle: 'Per hundred -- the universal way to compare!',
    sections: [
        // ============================================================
        // SECTION 1: What is Percent?
        // ============================================================
        {
            id: 'ch10-sec01',
            title: 'What is Percent?',
            content: `
                <h2>What is Percent?</h2>

                <div class="env-block intuition">
                    <div class="env-title">A Universal Language</div>
                    <div class="env-body">
                        <p>Fractions and decimals are great, but they can be hard to compare quickly. Is \\(\\dfrac{3}{8}\\) bigger than \\(0.36\\)? Hmm, tricky! <strong>Percent</strong> solves this by putting everything on the same scale: out of 100. The word "percent" literally means "per hundred" (from Latin <em>per centum</em>).</p>
                    </div>
                </div>

                <p>The symbol <strong>%</strong> means "out of 100."</p>
                <ul>
                    <li>\\(50\\% = \\dfrac{50}{100} = 0.50\\) (half)</li>
                    <li>\\(25\\% = \\dfrac{25}{100} = 0.25\\) (one quarter)</li>
                    <li>\\(100\\% = \\dfrac{100}{100} = 1\\) (the whole thing)</li>
                </ul>

                <h3>The Fraction-Decimal-Percent Triangle</h3>

                <p>Any number can be written as a fraction, a decimal, or a percent. They are three different outfits for the same number!</p>

                <div class="env-block example">
                    <div class="env-title">Converting Between Forms</div>
                    <div class="env-body">
                        <table style="margin:0 auto; border-collapse:collapse; text-align:center;">
                            <tr style="background:#1a1a40;"><th style="padding:6px 18px;border:1px solid #30363d;">Fraction</th><th style="padding:6px 18px;border:1px solid #30363d;">Decimal</th><th style="padding:6px 18px;border:1px solid #30363d;">Percent</th></tr>
                            <tr><td style="padding:6px 18px;border:1px solid #30363d;">\\(\\frac{1}{4}\\)</td><td style="padding:6px 18px;border:1px solid #30363d;">0.25</td><td style="padding:6px 18px;border:1px solid #30363d;">25%</td></tr>
                            <tr><td style="padding:6px 18px;border:1px solid #30363d;">\\(\\frac{3}{5}\\)</td><td style="padding:6px 18px;border:1px solid #30363d;">0.60</td><td style="padding:6px 18px;border:1px solid #30363d;">60%</td></tr>
                            <tr><td style="padding:6px 18px;border:1px solid #30363d;">\\(\\frac{7}{8}\\)</td><td style="padding:6px 18px;border:1px solid #30363d;">0.875</td><td style="padding:6px 18px;border:1px solid #30363d;">87.5%</td></tr>
                        </table>
                        <p style="margin-top:10px;"><strong>Fraction to percent:</strong> divide, then multiply by 100.</p>
                        <p><strong>Percent to decimal:</strong> divide by 100 (move the point two places left).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch10-grid-viz"></div>
            `,
            visualizations: [
                {
                    id: 'ch10-grid-viz',
                    title: 'Percent Grid (10 x 10)',
                    description: 'Drag the slider to shade squares. See the fraction, decimal, and percent all at once!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 340, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var pct = 35;

                        VizEngine.createSlider(controls, 'Percent', 0, 100, pct, 1, function(v) { pct = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var cellSize = 26, gap = 2;
                            var gridW = 10 * (cellSize + gap);
                            var startX = 280 - gridW / 2, startY = 50;
                            // Draw 10x10 grid
                            for (var r = 0; r < 10; r++) {
                                for (var c = 0; c < 10; c++) {
                                    var idx = r * 10 + c;
                                    var x = startX + c * (cellSize + gap);
                                    var y = startY + r * (cellSize + gap);
                                    if (idx < pct) {
                                        ctx.fillStyle = viz.colors.blue;
                                    } else {
                                        ctx.fillStyle = '#1a1a40';
                                    }
                                    ctx.beginPath();
                                    ctx.roundRect(x, y, cellSize, cellSize, 3);
                                    ctx.fill();
                                    ctx.strokeStyle = '#30363d';
                                    ctx.lineWidth = 0.5;
                                    ctx.stroke();
                                }
                            }
                            // Labels below grid
                            var labY = startY + 10 * (cellSize + gap) + 20;
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(pct + '%', 180, labY);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(pct + '/100', 280, labY);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText((pct / 100).toFixed(2), 380, labY);
                            // Tiny labels
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Percent', 180, labY + 20);
                            ctx.fillText('Fraction', 280, labY + 20);
                            ctx.fillText('Decimal', 380, labY + 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Convert \\(\\dfrac{4}{5}\\) to a percent.',
                    hint: 'Divide 4 by 5 to get a decimal, then multiply by 100.',
                    solution: '\\(4 \\div 5 = 0.8\\). Then \\(0.8 \\times 100 = 80\\). So \\(\\dfrac{4}{5} = 80\\%\\).'
                },
                {
                    question: 'Write 72% as a fraction in simplest form.',
                    hint: '72% = 72/100. Simplify by dividing top and bottom by their GCF (4).',
                    solution: '\\(\\dfrac{72}{100} = \\dfrac{18}{25}\\). The GCF of 72 and 100 is 4.'
                },
                {
                    question: 'Order from smallest to largest: \\(0.45\\), \\(\\dfrac{2}{5}\\), \\(43\\%\\).',
                    hint: 'Convert all three to decimals: \\(0.45\\), \\(2 \\div 5 = 0.40\\), \\(43\\% = 0.43\\).',
                    solution: '\\(\\dfrac{2}{5} = 0.40\\), \\(43\\% = 0.43\\), and \\(0.45\\). Order: \\(\\dfrac{2}{5} \\lt 43\\% \\lt 0.45\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Finding Percentages
        // ============================================================
        {
            id: 'ch10-sec02',
            title: 'Finding Percentages',
            content: `
                <h2>Finding Percentages</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Question</div>
                    <div class="env-body">
                        <p>"What is 25% of 80?" This type of question is everywhere: sales tax, tips, test scores, and more. The key word is <strong>"of"</strong>, which means multiply!</p>
                    </div>
                </div>

                <h3>The Formula</h3>

                <p style="text-align:center; font-size:1.15em;">\\(\\text{Part} = \\text{Percent} \\times \\text{Whole}\\)</p>

                <p>Convert the percent to a decimal first, then multiply.</p>

                <div class="env-block example">
                    <div class="env-title">Example: Test Score</div>
                    <div class="env-body">
                        <p>You got 85% on a test with 40 questions. How many did you get right?</p>
                        <p style="text-align:center;">\\(0.85 \\times 40 = 34\\)</p>
                        <p>You answered <strong>34 questions</strong> correctly!</p>
                    </div>
                </div>

                <h3>Quick Mental Math Tricks</h3>

                <ul>
                    <li><strong>50%:</strong> divide by 2. (50% of 60 = 30)</li>
                    <li><strong>10%:</strong> divide by 10. (10% of 250 = 25)</li>
                    <li><strong>25%:</strong> divide by 4. (25% of 80 = 20)</li>
                    <li><strong>1%:</strong> divide by 100. (1% of 500 = 5)</li>
                </ul>
                <p>Combine these for any percent! For 15%, find 10% + 5% (half of 10%).</p>

                <div class="viz-placeholder" data-viz="ch10-bar-model-viz"></div>
            `,
            visualizations: [
                {
                    id: 'ch10-bar-model-viz',
                    title: 'Bar Model: Percentage of a Whole',
                    description: 'Set the whole and percentage to see the part highlighted on the bar!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 280, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var whole = 80, pct = 25;

                        VizEngine.createSlider(controls, 'Whole', 10, 200, whole, 5, function(v) { whole = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Percent', 0, 100, pct, 1, function(v) { pct = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var part = (pct / 100) * whole;
                            var barX = 60, barY = 80, barW = 440, barH = 50;
                            var filledW = (pct / 100) * barW;
                            // Full bar outline
                            ctx.fillStyle = '#1a1a40';
                            ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 8); ctx.fill();
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1; ctx.stroke();
                            // Filled portion
                            if (pct > 0) {
                                ctx.save();
                                ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 8); ctx.clip();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(barX, barY, filledW, barH);
                                ctx.restore();
                            }
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 8); ctx.stroke();
                            // Labels on bar
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (filledW > 40) {
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText(pct + '%', barX + filledW / 2, barY + barH / 2 + 5);
                            }
                            // Markers: 0%, 25%, 50%, 75%, 100%
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'center';
                            for (var m = 0; m <= 100; m += 25) {
                                var mx = barX + (m / 100) * barW;
                                ctx.fillText(m + '%', mx, barY + barH + 16);
                                ctx.strokeStyle = '#30363d'; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(mx, barY + barH); ctx.lineTo(mx, barY + barH + 6); ctx.stroke();
                            }
                            // Result
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText(pct + '% of ' + whole + ' = ' + part.toFixed(1), 280, 190);
                            // Calculation
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText((pct / 100).toFixed(2) + ' x ' + whole + ' = ' + part.toFixed(1), 280, 218);
                            // Whole label
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Whole = ' + whole, 280, barY - 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is 30% of 150?',
                    hint: 'Convert 30% to 0.30, then multiply by 150.',
                    solution: '\\(0.30 \\times 150 = 45\\). So 30% of 150 is <strong>45</strong>.'
                },
                {
                    question: 'A class has 32 students. If 75% passed the test, how many passed?',
                    hint: '75% = 0.75. Multiply by 32.',
                    solution: '\\(0.75 \\times 32 = 24\\). <strong>24 students</strong> passed the test.'
                },
                {
                    question: 'Find 15% of 200 using mental math (10% + 5%).',
                    hint: '10% of 200 = 20. 5% is half of 10%, so 5% of 200 = 10.',
                    solution: '10% of 200 = 20. 5% of 200 = 10. So 15% of 200 = \\(20 + 10 = 30\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Percent Increase & Decrease
        // ============================================================
        {
            id: 'ch10-sec03',
            title: 'Percent Increase & Decrease',
            content: `
                <h2>Percent Increase &amp; Decrease</h2>

                <div class="env-block intuition">
                    <div class="env-title">Prices Go Up and Down</div>
                    <div class="env-body">
                        <p>When a store has a "30% off" sale, that is a <strong>percent decrease</strong>. When the government adds 10% tax, that is a <strong>percent increase</strong>. Understanding these is essential for being a smart shopper!</p>
                    </div>
                </div>

                <h3>Percent Increase (Markup, Tax, Tip)</h3>

                <p style="text-align:center; font-size:1.1em;">\\(\\text{New} = \\text{Original} \\times (1 + \\text{rate})\\)</p>

                <div class="env-block example">
                    <div class="env-title">Adding a Tip</div>
                    <div class="env-body">
                        <p>Your restaurant bill is $40. You want to leave a 15% tip.</p>
                        <p style="text-align:center;">\\(\\text{Tip} = 0.15 \\times 40 = \\$6\\)</p>
                        <p style="text-align:center;">\\(\\text{Total} = 40 + 6 = \\$46\\)</p>
                        <p>Or in one step: \\(40 \\times 1.15 = \\$46\\).</p>
                    </div>
                </div>

                <h3>Percent Decrease (Discount, Sale)</h3>

                <p style="text-align:center; font-size:1.1em;">\\(\\text{New} = \\text{Original} \\times (1 - \\text{rate})\\)</p>

                <div class="env-block example">
                    <div class="env-title">Sale Shopping</div>
                    <div class="env-body">
                        <p>A jacket originally costs $80 and is on sale for 25% off.</p>
                        <p style="text-align:center;">\\(\\text{Discount} = 0.25 \\times 80 = \\$20\\)</p>
                        <p style="text-align:center;">\\(\\text{Sale price} = 80 - 20 = \\$60\\)</p>
                        <p>Or: \\(80 \\times 0.75 = \\$60\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch10-price-tag-viz"></div>
            `,
            visualizations: [
                {
                    id: 'ch10-price-tag-viz',
                    title: 'Price Tag: Discount & Tax',
                    description: 'Set the original price, then apply a discount or tax to see the final price!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 300, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var price = 80, discount = 25, tax = 0;

                        VizEngine.createSlider(controls, 'Original $', 10, 200, price, 5, function(v) { price = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Discount %', 0, 80, discount, 5, function(v) { discount = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Tax %', 0, 25, tax, 1, function(v) { tax = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var afterDiscount = price * (1 - discount / 100);
                            var finalPrice = afterDiscount * (1 + tax / 100);
                            var saved = price - afterDiscount;
                            var taxAmt = finalPrice - afterDiscount;
                            // Price tag shape
                            var tx = 140, ty = 30, tw = 280, th = 100;
                            ctx.fillStyle = '#1a1a40';
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.roundRect(tx, ty, tw, th, 12); ctx.fill(); ctx.stroke();
                            // Original price
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.text;
                            if (discount > 0) {
                                // Strike through
                                ctx.fillText('$' + price.toFixed(2), 280, ty + 35);
                                ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var tw2 = ctx.measureText('$' + price.toFixed(2)).width;
                                ctx.moveTo(280 - tw2 / 2 - 4, ty + 30);
                                ctx.lineTo(280 + tw2 / 2 + 4, ty + 30);
                                ctx.stroke();
                            } else {
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('$' + price.toFixed(2), 280, ty + 35);
                            }
                            // Sale price
                            if (discount > 0) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.fillText('$' + afterDiscount.toFixed(2), 280, ty + 75);
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText(discount + '% OFF!  Save $' + saved.toFixed(2), 280, ty + 95);
                            }
                            // Breakdown bars
                            var barY = 160, barH = 30, barMax = 400;
                            var maxVal = Math.max(price, finalPrice);
                            var scale = barMax / maxVal;
                            // Original bar
                            ctx.fillStyle = viz.colors.text + '44';
                            ctx.beginPath(); ctx.roundRect(80, barY, price * scale, barH, 6); ctx.fill();
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Original: $' + price.toFixed(2), 80, barY - 6);
                            // After discount bar
                            if (discount > 0) {
                                ctx.fillStyle = viz.colors.green + '66';
                                ctx.beginPath(); ctx.roundRect(80, barY + 42, afterDiscount * scale, barH, 6); ctx.fill();
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('After ' + discount + '% off: $' + afterDiscount.toFixed(2), 80, barY + 36);
                            }
                            // Final with tax
                            if (tax > 0) {
                                ctx.fillStyle = viz.colors.orange + '66';
                                ctx.beginPath(); ctx.roundRect(80, barY + 84, finalPrice * scale, barH, 6); ctx.fill();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('After ' + tax + '% tax: $' + finalPrice.toFixed(2) + '  (tax = $' + taxAmt.toFixed(2) + ')', 80, barY + 78);
                            }
                            // Final answer
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('You pay: $' + finalPrice.toFixed(2), 280, 282);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A $50 shirt is on sale for 20% off. What is the sale price?',
                    hint: 'Find 20% of $50 (= $10), then subtract from $50.',
                    solution: '\\(0.20 \\times 50 = 10\\). Sale price = \\(50 - 10 = \\$40\\). Or: \\(50 \\times 0.80 = \\$40\\).'
                },
                {
                    question: 'A meal costs $35. You add a 20% tip. What is the total?',
                    hint: '20% of $35 = $7. Add that to $35.',
                    solution: '\\(0.20 \\times 35 = 7\\). Total = \\(35 + 7 = \\$42\\). Or: \\(35 \\times 1.20 = \\$42\\).'
                },
                {
                    question: 'A bike costs $240 and goes on sale for 15% off. Then 10% tax is added. What do you pay?',
                    hint: 'First apply the discount: \\(240 \\times 0.85\\). Then apply tax: result \\(\\times 1.10\\).',
                    solution: 'After discount: \\(240 \\times 0.85 = \\$204\\). After tax: \\(204 \\times 1.10 = \\$224.40\\). You pay <strong>$224.40</strong>.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Percent Problems
        // ============================================================
        {
            id: 'ch10-sec04',
            title: 'Percent Problems',
            content: `
                <h2>Percent Problems</h2>

                <div class="env-block intuition">
                    <div class="env-title">Three Types, One Idea</div>
                    <div class="env-body">
                        <p>Every percent problem involves three numbers: the <strong>Part</strong>, the <strong>Whole</strong>, and the <strong>Percent</strong>. If you know any two, you can find the third!</p>
                    </div>
                </div>

                <h3>The Three Question Types</h3>

                <table style="margin:0 auto; border-collapse:collapse; text-align:left; max-width:520px;">
                    <tr style="background:#1a1a40;"><th style="padding:8px 14px;border:1px solid #30363d;">Type</th><th style="padding:8px 14px;border:1px solid #30363d;">Question</th><th style="padding:8px 14px;border:1px solid #30363d;">Formula</th></tr>
                    <tr><td style="padding:8px 14px;border:1px solid #30363d;">Find the Part</td><td style="padding:8px 14px;border:1px solid #30363d;">What is 20% of 60?</td><td style="padding:8px 14px;border:1px solid #30363d;">\\(P = \\% \\times W\\)</td></tr>
                    <tr><td style="padding:8px 14px;border:1px solid #30363d;">Find the Percent</td><td style="padding:8px 14px;border:1px solid #30363d;">15 is what % of 60?</td><td style="padding:8px 14px;border:1px solid #30363d;">\\(\\% = P \\div W\\)</td></tr>
                    <tr><td style="padding:8px 14px;border:1px solid #30363d;">Find the Whole</td><td style="padding:8px 14px;border:1px solid #30363d;">15 is 25% of what?</td><td style="padding:8px 14px;border:1px solid #30363d;">\\(W = P \\div \\%\\)</td></tr>
                </table>

                <div class="env-block example">
                    <div class="env-title">Type 2: Find the Percent</div>
                    <div class="env-body">
                        <p>You scored 18 out of 24 on a quiz. What percent is that?</p>
                        <p style="text-align:center;">\\(\\dfrac{18}{24} = 0.75 = 75\\%\\)</p>
                        <p>You got <strong>75%</strong> on the quiz!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Type 3: Find the Whole</div>
                    <div class="env-body">
                        <p>30 students is 60% of the whole class. How many students total?</p>
                        <p style="text-align:center;">\\(W = 30 \\div 0.60 = 50\\)</p>
                        <p>The class has <strong>50 students</strong> total.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch10-converter-viz"></div>
            `,
            visualizations: [
                {
                    id: 'ch10-converter-viz',
                    title: 'Part / Whole / Percent Converter',
                    description: 'Enter any two values and the third is calculated automatically!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 300, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var part = 15, whole = 60, pct = 25;
                        var mode = 'part'; // which to solve for

                        VizEngine.createButton(controls, 'Find Part', function() { mode = 'part'; draw(); });
                        VizEngine.createButton(controls, 'Find %', function() { mode = 'pct'; draw(); });
                        VizEngine.createButton(controls, 'Find Whole', function() { mode = 'whole'; draw(); });
                        VizEngine.createSlider(controls, 'Part', 0, 200, part, 1, function(v) { part = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Whole', 1, 200, whole, 1, function(v) { whole = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Percent', 0, 200, pct, 1, function(v) { pct = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var solvedVal;
                            if (mode === 'part') {
                                solvedVal = (pct / 100) * whole;
                                part = solvedVal;
                            } else if (mode === 'pct') {
                                solvedVal = whole > 0 ? (part / whole) * 100 : 0;
                                pct = solvedVal;
                            } else {
                                solvedVal = pct > 0 ? (part / (pct / 100)) : 0;
                                whole = solvedVal;
                            }
                            // Draw three boxes
                            var bw = 140, bh = 70, gap = 20;
                            var startX = 280 - (3 * bw + 2 * gap) / 2;
                            var by = 50;
                            var labels = ['Part', 'Whole', 'Percent'];
                            var values = [part, whole, pct];
                            var units = ['', '', '%'];
                            var colors = [viz.colors.blue, viz.colors.orange, viz.colors.green];
                            var solved = mode === 'part' ? 0 : (mode === 'whole' ? 1 : 2);
                            for (var i = 0; i < 3; i++) {
                                var bx = startX + i * (bw + gap);
                                ctx.fillStyle = i === solved ? colors[i] + '33' : '#1a1a40';
                                ctx.strokeStyle = colors[i];
                                ctx.lineWidth = i === solved ? 3 : 1;
                                ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 8); ctx.fill(); ctx.stroke();
                                ctx.fillStyle = colors[i];
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(labels[i] + (i === solved ? ' (solved)' : ''), bx + bw / 2, by - 8);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                var dispVal = typeof values[i] === 'number' ? (Number.isInteger(values[i]) ? values[i] : values[i].toFixed(1)) : values[i];
                                ctx.fillText(dispVal + units[i], bx + bw / 2, by + bh / 2 + 8);
                            }
                            // Visual bar
                            var barY = 160, barW = 400, barH = 30;
                            var barX = 80;
                            var pctVal = mode === 'pct' ? solvedVal : pct;
                            var fillW = Math.min(barW, (pctVal / 100) * barW);
                            ctx.fillStyle = '#1a1a40';
                            ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 6); ctx.fill();
                            if (pctVal > 0) {
                                ctx.save();
                                ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 6); ctx.clip();
                                ctx.fillStyle = viz.colors.blue + '88';
                                ctx.fillRect(barX, barY, fillW, barH);
                                ctx.restore();
                            }
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 6); ctx.stroke();
                            // Equation
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            var pDisp = typeof part === 'number' ? (Number.isInteger(part) ? part : part.toFixed(1)) : part;
                            var wDisp = typeof whole === 'number' ? (Number.isInteger(whole) ? whole : whole.toFixed(1)) : whole;
                            var pcDisp = typeof pct === 'number' ? (Number.isInteger(pct) ? pct : pct.toFixed(1)) : pct;
                            ctx.fillText(pDisp + ' is ' + pcDisp + '% of ' + wDisp, 280, 230);
                            // Formula reminder
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            if (mode === 'part') ctx.fillText('Part = Percent x Whole / 100', 280, 258);
                            else if (mode === 'pct') ctx.fillText('Percent = (Part / Whole) x 100', 280, 258);
                            else ctx.fillText('Whole = Part / (Percent / 100)', 280, 258);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: '45 is what percent of 180?',
                    hint: 'Divide the part by the whole: \\(45 \\div 180\\). Then multiply by 100.',
                    solution: '\\(45 \\div 180 = 0.25\\). Multiply by 100: <strong>25%</strong>.'
                },
                {
                    question: '36 is 40% of what number?',
                    hint: 'You need the whole: \\(W = 36 \\div 0.40\\).',
                    solution: '\\(36 \\div 0.40 = 90\\). So 36 is 40% of <strong>90</strong>.'
                },
                {
                    question: 'A school has 600 students. 252 walk to school. What percent walk?',
                    hint: 'Divide walkers by total: \\(252 \\div 600\\). Multiply by 100.',
                    solution: '\\(252 \\div 600 = 0.42\\). That is <strong>42%</strong> of students.'
                }
            ]
        }
    ]
});

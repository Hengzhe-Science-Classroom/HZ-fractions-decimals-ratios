// === Chapter 8: Ratios ===
// Fun, colorful content for elementary/middle school students (ages 8-12)

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Ratios',
    subtitle: 'Compare quantities and discover how things relate!',
    sections: [
        // ============================================================
        // SECTION 1: What Is a Ratio?
        // ============================================================
        {
            id: 'ch08-sec01',
            title: 'What is a Ratio?',
            content: `
                <h2>What is a Ratio?</h2>

                <div class="env-block intuition">
                    <div class="env-title">From Fractions to Comparisons</div>
                    <div class="env-body">
                        <p>You already know how fractions and decimals describe <em>parts of a whole</em>. But what if you want to compare two groups to each other? For instance, "there are 3 dogs for every 2 cats." That is a <strong>ratio</strong>, and it is one of the most useful ideas in all of math!</p>
                    </div>
                </div>

                <p>A <strong>ratio</strong> compares two (or more) quantities. It tells you how much of one thing there is <em>compared to</em> another.</p>

                <div class="env-block example">
                    <div class="env-title">Everyday Example</div>
                    <div class="env-body">
                        <p>Imagine a bag with 4 red marbles and 6 blue marbles.</p>
                        <ul>
                            <li><strong>Part-to-part:</strong> red to blue = \\(4 : 6\\) (simplified: \\(2 : 3\\))</li>
                            <li><strong>Part-to-whole:</strong> red to total = \\(4 : 10\\) (simplified: \\(2 : 5\\))</li>
                        </ul>
                        <p>Both are ratios, but they answer different questions!</p>
                    </div>
                </div>

                <h3>Three Ways to Write a Ratio</h3>

                <p>You can write the same ratio in three different ways:</p>
                <ol>
                    <li><strong>Colon notation:</strong> \\(3 : 5\\)</li>
                    <li><strong>Fraction notation:</strong> \\(\\dfrac{3}{5}\\)</li>
                    <li><strong>Words:</strong> "3 to 5"</li>
                </ol>
                <p>All three mean exactly the same thing: for every 3 of the first quantity, there are 5 of the second.</p>

                <div class="env-block intuition">
                    <div class="env-title">Key Idea</div>
                    <div class="env-body">
                        <p><strong>Order matters!</strong> The ratio \\(3 : 5\\) is different from \\(5 : 3\\). The first number always refers to the first quantity named. "Dogs to cats = \\(3 : 2\\)" means 3 dogs for every 2 cats, not the other way around.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch08-color-mix-viz"></div>

                <h3>Simplifying Ratios</h3>

                <p>Just like fractions, ratios can be <strong>simplified</strong> by dividing both parts by their greatest common factor (GCF).</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Simplify \\(12 : 8\\).</p>
                        <p>The GCF of 12 and 8 is 4. Divide both by 4:</p>
                        <p style="text-align:center;">\\(12 : 8 = 3 : 2\\)</p>
                        <p>So for every 3 of the first, there are 2 of the second.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch08-color-mix-viz',
                    title: 'Color Mixing: Adjustable Ratio',
                    description: 'Change the red and blue amounts to see how the ratio and the mixed color change!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 40, originX: 280, originY: 280});
                        var ctx = viz.ctx;
                        var red = 3, blue = 2;

                        VizEngine.createSlider(controls, 'Red', 0, 10, red, 1, function(v) { red = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Blue', 0, 10, blue, 1, function(v) { blue = Math.round(v); draw(); });

                        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

                        function draw() {
                            viz.clear();
                            var total = red + blue;
                            var bw = 32, gap = 6, y = 60;
                            var startX = 280 - (total * (bw + gap)) / 2;
                            // Draw red circles
                            for (var i = 0; i < red; i++) {
                                var cx = startX + i * (bw + gap) + bw / 2;
                                ctx.fillStyle = '#f85149';
                                ctx.beginPath(); ctx.arc(cx, y, bw / 2, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#ffffff44';
                                ctx.beginPath(); ctx.arc(cx - 4, y - 4, 5, 0, Math.PI * 2); ctx.fill();
                            }
                            // Draw blue circles
                            for (var j = 0; j < blue; j++) {
                                var cx2 = startX + (red + j) * (bw + gap) + bw / 2;
                                ctx.fillStyle = '#58a6ff';
                                ctx.beginPath(); ctx.arc(cx2, y, bw / 2, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#ffffff44';
                                ctx.beginPath(); ctx.arc(cx2 - 4, y - 4, 5, 0, Math.PI * 2); ctx.fill();
                            }
                            // Labels
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = '#f85149';
                            ctx.fillText('Red: ' + red, 140, 110);
                            ctx.fillStyle = '#58a6ff';
                            ctx.fillText('Blue: ' + blue, 420, 110);
                            // Ratio display
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            if (total === 0) {
                                ctx.fillText('Add some colors!', 280, 155);
                            } else {
                                var g = (red > 0 && blue > 0) ? gcd(red, blue) : 1;
                                var sr = red / (g || 1), sb = blue / (g || 1);
                                ctx.fillText('Ratio  ' + red + ' : ' + blue, 280, 148);
                                if (g > 1) {
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.font = '16px -apple-system,sans-serif';
                                    ctx.fillText('Simplified  ' + sr + ' : ' + sb, 280, 175);
                                }
                            }
                            // Mixed color swatch
                            if (total > 0) {
                                var rFrac = red / total, bFrac = blue / total;
                                var mr = Math.round(rFrac * 220 + bFrac * 40);
                                var mg = Math.round(rFrac * 40 + bFrac * 80);
                                var mb = Math.round(rFrac * 60 + bFrac * 240);
                                ctx.fillStyle = 'rgb(' + mr + ',' + mg + ',' + mb + ')';
                                ctx.beginPath();
                                ctx.roundRect(200, 200, 160, 60, 12);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Mixed color', 280, 280);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A class has 15 girls and 10 boys. Write the ratio of girls to boys in simplest form.',
                    hint: 'Find the GCF of 15 and 10 (it is 5). Divide both by the GCF.',
                    solution: 'The GCF of 15 and 10 is 5. So \\(15 : 10 = 3 : 2\\). There are <strong>3 girls for every 2 boys</strong>.'
                },
                {
                    question: 'In a fruit bowl there are 6 apples and 6 oranges. What is the ratio of apples to total fruit?',
                    hint: 'Total fruit = apples + oranges. Then write apples : total.',
                    solution: 'Total = \\(6 + 6 = 12\\). Ratio = \\(6 : 12 = 1 : 2\\). Half the fruit are apples!'
                },
                {
                    question: 'Is the ratio \\(4 : 7\\) the same as \\(7 : 4\\)? Explain.',
                    hint: 'Think about what each number represents. Does order matter?',
                    solution: 'No! \\(4 : 7\\) means 4 of the first for every 7 of the second. \\(7 : 4\\) flips it. <strong>Order matters in ratios.</strong>'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Equivalent Ratios
        // ============================================================
        {
            id: 'ch08-sec02',
            title: 'Equivalent Ratios',
            content: `
                <h2>Equivalent Ratios</h2>

                <div class="env-block intuition">
                    <div class="env-title">Same Recipe, Bigger Batch</div>
                    <div class="env-body">
                        <p>If a lemonade recipe calls for 2 cups of water and 1 cup of lemon juice, you can double it to 4 cups of water and 2 cups of lemon juice. The <em>taste</em> stays the same because the <strong>ratio</strong> stays the same! These are called <strong>equivalent ratios</strong>.</p>
                    </div>
                </div>

                <p>Two ratios are <strong>equivalent</strong> if you can multiply (or divide) both parts by the same number to get from one to the other.</p>

                <div class="env-block example">
                    <div class="env-title">Building a Ratio Table</div>
                    <div class="env-body">
                        <p>Start with the ratio \\(2 : 3\\). Multiply both parts by 2, 3, 4, ...:</p>
                        <table style="margin:0 auto; border-collapse:collapse; text-align:center;">
                            <tr style="background:#1a1a40;"><th style="padding:6px 16px;border:1px solid #30363d;">x1</th><th style="padding:6px 16px;border:1px solid #30363d;">x2</th><th style="padding:6px 16px;border:1px solid #30363d;">x3</th><th style="padding:6px 16px;border:1px solid #30363d;">x4</th></tr>
                            <tr><td style="padding:6px 16px;border:1px solid #30363d;">2</td><td style="padding:6px 16px;border:1px solid #30363d;">4</td><td style="padding:6px 16px;border:1px solid #30363d;">6</td><td style="padding:6px 16px;border:1px solid #30363d;">8</td></tr>
                            <tr><td style="padding:6px 16px;border:1px solid #30363d;">3</td><td style="padding:6px 16px;border:1px solid #30363d;">6</td><td style="padding:6px 16px;border:1px solid #30363d;">9</td><td style="padding:6px 16px;border:1px solid #30363d;">12</td></tr>
                        </table>
                        <p style="margin-top:8px;">All of these are equivalent: \\(2:3 = 4:6 = 6:9 = 8:12\\).</p>
                    </div>
                </div>

                <h3>How to Check If Two Ratios Are Equivalent</h3>

                <p>Use <strong>cross-multiplication</strong>: for ratios \\(a : b\\) and \\(c : d\\), they are equivalent if \\(a \\times d = b \\times c\\).</p>

                <div class="env-block example">
                    <div class="env-title">Quick Check</div>
                    <div class="env-body">
                        <p>Are \\(3 : 4\\) and \\(9 : 12\\) equivalent?</p>
                        <p style="text-align:center;">\\(3 \\times 12 = 36\\) and \\(4 \\times 9 = 36\\)</p>
                        <p>Yes! Both cross-products equal 36, so the ratios are equivalent.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch08-ratio-table-viz"></div>
            `,
            visualizations: [
                {
                    id: 'ch08-ratio-table-viz',
                    title: 'Ratio Table with Scaling',
                    description: 'Pick a base ratio and slide the multiplier to see equivalent ratios grow!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 40, originX: 280, originY: 280});
                        var ctx = viz.ctx;
                        var a = 2, b = 3, mult = 1;

                        VizEngine.createSlider(controls, 'First', 1, 8, a, 1, function(v) { a = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Second', 1, 8, b, 1, function(v) { b = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Multiplier', 1, 6, mult, 1, function(v) { mult = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var colW = 70, rowH = 36;
                            var cols = Math.min(mult + 1, 6);
                            var tableW = cols * colW;
                            var sx = 280 - tableW / 2;
                            var sy = 30;
                            // Header
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var c = 0; c < cols; c++) {
                                var cx = sx + c * colW + colW / 2;
                                ctx.fillStyle = '#1a1a40';
                                ctx.fillRect(sx + c * colW, sy, colW, rowH);
                                ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                                ctx.strokeRect(sx + c * colW, sy, colW, rowH);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.fillText('x' + (c + 1), cx, sy + rowH / 2 + 1);
                            }
                            // Row 1 (a values)
                            for (var c1 = 0; c1 < cols; c1++) {
                                var cx1 = sx + c1 * colW + colW / 2;
                                var highlight = (c1 === mult - 1);
                                ctx.fillStyle = highlight ? '#58a6ff33' : '#0c0c20';
                                ctx.fillRect(sx + c1 * colW, sy + rowH, colW, rowH);
                                ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                                ctx.strokeRect(sx + c1 * colW, sy + rowH, colW, rowH);
                                ctx.fillStyle = highlight ? viz.colors.blue : viz.colors.white;
                                ctx.font = (highlight ? 'bold ' : '') + '15px -apple-system,sans-serif';
                                ctx.fillText('' + (a * (c1 + 1)), cx1, sy + rowH + rowH / 2 + 1);
                            }
                            // Row 2 (b values)
                            for (var c2 = 0; c2 < cols; c2++) {
                                var cx2 = sx + c2 * colW + colW / 2;
                                var hi2 = (c2 === mult - 1);
                                ctx.fillStyle = hi2 ? '#f0883e33' : '#0c0c20';
                                ctx.fillRect(sx + c2 * colW, sy + 2 * rowH, colW, rowH);
                                ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                                ctx.strokeRect(sx + c2 * colW, sy + 2 * rowH, colW, rowH);
                                ctx.fillStyle = hi2 ? viz.colors.orange : viz.colors.white;
                                ctx.font = (hi2 ? 'bold ' : '') + '15px -apple-system,sans-serif';
                                ctx.fillText('' + (b * (c2 + 1)), cx2, sy + 2 * rowH + rowH / 2 + 1);
                            }
                            // Visual bars
                            var barY = sy + 3 * rowH + 30;
                            var maxBar = Math.max(a * mult, b * mult);
                            var barScale = maxBar > 0 ? 400 / maxBar : 400;
                            var bx = 80;
                            // Top bar
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.roundRect(bx, barY, a * mult * barScale, 28, 6); ctx.fill();
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('' + (a * mult), bx + a * mult * barScale + 8, barY + 16);
                            // Bottom bar
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.roundRect(bx, barY + 40, b * mult * barScale, 28, 6); ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('' + (b * mult), bx + b * mult * barScale + 8, barY + 56);
                            // Ratio label
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillText(a + ' : ' + b + '  =  ' + (a * mult) + ' : ' + (b * mult), 280, barY + 100);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Fill in the blank: \\(3 : 5 = 12 : \\text{?}\\)',
                    hint: 'What did you multiply 3 by to get 12? Do the same to 5.',
                    solution: '\\(3 \\times 4 = 12\\), so multiply 5 by 4: \\(5 \\times 4 = 20\\). Answer: \\(3 : 5 = 12 : 20\\).'
                },
                {
                    question: 'Are \\(6 : 9\\) and \\(10 : 15\\) equivalent? Use cross-multiplication.',
                    hint: 'Check if \\(6 \\times 15\\) equals \\(9 \\times 10\\).',
                    solution: '\\(6 \\times 15 = 90\\) and \\(9 \\times 10 = 90\\). Equal! So yes, they are <strong>equivalent</strong>.'
                },
                {
                    question: 'Write three ratios equivalent to \\(4 : 7\\).',
                    hint: 'Multiply both parts by 2, then 3, then 4.',
                    solution: '\\(4 : 7 = 8 : 14 = 12 : 21 = 16 : 28\\). Any of these (and infinitely more) are correct!'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Rate & Unit Rate
        // ============================================================
        {
            id: 'ch08-sec03',
            title: 'Rate & Unit Rate',
            content: `
                <h2>Rate &amp; Unit Rate</h2>

                <div class="env-block intuition">
                    <div class="env-title">Ratios with Units</div>
                    <div class="env-body">
                        <p>A <strong>rate</strong> is a special ratio that compares two quantities with <em>different units</em>. Speed (kilometers per hour), price (dollars per kilogram), and typing speed (words per minute) are all rates. The word "per" is the key signal!</p>
                    </div>
                </div>

                <p>When one of the quantities in a rate is 1, we call it a <strong>unit rate</strong>. Unit rates make comparisons super easy.</p>

                <div class="env-block example">
                    <div class="env-title">Finding a Unit Rate</div>
                    <div class="env-body">
                        <p>A car travels 150 km in 3 hours. What is the speed?</p>
                        <p style="text-align:center;">\\(\\text{Speed} = \\dfrac{150 \\text{ km}}{3 \\text{ hours}} = 50 \\text{ km per hour}\\)</p>
                        <p>The unit rate is <strong>50 km/h</strong>. Divide the total by the number of units!</p>
                    </div>
                </div>

                <h3>Using Unit Rates to Compare</h3>

                <p>Which is a better deal?</p>
                <ul>
                    <li>Store A: 6 apples for \\$3.00</li>
                    <li>Store B: 10 apples for \\$4.50</li>
                </ul>
                <p>Find the unit price (cost per apple):</p>
                <ul>
                    <li>Store A: \\(\\$3.00 \\div 6 = \\$0.50\\) per apple</li>
                    <li>Store B: \\(\\$4.50 \\div 10 = \\$0.45\\) per apple</li>
                </ul>
                <p>Store B is cheaper per apple. Unit rates to the rescue!</p>

                <div class="viz-placeholder" data-viz="ch08-unit-price-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Pro Tip</div>
                    <div class="env-body">
                        <p>To find a unit rate, <strong>divide the first quantity by the second</strong>. The result tells you "how much per one."</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch08-unit-price-viz',
                    title: 'Unit Price Showdown',
                    description: 'Adjust quantity and price for two stores and see which has the lower unit price!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 300, scale: 40, originX: 280, originY: 270});
                        var ctx = viz.ctx;
                        var qA = 6, pA = 3.0, qB = 10, pB = 4.5;

                        VizEngine.createSlider(controls, 'Store A qty', 1, 20, qA, 1, function(v) { qA = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Store A price', 0.5, 15, pA, 0.5, function(v) { pA = v; draw(); });
                        VizEngine.createSlider(controls, 'Store B qty', 1, 20, qB, 1, function(v) { qB = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Store B price', 0.5, 15, pB, 0.5, function(v) { pB = v; draw(); });

                        function draw() {
                            viz.clear();
                            var unitA = pA / qA;
                            var unitB = pB / qB;
                            var maxUnit = Math.max(unitA, unitB, 0.01);
                            var barMax = 360;
                            // Store A
                            var barWA = (unitA / maxUnit) * barMax;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.roundRect(100, 40, barWA, 40, 8); ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Store A', 90, 62);
                            ctx.textAlign = 'left';
                            ctx.fillText('$' + unitA.toFixed(2) + ' each', 108 + barWA, 62);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText(qA + ' items for $' + pA.toFixed(2), 100, 95);
                            // Store B
                            var barWB = (unitB / maxUnit) * barMax;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.roundRect(100, 130, barWB, 40, 8); ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Store B', 90, 152);
                            ctx.textAlign = 'left';
                            ctx.fillText('$' + unitB.toFixed(2) + ' each', 108 + barWB, 152);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText(qB + ' items for $' + pB.toFixed(2), 100, 185);
                            // Winner
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            if (Math.abs(unitA - unitB) < 0.001) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('It\'s a tie!', 280, 240);
                            } else if (unitA < unitB) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('Store A wins! (cheaper per item)', 280, 240);
                            } else {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Store B wins! (cheaper per item)', 280, 240);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A printer prints 120 pages in 4 minutes. What is the unit rate in pages per minute?',
                    hint: 'Divide the total pages by the total minutes.',
                    solution: '\\(120 \\div 4 = 30\\). The printer prints <strong>30 pages per minute</strong>.'
                },
                {
                    question: 'Pack A has 8 granola bars for $6.40. Pack B has 12 bars for $8.40. Which is the better buy?',
                    hint: 'Find the price per bar for each pack by dividing price by quantity.',
                    solution: 'Pack A: \\(\\$6.40 \\div 8 = \\$0.80\\) per bar. Pack B: \\(\\$8.40 \\div 12 = \\$0.70\\) per bar. <strong>Pack B</strong> is cheaper per bar!'
                },
                {
                    question: 'A runner completes 5 km in 25 minutes. Another runner does 8 km in 36 minutes. Who is faster?',
                    hint: 'Find each runner\'s speed in km per minute (or minutes per km).',
                    solution: 'Runner 1: \\(5 \\div 25 = 0.2\\) km/min. Runner 2: \\(8 \\div 36 \\approx 0.222\\) km/min. <strong>Runner 2 is faster!</strong>'
                }
            ]
        }
    ]
});

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Decimal Operations',
    subtitle: 'Add, subtract, multiply, and divide decimals like a pro!',
    sections: [
        // ============================================================
        // SECTION 1: Adding & Subtracting Decimals
        // ============================================================
        {
            id: 'ch06-sec01',
            title: 'Adding & Subtracting Decimals',
            content: `
                <h2>Adding &amp; Subtracting Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Golden Rule</div>
                    <div class="env-body">
                        <p>Adding and subtracting decimals works just like whole numbers, with <strong>one crucial rule</strong>: line up the decimal points! When the decimal points are stacked vertically, all the place values automatically line up: ones with ones, tenths with tenths, hundredths with hundredths.</p>
                    </div>
                </div>

                <h3>Step by Step</h3>
                <ol>
                    <li>Write the numbers vertically with <strong>decimal points aligned</strong>.</li>
                    <li>Fill in any missing places with zeros (helpful placeholders!).</li>
                    <li>Add or subtract column by column, right to left, just like with whole numbers.</li>
                    <li>Bring the decimal point straight down into the answer.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example: Addition</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> \\(3.25 + 14.7\\)</p>
                        <p>Line up the decimal points:</p>
                        <p>&nbsp;&nbsp;\\(\\;3.25\\)<br>&nbsp;\\(+14.70\\)<br>&nbsp;\\(\\overline{\\;17.95}\\)</p>
                        <p>We added a trailing zero to \\(14.7\\) to make it \\(14.70\\). Same number, but now the columns line up neatly!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Subtraction</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> \\(10.0 - 3.42\\)</p>
                        <p>Line up the decimal points:</p>
                        <p>&nbsp;\\(10.00\\)<br>\\(-\\;3.42\\)<br>&nbsp;\\(\\overline{\\;6.58}\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch06-align-viz"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>The most common mistake is forgetting to line up the decimal points. If you write \\(3.25 + 14.7\\) as \\(3.25 + 147\\) (ignoring the decimal), you will get a very wrong answer!</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Calculate \\(5.38 + 2.7\\).',
                    hint: 'Write \\(2.7\\) as \\(2.70\\) so both numbers have two decimal places. Line up and add.',
                    solution: '\\(5.38 + 2.70 = 8.08\\).'
                },
                {
                    question: 'Calculate \\(20.0 - 7.65\\).',
                    hint: 'Write \\(20.0\\) as \\(20.00\\). Then subtract column by column.',
                    solution: '\\(20.00 - 7.65 = 12.35\\).'
                },
                {
                    question: 'You buy a sandwich for $4.75 and a drink for $1.50. How much change do you get from $10.00?',
                    hint: 'First add the costs: \\(4.75 + 1.50\\). Then subtract from \\(10.00\\).',
                    solution: 'Total cost: \\(4.75 + 1.50 = 6.25\\). Change: \\(10.00 - 6.25 = 3.75\\). You get $3.75 back.'
                }
            ],
            visualizations: [
                {
                    id: 'ch06-align-viz',
                    title: 'Decimal Point Alignment',
                    description: 'Watch the numbers slide into alignment! The decimal points must stack up vertically before you can add or subtract.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 360, scale: 40, originX: 40, originY: 330});
                        var num1 = 3.25, num2 = 14.7;
                        var aligned = false;

                        VizEngine.createSlider(controls, 'Number A', 0.01, 99.99, 3.25, 0.01, function(v) { num1 = Math.round(v * 100) / 100; draw(); });
                        VizEngine.createSlider(controls, 'Number B', 0.01, 99.99, 14.7, 0.01, function(v) { num2 = Math.round(v * 100) / 100; draw(); });
                        VizEngine.createButton(controls, 'Toggle Alignment', function() { aligned = !aligned; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;

                            // Format numbers
                            var s1 = num1.toFixed(2), s2 = num2.toFixed(2);
                            var sum = (num1 + num2).toFixed(2);

                            ctx.font = 'bold 28px monospace';
                            ctx.textBaseline = 'middle';

                            if (!aligned) {
                                // Unaligned: left-justified
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Not aligned (wrong!)', cx, 30);

                                ctx.font = 'bold 28px monospace';
                                ctx.textAlign = 'left';
                                var startX = 160;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText(s1, startX, 80);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('+', startX - 35, 120);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText(s2, startX, 120);

                                // Show the decimal points are NOT lined up
                                var dotPos1 = startX + ctx.measureText(s1.split('.')[0]).width + 6;
                                var dotPos2 = startX + ctx.measureText(s2.split('.')[0]).width + 6;
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath(); ctx.moveTo(dotPos1, 65); ctx.lineTo(dotPos1, 135); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(dotPos2, 65); ctx.lineTo(dotPos2, 135); ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Decimal points do not line up!', cx, 170);
                            } else {
                                // Aligned: decimal points stacked
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Aligned (correct!)', cx, 30);

                                // Right-align to decimal point
                                ctx.font = 'bold 28px monospace';
                                var dotX = cx + 10;

                                // Number 1
                                var parts1 = s1.split('.');
                                ctx.fillStyle = viz.colors.blue;
                                ctx.textAlign = 'right';
                                ctx.fillText(parts1[0], dotX, 80);
                                ctx.textAlign = 'left';
                                ctx.fillText('.' + parts1[1], dotX, 80);

                                // Plus sign
                                ctx.fillStyle = viz.colors.white;
                                ctx.textAlign = 'right';
                                ctx.fillText('+  ', dotX - ctx.measureText(parts1[0]).width - 5, 120);

                                // Number 2
                                var parts2 = s2.split('.');
                                ctx.fillStyle = viz.colors.orange;
                                ctx.textAlign = 'right';
                                ctx.fillText(parts2[0], dotX, 120);
                                ctx.textAlign = 'left';
                                ctx.fillText('.' + parts2[1], dotX, 120);

                                // Line
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(dotX - 100, 145); ctx.lineTo(dotX + 80, 145); ctx.stroke();

                                // Sum
                                var partsS = sum.split('.');
                                ctx.fillStyle = viz.colors.green;
                                ctx.textAlign = 'right';
                                ctx.fillText(partsS[0], dotX, 175);
                                ctx.textAlign = 'left';
                                ctx.fillText('.' + partsS[1], dotX, 175);

                                // Highlight aligned decimal points
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath(); ctx.moveTo(dotX + 2, 60); ctx.lineTo(dotX + 2, 195); ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('\u2190 decimal points aligned!', dotX + 60, 130);
                            }

                            // Tip at bottom
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Toggle between aligned and unaligned to see why alignment matters!', cx, viz.height - 40);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 2: Multiplying Decimals
        // ============================================================
        {
            id: 'ch06-sec02',
            title: 'Multiplying Decimals',
            content: `
                <h2>Multiplying Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">Ignore the Dot, Then Put It Back</div>
                    <div class="env-body">
                        <p>Here is the fun trick for multiplying decimals: pretend the decimal points are not there, multiply like whole numbers, then count up the total decimal places and put the point back at the end!</p>
                    </div>
                </div>

                <h3>The Method</h3>
                <ol>
                    <li>Count the total number of decimal places in both factors.</li>
                    <li>Multiply the numbers as if they were whole numbers (ignore the decimal points).</li>
                    <li>Place the decimal point in the product so it has the same total number of decimal places.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> \\(2.4 \\times 0.3\\)</p>
                        <p><strong>Step 1:</strong> Count decimal places: \\(2.4\\) has 1, \\(0.3\\) has 1. Total = 2.</p>
                        <p><strong>Step 2:</strong> Multiply as whole numbers: \\(24 \\times 3 = 72\\)</p>
                        <p><strong>Step 3:</strong> Place decimal point 2 places from the right: \\(0.72\\)</p>
                        <p><strong>Answer:</strong> \\(2.4 \\times 0.3 = 0.72\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch06-mult-area"></div>

                <h3>Why Does This Work?</h3>

                <p>Think of it this way: \\(2.4 = \\frac{24}{10}\\) and \\(0.3 = \\frac{3}{10}\\). So:</p>
                \\[2.4 \\times 0.3 = \\frac{24}{10} \\times \\frac{3}{10} = \\frac{72}{100} = 0.72\\]
                <p>Dividing by 10 once moves the decimal left by 1 place. Dividing by 100 (which is \\(10 \\times 10\\)) moves it left by 2 places. That is why we count the total decimal places!</p>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>When multiplying two decimals less than 1, the answer is <strong>smaller</strong> than either factor! For example, \\(0.5 \\times 0.4 = 0.20\\). Half of four-tenths is two-tenths. Do not panic if the product is smaller than the factors.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Calculate \\(1.5 \\times 0.4\\).',
                    hint: 'Total decimal places: 1 + 1 = 2. Multiply \\(15 \\times 4 = 60\\). Place the decimal 2 places from the right.',
                    solution: '\\(15 \\times 4 = 60\\). With 2 decimal places: \\(0.60 = 0.6\\).'
                },
                {
                    question: 'Calculate \\(3.12 \\times 2.5\\).',
                    hint: 'Total decimal places: 2 + 1 = 3. Multiply \\(312 \\times 25\\).',
                    solution: '\\(312 \\times 25 = 7800\\). With 3 decimal places: \\(7.800 = 7.8\\).'
                },
                {
                    question: 'A tile is \\(0.3\\) meters wide. You place \\(4.5\\) tiles in a row. How long is the row?',
                    hint: 'Multiply \\(0.3 \\times 4.5\\). Count decimal places: 1 + 1 = 2.',
                    solution: '\\(3 \\times 45 = 135\\). With 2 decimal places: \\(1.35\\) meters.'
                }
            ],
            visualizations: [
                {
                    id: 'ch06-mult-area',
                    title: 'Area Model for Decimal Multiplication',
                    description: 'See how \\(2.4 \\times 0.3\\) looks as an area. The rectangle\'s area is the product!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 360, scale: 40, originX: 40, originY: 330});
                        var num1 = 2.4, num2 = 0.3;

                        VizEngine.createSlider(controls, 'Factor A', 0.1, 5.0, 2.4, 0.1, function(v) { num1 = Math.round(v * 10) / 10; draw(); });
                        VizEngine.createSlider(controls, 'Factor B', 0.1, 3.0, 0.3, 0.1, function(v) { num2 = Math.round(v * 10) / 10; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var product = Math.round(num1 * num2 * 100) / 100;

                            // Grid area
                            var gridX = 100, gridY = 50;
                            var maxSize = 280;
                            var scaleF = maxSize / Math.max(num1, num2, 3);
                            var rectW = num1 * scaleF;
                            var rectH = num2 * scaleF;

                            // Background grid (1x1 units)
                            var gridMax = Math.ceil(Math.max(num1, num2, 3));
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = 0; i <= gridMax; i++) {
                                var x = gridX + i * scaleF;
                                ctx.beginPath(); ctx.moveTo(x, gridY); ctx.lineTo(x, gridY + gridMax * scaleF); ctx.stroke();
                                var y = gridY + i * scaleF;
                                ctx.beginPath(); ctx.moveTo(gridX, y); ctx.lineTo(gridX + gridMax * scaleF, y); ctx.stroke();
                            }

                            // Draw the 1x1 reference square
                            ctx.strokeStyle = viz.colors.white + '33';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(gridX, gridY, scaleF, scaleF);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('1\u00d71', gridX + scaleF / 2, gridY + scaleF / 2);

                            // Shaded product rectangle
                            ctx.fillStyle = viz.colors.teal + '44';
                            ctx.fillRect(gridX, gridY, rectW, rectH);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.strokeRect(gridX, gridY, rectW, rectH);

                            // Dimension labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(num1.toFixed(1), gridX + rectW / 2, gridY + rectH + 10);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.save();
                            ctx.translate(gridX - 14, gridY + rectH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText(num2.toFixed(1), 0, 0);
                            ctx.restore();

                            // Product label inside
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            if (rectW > 40 && rectH > 25) {
                                ctx.fillText('Area = ' + product, gridX + rectW / 2, gridY + rectH / 2);
                            }

                            // Equation
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(num1.toFixed(1) + ' \u00d7 ' + num2.toFixed(1) + ' = ' + product, viz.width / 2, gridY + Math.max(rectH, scaleF) + 60);

                            // Decimal places explanation
                            var dp1 = 1, dp2 = 1;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText(dp1 + ' decimal place + ' + dp2 + ' decimal place = ' + (dp1 + dp2) + ' decimal places in answer', viz.width / 2, gridY + Math.max(rectH, scaleF) + 88);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 3: Dividing Decimals
        // ============================================================
        {
            id: 'ch06-sec03',
            title: 'Dividing Decimals',
            content: `
                <h2>Dividing Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">Make the Divisor Whole</div>
                    <div class="env-body">
                        <p>Dividing by a decimal can seem tricky, but the secret is to <strong>move the decimal point</strong> to turn the divisor into a whole number. Multiply both the divisor and dividend by the same power of 10, and you are back on familiar ground!</p>
                    </div>
                </div>

                <h3>The Method</h3>
                <ol>
                    <li>If the divisor has a decimal, multiply both numbers by 10 (or 100, or 1000) until the divisor is a whole number.</li>
                    <li>Perform the division as you would with whole numbers.</li>
                    <li>Place the decimal point in the quotient directly above its position in the dividend.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> \\(7.56 \\div 0.3\\)</p>
                        <p><strong>Step 1:</strong> The divisor \\(0.3\\) has 1 decimal place. Multiply both by 10:</p>
                        <p>\\(7.56 \\div 0.3 = 75.6 \\div 3\\)</p>
                        <p><strong>Step 2:</strong> Divide: \\(75.6 \\div 3 = 25.2\\)</p>
                        <p><strong>Answer:</strong> \\(7.56 \\div 0.3 = 25.2\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch06-div-steps"></div>

                <h3>Why Can We Move the Decimal?</h3>
                <p>Multiplying both the top and bottom of a division by the same number does not change the answer. It is like multiplying a fraction by \\(\\frac{10}{10} = 1\\):</p>
                \\[\\frac{7.56}{0.3} = \\frac{7.56 \\times 10}{0.3 \\times 10} = \\frac{75.6}{3} = 25.2\\]

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>You must move the decimal point the <strong>same number of places</strong> in both the divisor and the dividend. If you move it in only one number, your answer will be off by a factor of 10 (or 100)!</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Calculate \\(4.8 \\div 0.6\\).',
                    hint: 'Multiply both by 10: \\(48 \\div 6\\).',
                    solution: '\\(48 \\div 6 = 8\\). So \\(4.8 \\div 0.6 = 8\\).'
                },
                {
                    question: 'Calculate \\(12.5 \\div 0.25\\).',
                    hint: 'Multiply both by 100: \\(1250 \\div 25\\).',
                    solution: '\\(1250 \\div 25 = 50\\). So \\(12.5 \\div 0.25 = 50\\).'
                },
                {
                    question: 'A rope is \\(6.3\\) meters long. You cut it into pieces that are \\(0.7\\) meters each. How many pieces do you get?',
                    hint: 'Divide: \\(6.3 \\div 0.7\\). Multiply both by 10 first.',
                    solution: '\\(63 \\div 7 = 9\\). You get 9 pieces.'
                }
            ],
            visualizations: [
                {
                    id: 'ch06-div-steps',
                    title: 'Step-by-Step Decimal Division',
                    description: 'Watch the decimal point move to make the divisor a whole number, then see the division happen!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 340, scale: 40, originX: 40, originY: 310});
                        var step = 0;

                        VizEngine.createButton(controls, 'Next Step', function() { step = (step + 1) % 4; draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { step = 0; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('Solve: 7.56 \u00f7 0.3', cx, 30);

                            // Step indicator
                            var labels = ['Original', 'Move Decimals', 'Divide', 'Answer'];
                            for (var i = 0; i < labels.length; i++) {
                                var sx = 80 + i * 130;
                                ctx.fillStyle = i <= step ? viz.colors.teal : viz.colors.text + '33';
                                ctx.beginPath(); ctx.arc(sx, 65, 14, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = i <= step ? '#0c0c20' : viz.colors.text + '33';
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.fillText(i + 1, sx, 65);
                                ctx.fillStyle = i <= step ? viz.colors.white : viz.colors.text + '33';
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText(labels[i], sx, 88);
                            }

                            var y = 130;
                            ctx.font = 'bold 24px monospace';

                            if (step >= 0) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.textAlign = 'center';
                                ctx.fillText('7.56  \u00f7  0.3', cx, y);
                            }
                            if (step >= 1) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Multiply both by 10 (move decimal 1 place right)', cx, y + 35);

                                ctx.font = 'bold 24px monospace';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('75.6', cx - 60, y + 75);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('\u00f7', cx, y + 75);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('3', cx + 50, y + 75);

                                // Arrow showing decimal movement
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(cx - 30, y + 10); ctx.lineTo(cx - 30, y + 55); ctx.stroke();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.moveTo(cx - 30, y + 58); ctx.lineTo(cx - 35, y + 50); ctx.lineTo(cx - 25, y + 50); ctx.fill();

                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('\u00d710', cx - 20, y + 45);
                            }
                            if (step >= 2) {
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Now divide: 75.6 \u00f7 3', cx, y + 115);
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('75 \u00f7 3 = 25, remainder 0.6', cx, y + 138);
                                ctx.fillText('0.6 \u00f7 3 = 0.2', cx, y + 158);
                            }
                            if (step >= 3) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('= 25.2', cx, y + 200);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 4: Estimating with Decimals
        // ============================================================
        {
            id: 'ch06-sec04',
            title: 'Estimating with Decimals',
            content: `
                <h2>Estimating with Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">Close Is Good Enough</div>
                    <div class="env-body">
                        <p>Sometimes you do not need an exact answer. At the grocery store, you might want to know roughly how much your cart costs before you get to the register. <strong>Estimation</strong> means rounding the numbers first, then doing the easier calculation. It is also a great way to <strong>check your work</strong> and catch mistakes!</p>
                    </div>
                </div>

                <h3>How to Estimate</h3>
                <ol>
                    <li><strong>Round</strong> each number to a convenient value (usually the nearest whole number).</li>
                    <li><strong>Compute</strong> using the rounded numbers.</li>
                    <li><strong>Compare</strong> your estimate to the exact answer. They should be in the same ballpark!</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Estimate:</strong> \\(4.87 + 3.14\\)</p>
                        <p>Round: \\(4.87 \\approx 5\\), \\(3.14 \\approx 3\\)</p>
                        <p>Estimate: \\(5 + 3 = 8\\)</p>
                        <p>Exact: \\(4.87 + 3.14 = 8.01\\)</p>
                        <p>Our estimate of 8 was very close!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Catching Mistakes</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> A student says \\(6.2 \\times 4.8 = 2.976\\). Is this reasonable?</p>
                        <p><strong>Estimate:</strong> \\(6 \\times 5 = 30\\)</p>
                        <p>The student's answer (2.976) is way off from 30. They probably put the decimal point in the wrong place! The correct answer is \\(29.76\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch06-estimate-compare"></div>

                <div class="env-block remark">
                    <div class="env-title">When Estimation Shines</div>
                    <div class="env-body">
                        <p>Estimation is your superpower for:</p>
                        <ul>
                            <li><strong>Shopping:</strong> "About how much will these 3 items at $4.75, $2.30, and $8.90 cost?" Round to $5, $2, $9, so about $16.</li>
                            <li><strong>Checking answers:</strong> If your calculated answer is wildly different from your estimate, double-check your work!</li>
                            <li><strong>Quick decisions:</strong> "Is this enough money?" or "Will this fit?"</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Estimation gives you a <strong>rough answer</strong>, not the exact answer. Do not use estimation when precision matters (like measuring medicine or cutting wood to exact lengths). Use it for checking and quick mental math.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Estimate \\(7.82 \\times 3.15\\) by rounding to the nearest whole number. Then find the exact answer.',
                    hint: 'Round \\(7.82 \\approx 8\\) and \\(3.15 \\approx 3\\). Estimate: \\(8 \\times 3\\).',
                    solution: 'Estimate: \\(8 \\times 3 = 24\\). Exact: \\(7.82 \\times 3.15 = 24.633\\). The estimate is very close!'
                },
                {
                    question: 'A student calculated \\(15.6 - 9.8 = 58\\). Use estimation to check if this is reasonable.',
                    hint: 'Round: \\(16 - 10 = 6\\). Is 58 close to 6?',
                    solution: 'Estimate: \\(16 - 10 = 6\\). The student\'s answer of 58 is way too big. The correct answer is \\(5.8\\) (the student probably forgot the decimal point).'
                },
                {
                    question: 'You want to buy 4 notebooks at $3.49 each. Estimate the total cost, then calculate exactly.',
                    hint: 'Round $3.49 to $3.50 (or $3). Multiply by 4.',
                    solution: 'Estimate: \\(4 \\times 3.50 = 14.00\\) (or \\(4 \\times 3 = 12\\)). Exact: \\(4 \\times 3.49 = 13.96\\).'
                }
            ],
            visualizations: [
                {
                    id: 'ch06-estimate-compare',
                    title: 'Estimation vs. Exact Answer',
                    description: 'See how the estimate compares to the exact answer. How close can you get by rounding?',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 40, originX: 40, originY: 290});
                        var num1 = 4.87, num2 = 3.14;
                        var op = 'add';

                        VizEngine.createSlider(controls, 'Number A', 0.5, 20, 4.87, 0.01, function(v) { num1 = Math.round(v * 100) / 100; draw(); });
                        VizEngine.createSlider(controls, 'Number B', 0.5, 20, 3.14, 0.01, function(v) { num2 = Math.round(v * 100) / 100; draw(); });
                        VizEngine.createButton(controls, 'Add', function() { op = 'add'; draw(); });
                        VizEngine.createButton(controls, 'Multiply', function() { op = 'mult'; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var r1 = Math.round(num1), r2 = Math.round(num2);
                            var exact, estimate, opSymbol;

                            if (op === 'add') {
                                exact = num1 + num2;
                                estimate = r1 + r2;
                                opSymbol = '+';
                            } else {
                                exact = num1 * num2;
                                estimate = r1 * r2;
                                opSymbol = '\u00d7';
                            }

                            exact = Math.round(exact * 1000) / 1000;
                            var error = Math.abs(exact - estimate);
                            var errorPct = exact !== 0 ? Math.round(error / exact * 1000) / 10 : 0;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('Comparing Estimate vs. Exact', viz.width / 2, 25);

                            var colW = 220, col1X = 90, col2X = 330;
                            // Draw column helper
                            function drawCol(cx, bg, label, expr, result) {
                                ctx.fillStyle = bg + '22'; ctx.fillRect(cx - 10, 45, colW, 120);
                                ctx.fillStyle = bg; ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText(label, cx + colW / 2 - 10, 60);
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.fillText(expr, cx + colW / 2 - 10, 90);
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.fillText('= ' + result, cx + colW / 2 - 10, 130);
                            }
                            drawCol(col1X, viz.colors.blue, 'ESTIMATE', r1 + ' ' + opSymbol + ' ' + r2, estimate);
                            drawCol(col2X, viz.colors.teal, 'EXACT', num1 + ' ' + opSymbol + ' ' + num2, exact);

                            // Comparison bar
                            var barY = 195, barH = 30;
                            var maxVal = Math.max(estimate, exact, 1);
                            var barScale = 400 / maxVal;
                            var barX = 80;

                            ctx.fillStyle = viz.colors.blue + '66';
                            ctx.fillRect(barX, barY, estimate * barScale, barH);
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.strokeRect(barX, barY, estimate * barScale, barH);

                            ctx.fillStyle = viz.colors.teal + '66';
                            ctx.fillRect(barX, barY + barH + 8, exact * barScale, barH);
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                            ctx.strokeRect(barX, barY + barH + 8, exact * barScale, barH);

                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Estimate', barX + estimate * barScale + 8, barY + barH / 2);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Exact', barX + exact * barScale + 8, barY + barH + 8 + barH / 2);

                            // Error report
                            ctx.fillStyle = error < 1 ? viz.colors.green : viz.colors.orange;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Difference: ' + error.toFixed(3) + ' (off by ' + errorPct + '%)', viz.width / 2, barY + 2 * barH + 30);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        }
    ]
});

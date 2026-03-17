window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Adding & Subtracting Fractions',
    subtitle: 'Combine and take away fractional pieces, from same-denominator sums to mixed-number word problems!',
    sections: [
        // ============================================================
        // SECTION 1: Same Denominator
        // ============================================================
        {
            id: 'ch03-sec01',
            title: 'Same Denominator',
            content: `
                <h2>Adding &amp; Subtracting: Same Denominator</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Simplest Case</div>
                    <div class="env-body">
                        <p>When fractions share the same denominator, adding and subtracting is as easy as adding or subtracting whole numbers. Just work with the numerators and keep the denominator the same!</p>
                    </div>
                </div>

                <h3>Adding</h3>
                <p style="text-align:center; font-size:1.2em; color:var(--accent-teal);">
                    \\(\\frac{a}{d} + \\frac{b}{d} = \\frac{a + b}{d}\\)
                </p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>\\(\\frac{2}{7} + \\frac{3}{7} = \\frac{2 + 3}{7} = \\frac{5}{7}\\)</p>
                        <p>Think of it as: 2 sevenths + 3 sevenths = 5 sevenths. It's like saying "2 apples + 3 apples = 5 apples."</p>
                    </div>
                </div>

                <h3>Subtracting</h3>
                <p style="text-align:center; font-size:1.2em; color:var(--accent-blue);">
                    \\(\\frac{a}{d} - \\frac{b}{d} = \\frac{a - b}{d}\\)
                </p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>\\(\\frac{5}{8} - \\frac{2}{8} = \\frac{5 - 2}{8} = \\frac{3}{8}\\)</p>
                        <p>You had 5 eighths and took away 2 eighths. You're left with 3 eighths.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="add-same-denom"></div>

                <div class="env-block remark">
                    <div class="env-title">Don't Forget to Simplify!</div>
                    <div class="env-body">
                        <p>After adding or subtracting, always check if you can simplify. For example:</p>
                        <p style="text-align:center;">\\(\\frac{3}{6} + \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}\\)</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'add-same-denom',
                    title: 'Adding & Subtracting (Same Denominator)',
                    description: 'Watch fraction bars combine when you add, or shrink when you subtract!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 320, scale: 1, originX: 0, originY: 0 });
                        var num1 = 2, num2 = 3, denom = 7;
                        var mode = 'add';

                        VizEngine.createButton(controls, 'Add', function() { mode = 'add'; draw(); });
                        VizEngine.createButton(controls, 'Subtract', function() { mode = 'sub'; draw(); });
                        VizEngine.createSlider(controls, 'Denominator', 2, 12, denom, 1, function(v) {
                            denom = Math.round(v);
                            if (num1 > denom) num1 = denom;
                            if (num2 > denom) num2 = denom;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'First (num)', 0, 12, num1, 1, function(v) {
                            num1 = Math.round(Math.min(v, denom)); draw();
                        });
                        VizEngine.createSlider(controls, 'Second (num)', 0, 12, num2, 1, function(v) {
                            num2 = Math.round(Math.min(v, denom)); draw();
                        });

                        function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var left = 60, right = viz.width - 20, totalW = right - left;
                            var barH = 38;
                            var pw = totalW / denom;

                            // First fraction
                            var y1 = 35;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(num1 + '/' + denom, left - 8, y1 + barH / 2);

                            for (var i = 0; i < denom; i++) {
                                ctx.fillStyle = (i < num1) ? viz.colors.blue + 'bb' : viz.colors.blue + '22';
                                ctx.fillRect(left + i * pw + 1, y1, pw - 2, barH);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(left + i * pw + 1, y1, pw - 2, barH);
                            }

                            // Operator
                            var opY = y1 + barH + 12;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(mode === 'add' ? '+' : '\u2212', left - 20, opY + barH / 2 + 2);

                            // Second fraction
                            var y2 = opY;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText(num2 + '/' + denom, left - 8, y2 + barH / 2);

                            for (var j = 0; j < denom; j++) {
                                ctx.fillStyle = (j < num2) ? viz.colors.orange + 'bb' : viz.colors.orange + '22';
                                ctx.fillRect(left + j * pw + 1, y2, pw - 2, barH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(left + j * pw + 1, y2, pw - 2, barH);
                            }

                            // Divider line
                            var lineY = y2 + barH + 10;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(left - 30, lineY);
                            ctx.lineTo(right, lineY);
                            ctx.stroke();

                            // Result
                            var resultNum = mode === 'add' ? num1 + num2 : num1 - num2;
                            var y3 = lineY + 10;
                            var isValid = resultNum >= 0;

                            if (isValid) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(resultNum + '/' + denom, left - 8, y3 + barH / 2);

                                for (var k = 0; k < Math.max(denom, resultNum); k++) {
                                    var inRange = k < denom;
                                    if (inRange) {
                                        ctx.fillStyle = (k < resultNum) ? viz.colors.green + 'bb' : viz.colors.green + '22';
                                        ctx.fillRect(left + k * pw + 1, y3, pw - 2, barH);
                                        ctx.strokeStyle = viz.colors.green;
                                        ctx.lineWidth = 1;
                                        ctx.strokeRect(left + k * pw + 1, y3, pw - 2, barH);
                                    }
                                }

                                // If result > denom, show overflow
                                if (resultNum > denom) {
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('= ' + Math.floor(resultNum / denom) + ' ' + (resultNum % denom) + '/' + denom + ' (more than 1 whole!)', viz.width / 2, y3 + barH + 18);
                                }

                                // Simplify check
                                var g = gcd(resultNum, denom);
                                if (g > 1 && resultNum > 0) {
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    var simY = (resultNum > denom) ? y3 + barH + 36 : y3 + barH + 18;
                                    ctx.fillText('Simplifies to ' + (resultNum / g) + '/' + (denom / g), viz.width / 2, simY);
                                }
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('Cannot subtract! ' + num1 + '/' + denom + ' is smaller than ' + num2 + '/' + denom, viz.width / 2, y3 + barH / 2);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Calculate \\(\\frac{4}{9} + \\frac{2}{9}\\).',
                    hint: 'Same denominator! Just add the numerators.',
                    solution: '\\(\\frac{4}{9} + \\frac{2}{9} = \\frac{4 + 2}{9} = \\frac{6}{9} = \\frac{2}{3}\\). Don\'t forget to simplify!'
                },
                {
                    question: 'Calculate \\(\\frac{7}{10} - \\frac{3}{10}\\).',
                    hint: 'Same denominator. Subtract the numerators.',
                    solution: '\\(\\frac{7}{10} - \\frac{3}{10} = \\frac{7 - 3}{10} = \\frac{4}{10} = \\frac{2}{5}\\).'
                },
                {
                    question: 'What is \\(\\frac{5}{8} + \\frac{5}{8}\\)? Write the answer as a mixed number.',
                    hint: 'Add the numerators first. Then convert the improper fraction.',
                    solution: '\\(\\frac{5}{8} + \\frac{5}{8} = \\frac{10}{8} = \\frac{5}{4} = 1\\frac{1}{4}\\). Wait, let us redo: \\(\\frac{10}{8}\\). Simplify: \\(\\frac{10 \\div 2}{8 \\div 2} = \\frac{5}{4} = 1\\frac{1}{4}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Different Denominators
        // ============================================================
        {
            id: 'ch03-sec02',
            title: 'Different Denominators',
            content: `
                <h2>Adding &amp; Subtracting: Different Denominators</h2>

                <p>When fractions have different denominators, you cannot add or subtract them directly. The pieces are different sizes! You need a <strong>common denominator</strong> first.</p>

                <div class="env-block intuition">
                    <div class="env-title">The Key Idea</div>
                    <div class="env-body">
                        <p>You can't add thirds and fourths directly, just like you can't add apples and oranges. But if you rewrite them as twelfths (a common denominator), then you can add!</p>
                    </div>
                </div>

                <h3>Step-by-Step Method</h3>
                <ol>
                    <li><strong>Find the LCD</strong> (Least Common Denominator): the smallest number both denominators divide into.</li>
                    <li><strong>Rewrite</strong> each fraction with the LCD as the new denominator.</li>
                    <li><strong>Add or subtract</strong> the numerators.</li>
                    <li><strong>Simplify</strong> if possible.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example: \\(\\frac{1}{3} + \\frac{1}{4}\\)</div>
                    <div class="env-body">
                        <p><strong>LCD of 3 and 4:</strong> 12</p>
                        <p style="text-align:center;">\\(\\frac{1}{3} = \\frac{4}{12}, \\quad \\frac{1}{4} = \\frac{3}{12}\\)</p>
                        <p style="text-align:center;">\\(\\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="add-diff-denom"></div>

                <div class="env-block remark">
                    <div class="env-title">Common Mistake Alert!</div>
                    <div class="env-body">
                        <p>NEVER add the denominators! \\(\\frac{1}{3} + \\frac{1}{4} \\neq \\frac{2}{7}\\). If you split a pizza into 3 big slices and take one, then split another pizza into 4 slices and take one, you do NOT end up with \\(\\frac{2}{7}\\) of anything!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'add-diff-denom',
                    title: 'Adding with Different Denominators',
                    description: 'Watch how fractions are converted to a common denominator before adding.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 380, scale: 1, originX: 0, originY: 0 });
                        var n1 = 1, d1 = 3, n2 = 1, d2 = 4;

                        VizEngine.createSlider(controls, 'A: num', 0, 8, n1, 1, function(v) { n1 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'A: den', 2, 10, d1, 1, function(v) { d1 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'B: num', 0, 8, n2, 1, function(v) { n2 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'B: den', 2, 10, d2, 1, function(v) { d2 = Math.round(v); draw(); });

                        function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
                        function lcm(a, b) { return a * b / gcd(a, b); }

                        function drawBar(ctx, x, y, w, h, num, den, color) {
                            var pw = w / den;
                            for (var i = 0; i < den; i++) {
                                ctx.fillStyle = (i < num) ? color + 'bb' : color + '22';
                                ctx.fillRect(x + i * pw + 1, y, pw - 2, h);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x + i * pw + 1, y, pw - 2, h);
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var left = 80, right = viz.width - 20, totalW = right - left;
                            var barH = 30;
                            var cd = lcm(d1, d2);
                            var cn1 = n1 * (cd / d1), cn2 = n2 * (cd / d2);
                            var resultNum = cn1 + cn2;

                            // Step 1: Original
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Step 1: Original fractions', viz.width / 2, 18);

                            var y1 = 22;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(n1 + '/' + d1, left - 8, y1 + barH / 2);
                            drawBar(ctx, left, y1, totalW, barH, n1, d1, viz.colors.blue);

                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'center';
                            ctx.fillText('+', left - 30, y1 + barH + 18);

                            var y2 = y1 + barH + 6;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'right';
                            ctx.fillText(n2 + '/' + d2, left - 8, y2 + barH / 2);
                            drawBar(ctx, left, y2, totalW, barH, n2, d2, viz.colors.orange);

                            // Step 2: Converted
                            var y3 = y2 + barH + 30;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Step 2: LCD = ' + cd, viz.width / 2, y3 - 2);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(cn1 + '/' + cd, left - 8, y3 + barH / 2);
                            drawBar(ctx, left, y3, totalW, barH, cn1, cd, viz.colors.blue);

                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'center';
                            ctx.fillText('+', left - 30, y3 + barH + 18);

                            var y4 = y3 + barH + 6;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'right';
                            ctx.fillText(cn2 + '/' + cd, left - 8, y4 + barH / 2);
                            drawBar(ctx, left, y4, totalW, barH, cn2, cd, viz.colors.orange);

                            // Step 3: Result
                            var y5 = y4 + barH + 14;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(left - 35, y5);
                            ctx.lineTo(right, y5);
                            ctx.stroke();

                            var y6 = y5 + 8;
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(resultNum + '/' + cd, left - 8, y6 + barH / 2);

                            // Draw result bar (may exceed 1 whole)
                            var pw = totalW / cd;
                            for (var k = 0; k < Math.min(resultNum, cd * 2); k++) {
                                if (k < cd) {
                                    ctx.fillStyle = (k < resultNum) ? viz.colors.green + 'bb' : viz.colors.green + '22';
                                    ctx.fillRect(left + k * pw + 1, y6, pw - 2, barH);
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(left + k * pw + 1, y6, pw - 2, barH);
                                }
                            }

                            // Simplify
                            var g = gcd(resultNum, cd);
                            var simNum = resultNum / g, simDen = cd / g;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (g > 1) {
                                ctx.fillText('= ' + simNum + '/' + simDen, viz.width / 2, y6 + barH + 16);
                            }
                            if (resultNum > cd) {
                                var whole = Math.floor(simNum / simDen);
                                var rem = simNum % simDen;
                                var mixStr = rem > 0 ? whole + ' ' + rem + '/' + simDen : '' + whole;
                                ctx.fillText('= ' + mixStr, viz.width / 2, y6 + barH + (g > 1 ? 34 : 16));
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Calculate \\(\\frac{2}{5} + \\frac{1}{3}\\).',
                    hint: 'LCD of 5 and 3 is 15.',
                    solution: '\\(\\frac{2}{5} = \\frac{6}{15}\\) and \\(\\frac{1}{3} = \\frac{5}{15}\\). So \\(\\frac{6}{15} + \\frac{5}{15} = \\frac{11}{15}\\).'
                },
                {
                    question: 'Calculate \\(\\frac{3}{4} - \\frac{1}{6}\\).',
                    hint: 'LCD of 4 and 6 is 12.',
                    solution: '\\(\\frac{3}{4} = \\frac{9}{12}\\) and \\(\\frac{1}{6} = \\frac{2}{12}\\). So \\(\\frac{9}{12} - \\frac{2}{12} = \\frac{7}{12}\\).'
                },
                {
                    question: 'Calculate \\(\\frac{5}{6} + \\frac{2}{9}\\).',
                    hint: 'LCD of 6 and 9 is 18.',
                    solution: '\\(\\frac{5}{6} = \\frac{15}{18}\\) and \\(\\frac{2}{9} = \\frac{4}{18}\\). So \\(\\frac{15}{18} + \\frac{4}{18} = \\frac{19}{18} = 1\\frac{1}{18}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Mixed Numbers
        // ============================================================
        {
            id: 'ch03-sec03',
            title: 'Mixed Numbers',
            content: `
                <h2>Adding &amp; Subtracting Mixed Numbers</h2>

                <p>Mixed numbers combine whole numbers and fractions. There are two strategies for adding and subtracting them.</p>

                <div class="env-block intuition">
                    <div class="env-title">Method 1: Add Wholes and Fractions Separately</div>
                    <div class="env-body">
                        <ol>
                            <li>Add (or subtract) the <strong>whole number parts</strong>.</li>
                            <li>Add (or subtract) the <strong>fraction parts</strong> (using a common denominator if needed).</li>
                            <li>Combine the results. If the fraction part is improper, carry over to the whole number.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: \\(2\\frac{1}{3} + 1\\frac{1}{4}\\)</div>
                    <div class="env-body">
                        <p>Whole parts: \\(2 + 1 = 3\\)</p>
                        <p>Fraction parts: \\(\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}\\)</p>
                        <p>Result: \\(3\\frac{7}{12}\\)</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Method 2: Convert to Improper Fractions</div>
                    <div class="env-body">
                        <ol>
                            <li>Convert each mixed number to an <strong>improper fraction</strong>.</li>
                            <li>Find a common denominator and add/subtract.</li>
                            <li>Convert the result back to a mixed number.</li>
                        </ol>
                        <p>This method is especially useful for subtraction, where borrowing can be tricky.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: \\(4\\frac{1}{6} - 1\\frac{3}{4}\\)</div>
                    <div class="env-body">
                        <p>Convert: \\(4\\frac{1}{6} = \\frac{25}{6}\\) and \\(1\\frac{3}{4} = \\frac{7}{4}\\)</p>
                        <p>LCD = 12: \\(\\frac{50}{12} - \\frac{21}{12} = \\frac{29}{12} = 2\\frac{5}{12}\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="mixed-number-add"></div>
            `,
            visualizations: [
                {
                    id: 'mixed-number-add',
                    title: 'Adding Mixed Numbers as Pies',
                    description: 'See whole pies and partial pies being combined!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 600, height: 300, scale: 1, originX: 0, originY: 0 });
                        var w1 = 2, n1 = 1, d1 = 3, w2 = 1, n2 = 1, d2 = 4;
                        VizEngine.createSlider(controls, 'A: whole', 0, 4, w1, 1, function(v) { w1 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'A: den', 2, 6, d1, 1, function(v) { d1 = Math.round(v); if (n1 >= d1) n1 = d1 - 1; draw(); });
                        VizEngine.createSlider(controls, 'B: whole', 0, 4, w2, 1, function(v) { w2 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'B: den', 2, 6, d2, 1, function(v) { d2 = Math.round(v); if (n2 >= d2) n2 = d2 - 1; draw(); });
                        function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
                        function lcm(a, b) { return a * b / gcd(a, b); }
                        function drawPie(ctx, cx, cy, r, shaded, total, color) {
                            for (var i = 0; i < total; i++) {
                                var sa = (i * 2 * Math.PI / total) - Math.PI / 2, ea = ((i + 1) * 2 * Math.PI / total) - Math.PI / 2;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, sa, ea); ctx.closePath();
                                ctx.fillStyle = (i < shaded) ? color + 'bb' : viz.colors.bg; ctx.fill();
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5; ctx.stroke();
                            }
                        }
                        function draw() {
                            viz.clear(); var ctx = viz.ctx, r = 28, startX = 30, rowY1 = 60;
                            ctx.fillStyle = viz.colors.blue; ctx.font = 'bold 15px -apple-system,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText(w1 + ' ' + n1 + '/' + d1, viz.width / 4, rowY1 - r - 6);
                            for (var i = 0; i < w1; i++) drawPie(ctx, startX + i * (r * 2 + 6) + r, rowY1, r, d1, d1, viz.colors.blue);
                            if (n1 > 0) drawPie(ctx, startX + w1 * (r * 2 + 6) + r, rowY1, r, n1, d1, viz.colors.blue);
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 22px -apple-system,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('+', viz.width / 2, rowY1 + r + 15);
                            var rowY2 = rowY1 + r * 2 + 40;
                            ctx.fillStyle = viz.colors.orange; ctx.font = 'bold 15px -apple-system,sans-serif'; ctx.textBaseline = 'bottom';
                            ctx.fillText(w2 + ' ' + n2 + '/' + d2, viz.width / 4, rowY2 - r - 6);
                            for (var j = 0; j < w2; j++) drawPie(ctx, startX + j * (r * 2 + 6) + r, rowY2, r, d2, d2, viz.colors.orange);
                            if (n2 > 0) drawPie(ctx, startX + w2 * (r * 2 + 6) + r, rowY2, r, n2, d2, viz.colors.orange);
                            var cd = lcm(d1, d2), totalNum = (w1 * d1 + n1) * (cd / d1) + (w2 * d2 + n2) * (cd / d2);
                            var resWhole = Math.floor(totalNum / cd), resFrac = totalNum % cd, g = gcd(resFrac, cd), sn = resFrac / g, sd = cd / g;
                            var resY = rowY2 + r + 14;
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, resY); ctx.lineTo(viz.width - 20, resY); ctx.stroke();
                            ctx.fillStyle = viz.colors.green; ctx.font = 'bold 20px -apple-system,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            var resStr = (resWhole > 0 && resFrac > 0) ? '= ' + resWhole + ' ' + sn + '/' + sd : (resFrac === 0) ? '= ' + resWhole : '= ' + sn + '/' + sd;
                            ctx.fillText(resStr, viz.width / 2, resY + 8);
                        }
                        draw(); return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Calculate \\(1\\frac{2}{5} + 2\\frac{1}{5}\\).',
                    hint: 'Same denominator! Add whole parts, then fraction parts.',
                    solution: 'Wholes: \\(1 + 2 = 3\\). Fractions: \\(\\frac{2}{5} + \\frac{1}{5} = \\frac{3}{5}\\). Answer: \\(3\\frac{3}{5}\\).'
                },
                {
                    question: 'Calculate \\(3\\frac{1}{4} - 1\\frac{3}{4}\\).',
                    hint: 'Convert to improper fractions first. \\(3\\frac{1}{4} = \\frac{13}{4}\\) and \\(1\\frac{3}{4} = \\frac{7}{4}\\).',
                    solution: '\\(\\frac{13}{4} - \\frac{7}{4} = \\frac{6}{4} = \\frac{3}{2} = 1\\frac{1}{2}\\).'
                },
                {
                    question: 'Calculate \\(2\\frac{2}{3} + 1\\frac{3}{4}\\).',
                    hint: 'Fraction parts have different denominators. LCD of 3 and 4 is 12.',
                    solution: 'Wholes: \\(2 + 1 = 3\\). Fractions: \\(\\frac{2}{3} + \\frac{3}{4} = \\frac{8}{12} + \\frac{9}{12} = \\frac{17}{12} = 1\\frac{5}{12}\\). Add the carry: \\(3 + 1\\frac{5}{12} = 4\\frac{5}{12}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Word Problems
        // ============================================================
        {
            id: 'ch03-sec04',
            title: 'Word Problems',
            content: `
                <h2>Fraction Word Problems</h2>

                <p>Fractions show up in cooking, building, measuring, and lots of everyday activities. Let's practice turning word problems into fraction equations!</p>

                <div class="env-block intuition">
                    <div class="env-title">Problem-Solving Strategy</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Read</strong> the problem carefully. What is being combined or taken away?</li>
                            <li><strong>Identify</strong> the fractions and the operation (add or subtract).</li>
                            <li><strong>Solve</strong> using the methods you have learned.</li>
                            <li><strong>Check</strong>: Does your answer make sense?</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Recipe Problem</div>
                    <div class="env-body">
                        <p>A recipe calls for \\(\\frac{2}{3}\\) cup of flour and \\(\\frac{1}{4}\\) cup of sugar. How much total dry ingredient is needed?</p>
                        <p><strong>Solution:</strong> \\(\\frac{2}{3} + \\frac{1}{4} = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}\\) cup.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Distance Problem</div>
                    <div class="env-body">
                        <p>Maria walked \\(1\\frac{3}{4}\\) km to school and \\(\\frac{1}{2}\\) km to the library after school. How far did she walk in total?</p>
                        <p><strong>Solution:</strong> \\(1\\frac{3}{4} + \\frac{1}{2} = \\frac{7}{4} + \\frac{2}{4} = \\frac{9}{4} = 2\\frac{1}{4}\\) km.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="recipe-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Remaining Amount</div>
                    <div class="env-body">
                        <p>A jar holds \\(3\\frac{1}{2}\\) liters of juice. The family drank \\(1\\frac{3}{4}\\) liters. How much is left?</p>
                        <p><strong>Solution:</strong> \\(3\\frac{1}{2} - 1\\frac{3}{4} = \\frac{7}{2} - \\frac{7}{4} = \\frac{14}{4} - \\frac{7}{4} = \\frac{7}{4} = 1\\frac{3}{4}\\) liters.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Sense Check</div>
                    <div class="env-body">
                        <p>Always ask yourself:</p>
                        <ul>
                            <li>If I <strong>added</strong>, is my answer bigger than both fractions? It should be!</li>
                            <li>If I <strong>subtracted</strong>, is my answer smaller than what I started with? It should be!</li>
                            <li>Do the units make sense? (cups, kilometers, liters, etc.)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'recipe-viz',
                    title: 'Recipe: Doubling and Halving',
                    description: 'See what happens when you double or halve recipe quantities. Adjust the scale factor!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 280, scale: 1, originX: 0, originY: 0 });
                        var scaleFactor = 1;
                        var ingredients = [
                            { name: 'Flour', n: 2, d: 3, unit: 'cup' }, { name: 'Sugar', n: 1, d: 4, unit: 'cup' },
                            { name: 'Butter', n: 1, d: 2, unit: 'cup' }, { name: 'Milk', n: 3, d: 4, unit: 'cup' }
                        ];
                        VizEngine.createButton(controls, 'Half', function() { scaleFactor = 0.5; draw(); });
                        VizEngine.createButton(controls, 'Original', function() { scaleFactor = 1; draw(); });
                        VizEngine.createButton(controls, 'Double', function() { scaleFactor = 2; draw(); });
                        VizEngine.createButton(controls, 'Triple', function() { scaleFactor = 3; draw(); });
                        function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
                        function fracStr(n, d) { var g = gcd(n, d); n /= g; d /= g; if (d === 1) return '' + n; if (n > d) { var w = Math.floor(n / d), r = n % d; return r > 0 ? w + ' ' + r + '/' + d : '' + w; } return n + '/' + d; }
                        function draw() {
                            viz.clear(); var ctx = viz.ctx, left = 30, bL = 160, bR = viz.width - 30, maxW = bR - bL;
                            var colors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];
                            var labels = ['Half', 'Original', 'Double', 'Triple'], idx = [0.5, 1, 2, 3].indexOf(scaleFactor);
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 17px -apple-system,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText((idx >= 0 ? labels[idx] : 'x' + scaleFactor) + ' Recipe', viz.width / 2, 22);
                            var maxVal = 1, barH = 28, rowH = 50, startY = 48;
                            for (var m = 0; m < ingredients.length; m++) { var v = (ingredients[m].n / ingredients[m].d) * scaleFactor; if (v > maxVal) maxVal = v; }
                            for (var i = 0; i < ingredients.length; i++) {
                                var ing = ingredients[i], newVal = (ing.n / ing.d) * scaleFactor, y = startY + i * rowH, col = colors[i];
                                var newN = Math.round(ing.n * scaleFactor * 100), newD = ing.d * 100;
                                ctx.fillStyle = col; ctx.font = 'bold 13px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                                ctx.fillText(ing.name, left, y + barH / 2);
                                var bW = (newVal / maxVal) * maxW * 0.8;
                                ctx.fillStyle = col + '88'; ctx.fillRect(bL, y, bW, barH); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.strokeRect(bL, y, bW, barH);
                                ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left';
                                ctx.fillText(fracStr(newN, newD) + ' ' + ing.unit, bL + bW + 6, y + barH / 2);
                            }
                            var tN = 0, tD = 1;
                            for (var j = 0; j < ingredients.length; j++) { var ig = ingredients[j], sn = Math.round(ig.n * scaleFactor * 100), sd = ig.d * 100; tN = tN * sd + sn * tD; tD *= sd; var tg = gcd(tN, tD); tN /= tg; tD /= tg; }
                            var tY = startY + ingredients.length * rowH + 6;
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(left, tY); ctx.lineTo(viz.width - 30, tY); ctx.stroke();
                            ctx.fillStyle = viz.colors.teal; ctx.font = 'bold 14px -apple-system,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Total: ' + fracStr(tN, tD) + ' cups', viz.width / 2, tY + 6);
                        }
                        draw(); return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Emma drank \\(\\frac{3}{8}\\) of a bottle of water in the morning and \\(\\frac{1}{4}\\) in the afternoon. How much of the bottle did she drink in total?',
                    hint: 'Convert \\(\\frac{1}{4}\\) to eighths first.',
                    solution: '\\(\\frac{1}{4} = \\frac{2}{8}\\). So \\(\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}\\). Emma drank \\(\\frac{5}{8}\\) of the bottle.'
                },
                {
                    question: 'A board is \\(5\\frac{1}{2}\\) feet long. You cut off \\(2\\frac{2}{3}\\) feet. How long is the remaining piece?',
                    hint: 'Convert to improper fractions. LCD of 2 and 3 is 6.',
                    solution: '\\(5\\frac{1}{2} = \\frac{11}{2} = \\frac{33}{6}\\) and \\(2\\frac{2}{3} = \\frac{8}{3} = \\frac{16}{6}\\). So \\(\\frac{33}{6} - \\frac{16}{6} = \\frac{17}{6} = 2\\frac{5}{6}\\) feet.'
                },
                {
                    question: 'A recipe calls for \\(\\frac{2}{3}\\) cup of flour. If you want to make \\(1\\frac{1}{2}\\) times the recipe, how much flour do you need?',
                    hint: 'Multiplying by \\(1\\frac{1}{2}\\) is like adding the original amount plus half of it: \\(\\frac{2}{3} + \\frac{1}{2} \\times \\frac{2}{3}\\). Or just compute \\(\\frac{2}{3} \\times \\frac{3}{2}\\).',
                    solution: '\\(\\frac{2}{3} \\times \\frac{3}{2} = \\frac{6}{6} = 1\\) cup. Or think of it as \\(\\frac{2}{3} + \\frac{1}{3} = 1\\) cup (the original \\(\\frac{2}{3}\\) plus half of \\(\\frac{2}{3}\\), which is \\(\\frac{1}{3}\\)).'
                }
            ]
        }
    ]
});

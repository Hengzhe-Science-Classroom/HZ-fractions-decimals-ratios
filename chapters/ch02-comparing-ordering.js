window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Comparing & Ordering',
    subtitle: 'Learn to tell which fraction is bigger and line them up from smallest to largest!',
    sections: [
        // ============================================================
        // SECTION 1: Comparing with Same Denominator
        // ============================================================
        {
            id: 'ch02-sec01',
            title: 'Comparing with Same Denominator',
            content: `
                <h2>Comparing with the Same Denominator</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Easy Case</div>
                    <div class="env-body">
                        <p>When two fractions have the <strong>same denominator</strong>, comparing them is simple: just look at the numerators! The fraction with the bigger numerator is the bigger fraction.</p>
                        <p style="text-align:center; font-size:1.1em; color:var(--accent-teal);">If the denominator is the same, <strong>bigger numerator = bigger fraction</strong>.</p>
                    </div>
                </div>

                <p>Why does this work? Both fractions have pieces of the <strong>same size</strong> (same denominator means same-sized pieces). So whoever has <strong>more pieces</strong> has more total.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Compare \\(\\frac{3}{8}\\) and \\(\\frac{5}{8}\\):</p>
                        <ul>
                            <li>Both have eighths (denominator 8).</li>
                            <li>\\(5 &gt; 3\\), so \\(\\frac{5}{8} &gt; \\frac{3}{8}\\).</li>
                        </ul>
                        <p>Five-eighths of a pizza is more than three-eighths!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="compare-same-denom"></div>

                <div class="env-block remark">
                    <div class="env-title">Symbols Recap</div>
                    <div class="env-body">
                        <ul>
                            <li>\\( &gt; \\) means "greater than" (the bigger number is on the left)</li>
                            <li>\\( &lt; \\) means "less than" (the smaller number is on the left)</li>
                            <li>\\( = \\) means "equal to"</li>
                        </ul>
                        <p>Tip: The symbol always "eats" the bigger number (think of it as a hungry alligator mouth)!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'compare-same-denom',
                    title: 'Compare Fractions (Same Denominator)',
                    description: 'Adjust the numerators and see which fraction is bigger. The denominator is the same for both.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 280, scale: 1, originX: 0, originY: 0 });
                        var denom = 8, num1 = 3, num2 = 5;

                        VizEngine.createSlider(controls, 'Denominator', 2, 12, denom, 1, function(v) {
                            denom = Math.round(v);
                            if (num1 > denom) num1 = denom;
                            if (num2 > denom) num2 = denom;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Fraction A (num)', 0, 12, num1, 1, function(v) {
                            num1 = Math.round(Math.min(v, denom)); draw();
                        });
                        VizEngine.createSlider(controls, 'Fraction B (num)', 0, 12, num2, 1, function(v) {
                            num2 = Math.round(Math.min(v, denom)); draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var left = 80, right = viz.width - 30;
                            var totalW = right - left;
                            var barH = 45;
                            var pieceW = totalW / denom;

                            // Fraction A
                            var y1 = 50;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(num1 + '/' + denom, left - 10, y1 + barH / 2);

                            for (var i = 0; i < denom; i++) {
                                var px = left + i * pieceW;
                                ctx.fillStyle = (i < num1) ? viz.colors.blue + 'bb' : viz.colors.blue + '22';
                                ctx.fillRect(px + 1, y1, pieceW - 2, barH);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(px + 1, y1, pieceW - 2, barH);
                            }

                            // Fraction B
                            var y2 = 120;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(num2 + '/' + denom, left - 10, y2 + barH / 2);

                            for (var j = 0; j < denom; j++) {
                                var px2 = left + j * pieceW;
                                ctx.fillStyle = (j < num2) ? viz.colors.orange + 'bb' : viz.colors.orange + '22';
                                ctx.fillRect(px2 + 1, y2, pieceW - 2, barH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(px2 + 1, y2, pieceW - 2, barH);
                            }

                            // Result
                            ctx.font = 'bold 26px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var symbol, resultColor;
                            if (num1 > num2) { symbol = '>'; resultColor = viz.colors.blue; }
                            else if (num1 < num2) { symbol = '<'; resultColor = viz.colors.orange; }
                            else { symbol = '='; resultColor = viz.colors.green; }

                            ctx.fillStyle = resultColor;
                            ctx.fillText(num1 + '/' + denom + '  ' + symbol + '  ' + num2 + '/' + denom, viz.width / 2, 230);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Which is greater: \\(\\frac{7}{10}\\) or \\(\\frac{4}{10}\\)?',
                    hint: 'Same denominator! Just compare the numerators.',
                    solution: '\\(\\frac{7}{10} &gt; \\frac{4}{10}\\) because \\(7 &gt; 4\\). Both fractions are tenths, but seven tenths is more than four tenths.'
                },
                {
                    question: 'Put these in order from least to greatest: \\(\\frac{2}{5}, \\frac{4}{5}, \\frac{1}{5}, \\frac{3}{5}\\).',
                    hint: 'All have denominator 5. Just sort by numerator.',
                    solution: '\\(\\frac{1}{5} &lt; \\frac{2}{5} &lt; \\frac{3}{5} &lt; \\frac{4}{5}\\). When the denominator is the same, ordering fractions is just ordering whole numbers!'
                },
                {
                    question: 'Alex ate \\(\\frac{3}{6}\\) of a cake. Ben ate \\(\\frac{5}{6}\\). Who ate more?',
                    hint: 'Same denominator (sixths). Compare 3 and 5.',
                    solution: 'Ben ate more. \\(\\frac{5}{6} &gt; \\frac{3}{6}\\) because \\(5 &gt; 3\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Comparing with Different Denominators
        // ============================================================
        {
            id: 'ch02-sec02',
            title: 'Comparing with Different Denominators',
            content: `
                <h2>Comparing with Different Denominators</h2>

                <p>What if the denominators are <strong>different</strong>? You can't just look at the numerators anymore, because the pieces are different sizes.</p>

                <div class="env-block intuition">
                    <div class="env-title">Strategy: Make the Denominators the Same!</div>
                    <div class="env-body">
                        <p>Find a <strong>common denominator</strong> (a number both denominators divide into). Then rewrite both fractions with that denominator and compare numerators.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Compare \\(\\frac{2}{3}\\) and \\(\\frac{3}{4}\\)</div>
                    <div class="env-body">
                        <p><strong>Step 1:</strong> Find a common denominator. \\(3 \\times 4 = 12\\) works!</p>
                        <p><strong>Step 2:</strong> Rewrite both fractions:</p>
                        <p style="text-align:center;">\\(\\frac{2}{3} = \\frac{2 \\times 4}{3 \\times 4} = \\frac{8}{12}\\)</p>
                        <p style="text-align:center;">\\(\\frac{3}{4} = \\frac{3 \\times 3}{4 \\times 3} = \\frac{9}{12}\\)</p>
                        <p><strong>Step 3:</strong> Compare: \\(\\frac{8}{12} &lt; \\frac{9}{12}\\), so \\(\\frac{2}{3} &lt; \\frac{3}{4}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="compare-diff-denom"></div>

                <div class="env-block remark">
                    <div class="env-title">Cross-Multiply Shortcut</div>
                    <div class="env-body">
                        <p>To compare \\(\\frac{a}{b}\\) and \\(\\frac{c}{d}\\), compute \\(a \\times d\\) and \\(b \\times c\\):</p>
                        <ul>
                            <li>If \\(a \\times d &gt; b \\times c\\), then \\(\\frac{a}{b} &gt; \\frac{c}{d}\\)</li>
                            <li>If \\(a \\times d &lt; b \\times c\\), then \\(\\frac{a}{b} &lt; \\frac{c}{d}\\)</li>
                            <li>If \\(a \\times d = b \\times c\\), then \\(\\frac{a}{b} = \\frac{c}{d}\\)</li>
                        </ul>
                        <p>Example: \\(\\frac{2}{3}\\) vs \\(\\frac{3}{4}\\): \\(2 \\times 4 = 8\\) and \\(3 \\times 3 = 9\\). Since \\(8 &lt; 9\\), \\(\\frac{2}{3} &lt; \\frac{3}{4}\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'compare-diff-denom',
                    title: 'Compare Fractions (Different Denominators)',
                    description: 'See how two fractions with different denominators are converted to a common denominator for comparison.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 360, scale: 1, originX: 0, originY: 0 });
                        var n1 = 2, d1 = 3, n2 = 3, d2 = 4;

                        VizEngine.createSlider(controls, 'A: num', 0, 10, n1, 1, function(v) { n1 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'A: den', 2, 10, d1, 1, function(v) { d1 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'B: num', 0, 10, n2, 1, function(v) { n2 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'B: den', 2, 10, d2, 1, function(v) { d2 = Math.round(v); draw(); });

                        function lcm(a, b) { function gcd(x, y) { while (y) { var t = y; y = x % y; x = t; } return x; } return a * b / gcd(a, b); }

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
                            var left = 85, right = viz.width - 20, totalW = right - left;
                            var barH = 35;
                            var commonD = lcm(d1, d2);
                            var cn1 = n1 * (commonD / d1);
                            var cn2 = n2 * (commonD / d2);

                            // Original fractions
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Original', left + totalW / 2, 20);

                            var y1 = 25;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(n1 + '/' + d1, left - 8, y1 + barH / 2);
                            drawBar(ctx, left, y1, totalW, barH, n1, d1, viz.colors.blue);

                            var y2 = y1 + barH + 8;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(n2 + '/' + d2, left - 8, y2 + barH / 2);
                            drawBar(ctx, left, y2, totalW, barH, n2, d2, viz.colors.orange);

                            // Arrow
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Convert to common denominator ' + commonD, viz.width / 2, y2 + barH + 22);
                            ctx.fillText('\u2193', viz.width / 2, y2 + barH + 37);

                            // Converted fractions
                            var y3 = y2 + barH + 48;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Common denominator', left + totalW / 2, y3 - 3);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(cn1 + '/' + commonD, left - 8, y3 + barH / 2);
                            drawBar(ctx, left, y3, totalW, barH, cn1, commonD, viz.colors.blue);

                            var y4 = y3 + barH + 8;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(cn2 + '/' + commonD, left - 8, y4 + barH / 2);
                            drawBar(ctx, left, y4, totalW, barH, cn2, commonD, viz.colors.orange);

                            // Result
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var sym, col;
                            if (cn1 > cn2) { sym = '>'; col = viz.colors.blue; }
                            else if (cn1 < cn2) { sym = '<'; col = viz.colors.orange; }
                            else { sym = '='; col = viz.colors.green; }

                            ctx.fillStyle = col;
                            ctx.fillText(n1 + '/' + d1 + '  ' + sym + '  ' + n2 + '/' + d2, viz.width / 2, y4 + barH + 30);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Which is greater: \\(\\frac{3}{5}\\) or \\(\\frac{2}{3}\\)?',
                    hint: 'Find a common denominator. Try 15 (since \\(5 \\times 3 = 15\\)).',
                    solution: '\\(\\frac{3}{5} = \\frac{9}{15}\\) and \\(\\frac{2}{3} = \\frac{10}{15}\\). Since \\(9 &lt; 10\\), we get \\(\\frac{3}{5} &lt; \\frac{2}{3}\\). Or cross-multiply: \\(3 \\times 3 = 9\\) vs \\(5 \\times 2 = 10\\). Since \\(9 &lt; 10\\), same answer.'
                },
                {
                    question: 'Compare \\(\\frac{5}{6}\\) and \\(\\frac{7}{9}\\).',
                    hint: 'Common denominator: try 18 (LCM of 6 and 9).',
                    solution: '\\(\\frac{5}{6} = \\frac{15}{18}\\) and \\(\\frac{7}{9} = \\frac{14}{18}\\). Since \\(15 &gt; 14\\), we get \\(\\frac{5}{6} &gt; \\frac{7}{9}\\).'
                },
                {
                    question: 'Sam ate \\(\\frac{2}{5}\\) of his lunch. Kim ate \\(\\frac{1}{3}\\) of her lunch (same size). Who ate more?',
                    hint: 'Common denominator of 5 and 3 is 15.',
                    solution: '\\(\\frac{2}{5} = \\frac{6}{15}\\) and \\(\\frac{1}{3} = \\frac{5}{15}\\). Since \\(6 &gt; 5\\), Sam ate more: \\(\\frac{2}{5} &gt; \\frac{1}{3}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Ordering Fractions
        // ============================================================
        {
            id: 'ch02-sec03',
            title: 'Ordering Fractions',
            content: `
                <h2>Ordering Fractions</h2>

                <p>Now let's put several fractions in order, from smallest to largest (or largest to smallest).</p>

                <div class="env-block intuition">
                    <div class="env-title">Strategy</div>
                    <div class="env-body">
                        <p>To order multiple fractions:</p>
                        <ol>
                            <li>Find a <strong>common denominator</strong> for all of them.</li>
                            <li>Rewrite each fraction with that denominator.</li>
                            <li>Order by numerator (easy!).</li>
                            <li>Write the original fractions in that order.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Order \\(\\frac{1}{2}, \\frac{2}{5}, \\frac{3}{10}\\)</div>
                    <div class="env-body">
                        <p>Common denominator: 10 (LCM of 2, 5, and 10).</p>
                        <p style="text-align:center;">\\(\\frac{1}{2} = \\frac{5}{10}, \\quad \\frac{2}{5} = \\frac{4}{10}, \\quad \\frac{3}{10} = \\frac{3}{10}\\)</p>
                        <p>Now compare numerators: \\(3 &lt; 4 &lt; 5\\), so:</p>
                        <p style="text-align:center; color:var(--accent-teal);">\\(\\frac{3}{10} &lt; \\frac{2}{5} &lt; \\frac{1}{2}\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="order-number-line"></div>

                <div class="env-block remark">
                    <div class="env-title">Benchmark Fractions</div>
                    <div class="env-body">
                        <p>Sometimes you can order fractions quickly by comparing to <strong>benchmarks</strong> like 0, \\(\\frac{1}{2}\\), and 1:</p>
                        <ul>
                            <li>\\(\\frac{1}{8}\\) is close to 0</li>
                            <li>\\(\\frac{3}{7}\\) is a little less than \\(\\frac{1}{2}\\)</li>
                            <li>\\(\\frac{5}{6}\\) is close to 1</li>
                        </ul>
                        <p>So \\(\\frac{1}{8} &lt; \\frac{3}{7} &lt; \\frac{5}{6}\\), without finding a common denominator!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'order-number-line',
                    title: 'Place Fractions on the Number Line',
                    description: 'See where each fraction falls on the number line from 0 to 1. Drag them to rearrange!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 600, height: 240, scale: 1, originX: 0, originY: 0 });
                        var fractions = [
                            { n: 1, d: 2, color: viz.colors.blue },
                            { n: 2, d: 5, color: viz.colors.orange },
                            { n: 3, d: 10, color: viz.colors.green },
                            { n: 3, d: 4, color: viz.colors.purple }
                        ];

                        VizEngine.createButton(controls, 'Set 1: 1/2, 2/5, 3/10, 3/4', function() {
                            fractions = [
                                { n: 1, d: 2, color: viz.colors.blue },
                                { n: 2, d: 5, color: viz.colors.orange },
                                { n: 3, d: 10, color: viz.colors.green },
                                { n: 3, d: 4, color: viz.colors.purple }
                            ];
                            draw();
                        });
                        VizEngine.createButton(controls, 'Set 2: 1/3, 5/6, 1/4, 2/3', function() {
                            fractions = [
                                { n: 1, d: 3, color: viz.colors.blue },
                                { n: 5, d: 6, color: viz.colors.orange },
                                { n: 1, d: 4, color: viz.colors.green },
                                { n: 2, d: 3, color: viz.colors.purple }
                            ];
                            draw();
                        });
                        VizEngine.createButton(controls, 'Set 3: 7/8, 1/6, 1/2, 5/12', function() {
                            fractions = [
                                { n: 7, d: 8, color: viz.colors.blue },
                                { n: 1, d: 6, color: viz.colors.orange },
                                { n: 1, d: 2, color: viz.colors.green },
                                { n: 5, d: 12, color: viz.colors.purple }
                            ];
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var left = 60, right = viz.width - 30;
                            var totalW = right - left;
                            var lineY = 100;

                            // Draw number line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(left, lineY);
                            ctx.lineTo(right, lineY);
                            ctx.stroke();

                            // Endpoints
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('0', left, lineY + 12);
                            ctx.fillText('1', right, lineY + 12);

                            // 1/2 benchmark
                            var halfX = left + totalW / 2;
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            ctx.moveTo(halfX, lineY - 60);
                            ctx.lineTo(halfX, lineY + 10);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('1/2', halfX, lineY + 12);

                            // Sort fractions by value for display
                            var sorted = fractions.slice().sort(function(a, b) { return (a.n / a.d) - (b.n / b.d); });

                            // Place each fraction
                            for (var i = 0; i < fractions.length; i++) {
                                var f = fractions[i];
                                var val = f.n / f.d;
                                var fx = left + val * totalW;

                                // Vertical line
                                ctx.strokeStyle = f.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(fx, lineY - 8);
                                ctx.lineTo(fx, lineY + 8);
                                ctx.stroke();

                                // Dot
                                ctx.fillStyle = f.color;
                                ctx.beginPath();
                                ctx.arc(fx, lineY, 6, 0, Math.PI * 2);
                                ctx.fill();

                                // Label above
                                ctx.fillStyle = f.color;
                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(f.n + '/' + f.d, fx, lineY - 15 - i * 18);
                            }

                            // Display sorted order at bottom
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var orderStr = 'Order: ';
                            for (var j = 0; j < sorted.length; j++) {
                                if (j > 0) orderStr += ' < ';
                                orderStr += sorted[j].n + '/' + sorted[j].d;
                            }
                            ctx.fillText(orderStr, viz.width / 2, 180);

                            // Decimal values
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            var decStr = 'Decimals: ';
                            for (var k = 0; k < sorted.length; k++) {
                                if (k > 0) decStr += ' < ';
                                decStr += (sorted[k].n / sorted[k].d).toFixed(3);
                            }
                            ctx.fillText(decStr, viz.width / 2, 205);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Order from least to greatest: \\(\\frac{3}{4}, \\frac{2}{3}, \\frac{5}{6}\\).',
                    hint: 'Common denominator: 12. Convert all three.',
                    solution: '\\(\\frac{3}{4} = \\frac{9}{12}\\), \\(\\frac{2}{3} = \\frac{8}{12}\\), \\(\\frac{5}{6} = \\frac{10}{12}\\). Order: \\(\\frac{8}{12} &lt; \\frac{9}{12} &lt; \\frac{10}{12}\\), so \\(\\frac{2}{3} &lt; \\frac{3}{4} &lt; \\frac{5}{6}\\).'
                },
                {
                    question: 'Using benchmark fractions, quickly decide: Is \\(\\frac{4}{9}\\) closer to 0, \\(\\frac{1}{2}\\), or 1?',
                    hint: '\\(\\frac{1}{2} = \\frac{4.5}{9}\\). How does \\(\\frac{4}{9}\\) compare to that?',
                    solution: '\\(\\frac{4}{9} \\approx 0.444\\), which is just below \\(\\frac{1}{2} = 0.5\\). So \\(\\frac{4}{9}\\) is closest to \\(\\frac{1}{2}\\) (slightly less).'
                },
                {
                    question: 'Order from greatest to least: \\(\\frac{1}{2}, \\frac{3}{8}, \\frac{5}{12}, \\frac{7}{24}\\).',
                    hint: 'The LCM of 2, 8, 12, and 24 is 24.',
                    solution: 'Convert: \\(\\frac{1}{2} = \\frac{12}{24}\\), \\(\\frac{3}{8} = \\frac{9}{24}\\), \\(\\frac{5}{12} = \\frac{10}{24}\\), \\(\\frac{7}{24} = \\frac{7}{24}\\). Numerators: 12, 9, 10, 7. Greatest to least: \\(\\frac{1}{2} &gt; \\frac{5}{12} &gt; \\frac{3}{8} &gt; \\frac{7}{24}\\).'
                }
            ]
        }
    ]
});

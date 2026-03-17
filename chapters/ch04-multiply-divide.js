window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Multiplying & Dividing Fractions',
    subtitle: 'Discover how to multiply pieces together and split them apart!',
    sections: [
        // ============================================================
        // SECTION 1: Multiplying Fractions
        // ============================================================
        {
            id: 'ch04-sec01',
            title: 'Multiplying Fractions',
            content: `
                <h2>Multiplying Fractions</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Idea</div>
                    <div class="env-body">
                        <p>What does it mean to take <strong>half of a half</strong>? If you eat half a pizza, then your friend eats half of what is left, how much pizza did your friend get? Multiplying fractions answers questions like these. The amazing news: the rule is simpler than adding fractions!</p>
                    </div>
                </div>

                <h3>The Rule: Top times Top, Bottom times Bottom</h3>

                <p>To multiply two fractions, multiply the numerators together and multiply the denominators together:</p>

                \\[
                \\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}
                \\]

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> What is \\(\\frac{2}{3} \\times \\frac{3}{4}\\)?</p>
                        <p><strong>Step 1:</strong> Multiply numerators: \\(2 \\times 3 = 6\\)</p>
                        <p><strong>Step 2:</strong> Multiply denominators: \\(3 \\times 4 = 12\\)</p>
                        <p><strong>Step 3:</strong> Result: \\(\\frac{6}{12}\\)</p>
                        <p><strong>Step 4:</strong> Simplify: \\(\\frac{6}{12} = \\frac{1}{2}\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-area-model"></div>

                <h3>Why Does This Work?</h3>

                <p>Think of \\(\\frac{2}{3} \\times \\frac{3}{4}\\) as "two-thirds <em>of</em> three-quarters." If you shade \\(\\frac{3}{4}\\) of a rectangle one way and \\(\\frac{2}{3}\\) the other way, the overlap is the answer. The visualization above lets you see this in action!</p>

                <div class="env-block remark">
                    <div class="env-title">Pro Tip: Cross-Cancel First!</div>
                    <div class="env-body">
                        <p>Before multiplying, check if you can cancel common factors between any numerator and any denominator. In \\(\\frac{2}{3} \\times \\frac{3}{4}\\), the 3 on top and the 3 on the bottom cancel, giving \\(\\frac{2}{1} \\times \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}\\). This keeps the numbers small and makes simplifying easier!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>When you multiply a fraction by another proper fraction (less than 1), the answer gets <strong>smaller</strong>, not bigger! Half of a half is a quarter. This is the opposite of multiplying whole numbers, where the answer always gets bigger.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Calculate \\(\\frac{1}{2} \\times \\frac{1}{3}\\). Simplify if possible.',
                    hint: 'Multiply numerators: \\(1 \\times 1\\). Multiply denominators: \\(2 \\times 3\\).',
                    solution: '\\(\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1 \\times 1}{2 \\times 3} = \\frac{1}{6}\\). Already simplified!'
                },
                {
                    question: 'Calculate \\(\\frac{3}{5} \\times \\frac{2}{7}\\).',
                    hint: 'Numerators: \\(3 \\times 2 = 6\\). Denominators: \\(5 \\times 7 = 35\\).',
                    solution: '\\(\\frac{3}{5} \\times \\frac{2}{7} = \\frac{6}{35}\\). No common factors, so it is already simplified.'
                },
                {
                    question: 'A recipe calls for \\(\\frac{3}{4}\\) cup of sugar, but you want to make only \\(\\frac{1}{2}\\) of the recipe. How much sugar do you need?',
                    hint: 'You need \\(\\frac{1}{2}\\) of \\(\\frac{3}{4}\\), which means \\(\\frac{1}{2} \\times \\frac{3}{4}\\).',
                    solution: '\\(\\frac{1}{2} \\times \\frac{3}{4} = \\frac{3}{8}\\) cup of sugar.'
                }
            ],
            visualizations: [
                {
                    id: 'ch04-area-model',
                    title: 'Area Model: Fraction x Fraction',
                    description: 'Change the fractions with the sliders. The blue shading shows the first fraction, the orange shading shows the second, and the overlap (purple) shows the product!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40, originX: 60, originY: 370});
                        let num1 = 2, den1 = 3, num2 = 3, den2 = 4;

                        VizEngine.createSlider(controls, 'Numerator A', 1, 6, num1, 1, v => { num1 = Math.min(Math.round(v), den1); draw(); });
                        VizEngine.createSlider(controls, 'Denom A', 1, 8, den1, 1, v => { den1 = Math.round(v); num1 = Math.min(num1, den1); draw(); });
                        VizEngine.createSlider(controls, 'Numerator B', 1, 6, num2, 1, v => { num2 = Math.min(Math.round(v), den2); draw(); });
                        VizEngine.createSlider(controls, 'Denom B', 1, 8, den2, 1, v => { den2 = Math.round(v); num2 = Math.min(num2, den2); draw(); });

                        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var sx = 60, sy = 40, sw = 380, sh = 280;

                            // Grid lines for fraction A (horizontal splits)
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            for (var i = 0; i <= den1; i++) {
                                var y = sy + (sh / den1) * i;
                                ctx.beginPath(); ctx.moveTo(sx, y); ctx.lineTo(sx + sw, y); ctx.stroke();
                            }
                            // Grid lines for fraction B (vertical splits)
                            for (var j = 0; j <= den2; j++) {
                                var x = sx + (sw / den2) * j;
                                ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(x, sy + sh); ctx.stroke();
                            }

                            // Shade fraction A rows (blue, horizontal)
                            for (var i = 0; i < num1; i++) {
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.fillRect(sx, sy + (sh / den1) * i, sw, sh / den1);
                            }
                            // Shade fraction B columns (orange, vertical)
                            for (var j = 0; j < num2; j++) {
                                ctx.fillStyle = viz.colors.orange + '33';
                                ctx.fillRect(sx + (sw / den2) * j, sy, sw / den2, sh);
                            }
                            // Overlap region (purple)
                            for (var i = 0; i < num1; i++) {
                                for (var j = 0; j < num2; j++) {
                                    ctx.fillStyle = viz.colors.purple + '66';
                                    ctx.fillRect(sx + (sw / den2) * j, sy + (sh / den1) * i, sw / den2, sh / den1);
                                }
                            }

                            // Outer border
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(sx, sy, sw, sh);

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText(num1 + '/' + den1, sx - 10, sy + (sh * num1 / den1) / 2);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(num2 + '/' + den2, sx + (sw * num2 / den2) / 2, sy + sh + 8);

                            // Result
                            var prodNum = num1 * num2;
                            var prodDen = den1 * den2;
                            var g = gcd(prodNum, prodDen);
                            var simpNum = prodNum / g, simpDen = prodDen / g;
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var resultStr = num1 + '/' + den1 + ' \u00d7 ' + num2 + '/' + den2 + ' = ' + prodNum + '/' + prodDen;
                            if (g > 1) resultStr += ' = ' + simpNum + '/' + simpDen;
                            ctx.fillText(resultStr, sx + sw / 2, sy + sh + 40);

                            // Piece count label
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Purple overlap: ' + prodNum + ' out of ' + prodDen + ' pieces', sx + sw / 2, sy + sh + 62);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 2: Multiplying Mixed Numbers
        // ============================================================
        {
            id: 'ch04-sec02',
            title: 'Multiplying Mixed Numbers',
            content: `
                <h2>Multiplying Mixed Numbers</h2>

                <div class="env-block intuition">
                    <div class="env-title">When Wholes Meet Fractions</div>
                    <div class="env-body">
                        <p>A mixed number like \\(2\\frac{1}{3}\\) means "2 whole ones and a third." How do you multiply mixed numbers? The trick is to convert them to <strong>improper fractions</strong> first, then use the rule you already know!</p>
                    </div>
                </div>

                <h3>The Three-Step Process</h3>

                <ol>
                    <li><strong>Convert</strong> each mixed number to an improper fraction.</li>
                    <li><strong>Multiply</strong> using top-times-top, bottom-times-bottom.</li>
                    <li><strong>Simplify</strong> and convert back to a mixed number if needed.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> Calculate \\(1\\frac{1}{2} \\times 2\\frac{2}{3}\\).</p>
                        <p><strong>Step 1 (Convert):</strong></p>
                        <ul>
                            <li>\\(1\\frac{1}{2} = \\frac{1 \\times 2 + 1}{2} = \\frac{3}{2}\\)</li>
                            <li>\\(2\\frac{2}{3} = \\frac{2 \\times 3 + 2}{3} = \\frac{8}{3}\\)</li>
                        </ul>
                        <p><strong>Step 2 (Multiply):</strong> \\(\\frac{3}{2} \\times \\frac{8}{3} = \\frac{24}{6}\\)</p>
                        <p><strong>Step 3 (Simplify):</strong> \\(\\frac{24}{6} = 4\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-mixed-mult"></div>

                <div class="env-block remark">
                    <div class="env-title">Why Not Just Multiply the Whole Parts?</div>
                    <div class="env-body">
                        <p>A common mistake is to multiply whole parts and fraction parts separately: \\(1 \\times 2 = 2\\) and \\(\\frac{1}{2} \\times \\frac{2}{3} = \\frac{2}{6}\\), giving \\(2\\frac{2}{6}\\). But the correct answer is 4! You <strong>must</strong> convert to improper fractions first. The whole parts and fraction parts interact with each other.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Always convert mixed numbers to improper fractions before multiplying. Multiplying the whole numbers and fractions separately gives the <strong>wrong answer</strong> because you miss the cross terms.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Calculate \\(1\\frac{1}{3} \\times 2\\frac{1}{4}\\).',
                    hint: 'Convert first: \\(1\\frac{1}{3} = \\frac{4}{3}\\) and \\(2\\frac{1}{4} = \\frac{9}{4}\\). Then multiply.',
                    solution: '\\(\\frac{4}{3} \\times \\frac{9}{4} = \\frac{36}{12} = 3\\).'
                },
                {
                    question: 'A garden bed is \\(3\\frac{1}{2}\\) meters long and \\(1\\frac{1}{3}\\) meters wide. What is its area?',
                    hint: 'Convert: \\(3\\frac{1}{2} = \\frac{7}{2}\\) and \\(1\\frac{1}{3} = \\frac{4}{3}\\).',
                    solution: '\\(\\frac{7}{2} \\times \\frac{4}{3} = \\frac{28}{6} = \\frac{14}{3} = 4\\frac{2}{3}\\) square meters.'
                },
                {
                    question: 'Calculate \\(2\\frac{1}{5} \\times 1\\frac{2}{3}\\).',
                    hint: 'Convert: \\(2\\frac{1}{5} = \\frac{11}{5}\\) and \\(1\\frac{2}{3} = \\frac{5}{3}\\).',
                    solution: '\\(\\frac{11}{5} \\times \\frac{5}{3} = \\frac{55}{15} = \\frac{11}{3} = 3\\frac{2}{3}\\).'
                }
            ],
            visualizations: [
                {
                    id: 'ch04-mixed-mult',
                    title: 'Step-by-Step Mixed Number Multiplication',
                    description: 'Watch each step of the conversion and multiplication process. Press Next Step to advance!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 360, scale: 40, originX: 40, originY: 330});
                        var step = 0;
                        var maxStep = 4;

                        VizEngine.createButton(controls, 'Next Step', function() { step = (step + 1) % (maxStep + 1); draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { step = 0; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, baseY = 50;
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillText('Multiply: 1 1/2  \u00d7  2 2/3', cx, baseY);

                            ctx.font = '15px -apple-system,sans-serif';

                            // Step indicators
                            var steps = ['Original', 'Convert', 'Multiply', 'Calculate', 'Simplify'];
                            for (var i = 0; i < steps.length; i++) {
                                var sx = 60 + i * 115;
                                ctx.fillStyle = i <= step ? viz.colors.teal : viz.colors.text + '44';
                                ctx.beginPath();
                                ctx.arc(sx, baseY + 50, 14, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = i <= step ? '#0c0c20' : viz.colors.text + '44';
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.fillText(i + 1, sx, baseY + 50);
                                ctx.fillStyle = i <= step ? viz.colors.white : viz.colors.text + '44';
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText(steps[i], sx, baseY + 74);
                            }

                            var contentY = baseY + 120;
                            ctx.font = 'bold 22px -apple-system,sans-serif';

                            if (step >= 0) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('1 1/2', cx - 80, contentY);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('\u00d7', cx, contentY);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('2 2/3', cx + 80, contentY);
                            }
                            if (step >= 1) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('(1\u00d72 + 1) / 2', cx - 80, contentY + 35);
                                ctx.fillText('(2\u00d73 + 2) / 3', cx + 80, contentY + 35);
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('3/2', cx - 80, contentY + 65);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('\u00d7', cx, contentY + 65);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('8/3', cx + 80, contentY + 65);
                            }
                            if (step >= 2) {
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.fillText('(3\u00d78) / (2\u00d73)', cx, contentY + 110);
                            }
                            if (step >= 3) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.fillText('= 24/6', cx, contentY + 150);
                            }
                            if (step >= 4) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 26px -apple-system,sans-serif';
                                ctx.fillText('= 4', cx, contentY + 190);
                                ctx.fillStyle = viz.colors.teal + '88';
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('24 \u00f7 6 = 4 (a whole number!)', cx, contentY + 218);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 3: Dividing Fractions
        // ============================================================
        {
            id: 'ch04-sec03',
            title: 'Dividing Fractions',
            content: `
                <h2>Dividing Fractions</h2>

                <div class="env-block intuition">
                    <div class="env-title">How Many Times Does It Fit?</div>
                    <div class="env-body">
                        <p>Dividing by a fraction answers the question: "How many pieces of this size fit into that amount?" For example, \\(2 \\div \\frac{1}{3}\\) asks "How many thirds fit into 2 wholes?" The answer is 6, because each whole has 3 thirds, and \\(2 \\times 3 = 6\\).</p>
                    </div>
                </div>

                <h3>The Rule: Keep, Change, Flip!</h3>

                <p>To divide by a fraction, you <strong>keep</strong> the first fraction, <strong>change</strong> the division sign to multiplication, and <strong>flip</strong> (invert) the second fraction:</p>

                \\[
                \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}
                \\]

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> What is \\(\\frac{3}{4} \\div \\frac{1}{2}\\)?</p>
                        <p><strong>Step 1 (Keep):</strong> Keep \\(\\frac{3}{4}\\)</p>
                        <p><strong>Step 2 (Change):</strong> Change \\(\\div\\) to \\(\\times\\)</p>
                        <p><strong>Step 3 (Flip):</strong> Flip \\(\\frac{1}{2}\\) to get \\(\\frac{2}{1}\\)</p>
                        <p><strong>Step 4:</strong> Multiply: \\(\\frac{3}{4} \\times \\frac{2}{1} = \\frac{6}{4} = \\frac{3}{2} = 1\\frac{1}{2}\\)</p>
                    </div>
                </div>

                <p>This makes sense! How many halves fit into three-quarters? One and a half halves.</p>

                <div class="viz-placeholder" data-viz="ch04-div-fit"></div>

                <h3>Why Does "Keep, Change, Flip" Work?</h3>

                <p>Dividing by a number is the same as multiplying by its <strong>reciprocal</strong>. The reciprocal of \\(\\frac{1}{3}\\) is \\(\\frac{3}{1} = 3\\), and the reciprocal of \\(\\frac{2}{5}\\) is \\(\\frac{5}{2}\\). You just flip the fraction upside down!</p>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>When you divide by a fraction that is less than 1, the answer is <strong>bigger</strong> than what you started with. That seems strange at first, but it makes sense: if each piece is tiny, then lots of pieces fit into a given amount!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Only flip the <strong>second</strong> fraction (the one you are dividing by). A common mistake is to flip both fractions or to flip the wrong one.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Calculate \\(\\frac{2}{3} \\div \\frac{1}{4}\\).',
                    hint: 'Keep \\(\\frac{2}{3}\\), change to multiplication, flip \\(\\frac{1}{4}\\) to \\(\\frac{4}{1}\\).',
                    solution: '\\(\\frac{2}{3} \\div \\frac{1}{4} = \\frac{2}{3} \\times \\frac{4}{1} = \\frac{8}{3} = 2\\frac{2}{3}\\).'
                },
                {
                    question: 'How many \\(\\frac{1}{3}\\)-cup servings are in \\(2\\) cups of juice?',
                    hint: 'This is \\(2 \\div \\frac{1}{3}\\). Write 2 as \\(\\frac{2}{1}\\) and flip \\(\\frac{1}{3}\\).',
                    solution: '\\(\\frac{2}{1} \\div \\frac{1}{3} = \\frac{2}{1} \\times \\frac{3}{1} = \\frac{6}{1} = 6\\) servings.'
                },
                {
                    question: 'Calculate \\(\\frac{5}{6} \\div \\frac{2}{3}\\). Simplify your answer.',
                    hint: 'Keep \\(\\frac{5}{6}\\), change to multiplication, flip \\(\\frac{2}{3}\\) to \\(\\frac{3}{2}\\).',
                    solution: '\\(\\frac{5}{6} \\times \\frac{3}{2} = \\frac{15}{12} = \\frac{5}{4} = 1\\frac{1}{4}\\).'
                }
            ],
            visualizations: [
                {
                    id: 'ch04-div-fit',
                    title: 'How Many Pieces Fit?',
                    description: 'See how many times the small fraction (orange) fits into the large amount (blue). Drag the sliders to explore!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 340, scale: 40, originX: 40, originY: 310});
                        var wholes = 2, divNum = 1, divDen = 3;

                        VizEngine.createSlider(controls, 'Wholes', 1, 4, wholes, 1, function(v) { wholes = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Piece num', 1, 5, divNum, 1, function(v) { divNum = Math.min(Math.round(v), divDen); draw(); });
                        VizEngine.createSlider(controls, 'Piece den', 2, 8, divDen, 1, function(v) { divDen = Math.round(v); divNum = Math.min(divNum, divDen); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var barX = 40, barY = 50, barW = 480, barH = 50;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('How many ' + divNum + '/' + divDen + ' pieces fit into ' + wholes + '?', viz.width / 2, 28);

                            // Draw the whole amount bar
                            ctx.fillStyle = viz.colors.blue + '44';
                            ctx.fillRect(barX, barY, barW, barH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(barX, barY, barW, barH);

                            // Label the wholes
                            var unitW = barW / wholes;
                            for (var i = 0; i < wholes; i++) {
                                if (i > 0) {
                                    ctx.strokeStyle = viz.colors.white + '88';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath(); ctx.moveTo(barX + i * unitW, barY); ctx.lineTo(barX + i * unitW, barY + barH); ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(i + 1, barX + (i + 0.5) * unitW, barY + barH + 16);
                            }

                            // Draw the pieces below
                            var pieceY = barY + barH + 45;
                            var pieceFraction = divNum / divDen;
                            var pieceW = barW * pieceFraction / wholes;
                            var totalPieces = wholes / pieceFraction;
                            var fullPieces = Math.floor(totalPieces);
                            var partialPiece = totalPieces - fullPieces;
                            var colors = [viz.colors.orange, viz.colors.teal, viz.colors.green, viz.colors.purple, viz.colors.pink, viz.colors.yellow];

                            for (var i = 0; i < Math.min(fullPieces, 30); i++) {
                                var px = barX + i * pieceW;
                                ctx.fillStyle = colors[i % colors.length] + '55';
                                ctx.fillRect(px, pieceY, pieceW - 2, 40);
                                ctx.strokeStyle = colors[i % colors.length];
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(px, pieceY, pieceW - 2, 40);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                if (pieceW > 18) ctx.fillText(i + 1, px + pieceW / 2 - 1, pieceY + 20);
                            }
                            // Partial piece
                            if (partialPiece > 0.01 && fullPieces < 30) {
                                var px = barX + fullPieces * pieceW;
                                var partW = pieceW * partialPiece;
                                ctx.fillStyle = viz.colors.red + '44';
                                ctx.fillRect(px, pieceY, partW - 1, 40);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.strokeRect(px, pieceY, partW - 1, 40);
                                ctx.setLineDash([]);
                            }

                            // Answer
                            var ans = wholes * divDen / divNum;
                            var ansWhole = Math.floor(ans);
                            var ansRem = wholes * divDen - ansWhole * divNum;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var ansStr = wholes + ' \u00f7 ' + divNum + '/' + divDen + ' = ';
                            if (ansRem === 0) {
                                ansStr += ans;
                            } else {
                                ansStr += (wholes * divDen) + '/' + divNum;
                            }
                            ctx.fillText(ansStr, viz.width / 2, pieceY + 75);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText(fullPieces + ' full piece' + (fullPieces !== 1 ? 's' : '') + (partialPiece > 0.01 ? ' + a partial piece' : ''), viz.width / 2, pieceY + 100);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 4: Word Problems
        // ============================================================
        {
            id: 'ch04-sec04',
            title: 'Word Problems',
            content: `
                <h2>Word Problems with Fraction Multiplication &amp; Division</h2>

                <div class="env-block intuition">
                    <div class="env-title">Fractions in the Real World</div>
                    <div class="env-body">
                        <p>Fractions are everywhere: cooking recipes, sharing food, measuring distances, and telling time. In this section, you will learn to recognize when a word problem needs multiplication or division, then solve it step by step.</p>
                    </div>
                </div>

                <h3>When to Multiply vs. When to Divide</h3>

                <ul>
                    <li><strong>Multiply</strong> when you want a <em>fraction of</em> something. Key words: "of," "times," "each," "per."</li>
                    <li><strong>Divide</strong> when you want to know <em>how many pieces fit</em> or <em>how to split</em> something. Key words: "how many," "split," "share," "per serving."</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example: Multiplication</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> A pizza has 8 slices. You eat \\(\\frac{3}{4}\\) of it. How many slices did you eat?</p>
                        <p><strong>Translation:</strong> \\(\\frac{3}{4}\\) <em>of</em> 8 means \\(\\frac{3}{4} \\times 8\\)</p>
                        <p><strong>Solve:</strong> \\(\\frac{3}{4} \\times \\frac{8}{1} = \\frac{24}{4} = 6\\) slices</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Division</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> You have \\(3\\) cups of flour. Each batch of cookies needs \\(\\frac{3}{4}\\) cup. How many batches can you make?</p>
                        <p><strong>Translation:</strong> \\(3 \\div \\frac{3}{4}\\)</p>
                        <p><strong>Solve:</strong> \\(3 \\div \\frac{3}{4} = 3 \\times \\frac{4}{3} = \\frac{12}{3} = 4\\) batches</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-pizza-share"></div>

                <div class="env-block remark">
                    <div class="env-title">Strategy</div>
                    <div class="env-body">
                        <p>When you read a word problem, look for the keyword <strong>"of."</strong> In math, "of" almost always means <strong>multiply</strong>. "Half of 10" means \\(\\frac{1}{2} \\times 10 = 5\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Always read the problem carefully. "How many \\(\\frac{1}{4}\\)-pizzas can you make from 3 pizzas?" is division (\\(3 \\div \\frac{1}{4} = 12\\)). But "What is \\(\\frac{1}{4}\\) of 3 pizzas?" is multiplication (\\(\\frac{1}{4} \\times 3 = \\frac{3}{4}\\)).</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'You have a ribbon that is \\(\\frac{3}{4}\\) meter long. You need pieces that are \\(\\frac{1}{8}\\) meter each. How many pieces can you cut?',
                    hint: 'This is a division problem: \\(\\frac{3}{4} \\div \\frac{1}{8}\\). Keep, change, flip!',
                    solution: '\\(\\frac{3}{4} \\div \\frac{1}{8} = \\frac{3}{4} \\times \\frac{8}{1} = \\frac{24}{4} = 6\\) pieces.'
                },
                {
                    question: 'A class has 30 students. \\(\\frac{2}{5}\\) of them play soccer. How many students play soccer?',
                    hint: 'The word "of" means multiply: \\(\\frac{2}{5} \\times 30\\).',
                    solution: '\\(\\frac{2}{5} \\times 30 = \\frac{2 \\times 30}{5} = \\frac{60}{5} = 12\\) students.'
                },
                {
                    question: 'A painter uses \\(\\frac{2}{3}\\) of a can of paint for each wall. She has \\(3\\frac{1}{3}\\) cans. How many walls can she paint?',
                    hint: 'Convert \\(3\\frac{1}{3} = \\frac{10}{3}\\). Then divide: \\(\\frac{10}{3} \\div \\frac{2}{3}\\).',
                    solution: '\\(\\frac{10}{3} \\div \\frac{2}{3} = \\frac{10}{3} \\times \\frac{3}{2} = \\frac{30}{6} = 5\\) walls.'
                }
            ],
            visualizations: [
                {
                    id: 'ch04-pizza-share',
                    title: 'Pizza Sharing Scenario',
                    description: 'See how a pizza gets divided. Change the fraction to see how many slices you eat!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 360, scale: 40, originX: 280, originY: 180});
                        var totalSlices = 8, fractionNum = 3, fractionDen = 4;

                        VizEngine.createSlider(controls, 'Total slices', 4, 12, totalSlices, 1, function(v) { totalSlices = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Eat (num)', 1, 7, fractionNum, 1, function(v) { fractionNum = Math.min(Math.round(v), fractionDen); draw(); });
                        VizEngine.createSlider(controls, 'Eat (den)', 2, 8, fractionDen, 1, function(v) { fractionDen = Math.round(v); fractionNum = Math.min(fractionNum, fractionDen); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = 170, radius = 120;
                            var sliceAngle = (2 * Math.PI) / totalSlices;
                            var eatSlices = Math.round(totalSlices * fractionNum / fractionDen);

                            // Draw pizza slices
                            for (var i = 0; i < totalSlices; i++) {
                                var startA = -Math.PI / 2 + i * sliceAngle;
                                var endA = startA + sliceAngle;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                ctx.arc(cx, cy, radius, startA, endA);
                                ctx.closePath();
                                if (i < eatSlices) {
                                    ctx.fillStyle = viz.colors.orange + '77';
                                } else {
                                    ctx.fillStyle = viz.colors.blue + '33';
                                }
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.white + '88';
                                ctx.lineWidth = 2;
                                ctx.stroke();

                                // Slice number
                                var midA = startA + sliceAngle / 2;
                                var labelR = radius * 0.65;
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(i + 1, cx + Math.cos(midA) * labelR, cy + Math.sin(midA) * labelR);
                            }

                            // Outer ring
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();

                            // Legend
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('You eat ' + fractionNum + '/' + fractionDen + ' of ' + totalSlices + ' slices', cx, cy + radius + 30);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.fillText(fractionNum + '/' + fractionDen + ' \u00d7 ' + totalSlices + ' = ' + eatSlices + ' slices!', cx, cy + radius + 58);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        }
    ]
});

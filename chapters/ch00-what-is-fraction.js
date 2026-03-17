window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'What is a Fraction?',
    subtitle: 'Discover how to split things into equal parts, name those parts, and place them on a number line!',
    sections: [
        // ============================================================
        // SECTION 1: Parts of a Whole
        // ============================================================
        {
            id: 'ch00-sec01',
            title: 'Parts of a Whole',
            content: `
                <h2>Parts of a Whole</h2>

                <div class="env-block intuition">
                    <div class="env-title">Welcome to Fractions!</div>
                    <div class="env-body">
                        <p>Have you ever shared a pizza with friends? When you cut a pizza into equal slices, each slice is a <strong>fraction</strong> of the whole pizza. Fractions are everywhere: half a sandwich, a quarter of an hour, three-fourths of a cup of flour. Let's learn how they work!</p>
                    </div>
                </div>

                <p>A <strong>fraction</strong> describes a part of a whole. Every fraction has two numbers:</p>
                <ul>
                    <li>The <strong>numerator</strong> (top number) tells you how many parts you have.</li>
                    <li>The <strong>denominator</strong> (bottom number) tells you how many equal parts the whole is divided into.</li>
                </ul>

                <p style="text-align:center; font-size:1.3em; color:var(--accent-teal);">
                    \\(\\frac{\\text{numerator}}{\\text{denominator}} = \\frac{\\text{parts you have}}{\\text{total equal parts}}\\)
                </p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>If a pizza is cut into <strong>8 equal slices</strong> and you eat <strong>3 slices</strong>, you ate \\(\\frac{3}{8}\\) of the pizza. The numerator is 3 (slices you ate) and the denominator is 8 (total slices).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="pizza-fractions"></div>

                <div class="env-block remark">
                    <div class="env-title">Important Rule</div>
                    <div class="env-body">
                        <p>The parts <strong>must be equal</strong>! If you cut a cake into pieces of different sizes, those pieces are not proper fractions of the cake. Fractions only make sense when every part is the same size.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>What happens when the numerator equals the denominator? For example, \\(\\frac{8}{8}\\). That means you have ALL 8 out of 8 slices, which is the whole pizza! So \\(\\frac{8}{8} = 1\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'pizza-fractions',
                    title: 'Pizza Fractions',
                    description: 'Use the sliders to change the number of slices and how many are shaded. Watch the fraction change!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 500, height: 400, scale: 100, originX: 250, originY: 210 });
                        var denominator = 8;
                        var numerator = 3;

                        var denomSlider = VizEngine.createSlider(controls, 'Slices (denominator)', 2, 12, denominator, 1, function(v) {
                            denominator = Math.round(v);
                            if (numerator > denominator) numerator = denominator;
                            numSlider.max = denominator;
                            if (parseInt(numSlider.value) > denominator) { numSlider.value = denominator; }
                            draw();
                        });
                        var numSlider = VizEngine.createSlider(controls, 'Shaded (numerator)', 0, 12, numerator, 1, function(v) {
                            numerator = Math.round(Math.min(v, denominator));
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = 210;
                            var r = 130;

                            // Draw pizza slices
                            for (var i = 0; i < denominator; i++) {
                                var startAngle = (i * 2 * Math.PI / denominator) - Math.PI / 2;
                                var endAngle = ((i + 1) * 2 * Math.PI / denominator) - Math.PI / 2;

                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                ctx.arc(cx, cy, r, startAngle, endAngle);
                                ctx.closePath();

                                if (i < numerator) {
                                    ctx.fillStyle = viz.colors.orange + 'cc';
                                } else {
                                    ctx.fillStyle = viz.colors.bg;
                                }
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.stroke();
                            }

                            // Outer circle
                            ctx.beginPath();
                            ctx.arc(cx, cy, r, 0, Math.PI * 2);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.stroke();

                            // Fraction label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 42px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(numerator + '/' + denominator, cx, 40);

                            // Labels
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('numerator = ' + numerator + ' (shaded parts)', cx, cy + r + 30);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('denominator = ' + denominator + ' (total parts)', cx, cy + r + 52);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A pie is cut into 6 equal slices. You eat 2 slices. What fraction of the pie did you eat?',
                    hint: 'The denominator is the total number of slices. The numerator is how many you ate.',
                    solution: 'You ate \\(\\frac{2}{6}\\) of the pie. The denominator is 6 (total slices) and the numerator is 2 (slices eaten).'
                },
                {
                    question: 'What does the denominator in \\(\\frac{5}{9}\\) tell you?',
                    hint: 'The denominator is the bottom number. What does it represent?',
                    solution: 'The denominator 9 tells you the whole is divided into <strong>9 equal parts</strong>.'
                },
                {
                    question: 'If you shade \\(\\frac{4}{4}\\) of a shape, how much of the shape is shaded?',
                    hint: 'What happens when the numerator equals the denominator?',
                    solution: 'The entire shape is shaded! \\(\\frac{4}{4} = 1\\), which means all 4 out of 4 parts are shaded, so you have the whole thing.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Fractions on the Number Line
        // ============================================================
        {
            id: 'ch00-sec02',
            title: 'Fractions on the Number Line',
            content: `
                <h2>Fractions on the Number Line</h2>

                <p>You already know whole numbers live on the number line: \\(0, 1, 2, 3, \\ldots\\) But what about the spaces <strong>between</strong> whole numbers? That's where fractions live!</p>

                <p>Fractions fill in the gaps. Between 0 and 1, there are infinitely many fractions: \\(\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\frac{2}{3}, \\frac{3}{4}, \\ldots\\)</p>

                <div class="env-block example">
                    <div class="env-title">How to Place a Fraction</div>
                    <div class="env-body">
                        <p>To place \\(\\frac{3}{4}\\) on a number line:</p>
                        <ol>
                            <li>Divide the space between 0 and 1 into <strong>4 equal parts</strong> (that's the denominator).</li>
                            <li>Count <strong>3 parts</strong> from 0 (that's the numerator).</li>
                            <li>Mark that spot. That's \\(\\frac{3}{4}\\)!</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="fraction-number-line"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Notice that \\(\\frac{1}{2}\\) lands exactly in the middle between 0 and 1. And \\(\\frac{1}{4}\\) is halfway between 0 and \\(\\frac{1}{2}\\). Fractions help us describe <strong>exact positions</strong> between whole numbers!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Beyond 0 and 1</div>
                    <div class="env-body">
                        <p>Fractions don't just live between 0 and 1. The fraction \\(\\frac{5}{4}\\) is past 1 (it equals \\(1\\frac{1}{4}\\)). And \\(\\frac{7}{3}\\) is past 2 (it equals \\(2\\frac{1}{3}\\)).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'fraction-number-line',
                    title: 'Fractions on the Number Line',
                    description: 'Drag the marker to place fractions between 0 and 1. Change the denominator to see different subdivisions.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 600, height: 200, scale: 450, originX: 70, originY: 100 });
                        var denom = 4;
                        var marker = viz.addDraggable('frac', 0.5, 0, viz.colors.orange, 10, function() {
                            marker.x = Math.max(0, Math.min(1, marker.x));
                            // Snap to nearest fraction
                            marker.x = Math.round(marker.x * denom) / denom;
                            marker.y = 0;
                        });

                        VizEngine.createSlider(controls, 'Denominator', 2, 12, denom, 1, function(v) {
                            denom = Math.round(v);
                            marker.x = Math.round(marker.x * denom) / denom;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var y = viz.toScreen(0, 0)[1];
                            var x0 = viz.toScreen(0, 0)[0];
                            var x1 = viz.toScreen(1, 0)[0];

                            // Main line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(x0, y);
                            ctx.lineTo(x1, y);
                            ctx.stroke();

                            // Endpoints
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('0', x0, y + 20);
                            ctx.fillText('1', x1, y + 20);

                            // Tick marks
                            for (var i = 0; i <= denom; i++) {
                                var tx = viz.toScreen(i / denom, 0)[0];
                                var isMarked = (i === Math.round(marker.x * denom));
                                ctx.strokeStyle = isMarked ? viz.colors.orange : viz.colors.teal;
                                ctx.lineWidth = isMarked ? 3 : 1.5;
                                ctx.beginPath();
                                ctx.moveTo(tx, y - 15);
                                ctx.lineTo(tx, y + 15);
                                ctx.stroke();

                                if (i > 0 && i < denom) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'bottom';
                                    ctx.fillText(i + '/' + denom, tx, y - 20);
                                }
                            }

                            // Current fraction label
                            var num = Math.round(marker.x * denom);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 32px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(num + '/' + denom, viz.width / 2, 30);

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Where does \\(\\frac{1}{2}\\) go on a number line from 0 to 1?',
                    hint: 'Divide the space between 0 and 1 into 2 equal parts. Where is the first mark?',
                    solution: '\\(\\frac{1}{2}\\) goes exactly in the <strong>middle</strong> between 0 and 1. It splits the segment into two equal halves.'
                },
                {
                    question: 'If the number line from 0 to 1 is divided into 5 equal parts, what fraction names the third mark?',
                    hint: 'The denominator is 5 (five equal parts). Count from 0: first mark, second mark, third mark...',
                    solution: 'The third mark is \\(\\frac{3}{5}\\). Each mark represents one-fifth, and the third one is three-fifths from 0.'
                },
                {
                    question: 'Is \\(\\frac{5}{4}\\) between 0 and 1, or past 1? Explain.',
                    hint: 'Compare the numerator and denominator. If the numerator is bigger, what does that mean?',
                    solution: '\\(\\frac{5}{4}\\) is <strong>past 1</strong>. Since \\(5 &gt; 4\\), we have more parts than one whole. Specifically, \\(\\frac{5}{4} = 1\\frac{1}{4}\\), so it is one-quarter past 1.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Unit Fractions
        // ============================================================
        {
            id: 'ch00-sec03',
            title: 'Unit Fractions',
            content: `
                <h2>Unit Fractions</h2>

                <p>A <strong>unit fraction</strong> is a fraction with 1 as the numerator. These are the building blocks of all fractions!</p>

                <p style="text-align:center; font-size:1.2em; color:var(--accent-blue);">
                    \\(\\frac{1}{2}, \\quad \\frac{1}{3}, \\quad \\frac{1}{4}, \\quad \\frac{1}{5}, \\quad \\frac{1}{6}, \\quad \\frac{1}{7}, \\quad \\frac{1}{8}, \\quad \\ldots\\)
                </p>

                <div class="env-block intuition">
                    <div class="env-title">Big Idea</div>
                    <div class="env-body">
                        <p>Every fraction is just a <strong>stack of unit fractions</strong>. For example:</p>
                        <p style="text-align:center;">\\(\\frac{3}{4} = \\frac{1}{4} + \\frac{1}{4} + \\frac{1}{4}\\)</p>
                        <p>Three-fourths is really just three copies of one-fourth!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Smaller Denominator = Bigger Piece!</div>
                    <div class="env-body">
                        <p>This might seem backwards, but \\(\\frac{1}{2}\\) is <strong>bigger</strong> than \\(\\frac{1}{3}\\), which is bigger than \\(\\frac{1}{4}\\), and so on. Why? Because when you divide something into fewer pieces, each piece is larger!</p>
                        <p style="text-align:center;">\\(\\frac{1}{2} &gt; \\frac{1}{3} &gt; \\frac{1}{4} &gt; \\frac{1}{5} &gt; \\frac{1}{6} &gt; \\cdots\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="unit-fraction-strips"></div>

                <div class="env-block example">
                    <div class="env-title">Real-World Unit Fractions</div>
                    <div class="env-body">
                        <ul>
                            <li>\\(\\frac{1}{2}\\) hour = 30 minutes</li>
                            <li>\\(\\frac{1}{4}\\) dollar = 25 cents (a quarter!)</li>
                            <li>\\(\\frac{1}{12}\\) year = 1 month</li>
                            <li>\\(\\frac{1}{7}\\) week = 1 day</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'unit-fraction-strips',
                    title: 'Fraction Strips',
                    description: 'See how unit fractions compare. Bigger denominators make smaller pieces!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 600, height: 350, scale: 1, originX: 0, originY: 0 });
                        var maxDenom = 8;

                        VizEngine.createSlider(controls, 'Show up to 1/', 2, 12, maxDenom, 1, function(v) {
                            maxDenom = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var left = 60;
                            var right = viz.width - 30;
                            var totalW = right - left;
                            var barH = Math.min(30, (viz.height - 40) / maxDenom - 4);
                            var gap = 4;
                            var startY = 20;

                            // "1 whole" reference bar
                            ctx.fillStyle = viz.colors.white + '33';
                            ctx.fillRect(left, startY, totalW, barH);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(left, startY, totalW, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('1', left - 8, startY + barH / 2);

                            var colors = [
                                viz.colors.blue, viz.colors.orange, viz.colors.green,
                                viz.colors.purple, viz.colors.teal, viz.colors.red,
                                viz.colors.yellow, viz.colors.pink, viz.colors.blue,
                                viz.colors.orange, viz.colors.green
                            ];

                            for (var d = 2; d <= maxDenom; d++) {
                                var y = startY + (d - 1) * (barH + gap);
                                var pieceW = totalW / d;
                                var col = colors[(d - 2) % colors.length];

                                // Label
                                ctx.fillStyle = col;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('1/' + d, left - 8, y + barH / 2);

                                // Draw pieces
                                for (var i = 0; i < d; i++) {
                                    var px = left + i * pieceW;
                                    // Shade the first piece (unit fraction)
                                    if (i === 0) {
                                        ctx.fillStyle = col + 'aa';
                                    } else {
                                        ctx.fillStyle = col + '22';
                                    }
                                    ctx.fillRect(px + 1, y, pieceW - 2, barH);
                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(px + 1, y, pieceW - 2, barH);
                                }
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Which is bigger: \\(\\frac{1}{3}\\) or \\(\\frac{1}{5}\\)?',
                    hint: 'When the numerator is the same, think about the size of each piece. More pieces = smaller pieces.',
                    solution: '\\(\\frac{1}{3}\\) is bigger. Cutting something into 3 pieces gives bigger pieces than cutting into 5 pieces. Think of it this way: sharing a pizza among 3 friends gives each person more than sharing among 5 friends!'
                },
                {
                    question: 'Write \\(\\frac{5}{6}\\) as a sum of unit fractions.',
                    hint: 'Each unit fraction has numerator 1. How many copies of \\(\\frac{1}{6}\\) do you need?',
                    solution: '\\(\\frac{5}{6} = \\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6}\\). That is five copies of the unit fraction \\(\\frac{1}{6}\\).'
                },
                {
                    question: 'If \\(\\frac{1}{4}\\) of an hour is 15 minutes, how many minutes is \\(\\frac{3}{4}\\) of an hour?',
                    hint: '\\(\\frac{3}{4}\\) is three copies of \\(\\frac{1}{4}\\).',
                    solution: '\\(\\frac{3}{4}\\) of an hour is \\(3 \\times 15 = 45\\) minutes. Since each quarter-hour is 15 minutes, three quarters is \\(15 + 15 + 15 = 45\\) minutes.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Mixed Numbers & Improper Fractions
        // ============================================================
        {
            id: 'ch00-sec04',
            title: 'Mixed Numbers & Improper Fractions',
            content: `
                <h2>Mixed Numbers &amp; Improper Fractions</h2>

                <p>Sometimes a fraction is bigger than 1. There are two ways to write such numbers:</p>

                <div class="env-block intuition">
                    <div class="env-title">Two Names for the Same Amount</div>
                    <div class="env-body">
                        <p><strong>Improper fraction:</strong> The numerator is bigger than (or equal to) the denominator.</p>
                        <p style="text-align:center;">\\(\\frac{7}{4}\\) means "seven quarters"</p>
                        <p><strong>Mixed number:</strong> A whole number plus a proper fraction.</p>
                        <p style="text-align:center;">\\(1\\frac{3}{4}\\) means "one and three quarters"</p>
                        <p>These are the <strong>same amount</strong>! Just written differently.</p>
                    </div>
                </div>

                <h3>Converting Improper Fraction to Mixed Number</h3>
                <p>Divide the numerator by the denominator:</p>
                <ul>
                    <li>The <strong>quotient</strong> (answer) becomes the whole number part.</li>
                    <li>The <strong>remainder</strong> becomes the new numerator.</li>
                    <li>The denominator stays the same.</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example: Convert \\(\\frac{11}{3}\\)</div>
                    <div class="env-body">
                        <p>\\(11 \\div 3 = 3\\) remainder \\(2\\). So \\(\\frac{11}{3} = 3\\frac{2}{3}\\).</p>
                    </div>
                </div>

                <h3>Converting Mixed Number to Improper Fraction</h3>
                <p>Multiply the whole number by the denominator, then add the numerator:</p>
                <p style="text-align:center; font-size:1.1em; color:var(--accent-teal);">
                    \\(a\\frac{b}{c} = \\frac{a \\times c + b}{c}\\)
                </p>

                <div class="env-block example">
                    <div class="env-title">Example: Convert \\(2\\frac{3}{5}\\)</div>
                    <div class="env-body">
                        <p>\\(2 \\times 5 + 3 = 13\\). So \\(2\\frac{3}{5} = \\frac{13}{5}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="mixed-improper-pies"></div>
            `,
            visualizations: [
                {
                    id: 'mixed-improper-pies',
                    title: 'Mixed Numbers as Pies',
                    description: 'See how an improper fraction fills up whole pies and a leftover partial pie. Adjust the fraction!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 600, height: 300, scale: 1, originX: 0, originY: 0 });
                        var numerator = 7;
                        var denominator = 4;

                        VizEngine.createSlider(controls, 'Numerator', 1, 20, numerator, 1, function(v) {
                            numerator = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Denominator', 2, 8, denominator, 1, function(v) {
                            denominator = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var wholePies = Math.floor(numerator / denominator);
                            var remaining = numerator % denominator;
                            var totalPies = wholePies + (remaining > 0 ? 1 : 0);
                            var r = Math.min(55, (viz.width - 40) / (totalPies * 2 + 1));
                            if (r < 20) r = 20;
                            var startX = Math.max(r + 10, (viz.width - totalPies * (r * 2 + 15)) / 2 + r);
                            var cy = 160;

                            // Title: improper fraction
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(numerator + '/' + denominator, viz.width / 2 - 80, 35);

                            // Equals sign
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('=', viz.width / 2, 35);

                            // Mixed number
                            ctx.fillStyle = viz.colors.teal;
                            var mixedStr = '';
                            if (wholePies > 0 && remaining > 0) {
                                mixedStr = wholePies + '  ' + remaining + '/' + denominator;
                            } else if (remaining === 0) {
                                mixedStr = '' + wholePies;
                            } else {
                                mixedStr = remaining + '/' + denominator;
                            }
                            ctx.fillText(mixedStr, viz.width / 2 + 90, 35);

                            // Draw pies
                            var pxUsed = 0;
                            for (var p = 0; p < totalPies; p++) {
                                var px = startX + p * (r * 2 + 15);
                                var slicesInThisPie = (p < wholePies) ? denominator : remaining;

                                for (var i = 0; i < denominator; i++) {
                                    var sa = (i * 2 * Math.PI / denominator) - Math.PI / 2;
                                    var ea = ((i + 1) * 2 * Math.PI / denominator) - Math.PI / 2;
                                    ctx.beginPath();
                                    ctx.moveTo(px, cy);
                                    ctx.arc(px, cy, r, sa, ea);
                                    ctx.closePath();

                                    if (i < slicesInThisPie) {
                                        ctx.fillStyle = (p < wholePies) ? viz.colors.orange + 'bb' : viz.colors.teal + 'bb';
                                    } else {
                                        ctx.fillStyle = viz.colors.bg;
                                    }
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.white;
                                    ctx.lineWidth = 1.5;
                                    ctx.stroke();
                                }

                                ctx.beginPath();
                                ctx.arc(px, cy, r, 0, Math.PI * 2);
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.stroke();
                            }

                            // Info text
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (wholePies > 0 && remaining > 0) {
                                ctx.fillText(wholePies + ' full pie' + (wholePies > 1 ? 's' : '') + ' + ' + remaining + '/' + denominator + ' of another', viz.width / 2, cy + r + 30);
                            } else if (remaining === 0) {
                                ctx.fillText(wholePies + ' full pie' + (wholePies > 1 ? 's' : '') + ' (no leftover!)', viz.width / 2, cy + r + 30);
                            } else {
                                ctx.fillText('Less than one whole pie', viz.width / 2, cy + r + 30);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Convert \\(\\frac{9}{4}\\) to a mixed number.',
                    hint: 'Divide 9 by 4. What is the quotient and the remainder?',
                    solution: '\\(9 \\div 4 = 2\\) remainder \\(1\\). So \\(\\frac{9}{4} = 2\\frac{1}{4}\\). That is 2 whole pies and one extra quarter.'
                },
                {
                    question: 'Convert \\(3\\frac{2}{5}\\) to an improper fraction.',
                    hint: 'Multiply the whole number (3) by the denominator (5), then add the numerator (2).',
                    solution: '\\(3 \\times 5 + 2 = 17\\). So \\(3\\frac{2}{5} = \\frac{17}{5}\\).'
                },
                {
                    question: 'Is \\(\\frac{6}{6}\\) an improper fraction, a proper fraction, or a whole number?',
                    hint: 'What is \\(6 \\div 6\\)?',
                    solution: '\\(\\frac{6}{6} = 1\\). It is technically an improper fraction (numerator equals denominator), but it is also exactly equal to the whole number 1. When we simplify it, we just write 1.'
                }
            ]
        }
    ]
});

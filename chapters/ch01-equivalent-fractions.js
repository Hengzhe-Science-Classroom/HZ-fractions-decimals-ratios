window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Equivalent Fractions',
    subtitle: 'Discover that many different fractions can name the same amount, and learn how to simplify them!',
    sections: [
        // ============================================================
        // SECTION 1: What Makes Fractions Equal?
        // ============================================================
        {
            id: 'ch01-sec01',
            title: 'What Makes Fractions Equal?',
            content: `
                <h2>What Makes Fractions Equal?</h2>

                <div class="env-block intuition">
                    <div class="env-title">Same Amount, Different Names</div>
                    <div class="env-body">
                        <p>Imagine cutting a chocolate bar in half. You get \\(\\frac{1}{2}\\). Now imagine cutting that same bar into 4 equal pieces and taking 2 of them. You get \\(\\frac{2}{4}\\). But wait, you still have the same amount of chocolate!</p>
                        <p style="text-align:center; font-size:1.1em;">\\(\\frac{1}{2} = \\frac{2}{4}\\)</p>
                        <p>Fractions that represent the <strong>same amount</strong> are called <strong>equivalent fractions</strong>.</p>
                    </div>
                </div>

                <h3>The Golden Rule of Fractions</h3>
                <p>You can create an equivalent fraction by multiplying (or dividing) <strong>both</strong> the numerator and denominator by the <strong>same number</strong>:</p>

                <p style="text-align:center; font-size:1.2em; color:var(--accent-teal);">
                    \\(\\frac{a}{b} = \\frac{a \\times n}{b \\times n}\\)
                </p>

                <p>This works because multiplying top and bottom by the same number is like multiplying by \\(\\frac{n}{n} = 1\\), and multiplying by 1 never changes a value!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Start with \\(\\frac{2}{3}\\). Multiply top and bottom by 4:</p>
                        <p style="text-align:center;">\\(\\frac{2}{3} = \\frac{2 \\times 4}{3 \\times 4} = \\frac{8}{12}\\)</p>
                        <p>So \\(\\frac{2}{3}\\) and \\(\\frac{8}{12}\\) are equivalent. They name the same amount!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="equivalent-bars"></div>

                <div class="env-block remark">
                    <div class="env-title">Why Does This Work?</div>
                    <div class="env-body">
                        <p>When you multiply the denominator by \\(n\\), you cut each piece into \\(n\\) smaller pieces. But you also multiply the numerator by \\(n\\), meaning you take \\(n\\) times as many pieces. The result? You have the same total amount!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'equivalent-bars',
                    title: 'Are These Fractions Equal?',
                    description: 'Adjust both fractions and see whether the shaded areas match up. When they do, the fractions are equivalent!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 300, scale: 1, originX: 0, originY: 0 });
                        var num1 = 1, den1 = 2, num2 = 2, den2 = 4;

                        VizEngine.createSlider(controls, 'Top: num', 0, 12, num1, 1, function(v) { num1 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Top: den', 1, 12, den1, 1, function(v) { den1 = Math.max(1, Math.round(v)); draw(); });
                        VizEngine.createSlider(controls, 'Bottom: num', 0, 12, num2, 1, function(v) { num2 = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Bottom: den', 1, 12, den2, 1, function(v) { den2 = Math.max(1, Math.round(v)); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var left = 80, right = viz.width - 30;
                            var totalW = right - left;
                            var barH = 50;

                            // Fraction 1 bar
                            var y1 = 60;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(num1 + '/' + den1, left - 12, y1 + barH / 2);

                            var w1 = totalW / den1;
                            for (var i = 0; i < den1; i++) {
                                var px = left + i * w1;
                                ctx.fillStyle = (i < num1) ? viz.colors.blue + 'bb' : viz.colors.blue + '22';
                                ctx.fillRect(px + 1, y1, w1 - 2, barH);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(px + 1, y1, w1 - 2, barH);
                            }

                            // Fraction 2 bar
                            var y2 = 150;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText(num2 + '/' + den2, left - 12, y2 + barH / 2);

                            var w2 = totalW / den2;
                            for (var j = 0; j < den2; j++) {
                                var px2 = left + j * w2;
                                ctx.fillStyle = (j < num2) ? viz.colors.orange + 'bb' : viz.colors.orange + '22';
                                ctx.fillRect(px2 + 1, y2, w2 - 2, barH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(px2 + 1, y2, w2 - 2, barH);
                            }

                            // Equivalence check
                            var val1 = num1 / den1;
                            var val2 = num2 / den2;
                            var areEqual = Math.abs(val1 - val2) < 0.0001;

                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            if (areEqual && num1 > 0) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('EQUAL!  ' + num1 + '/' + den1 + ' = ' + num2 + '/' + den2, viz.width / 2, 250);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('NOT equal', viz.width / 2, 250);
                            }

                            // Guide line showing shaded width
                            if (num1 > 0) {
                                var shadedEnd1 = left + (num1 / den1) * totalW;
                                ctx.strokeStyle = viz.colors.green + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(shadedEnd1, y1 + barH + 2);
                                ctx.lineTo(shadedEnd1, y2 - 2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find a fraction equivalent to \\(\\frac{3}{5}\\) with a denominator of 15.',
                    hint: 'What do you multiply 5 by to get 15? Do the same to the numerator.',
                    solution: 'Multiply top and bottom by 3: \\(\\frac{3 \\times 3}{5 \\times 3} = \\frac{9}{15}\\). So \\(\\frac{3}{5} = \\frac{9}{15}\\).'
                },
                {
                    question: 'Are \\(\\frac{4}{6}\\) and \\(\\frac{6}{9}\\) equivalent?',
                    hint: 'Try simplifying both fractions to their lowest terms, or cross-multiply to check.',
                    solution: 'Yes! Both simplify to \\(\\frac{2}{3}\\). Check: \\(\\frac{4}{6} = \\frac{4 \\div 2}{6 \\div 2} = \\frac{2}{3}\\) and \\(\\frac{6}{9} = \\frac{6 \\div 3}{9 \\div 3} = \\frac{2}{3}\\). Or cross-multiply: \\(4 \\times 9 = 36 = 6 \\times 6\\). They are equal!'
                },
                {
                    question: 'Write three fractions equivalent to \\(\\frac{1}{4}\\).',
                    hint: 'Multiply numerator and denominator by 2, then by 3, then by 5.',
                    solution: '\\(\\frac{1 \\times 2}{4 \\times 2} = \\frac{2}{8}\\), \\(\\frac{1 \\times 3}{4 \\times 3} = \\frac{3}{12}\\), \\(\\frac{1 \\times 5}{4 \\times 5} = \\frac{5}{20}\\). So \\(\\frac{1}{4} = \\frac{2}{8} = \\frac{3}{12} = \\frac{5}{20}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Simplifying Fractions
        // ============================================================
        {
            id: 'ch01-sec02',
            title: 'Simplifying Fractions',
            content: `
                <h2>Simplifying Fractions</h2>

                <p><strong>Simplifying</strong> (or reducing) a fraction means writing it with the smallest possible numerator and denominator. We do this by dividing both numbers by their <strong>Greatest Common Divisor (GCD)</strong>.</p>

                <div class="env-block intuition">
                    <div class="env-title">What is the GCD?</div>
                    <div class="env-body">
                        <p>The <strong>Greatest Common Divisor</strong> of two numbers is the biggest number that divides both of them evenly.</p>
                        <p>For example, the GCD of 12 and 18:</p>
                        <ul>
                            <li>Factors of 12: \\(1, 2, 3, 4, 6, 12\\)</li>
                            <li>Factors of 18: \\(1, 2, 3, 6, 9, 18\\)</li>
                            <li>Common factors: \\(1, 2, 3, 6\\)</li>
                            <li>Greatest: \\(\\mathbf{6}\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Simplify \\(\\frac{12}{18}\\)</div>
                    <div class="env-body">
                        <p>The GCD of 12 and 18 is 6. Divide both by 6:</p>
                        <p style="text-align:center;">\\(\\frac{12}{18} = \\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}\\)</p>
                        <p>\\(\\frac{2}{3}\\) is in <strong>lowest terms</strong> because 2 and 3 share no common factor other than 1.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="simplify-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Quick Check</div>
                    <div class="env-body">
                        <p>A fraction is in lowest terms when the <strong>only</strong> number that divides both the numerator and denominator is 1. Here's a handy checklist:</p>
                        <ul>
                            <li>If both are even, divide by 2.</li>
                            <li>If both end in 0 or 5, divide by 5.</li>
                            <li>If the digit sum of both is divisible by 3, divide by 3.</li>
                            <li>Keep going until nothing works!</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'simplify-viz',
                    title: 'Simplify the Fraction',
                    description: 'Enter a fraction and watch it simplify step by step. The shaded area stays the same!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 320, scale: 1, originX: 0, originY: 0 });
                        var num = 8, den = 12;

                        VizEngine.createSlider(controls, 'Numerator', 1, 24, num, 1, function(v) { num = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Denominator', 1, 24, den, 1, function(v) { den = Math.max(1, Math.round(v)); draw(); });

                        function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var g = gcd(num, den);
                            var sNum = num / g, sDen = den / g;
                            var left = 70, right = viz.width - 30, totalW = right - left;
                            var barH = 45;

                            // Original
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Original', left + totalW / 2, 38);

                            var y1 = 45;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(num + '/' + den, left - 10, y1 + barH / 2);

                            var w1 = totalW / Math.max(den, 1);
                            for (var i = 0; i < den; i++) {
                                var px = left + i * w1;
                                ctx.fillStyle = (i < num) ? viz.colors.orange + 'aa' : viz.colors.orange + '22';
                                ctx.fillRect(px + 1, y1, w1 - 2, barH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(px + 1, y1, w1 - 2, barH);
                            }

                            // Arrow
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (g > 1) {
                                ctx.fillText('divide both by ' + g, viz.width / 2, y1 + barH + 25);
                                ctx.fillText('\u2193', viz.width / 2, y1 + barH + 42);
                            } else {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Already in lowest terms!', viz.width / 2, y1 + barH + 30);
                            }

                            // Simplified
                            var y2 = 155;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Simplified', left + totalW / 2, y2 - 5);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(sNum + '/' + sDen, left - 10, y2 + barH / 2);

                            var w2 = totalW / Math.max(sDen, 1);
                            for (var j = 0; j < sDen; j++) {
                                var px2 = left + j * w2;
                                ctx.fillStyle = (j < sNum) ? viz.colors.teal + 'aa' : viz.colors.teal + '22';
                                ctx.fillRect(px2 + 1, y2, w2 - 2, barH);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(px2 + 1, y2, w2 - 2, barH);
                            }

                            // Show GCD info
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('GCD(' + num + ', ' + den + ') = ' + g, viz.width / 2, y2 + barH + 25);

                            // Visual proof: shaded widths match
                            if (num <= den) {
                                var shaded1 = left + (num / den) * totalW;
                                ctx.strokeStyle = viz.colors.green + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(shaded1, y1 + barH + 1);
                                ctx.lineTo(shaded1, y2 - 1);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('Same amount!', shaded1 + 50, (y1 + barH + y2) / 2);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Simplify \\(\\frac{15}{25}\\).',
                    hint: 'Find the GCD of 15 and 25. Both end in 5, so try dividing by 5.',
                    solution: 'GCD(15, 25) = 5. So \\(\\frac{15 \\div 5}{25 \\div 5} = \\frac{3}{5}\\).'
                },
                {
                    question: 'Is \\(\\frac{7}{12}\\) already in lowest terms?',
                    hint: 'List the factors of 7. Is 7 a special kind of number?',
                    solution: 'Yes! 7 is a prime number, so its only factors are 1 and 7. Since 12 is not divisible by 7, the GCD is 1, and \\(\\frac{7}{12}\\) is already in lowest terms.'
                },
                {
                    question: 'Simplify \\(\\frac{24}{36}\\).',
                    hint: 'Both are even, so start by dividing by 2. Keep simplifying until you cannot anymore.',
                    solution: 'GCD(24, 36) = 12. One step: \\(\\frac{24 \\div 12}{36 \\div 12} = \\frac{2}{3}\\). Or step by step: \\(\\frac{24}{36} \\to \\frac{12}{18} \\to \\frac{6}{9} \\to \\frac{2}{3}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Finding Equivalent Fractions
        // ============================================================
        {
            id: 'ch01-sec03',
            title: 'Finding Equivalent Fractions',
            content: `
                <h2>Finding Equivalent Fractions</h2>

                <p>Now that we know the golden rule (multiply or divide top and bottom by the same number), let's use it to build <strong>families</strong> of equivalent fractions and see them on a fraction wall.</p>

                <div class="env-block intuition">
                    <div class="env-title">Fraction Families</div>
                    <div class="env-body">
                        <p>Every fraction belongs to a family of equivalent fractions. For instance, the \\(\\frac{1}{2}\\) family includes:</p>
                        <p style="text-align:center; color:var(--accent-blue);">\\(\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8} = \\frac{5}{10} = \\frac{6}{12} = \\cdots\\)</p>
                        <p>All of these name the same amount. They are all "half."</p>
                    </div>
                </div>

                <h3>Using Equivalent Fractions</h3>
                <p>Equivalent fractions are super useful when you need to:</p>
                <ul>
                    <li><strong>Compare</strong> fractions (Chapter 2) by giving them the same denominator</li>
                    <li><strong>Add or subtract</strong> fractions (Chapter 3) that have different denominators</li>
                    <li><strong>Simplify</strong> answers to their neatest form</li>
                </ul>

                <div class="viz-placeholder" data-viz="fraction-wall"></div>

                <div class="env-block example">
                    <div class="env-title">Pattern Spotting</div>
                    <div class="env-body">
                        <p>Look at the fraction wall above. Notice how \\(\\frac{1}{2}\\), \\(\\frac{2}{4}\\), \\(\\frac{3}{6}\\), \\(\\frac{4}{8}\\), and \\(\\frac{5}{10}\\) all end at the same spot? That's because they are all equivalent. The wall makes it visual!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Cross-Multiplication Check</div>
                    <div class="env-body">
                        <p>Quick way to check if \\(\\frac{a}{b} = \\frac{c}{d}\\): cross-multiply! If \\(a \\times d = b \\times c\\), they are equivalent.</p>
                        <p>Example: Is \\(\\frac{3}{7} = \\frac{9}{21}\\)? Check: \\(3 \\times 21 = 63\\) and \\(7 \\times 9 = 63\\). Yes!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'fraction-wall',
                    title: 'The Fraction Wall',
                    description: 'A fraction wall shows how fractions of different denominators line up. Fractions that end at the same position are equivalent!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 600, height: 340, scale: 1, originX: 0, originY: 0 });
                        var highlight = 2; // denominator to highlight

                        VizEngine.createSlider(controls, 'Highlight 1/', 2, 12, highlight, 1, function(v) {
                            highlight = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var left = 50, right = viz.width - 20;
                            var totalW = right - left;
                            var rows = 12;
                            var barH = Math.min(24, (viz.height - 20) / (rows + 1) - 2);
                            var gap = 2;
                            var startY = 10;

                            var colors = [
                                viz.colors.white, viz.colors.blue, viz.colors.orange,
                                viz.colors.green, viz.colors.purple, viz.colors.teal,
                                viz.colors.red, viz.colors.yellow, viz.colors.pink,
                                viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple
                            ];

                            // Target positions for highlighted fraction
                            var targetPositions = [];
                            for (var k = 1; k < highlight; k++) {
                                targetPositions.push(k / highlight);
                            }

                            // Row for "1 whole"
                            var y0 = startY;
                            ctx.fillStyle = viz.colors.white + '33';
                            ctx.fillRect(left, y0, totalW, barH);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(left, y0, totalW, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('1', left - 6, y0 + barH / 2);

                            for (var d = 2; d <= rows; d++) {
                                var y = startY + (d - 1) * (barH + gap);
                                var pieceW = totalW / d;
                                var col = colors[d % colors.length];

                                ctx.fillStyle = col;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('1/' + d, left - 6, y + barH / 2);

                                for (var i = 0; i < d; i++) {
                                    var px = left + i * pieceW;
                                    // Check if this piece's right edge aligns with highlighted fraction
                                    var rightEdge = (i + 1) / d;
                                    var isAligned = false;
                                    for (var t = 0; t < targetPositions.length; t++) {
                                        if (Math.abs(rightEdge - targetPositions[t]) < 0.001) {
                                            isAligned = true; break;
                                        }
                                    }

                                    if (d === highlight || isAligned) {
                                        ctx.fillStyle = col + 'aa';
                                    } else {
                                        ctx.fillStyle = col + '33';
                                    }
                                    ctx.fillRect(px + 0.5, y, pieceW - 1, barH);
                                    ctx.strokeStyle = col + '88';
                                    ctx.lineWidth = 0.8;
                                    ctx.strokeRect(px + 0.5, y, pieceW - 1, barH);
                                }
                            }

                            // Draw vertical alignment lines for highlighted fraction
                            ctx.strokeStyle = viz.colors.green + '88';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([3, 3]);
                            for (var m = 1; m < highlight; m++) {
                                var lineX = left + (m / highlight) * totalW;
                                ctx.beginPath();
                                ctx.moveTo(lineX, startY);
                                ctx.lineTo(lineX, startY + rows * (barH + gap));
                                ctx.stroke();
                            }
                            ctx.setLineDash([]);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use cross-multiplication to check: Is \\(\\frac{5}{8} = \\frac{15}{24}\\)?',
                    hint: 'Cross-multiply: compare \\(5 \\times 24\\) with \\(8 \\times 15\\).',
                    solution: '\\(5 \\times 24 = 120\\) and \\(8 \\times 15 = 120\\). Since both products are equal, \\(\\frac{5}{8} = \\frac{15}{24}\\). Yes, they are equivalent!'
                },
                {
                    question: 'Find the missing number: \\(\\frac{3}{7} = \\frac{?}{28}\\)',
                    hint: 'What did you multiply the denominator 7 by to get 28?',
                    solution: '\\(7 \\times 4 = 28\\), so multiply the numerator by 4 as well: \\(3 \\times 4 = 12\\). The answer is \\(\\frac{12}{28}\\).'
                },
                {
                    question: 'Name all the fractions on the fraction wall (denominators 2 through 12) that are equivalent to \\(\\frac{1}{3}\\).',
                    hint: 'Look for rows where a dividing line lands at the same spot as the 1/3 mark.',
                    solution: '\\(\\frac{1}{3} = \\frac{2}{6} = \\frac{3}{9} = \\frac{4}{12}\\). These are the fractions with denominators up to 12 where the denominator is a multiple of 3.'
                }
            ]
        }
    ]
});

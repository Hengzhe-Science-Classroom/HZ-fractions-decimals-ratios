window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Fractions & Decimals',
    subtitle: 'Two languages for the same numbers, and how to translate between them!',
    sections: [
        // ============================================================
        // SECTION 1: Converting Fractions to Decimals
        // ============================================================
        {
            id: 'ch07-sec01',
            title: 'Converting Fractions to Decimals',
            content: `
                <h2>Converting Fractions to Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">Fractions and Decimals Are the Same Thing!</div>
                    <div class="env-body">
                        <p>A fraction like \\(\\frac{3}{4}\\) and a decimal like \\(0.75\\) are just two ways of writing the <strong>same number</strong>. Think of it like two languages: "three-quarters" in Fraction-ese is "zero point seven five" in Decimal-ese. Being able to translate between them is a mathematical superpower!</p>
                    </div>
                </div>

                <h3>Method: Just Divide!</h3>

                <p>A fraction bar means <strong>division</strong>. So \\(\\frac{3}{4}\\) literally means \\(3 \\div 4\\). To convert any fraction to a decimal, divide the numerator by the denominator:</p>

                \\[\\frac{3}{4} = 3 \\div 4 = 0.75\\]

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Convert \\(\\frac{7}{8}\\) to a decimal:</strong></p>
                        <p>Divide: \\(7 \\div 8 = 0.875\\)</p>
                        <p>So \\(\\frac{7}{8} = 0.875\\)</p>
                    </div>
                </div>

                <h3>Common Conversions to Memorize</h3>

                <p>These come up so often that it helps to know them by heart:</p>
                <ul>
                    <li>\\(\\frac{1}{2} = 0.5\\)</li>
                    <li>\\(\\frac{1}{4} = 0.25\\), \\(\\frac{3}{4} = 0.75\\)</li>
                    <li>\\(\\frac{1}{5} = 0.2\\), \\(\\frac{2}{5} = 0.4\\), \\(\\frac{3}{5} = 0.6\\), \\(\\frac{4}{5} = 0.8\\)</li>
                    <li>\\(\\frac{1}{8} = 0.125\\), \\(\\frac{1}{10} = 0.1\\)</li>
                </ul>

                <div class="viz-placeholder" data-viz="ch07-div-anim"></div>

                <div class="env-block remark">
                    <div class="env-title">Shortcut for Denominators of 10, 100, 1000</div>
                    <div class="env-body">
                        <p>If the denominator is already a power of 10, the conversion is instant! Just write the numerator with the decimal point in the right place:</p>
                        <ul>
                            <li>\\(\\frac{7}{10} = 0.7\\)</li>
                            <li>\\(\\frac{43}{100} = 0.43\\)</li>
                            <li>\\(\\frac{9}{1000} = 0.009\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Some fractions produce decimals that go on forever! For example, \\(\\frac{1}{3} = 0.333...\\) and \\(\\frac{1}{7} = 0.142857142857...\\). We will explore these <strong>repeating decimals</strong> in Section 3.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Convert \\(\\frac{5}{8}\\) to a decimal.',
                    hint: 'Divide: \\(5 \\div 8\\). You can do long division: 8 goes into 50 six times (48), remainder 2...',
                    solution: '\\(5 \\div 8 = 0.625\\). So \\(\\frac{5}{8} = 0.625\\).'
                },
                {
                    question: 'Convert \\(\\frac{17}{20}\\) to a decimal.',
                    hint: 'You can divide, or notice that \\(\\frac{17}{20} = \\frac{85}{100}\\) (multiply top and bottom by 5).',
                    solution: '\\(\\frac{17}{20} = \\frac{85}{100} = 0.85\\).'
                },
                {
                    question: 'Which is bigger: \\(\\frac{4}{7}\\) or \\(0.58\\)?',
                    hint: 'Convert \\(\\frac{4}{7}\\) to a decimal: \\(4 \\div 7 \\approx ?\\)',
                    solution: '\\(4 \\div 7 \\approx 0.571...\\) Since \\(0.571 \\lt 0.58\\), the decimal \\(0.58\\) is bigger.'
                }
            ],
            visualizations: [
                {
                    id: 'ch07-div-anim',
                    title: 'Long Division: Fraction to Decimal',
                    description: 'Watch the long division unfold step by step as a fraction becomes a decimal. Change the fraction with the sliders!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 380, scale: 40, originX: 40, originY: 350});
                        var num = 3, den = 4, step = 0;

                        VizEngine.createSlider(controls, 'Numerator', 1, 9, num, 1, function(v) { num = Math.round(v); step = 0; draw(); });
                        VizEngine.createSlider(controls, 'Denominator', 2, 12, den, 1, function(v) { den = Math.round(v); step = 0; draw(); });
                        VizEngine.createButton(controls, 'Next Step', function() { step++; draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { step = 0; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('Convert ' + num + '/' + den + ' to a decimal', viz.width / 2, 25);

                            // Perform long division steps
                            var divSteps = [];
                            var current = num;
                            var quotientDigits = [];
                            var decimalPlaced = false;

                            for (var i = 0; i < 8; i++) {
                                if (current === 0) break;
                                if (current < den && !decimalPlaced) {
                                    quotientDigits.push('.');
                                    current *= 10;
                                    decimalPlaced = true;
                                } else if (current < den && decimalPlaced) {
                                    quotientDigits.push('0');
                                    current *= 10;
                                }
                                if (current >= den) {
                                    var digit = Math.floor(current / den);
                                    var remainder = current - digit * den;
                                    divSteps.push({dividend: current, digit: digit, product: digit * den, remainder: remainder});
                                    quotientDigits.push('' + digit);
                                    current = remainder;
                                    if (current > 0 && decimalPlaced) current *= 10;
                                    else if (current > 0 && !decimalPlaced) { quotientDigits.push('.'); decimalPlaced = true; current *= 10; }
                                }
                            }

                            // Display
                            var sx = 160, sy = 60;
                            var lineH = 40;

                            // Division bracket
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(sx - 5, sy + 8);
                            ctx.lineTo(sx - 5, sy - 8);
                            ctx.lineTo(sx + 200, sy - 8);
                            ctx.stroke();

                            // Divisor
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 20px monospace';
                            ctx.textAlign = 'right';
                            ctx.fillText('' + den, sx - 15, sy);

                            // Dividend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.textAlign = 'left';
                            ctx.fillText(num + '.000', sx + 5, sy);

                            // Quotient digits based on step
                            var showSteps = Math.min(step, divSteps.length);
                            var qStr = '';
                            var dIdx = 0;
                            for (var i = 0; i < quotientDigits.length && dIdx <= showSteps; i++) {
                                if (quotientDigits[i] === '.' || quotientDigits[i] === '0') {
                                    qStr += quotientDigits[i];
                                } else {
                                    if (dIdx < showSteps) {
                                        qStr += quotientDigits[i];
                                    }
                                    dIdx++;
                                }
                            }
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 20px monospace';
                            ctx.textAlign = 'left';
                            ctx.fillText(qStr || '0.', sx + 5, sy - 28);

                            // Show division steps
                            var dy = sy + lineH;
                            for (var i = 0; i < showSteps && i < divSteps.length; i++) {
                                var ds = divSteps[i];
                                // Product
                                ctx.fillStyle = viz.colors.orange + 'cc';
                                ctx.font = '16px monospace';
                                ctx.textAlign = 'left';
                                ctx.fillText('-' + ds.product, sx + 5, dy);
                                // Line
                                ctx.strokeStyle = viz.colors.white + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(sx + 5, dy + 12); ctx.lineTo(sx + 80, dy + 12); ctx.stroke();
                                dy += 22;
                                // Remainder
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('' + ds.remainder, sx + 10, dy);
                                if (ds.remainder > 0 && i < showSteps - 1) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.fillText('0', sx + 10 + ctx.measureText('' + ds.remainder).width, dy);
                                }
                                dy += 22;
                            }

                            // Result on the right
                            if (showSteps > 0) {
                                var decResult = (num / den);
                                var decStr = decResult === Math.floor(decResult) ? decResult.toFixed(1) : decResult.toFixed(6).replace(/0+$/, '');
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(num + '/' + den + ' = ' + decStr, 350, sy + 40);
                            }

                            // Instruction
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Press "Next Step" to see each division step', viz.width / 2, viz.height - 30);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 2: Converting Decimals to Fractions
        // ============================================================
        {
            id: 'ch07-sec02',
            title: 'Converting Decimals to Fractions',
            content: `
                <h2>Converting Decimals to Fractions</h2>

                <div class="env-block intuition">
                    <div class="env-title">Reading the Place Value</div>
                    <div class="env-body">
                        <p>Converting a decimal to a fraction is all about <strong>reading the place value</strong>. The last digit tells you the denominator! If the decimal ends in the tenths place, the denominator is 10. If it ends in the hundredths place, the denominator is 100. Then just simplify!</p>
                    </div>
                </div>

                <h3>The Three-Step Method</h3>
                <ol>
                    <li><strong>Read</strong> the decimal: identify the place value of the last digit.</li>
                    <li><strong>Write</strong> the fraction: the digits after the decimal point are the numerator, and the place value gives the denominator.</li>
                    <li><strong>Simplify</strong> by finding the greatest common factor (GCF).</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Convert \\(0.75\\) to a fraction:</strong></p>
                        <p><strong>Step 1:</strong> The last digit (5) is in the <strong>hundredths</strong> place.</p>
                        <p><strong>Step 2:</strong> Write as \\(\\frac{75}{100}\\).</p>
                        <p><strong>Step 3:</strong> Simplify: GCF of 75 and 100 is 25. \\(\\frac{75 \\div 25}{100 \\div 25} = \\frac{3}{4}\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Convert \\(2.6\\) to a fraction:</strong></p>
                        <p><strong>Step 1:</strong> The last digit (6) is in the <strong>tenths</strong> place.</p>
                        <p><strong>Step 2:</strong> Write as \\(2\\frac{6}{10}\\).</p>
                        <p><strong>Step 3:</strong> Simplify: \\(\\frac{6}{10} = \\frac{3}{5}\\). So \\(2.6 = 2\\frac{3}{5}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch07-dec-to-frac"></div>

                <div class="env-block remark">
                    <div class="env-title">Quick Pattern</div>
                    <div class="env-body">
                        <p>Count the digits after the decimal point. That tells you how many zeros in the denominator:</p>
                        <ul>
                            <li>1 digit after decimal &rarr; denominator is 10</li>
                            <li>2 digits after decimal &rarr; denominator is 100</li>
                            <li>3 digits after decimal &rarr; denominator is 1000</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Do not forget to simplify! \\(0.5 = \\frac{5}{10}\\) is correct but not fully simplified. The final answer should be \\(\\frac{1}{2}\\).</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Convert \\(0.35\\) to a fraction in simplest form.',
                    hint: 'Two decimal places means denominator 100. Then simplify \\(\\frac{35}{100}\\).',
                    solution: '\\(\\frac{35}{100} = \\frac{7}{20}\\) (divide both by 5).'
                },
                {
                    question: 'Convert \\(0.125\\) to a fraction in simplest form.',
                    hint: 'Three decimal places means denominator 1000. Write \\(\\frac{125}{1000}\\) and simplify.',
                    solution: '\\(\\frac{125}{1000} = \\frac{1}{8}\\) (divide both by 125).'
                },
                {
                    question: 'Convert \\(3.4\\) to a mixed number in simplest form.',
                    hint: 'The whole part is 3. The decimal part \\(0.4 = \\frac{4}{10}\\).',
                    solution: '\\(3.4 = 3\\frac{4}{10} = 3\\frac{2}{5}\\).'
                }
            ],
            visualizations: [
                {
                    id: 'ch07-dec-to-frac',
                    title: 'Place Value to Fraction Converter',
                    description: 'Enter a decimal and watch it transform into a fraction! The place value determines the denominator.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 360, scale: 40, originX: 40, originY: 330});
                        var decimal = 0.75;

                        VizEngine.createSlider(controls, 'Decimal', 0.01, 0.99, 0.75, 0.01, function(v) { decimal = Math.round(v * 100) / 100; draw(); });

                        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;

                            // Determine fraction
                            var decStr = decimal.toFixed(2).replace(/0+$/, '');
                            if (decStr.indexOf('.') === -1) decStr += '.0';
                            var afterDot = decStr.split('.')[1] || '0';
                            var numDigits = afterDot.length;
                            var denominator = Math.pow(10, numDigits);
                            var numerator = Math.round(decimal * denominator);
                            var g = gcd(numerator, denominator);
                            var simpNum = numerator / g, simpDen = denominator / g;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('Convert ' + decimal.toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + ' to a fraction', cx, 30);

                            // Step 1: Show the decimal with place values highlighted
                            var y = 70;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 36px monospace';
                            ctx.fillText('0.' + afterDot, cx, y);

                            // Arrows to denominator
                            y = 115;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            var placeNames = ['tenths', 'hundredths', 'thousandths'];
                            ctx.fillText('Last digit is in the ' + (placeNames[numDigits - 1] || 'unknown') + ' place', cx, y);

                            // Step 2: Write as fraction
                            y = 155;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.fillText(numerator + ' / ' + denominator, cx, y);
                            // Fraction bar
                            var fracW = ctx.measureText(Math.max(numerator, denominator) + '').width + 20;

                            // Step 3: Simplify
                            y = 210;
                            if (g > 1) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Divide both by ' + g, cx, y);

                                y = 250;
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 32px -apple-system,sans-serif';
                                ctx.fillText(simpNum + ' / ' + simpDen, cx, y);
                            } else {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Already in simplest form!', cx, y);
                                y = 250;
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 32px -apple-system,sans-serif';
                                ctx.fillText(simpNum + ' / ' + simpDen, cx, y);
                            }

                            // Visual: show fraction as shaded bar
                            y = 290;
                            var barX = 80, barW = 400, barH = 30;
                            // Draw denominator divisions
                            for (var i = 0; i < simpDen; i++) {
                                var segW = barW / simpDen;
                                if (i < simpNum) {
                                    ctx.fillStyle = viz.colors.green + '55';
                                } else {
                                    ctx.fillStyle = viz.colors.text + '11';
                                }
                                ctx.fillRect(barX + i * segW + 1, y, segW - 2, barH);
                            }
                            ctx.strokeStyle = viz.colors.white + '66';
                            ctx.lineWidth = 1;
                            for (var i = 0; i <= simpDen; i++) {
                                var x = barX + (barW / simpDen) * i;
                                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + barH); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(barX, y, barW, barH);

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText(simpNum + ' out of ' + simpDen + ' parts shaded', cx, y + barH + 18);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 3: Repeating Decimals
        // ============================================================
        {
            id: 'ch07-sec03',
            title: 'Repeating Decimals',
            content: `
                <h2>Repeating Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">Decimals That Never End</div>
                    <div class="env-body">
                        <p>When you divide \\(1 \\div 3\\), something interesting happens: \\(0.333333...\\) The 3s go on forever! These are called <strong>repeating decimals</strong>. They happen when the division never comes out even, but the same pattern keeps showing up over and over.</p>
                    </div>
                </div>

                <h3>Bar Notation</h3>

                <p>Writing infinitely many digits is impossible, so we use a special shorthand called <strong>bar notation</strong>. A bar over a digit (or group of digits) means "this pattern repeats forever":</p>

                <ul>
                    <li>\\(\\frac{1}{3} = 0.\\overline{3}\\) means \\(0.333333...\\)</li>
                    <li>\\(\\frac{1}{6} = 0.1\\overline{6}\\) means \\(0.16666...\\)</li>
                    <li>\\(\\frac{1}{7} = 0.\\overline{142857}\\) means \\(0.142857142857...\\)</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Convert \\(\\frac{2}{3}\\) to a decimal:</strong></p>
                        <p>Divide: \\(2 \\div 3 = 0.666...\\)</p>
                        <p>In bar notation: \\(\\frac{2}{3} = 0.\\overline{6}\\)</p>
                        <p><strong>Convert \\(\\frac{5}{11}\\) to a decimal:</strong></p>
                        <p>Divide: \\(5 \\div 11 = 0.454545...\\)</p>
                        <p>In bar notation: \\(\\frac{5}{11} = 0.\\overline{45}\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch07-repeating-viz"></div>

                <h3>Why Do Decimals Repeat?</h3>

                <p>When you do long division, each step produces a <strong>remainder</strong>. If the denominator is \\(d\\), the remainder can only be 0, 1, 2, ..., \\(d-1\\). That is \\(d\\) possible remainders. So after at most \\(d\\) steps, a remainder <em>must</em> repeat, and once it does, the whole pattern starts over!</p>

                <div class="env-block example">
                    <div class="env-title">Which Fractions Terminate?</div>
                    <div class="env-body">
                        <p>A fraction (in lowest terms) gives a <strong>terminating decimal</strong> (one that ends) only if the denominator's only prime factors are 2 and 5. These are the factors of 10!</p>
                        <ul>
                            <li>\\(\\frac{3}{4}\\) terminates (4 = 2 \\(\\times\\) 2) &rarr; \\(0.75\\)</li>
                            <li>\\(\\frac{7}{8}\\) terminates (8 = 2 \\(\\times\\) 2 \\(\\times\\) 2) &rarr; \\(0.875\\)</li>
                            <li>\\(\\frac{1}{3}\\) repeats (3 is not 2 or 5) &rarr; \\(0.\\overline{3}\\)</li>
                            <li>\\(\\frac{1}{6}\\) repeats (6 = 2 \\(\\times\\) 3, has a factor of 3) &rarr; \\(0.1\\overline{6}\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Cool Pattern: Ninths</div>
                    <div class="env-body">
                        <p>The ninths family has a beautiful pattern:</p>
                        <ul>
                            <li>\\(\\frac{1}{9} = 0.\\overline{1}\\), \\(\\frac{2}{9} = 0.\\overline{2}\\), \\(\\frac{3}{9} = 0.\\overline{3}\\), ..., \\(\\frac{8}{9} = 0.\\overline{8}\\)</li>
                        </ul>
                        <p>And what about \\(\\frac{9}{9}\\)? That would be \\(0.\\overline{9} = 0.999... = 1\\). Yes, \\(0.999...\\) really does equal 1!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Be careful with bar notation. In \\(0.1\\overline{6}\\), the bar is only over the 6, meaning 0.16666... The 1 does <strong>not</strong> repeat. If the bar were over both digits (\\(0.\\overline{16}\\)), it would mean 0.161616..., which is a different number (\\(\\frac{16}{99}\\)).</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Convert \\(\\frac{5}{6}\\) to a decimal. Use bar notation.',
                    hint: 'Divide 5 by 6. What pattern emerges?',
                    solution: '\\(5 \\div 6 = 0.8333...\\) In bar notation: \\(\\frac{5}{6} = 0.8\\overline{3}\\).'
                },
                {
                    question: 'Will \\(\\frac{3}{20}\\) give a terminating or repeating decimal? Find the decimal.',
                    hint: 'Factor the denominator: \\(20 = 2^2 \\times 5\\). Are all factors 2s and 5s?',
                    solution: 'Since 20 = 2 \\(\\times\\) 2 \\(\\times\\) 5 (only 2s and 5s), the decimal terminates. \\(\\frac{3}{20} = 0.15\\).'
                },
                {
                    question: 'Convert \\(\\frac{4}{11}\\) to a decimal. What digits repeat?',
                    hint: 'Divide 4 by 11. After a few steps, you will see the pattern.',
                    solution: '\\(4 \\div 11 = 0.363636...\\) The digits 36 repeat. In bar notation: \\(0.\\overline{36}\\).'
                }
            ],
            visualizations: [
                {
                    id: 'ch07-repeating-viz',
                    title: 'Repeating Pattern Detector',
                    description: 'Watch the long division unfold and see the repeating pattern emerge! The remainders cycle back, causing the digits to repeat.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 380, scale: 40, originX: 40, originY: 350});
                        var num = 1, den = 3;

                        VizEngine.createSlider(controls, 'Numerator', 1, 10, num, 1, function(v) { num = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Denominator', 2, 12, den, 1, function(v) { den = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Perform long division
                            var quotientDigits = [];
                            var remainders = [];
                            var current = num;
                            var repeatStart = -1;

                            // Handle whole part
                            var wholePart = Math.floor(current / den);
                            current = current % den;

                            for (var i = 0; i < 20; i++) {
                                if (current === 0) break;
                                current *= 10;
                                // Check if we have seen this remainder before
                                var prevIdx = remainders.indexOf(current);
                                if (prevIdx !== -1) {
                                    repeatStart = prevIdx;
                                    break;
                                }
                                remainders.push(current);
                                var digit = Math.floor(current / den);
                                quotientDigits.push(digit);
                                current = current - digit * den;
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText(num + ' \u00f7 ' + den, viz.width / 2, 25);

                            // Display the decimal digits
                            var y = 70;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'left';
                            ctx.fillText('Result:', 30, y);

                            var digitX = 100;
                            ctx.font = 'bold 24px monospace';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(wholePart + '.', digitX, y);
                            digitX += ctx.measureText(wholePart + '.').width;

                            for (var i = 0; i < quotientDigits.length; i++) {
                                var isRepeating = repeatStart !== -1 && i >= repeatStart;
                                ctx.fillStyle = isRepeating ? viz.colors.orange : viz.colors.blue;
                                ctx.fillText('' + quotientDigits[i], digitX, y);
                                digitX += ctx.measureText('' + quotientDigits[i]).width + 2;
                            }

                            if (repeatStart !== -1) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('...', digitX, y);
                            }

                            // Show if terminating or repeating
                            y = 110;
                            if (repeatStart !== -1) {
                                var repeatDigits = quotientDigits.slice(repeatStart).join('');
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Repeating decimal! Pattern: ' + repeatDigits, viz.width / 2, y);

                                // Bar notation
                                y = 140;
                                var beforeRepeat = quotientDigits.slice(0, repeatStart).join('');
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                var barStr = wholePart + '.' + beforeRepeat + repeatDigits;
                                ctx.fillText(barStr, viz.width / 2, y);
                                // Draw bar over repeating part
                                var fullBefore = wholePart + '.' + beforeRepeat;
                                var textW = ctx.measureText(barStr).width;
                                var beforeW = ctx.measureText(fullBefore).width;
                                var repeatW = ctx.measureText(repeatDigits).width;
                                var barStartX = viz.width / 2 - textW / 2 + beforeW;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(barStartX, y - 16);
                                ctx.lineTo(barStartX + repeatW, y - 16);
                                ctx.stroke();
                            } else {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Terminating decimal! (division ends)', viz.width / 2, y);
                            }

                            // Remainder chain
                            y = 185;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Remainders at each step:', viz.width / 2, y);

                            y = 215;
                            var boxSize = 36;
                            var gap = 6;
                            var totalW = remainders.length * (boxSize + gap);
                            var startX = Math.max(20, (viz.width - totalW) / 2);

                            for (var i = 0; i < Math.min(remainders.length, 12); i++) {
                                var bx = startX + i * (boxSize + gap);
                                var isRepeatRem = repeatStart !== -1 && i >= repeatStart;
                                ctx.fillStyle = isRepeatRem ? viz.colors.orange + '44' : viz.colors.blue + '22';
                                ctx.fillRect(bx, y, boxSize, boxSize);
                                ctx.strokeStyle = isRepeatRem ? viz.colors.orange : viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(bx, y, boxSize, boxSize);
                                ctx.fillStyle = isRepeatRem ? viz.colors.orange : viz.colors.blue;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                // Show the actual remainder (before *10)
                                var remVal = remainders[i] % den;
                                var divDigit = Math.floor(remainders[i] / den);
                                ctx.fillText('' + remainders[i], bx + boxSize / 2, y + boxSize / 2);
                            }

                            // Arrow showing repeat
                            if (repeatStart !== -1 && remainders.length > 1) {
                                y = y + boxSize + 15;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('When a remainder repeats, the digits start cycling!', viz.width / 2, y);
                            }

                            // Explanation
                            y = viz.height - 40;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Blue = unique remainders, Orange = pattern starts repeating', viz.width / 2, y);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        }
    ]
});
